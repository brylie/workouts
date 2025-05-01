import { PUBLIC_SITE_URL } from "$env/static/public";
import { error, redirect } from "@sveltejs/kit";
import { stripe } from "$lib/subscription/stripe.server";
import {
  getOrCreateCustomerId,
  fetchSubscription,
} from "$lib/subscription/subscription_helpers.server";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase, supabaseServiceRole, getSession },
}) => {
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(303, "/login?redirect=/account/select-plan");
  }

  // If free plan is selected, just redirect to account page
  if (params.slug === "free") {
    redirect(303, "/account");
  }

  try {
    // Get or create a customer ID for the current user
    const { error: idError, customerId } = await getOrCreateCustomerId({
      supabaseServiceRole,
      user: session.user,
    });

    if (idError || !customerId) {
      console.error("Error creating customer id", idError);
      error(500, {
        message:
          "There was a problem creating your customer record. Please try again later.",
      });
    }

    // Check if user already has an active subscription
    const { primarySubscription, error: subError } = await fetchSubscription({
      customerId,
    });

    if (subError) {
      console.error("Error fetching subscription", subError);
      error(500, {
        message:
          "There was a problem checking your subscription status. Please try again later.",
      });
    }

    if (primarySubscription) {
      // User already has an active subscription, redirect to billing page
      redirect(303, "/account/billing");
    }

    // Create a Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: params.slug,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: customerId,
      success_url: `${PUBLIC_SITE_URL}/account/subscription-success`,
      cancel_url: `${PUBLIC_SITE_URL}/account/select-plan`,
    });

    if (!checkoutSession.url) {
      error(500, {
        message: "Failed to create checkout session. Please try again later.",
      });
    }

    // Redirect to Stripe Checkout
    redirect(303, checkoutSession.url);
  } catch (e) {
    console.error("Error in subscribe route:", e);
    error(500, {
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
