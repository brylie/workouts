import { PUBLIC_SITE_URL } from "$env/static/public";
import { error, json } from "@sveltejs/kit";
import { stripe, formatStripeError } from "$lib/subscription/stripe.server";
import { getOrCreateCustomerId } from "$lib/subscription/subscription_helpers.server";

export async function POST({ locals: { supabase, supabaseServiceRole } }) {
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    error(401, { message: "Unauthorized" });
  }

  try {
    // Get customer ID for the current user
    const { error: idError, customerId } = await getOrCreateCustomerId({
      supabaseServiceRole,
      user: session.user,
    });

    if (idError || !customerId) {
      console.error("Error retrieving customer id", idError);
      error(500, {
        message: "There was a problem retrieving your customer record",
      });
    }

    // Create a Stripe billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${PUBLIC_SITE_URL}/account/billing`,
    });

    return json({ url: portalSession.url });
  } catch (e) {
    console.error("Error creating portal session:", formatStripeError(e));
    error(500, {
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
