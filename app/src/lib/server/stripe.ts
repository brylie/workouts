/**
 * Stripe Service
 *
 * This module centralizes all Stripe API initialization and provides
 * a configured instance for use across the application.
 */
import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "$lib/server/env";

// Stripe API version to use
const STRIPE_API_VERSION = "2025-04-30.basil";

/**
 * Check for missing Stripe configuration and log warnings
 */
const validateStripeConfig = (): boolean => {
  if (!STRIPE_SECRET_KEY) {
    console.error(
      "STRIPE_SECRET_KEY is not defined. Please check your environment variables.",
    );
    return false;
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn(
      "STRIPE_WEBHOOK_SECRET is not defined. Webhook verification will fail.",
    );
  }

  return true;
};

// Validate the Stripe configuration when this module is loaded
validateStripeConfig();

/**
 * Create and export the Stripe instance
 * Use a fallback dummy key for initialization to prevent immediate crashes,
 * but operations will be guarded at runtime
 */
export const stripe = new Stripe(
  STRIPE_SECRET_KEY || "dummy_key_for_initialization",
  {
    apiVersion: STRIPE_API_VERSION,
  },
);

/**
 * Helper function to verify if Stripe is properly configured
 * Use this before making Stripe API calls
 */
export const isStripeConfigured = (): boolean => {
  return !!STRIPE_SECRET_KEY;
};

/**
 * Helper function to verify a Stripe webhook signature
 * @param body The raw request body as a string
 * @param signature The Stripe signature header
 * @returns The parsed Stripe event if valid
 * @throws Error if the signature is invalid or STRIPE_WEBHOOK_SECRET is not configured
 */
export const verifyStripeWebhook = (
  body: string,
  signature: string,
): Stripe.Event => {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error(
      "STRIPE_WEBHOOK_SECRET is not configured. Cannot verify webhook.",
    );
  }

  return stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
};

/**
 * Types for Stripe operations
 */
export type StripeSubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid";
