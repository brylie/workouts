import { json } from "@sveltejs/kit";
import { stripe, isStripeConfigured } from "$lib/server/stripe";
import {
  getSupabaseAdmin,
  isSupabaseAdminConfigured,
} from "$lib/server/supabase-admin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, url, locals }) => {
  try {
    // Ensure services are properly configured
    if (!isStripeConfigured()) {
      return json(
        { error: "Stripe API key is not configured" },
        { status: 500 },
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return json(
        { error: "Supabase admin client is not configured" },
        { status: 500 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Ensure user is authenticated
    // In SvelteKit 5, we access the session directly from locals
    const session = locals.session;
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return json({ error: "Price ID is required" }, { status: 400 });
    }

    const user_id = session.user.id;

    // Get the customer ID for this user
    const { data: customerData, error: customerError } = await supabaseAdmin
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user_id)
      .single();

    if (customerError) {
      console.error("Error fetching customer:", customerError);
      return json({ error: "Customer not found" }, { status: 404 });
    }

    const customerId = customerData.stripe_customer_id;

    // Check if user already has an active subscription
    const { data: subscriptionData } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", user_id)
      .in("status", ["active", "trialing"])
      .maybeSingle();

    if (subscriptionData) {
      return json(
        { error: "User already has an active subscription" },
        { status: 400 },
      );
    }

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${url.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/subscription/cancelled`,
      subscription_data: {
        metadata: {
          user_id,
        },
      },
    });

    return json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
};
