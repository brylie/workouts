import { PRIVATE_STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import { stripe, formatWebhookError } from "$lib/subscription/stripe.server";

/**
 * Webhook handler for Stripe events
 * Used to keep subscription data in sync with Stripe
 */
export async function POST({
  request,
  locals: { supabase, supabaseServiceRole },
}) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    error(400, { message: "Missing stripe-signature header" });
    return;
  }

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      PRIVATE_STRIPE_WEBHOOK_SECRET ?? "", // In development, you may want to skip verification
    );
  } catch (err) {
    console.error(
      `Webhook signature verification failed:`,
      formatWebhookError(err),
    );
    error(400, { message: formatWebhookError(err) });
    return;
  }

  // Handle specific event types
  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionChange(event.data.object, supabaseServiceRole);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeletion(
          event.data.object,
          supabaseServiceRole,
        );
        break;

      case "invoice.paid":
        await handleSuccessfulPayment(event.data.object, supabaseServiceRole);
        break;

      case "invoice.payment_failed":
        await handleFailedPayment(event.data.object, supabaseServiceRole);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return json({ received: true });
  } catch (err) {
    console.error(`Error processing webhook:`, err);
    error(500, { message: `Error processing webhook: ${err.message}` });
  }
}

/**
 * Handle subscription creation or update
 */
async function handleSubscriptionChange(subscription, supabaseClient) {
  // Get customer data
  const stripeCustomerId = subscription.customer;

  // Find user_id from stripe_customers table
  const { data: customerData, error: customerError } = await supabaseClient
    .from("stripe_customers")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .single();

  if (customerError || !customerData) {
    console.error("Customer not found in database:", customerError);
    return;
  }

  const userId = customerData.user_id;

  // Check if subscription exists
  const { data: existingSub, error: subQueryError } = await supabaseClient
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", subscription.id)
    .single();

  if (subQueryError && subQueryError.code !== "PGRST116") {
    console.error("Error querying subscription:", subQueryError);
  }

  // Get price and product details
  const priceId = subscription.items.data[0]?.price.id;
  const productId = subscription.items.data[0]?.price.product;

  // Update or insert subscription
  const subscriptionData = {
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    stripe_product_id: productId,
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

  if (existingSub?.id) {
    // Update existing subscription
    const { error: updateError } = await supabaseClient
      .from("subscriptions")
      .update(subscriptionData)
      .eq("id", existingSub.id);

    if (updateError) {
      console.error("Error updating subscription:", updateError);
    }
  } else {
    // Insert new subscription
    const { error: insertError } = await supabaseClient
      .from("subscriptions")
      .insert(subscriptionData);

    if (insertError) {
      console.error("Error inserting subscription:", insertError);
    }
  }
}

/**
 * Handle subscription deletion
 */
async function handleSubscriptionDeletion(subscription, supabaseClient) {
  // Update subscription status to canceled
  const { error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Error updating subscription to canceled:", error);
  }
}

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment(invoice, supabaseClient) {
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return;

  // Update subscription status to active
  const { error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId);

  if (error) {
    console.error("Error updating subscription after payment:", error);
  }
}

/**
 * Handle failed payment
 */
async function handleFailedPayment(invoice, supabaseClient) {
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return;

  // Update subscription status to past_due
  const { error } = await supabaseClient
    .from("subscriptions")
    .update({
      status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId);

  if (error) {
    console.error("Error updating subscription after failed payment:", error);
  }
}
