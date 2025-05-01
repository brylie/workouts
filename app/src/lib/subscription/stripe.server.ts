import { PRIVATE_STRIPE_SECRET_KEY } from "$env/static/private";
import Stripe from "stripe";

/**
 * Centralized Stripe service that manages the Stripe API client
 * This ensures we initialize Stripe only once with consistent configuration
 */
export const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

/**
 * Helper function to format Stripe webhook errors
 * @param error - The error from Stripe webhook verification
 */
export function formatWebhookError(error: Error): string {
  return `Webhook Error: ${error.message}`;
}

/**
 * Helper function to format Stripe API errors
 * @param error - The error from Stripe API calls
 */
export function formatStripeError(error: unknown): string {
  if (error instanceof Error) {
    return `Stripe API Error: ${error.message}`;
  }
  return `Unknown Stripe Error: ${String(error)}`;
}
