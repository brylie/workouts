import { redirect } from "@sveltejs/kit";
import {
  getOrCreateCustomerId,
  fetchSubscription,
} from "$lib/subscription/subscription_helpers.server";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase, supabaseServiceRole },
}) => {
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(303, "/login?redirect=/account");
  }

  try {
    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    // Get or create a customer ID for the current user
    const { customerId } = await getOrCreateCustomerId({
      supabaseServiceRole,
      user: session.user,
    });

    let subscription = null;
    if (customerId) {
      // Fetch subscription data
      const { primarySubscription } = await fetchSubscription({ customerId });

      if (primarySubscription) {
        subscription = {
          status: primarySubscription.stripeSubscription.status,
          plan: primarySubscription.appSubscription,
          cancelAtPeriodEnd:
            primarySubscription.stripeSubscription.cancel_at_period_end,
          currentPeriodEnd: primarySubscription.stripeSubscription
            .current_period_end
            ? new Date(
                primarySubscription.stripeSubscription.current_period_end *
                  1000,
              ).toISOString()
            : null,
        };
      }
    }

    return {
      profile,
      subscription,
      session, // Add session to satisfy PageData interface requirement
    };
  } catch (error) {
    console.error("Error loading account page:", error);
    return {
      profile: null,
      subscription: null,
      session, // Add session here as well to maintain consistency
    };
  }
};
