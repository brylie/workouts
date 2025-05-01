import { json } from "@sveltejs/kit";
import {
  stripe,
  isStripeConfigured,
  verifyStripeWebhook,
} from "$lib/server/stripe";
import {
  getSupabaseAdmin,
  isSupabaseAdminConfigured,
} from "$lib/server/supabase-admin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  // Ensure services are properly configured
  if (!isStripeConfigured()) {
    return json({ error: "Stripe API key is not configured" }, { status: 500 });
  }

  if (!isSupabaseAdminConfigured()) {
    return json(
      { error: "Supabase admin client is not configured" },
      { status: 500 },
    );
  }

  try {
    // Verify the webhook signature using our helper function
    const event = verifyStripeWebhook(body, signature);
    const supabaseAdmin = getSupabaseAdmin();

    // Handle specific events
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object, supabaseAdmin);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object, supabaseAdmin);
        break;

      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;
    }

    return json({ received: true });
  } catch (err) {
    console.error(
      `Webhook Error: ${err instanceof Error ? err.message : String(err)}`,
    );
    return json(
      {
        error: `Webhook Error: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 400 },
    );
  }
};

/**
 * Handle subscription updates (created or updated)
 */
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabaseAdmin: ReturnType<typeof getSupabaseAdmin>,
) {
  const userId = subscription.metadata.user_id;
  if (!userId) {
    // Try to get user_id from customer metadata
    const customer = await stripe.customers.retrieve(
      subscription.customer as string,
    );
    if (!customer.deleted && customer.metadata.user_id) {
      await updateSubscription(
        customer.metadata.user_id,
        subscription,
        supabaseAdmin,
      );
    } else {
      console.error(
        "Could not find user_id for subscription:",
        subscription.id,
      );
    }
  } else {
    await updateSubscription(userId, subscription, supabaseAdmin);
  }
}

/**
 * Handle subscription deletions
 */
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabaseAdmin: ReturnType<typeof getSupabaseAdmin>,
) {
  const userId = subscription.metadata.user_id;
  if (!userId) {
    // Try to get user_id from customer metadata
    const customer = await stripe.customers.retrieve(
      subscription.customer as string,
    );
    if (!customer.deleted && customer.metadata.user_id) {
      await updateSubscription(
        customer.metadata.user_id,
        subscription,
        supabaseAdmin,
      );
    } else {
      console.error(
        "Could not find user_id for deleted subscription:",
        subscription.id,
      );
    }
  } else {
    await updateSubscription(userId, subscription, supabaseAdmin);
  }
}

/**
 * Handle checkout session completion
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  // For one-time payments, you might create a purchase record here
  // For subscriptions, the subscription events will handle it
  if (session.mode === "subscription" && session.subscription) {
    // The subscription_id is available, but we'll let the subscription events handle the details
    console.log(`Checkout completed for subscription: ${session.subscription}`);
  }
}

/**
 * Update subscription in database
 */
async function updateSubscription(
  userId: string,
  subscription: Stripe.Subscription,
  supabaseAdmin: ReturnType<typeof getSupabaseAdmin>,
) {
  try {
    // Get the price and product details
    const priceId = subscription.items.data[0]?.price.id;
    const productId = subscription.items.data[0]?.price.product;

    // Prepare the subscription data
    const subscriptionData = {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: priceId,
      stripe_product_id: typeof productId === "string" ? productId : null,
      status: subscription.status,
      cancel_at_period_end: subscription.cancel_at_period_end,
      current_period_start: new Date(
        subscription.current_period_start * 1000,
      ).toISOString(),
      current_period_end: new Date(
        subscription.current_period_end * 1000,
      ).toISOString(),
      updated_at: new Date().toISOString(),
      ended_at: subscription.ended_at
        ? new Date(subscription.ended_at * 1000).toISOString()
        : null,
    };

    // Check if a subscription record already exists
    const { data: existingSubscription } = await supabaseAdmin
      .from("subscriptions")
      .select("id")
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();

    if (existingSubscription) {
      // Update existing subscription
      await supabaseAdmin
        .from("subscriptions")
        .update(subscriptionData)
        .eq("id", existingSubscription.id);
    } else {
      // Insert new subscription
      await supabaseAdmin.from("subscriptions").insert(subscriptionData);
    }
  } catch (error) {
    console.error("Error updating subscription in database:", error);
    throw error;
  }
}
