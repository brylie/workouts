import {
  getOrCreateCustomerId,
  fetchSubscription,
} from "$lib/subscription/subscription_helpers.server";
import { hasActivePremiumSubscription } from "$lib/subscription/subscription_status";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "$lib/database/DatabaseDefinitions";

/**
 * Middleware to check if a user has an active premium subscription
 * @returns Object with subscription status and data
 */
export async function checkSubscription({
  supabaseServiceRole,
  user,
}: {
  supabaseServiceRole: SupabaseClient<Database>;
  user: User;
}) {
  try {
    // Get or create a customer ID for the current user
    const { customerId, error: idError } = await getOrCreateCustomerId({
      supabaseServiceRole,
      user,
    });

    if (idError || !customerId) {
      return {
        isSubscribed: false,
        subscription: null,
        error: idError,
      };
    }

    // Fetch subscription data
    const { primarySubscription, error: subError } = await fetchSubscription({
      customerId,
    });

    if (subError) {
      return {
        isSubscribed: false,
        subscription: null,
        error: subError,
      };
    }

    // Check if subscription is active
    const isSubscribed = primarySubscription
      ? hasActivePremiumSubscription(primarySubscription.stripeSubscription)
      : false;

    // Return subscription status and data
    return {
      isSubscribed,
      subscription: primarySubscription
        ? {
            id: primarySubscription.stripeSubscription.id,
            status: primarySubscription.stripeSubscription.status,
            plan: primarySubscription.appSubscription,
            currentPeriodEnd: primarySubscription.stripeSubscription
              .current_period_end
              ? new Date(
                  primarySubscription.stripeSubscription.current_period_end *
                    1000,
                ).toISOString()
              : null,
            cancelAtPeriodEnd:
              primarySubscription.stripeSubscription.cancel_at_period_end,
          }
        : null,
      error: null,
    };
  } catch (e) {
    console.error("Error checking subscription:", e);
    return {
      isSubscribed: false,
      subscription: null,
      error: e,
    };
  }
}
