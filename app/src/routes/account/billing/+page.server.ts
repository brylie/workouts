import { PRIVATE_STRIPE_API_KEY } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import { stripe } from "$lib/subscription/stripe.server";
import {
  getOrCreateCustomerId,
  fetchSubscription,
} from "$lib/subscription/subscription_helpers.server";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase, supabaseServiceRole, getSession },
}) => {
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(303, "/login?redirect=/account/billing");
  }

  try {
    // Get or create a customer ID for the current user
    const { error: idError, customerId } = await getOrCreateCustomerId({
      supabaseServiceRole,
      user: session.user,
    });

    if (idError || !customerId) {
      console.error("Error creating customer id", idError);
      error(500, {
        message:
          "There was a problem creating your customer record. Please try again later.",
      });
    }

    // Fetch subscription data
    const {
      primarySubscription,
      hasEverHadSubscription,
      error: subError,
    } = await fetchSubscription({
      customerId,
    });

    if (subError) {
      console.error("Error fetching subscription", subError);
      error(500, {
        message:
          "There was a problem checking your subscription status. Please try again later.",
      });
    }

    return {
      session,
      subscription: primarySubscription
        ? {
            id: primarySubscription.stripeSubscription.id,
            status: primarySubscription.stripeSubscription.status,
            currentPeriodEnd: primarySubscription.stripeSubscription
              .currentPeriodEnd
              ? new Date(
                  primarySubscription.stripeSubscription.currentPeriodEnd *
                    1000,
                ).toISOString()
              : null,
            cancelAtPeriodEnd:
              primarySubscription.stripeSubscription.cancelAtPeriodEnd,
            plan: primarySubscription.appSubscription,
          }
        : null,
      hasEverHadSubscription,
    };
  } catch (e) {
    console.error("Error in billing page:", e);
    error(500, {
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
