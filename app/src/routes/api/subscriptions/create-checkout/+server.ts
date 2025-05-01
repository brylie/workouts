import { json } from "@sveltejs/kit";
import { stripe, isStripeConfigured } from "$lib/server/stripe";
import { isSupabaseAdminConfigured } from "$lib/server/supabase-admin";
import { fetchSubscription } from "$lib/server/subscription";
import type { RequestHandler } from "./$types";
import { createSupabaseServerClient } from "$lib/supabase";

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

    // Authentication check - multiple methods for robustness
    let session = locals.session;

    // 1. Try Authorization header if no session in locals
    if (!session) {
      const authHeader = request.headers.get("Authorization");

      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);

        // Create a Supabase client with the provided token
        const supabaseServer = createSupabaseServerClient({
          request,
          cookies: locals.cookies,
        });

        const { data, error } = await supabaseServer.auth.getUser(token);

        if (!error && data?.user) {
          // Use getSession to get the full session
          const { data: sessionData } = await supabaseServer.auth.getSession();
          session = sessionData.session;
        }
      }
    }

    // 2. Try getSupabaseServer if available
    if (!session && locals.getSupabaseServer) {
      const supabaseServer = locals.getSupabaseServer();
      const { data: sessionData } = await supabaseServer.auth.getSession();
      session = sessionData.session;
    }

    // If still no session, return unauthorized
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, customerId } = await request.json();

    if (!priceId) {
      return json({ error: "Price ID is required" }, { status: 400 });
    }

    if (!customerId) {
      return json({ error: "Customer ID is required" }, { status: 400 });
    }

    // Check if user already has an active subscription
    const { primarySubscription, error: subscriptionError } =
      await fetchSubscription({
        customerId,
      });

    if (subscriptionError) {
      console.error("Error fetching subscription:", subscriptionError);
    }

    if (primarySubscription) {
      return json(
        { error: "You already have an active subscription" },
        { status: 400 },
      );
    }

    // Create Stripe checkout session
    let checkoutSession;
    try {
      const successUrl = new URL(
        "/subscription/success",
        url.origin,
      ).toString();
      const cancelUrl = new URL(
        "/subscription/cancelled",
        url.origin,
      ).toString();

      checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          user_id: session.user.id,
        },
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    return json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error in create-checkout:", error);
    return json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
};
