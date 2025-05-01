import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "$lib/database/DatabaseDefinitions";
import { stripe, formatStripeError } from "$lib/subscription/stripe.server";
import { pricingPlans } from "$lib/subscription/pricing_plans";
import type Stripe from "stripe";

export const getOrCreateCustomerId = async ({
  supabaseServiceRole,
  user,
}: {
  supabaseServiceRole: SupabaseClient<Database>;
  user: User;
}) => {
  // First check if customer exists
  const { data: dbCustomer, error } = await supabaseServiceRole
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 == no rows found
    return { error };
  }

  // If customer exists, return their ID
  if (dbCustomer?.stripe_customer_id) {
    return { customerId: dbCustomer.stripe_customer_id };
  }

  // Create a new Stripe customer
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        user_id: user.id,
      },
    });

    if (!customer.id) {
      return { error: "Failed to create Stripe customer" };
    }

    // Store the customer ID in our database
    const { error: insertError } = await supabaseServiceRole
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
    console.error("Error creating Stripe customer:", formatStripeError(e));
    return { error: e };
  }
};

export const fetchSubscription = async ({
  customerId,
}: {
  customerId: string;
}) => {
  try {
    // Fetch user's subscriptions from Stripe
    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 100,
      status: "all",
    });

    // Find active subscription (includes trialing and past_due in grace period)
    const activeStripeSubscription = stripeSubscriptions.data.find((sub) =>
      ["active", "trialing", "past_due"].includes(sub.status),
    );

    let appSubscription = null;
    if (activeStripeSubscription) {
      const productId =
        activeStripeSubscription?.items?.data?.[0]?.price.product?.toString() ||
        "";

      // Find the matching plan in our pricing_plans configuration
      appSubscription = pricingPlans.find((plan) => {
        return plan.stripe_product_id === productId;
      });
    }

    let primarySubscription = null;
    if (activeStripeSubscription && appSubscription) {
      // Create a properly typed Stripe.Subscription object with camelCase properties
      // that match the TypeScript definitions
      const normalizedSubscription =
        activeStripeSubscription as unknown as Record<string, any>;

      // Create a new subscription object with the correct TypeScript types
      const typedSubscription: Stripe.Subscription = {
        ...activeStripeSubscription,
        // Explicitly map snake_case properties to camelCase properties that TypeScript expects
        currentPeriodStart: normalizedSubscription.current_period_start,
        currentPeriodEnd: normalizedSubscription.current_period_end,
        cancelAtPeriodEnd: normalizedSubscription.cancel_at_period_end,
        // Include any other properties that might be needed and follow the same pattern
      } as Stripe.Subscription;

      primarySubscription = {
        stripeSubscription: typedSubscription,
        appSubscription,
      };
    }

    const hasEverHadSubscription = stripeSubscriptions.data.length > 0;

    return {
      primarySubscription,
      hasEverHadSubscription,
    };
  } catch (e) {
    console.error("Error fetching subscription:", formatStripeError(e));
    return { error: e };
  }
};
