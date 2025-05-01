/**
 * Subscription service for managing Stripe subscriptions
 */
import { supabase } from "$lib/supabase/client";
import { getCurrentUserId } from "$lib/supabase/auth";
import type { Database } from "$lib/database/supabase-types";
import type Stripe from "stripe";
import { writable, derived } from "svelte/store";

// Types for subscription data
export interface UserSubscription {
  id: string;
  status: string;
  priceId: string | null;
  productId: string | null;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
  createdAt: Date;
  stripeSubscriptionId: string | null;
}

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | "paused"
  | null;

// Store for subscription status
export const subscription = writable<UserSubscription | null>(null);

// Derived store that tells if the user has an active subscription
export const hasActiveSubscription = derived(subscription, ($subscription) => {
  if (!$subscription) return false;

  // Check if subscription is in an active state
  return ["active", "trialing"].includes($subscription.status);
});

/**
 * Initialize subscription data for a user
 */
export async function initSubscription(): Promise<void> {
  const userId = getCurrentUserId();

  if (!userId) {
    subscription.set(null);
    return;
  }

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching subscription:", error);
      subscription.set(null);
      return;
    }

    if (data) {
      subscription.set({
        id: data.id,
        status: data.status,
        priceId: data.stripe_price_id,
        productId: data.stripe_product_id,
        cancelAtPeriodEnd: data.cancel_at_period_end,
        currentPeriodEnd: data.current_period_end
          ? new Date(data.current_period_end)
          : null,
        createdAt: new Date(data.created_at),
        stripeSubscriptionId: data.stripe_subscription_id,
      });
    } else {
      subscription.set(null);
    }
  } catch (err) {
    console.error("Failed to initialize subscription:", err);
    subscription.set(null);
  }
}

/**
 * Get or create a Stripe customer ID for the current user
 * @param user_id - The Supabase user ID
 * @returns The Stripe customer ID
 */
export async function getOrCreateCustomerId(
  user_id: string,
): Promise<string | null> {
  try {
    // Check if the user already has a Stripe customer ID
    const { data: existingCustomer, error: fetchError } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = not found
      console.error("Error fetching customer:", fetchError);
      return null;
    }

    if (existingCustomer?.stripe_customer_id) {
      return existingCustomer.stripe_customer_id;
    }

    // If no customer exists, a new one needs to be created via the server
    // This would normally be done through a server API endpoint that uses the Stripe secret key
    // For security, we can't create customers directly from the client

    const response = await fetch("/api/subscriptions/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    const { customerId } = await response.json();
    return customerId;
  } catch (err) {
    console.error("Error in getOrCreateCustomerId:", err);
    return null;
  }
}

/**
 * Determine if the current user's subscription is active
 * @returns Promise that resolves to a boolean indicating if the subscription is active
 */
export async function isSubscriptionActive(): Promise<boolean> {
  const userId = getCurrentUserId();

  if (!userId) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return false;
    }

    return ["active", "trialing"].includes(data.status);
  } catch (err) {
    console.error("Error checking subscription status:", err);
    return false;
  }
}

// Subscribe to auth changes to keep subscription state in sync
import { user } from "$lib/supabase/client";

user.subscribe(($user) => {
  if ($user) {
    initSubscription();
  } else {
    subscription.set(null);
  }
});
