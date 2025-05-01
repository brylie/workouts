/**
 * Server environment variables
 * These are only accessible on the server side for security
 */

import { env } from "$env/dynamic/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

// The server-side environment variables
// Using platform's env system for private variables first, then import.meta.env as fallback
export const STRIPE_SECRET_KEY =
  env.STRIPE_SECRET_KEY ||
  import.meta.env.STRIPE_SECRET_KEY ||
  import.meta.env.VITE_STRIPE_SECRET_KEY ||
  "";
export const STRIPE_WEBHOOK_SECRET =
  env.STRIPE_WEBHOOK_SECRET ||
  import.meta.env.STRIPE_WEBHOOK_SECRET ||
  import.meta.env.VITE_STRIPE_WEBHOOK_SECRET ||
  "";
export const SUPABASE_SERVICE_ROLE_KEY =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  "";
export const SUPABASE_URL = PUBLIC_SUPABASE_URL;

// Function to check if all required environment variables are set
export function validateEnv() {
  const requiredVars = [
    { name: "STRIPE_SECRET_KEY", value: STRIPE_SECRET_KEY },
    { name: "STRIPE_WEBHOOK_SECRET", value: STRIPE_WEBHOOK_SECRET },
    { name: "SUPABASE_SERVICE_ROLE_KEY", value: SUPABASE_SERVICE_ROLE_KEY },
    { name: "SUPABASE_URL", value: SUPABASE_URL },
  ];

  const missingVars = requiredVars.filter((v) => !v.value).map((v) => v.name);

  if (missingVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
    return false;
  }

  return true;
}
