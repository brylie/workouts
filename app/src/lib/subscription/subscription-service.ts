/**
 * Subscription service for managing Stripe subscriptions
 */
import { supabase } from "$lib/supabase/client";
import { getCurrentUserId } from "$lib/supabase/auth";
import type { Database } from "$lib/database/supabase-types";
import type Stripe from "stripe";
import { writable, derived } from "svelte/store";
import { pricingPlans } from "./pricing-plans";

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
export const isLoading = writable<boolean>(false);
export const subscriptionError = writable<string | null>(null);

// Derived store that tells if the user has an active subscription
export const hasActiveSubscription = derived(subscription, ($subscription) => {
  if (!$subscription) return false;
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

  isLoading.set(true);
  subscriptionError.set(null);

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
      subscriptionError.set("Failed to load subscription data");
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
    subscriptionError.set("Failed to load subscription data");
  } finally {
    isLoading.set(false);
  }
}

/**
 * Get or create a Stripe customer ID for the current user
 * @param user_id - The Supabase user ID
 * @returns The Stripe customer ID or null with an error
 */
export async function getOrCreateCustomerId(
  user_id: string,
): Promise<{ customerId?: string; error?: string }> {
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
      return { error: "Failed to check for existing customer" };
    }

    if (existingCustomer?.stripe_customer_id) {
      return { customerId: existingCustomer.stripe_customer_id };
    }

    // Get authentication token for the request
    const { data: sessionData } = await supabase.auth.getSession();
    const authToken = sessionData?.session?.access_token;

    if (!authToken) {
      return { error: "Not authenticated" };
    }

    // If no customer exists, create one via the server API
    const response = await fetch("/api/subscriptions/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ user_id }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return { error: errorData.error || response.statusText };
    }

    const { customerId } = await response.json();
    return { customerId };
  } catch (err) {
    console.error("Error in getOrCreateCustomerId:", err);
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Create a checkout session for a subscription plan
 * @param priceId - The Stripe price ID
 * @returns The checkout URL or an error
 */
export async function createCheckoutSession(
  priceId: string,
): Promise<{ url?: string; error?: string }> {
  try {
    const user_id = getCurrentUserId();
    if (!user_id) {
      return { error: "User not authenticated" };
    }

    // Get customer ID first
    const { customerId, error: customerError } =
      await getOrCreateCustomerId(user_id);

    if (customerError || !customerId) {
      return { error: customerError || "Could not create customer" };
    }

    // Get authentication token
    const { data: sessionData } = await supabase.auth.getSession();
    const authToken = sessionData?.session?.access_token;

    if (!authToken) {
      return { error: "Not authenticated" };
    }

    // Create checkout session
    const response = await fetch("/api/subscriptions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        priceId,
        customerId,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return { error: errorData.error || response.statusText };
    }

    const { url } = await response.json();
    return { url };
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return { error: err instanceof Error ? err.message : "Unknown error" };
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

/**
 * Get complete information about the current user's subscription
 * @returns Detailed subscription information or null
 */
export async function getSubscriptionDetails(): Promise<{
  subscription?: UserSubscription;
  plan?: (typeof pricingPlans)[number];
  endDate?: Date;
  isActive: boolean;
  error?: string;
}> {
  const userId = getCurrentUserId();

  if (!userId) {
    return { isActive: false, error: "User not authenticated" };
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
      return { isActive: false, error: "Failed to fetch subscription details" };
    }

    if (!data) {
      return { isActive: false };
    }

    const userSub: UserSubscription = {
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
    };

    const isActive = ["active", "trialing"].includes(userSub.status);

    const plan = pricingPlans.find(
      (p) => p.stripe_price_id === userSub.priceId,
    );

    return {
      subscription: userSub,
      plan,
      endDate: userSub.currentPeriodEnd,
      isActive,
    };
  } catch (err) {
    console.error("Error getting subscription details:", err);
    return {
      isActive: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
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
