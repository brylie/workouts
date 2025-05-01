/**
 * Server-side subscription helpers
 *
 * This module provides functions for managing Stripe subscriptions on the server side.
 */
import { stripe, isStripeConfigured } from "$lib/server/stripe";
import { pricingPlans } from "$lib/subscription/pricing-plans";
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/database/supabase-types";

/**
 * Gets an existing Stripe customer ID for a user, or creates one if it doesn't exist
 */
export async function getOrCreateCustomerId({
  supabaseAdmin,
  user,
}: {
  supabaseAdmin: SupabaseClient<Database>;
  user: User;
}): Promise<{ customerId?: string; error?: any }> {
  try {
    // Check if the user already has a Stripe customer ID
    const { data: existingCustomer, error: fetchError } = await supabaseAdmin
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = not found
      return { error: fetchError };
    }

    if (existingCustomer?.stripe_customer_id) {
      return { customerId: existingCustomer.stripe_customer_id };
    }

    // Fetch profile data needed to create customer
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("full_name, website")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return { error: profileError };
    }

    // Create a stripe customer
    if (!isStripeConfigured()) {
      return { error: "Stripe is not properly configured" };
    }

    try {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile.full_name || user.email || "",
        metadata: {
          user_id: user.id,
          website: profile.website || "",
        },
      });

      if (!customer.id) {
        return { error: "Unknown Stripe customer creation error" };
      }

      // Save the customer ID in our database
      const { error: insertError } = await supabaseAdmin
        .from("stripe_customers")
        .insert({
          user_id: user.id,
          stripe_customer_id: customer.id,
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        return { error: insertError };
      }

      return { customerId: customer.id };
    } catch (e) {
      return { error: e };
    }
  } catch (error) {
    console.error("Error in getOrCreateCustomerId:", error);
    return { error };
  }
}

/**
 * Fetches a user's subscription information from Stripe
 */
export async function fetchSubscription({
  customerId,
}: {
  customerId: string;
}): Promise<{
  primarySubscription?: {
    stripeSubscription: any;
    appSubscription: any;
  };
  hasEverHadSubscription: boolean;
  error?: any;
}> {
  if (!isStripeConfigured()) {
    return {
      hasEverHadSubscription: false,
      error: "Stripe is not properly configured",
    };
  }

  try {
    // Fetch user's subscriptions
    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 100,
      status: "all",
    });

    // Find "primary" subscription - an active one including trials and past_due in grace period
    const primaryStripeSubscription = stripeSubscriptions.data.find((sub) =>
      ["active", "trialing", "past_due"].includes(sub.status),
    );

    let appSubscription = null;
    if (primaryStripeSubscription) {
      const productId =
        primaryStripeSubscription.items?.data?.[0]?.price.product?.toString() ??
        "";

      appSubscription = pricingPlans.find(
        (plan) => plan.stripe_product_id === productId,
      );

      if (!appSubscription) {
        return {
          hasEverHadSubscription: stripeSubscriptions.data.length > 0,
          error:
            "Stripe subscription does not match any plan in pricing-plans.ts",
        };
      }
    }

    let primarySubscription = null;
    if (primaryStripeSubscription && appSubscription) {
      primarySubscription = {
        stripeSubscription: primaryStripeSubscription,
        appSubscription,
      };
    }

    return {
      primarySubscription,
      hasEverHadSubscription: stripeSubscriptions.data.length > 0,
    };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return {
      hasEverHadSubscription: false,
      error,
    };
  }
}
