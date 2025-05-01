/**
 * Supabase Admin Client
 *
 * This module centralizes the Supabase admin client setup, using the service role key
 * for administrative operations that require elevated permissions.
 */
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "$lib/server/env";
import type { Database } from "$lib/database/supabase-types";

/**
 * Check if Supabase admin credentials are properly configured
 */
const validateSupabaseAdmin = (): boolean => {
  if (!SUPABASE_URL) {
    console.error(
      "SUPABASE_URL is not defined. Please check your environment variables.",
    );
    return false;
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      "SUPABASE_SERVICE_ROLE_KEY is not defined. Please check your environment variables.",
    );
    return false;
  }

  return true;
};

// Validate on module initialization
const isConfigValid = validateSupabaseAdmin();

/**
 * Centralized admin client with service role for backend operations
 * We use a safe initialization approach to prevent errors during import
 */
export const supabaseAdmin = isConfigValid
  ? createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

/**
 * Helper function to check if the admin client is properly configured
 * Use this before performing operations with supabaseAdmin
 */
export const isSupabaseAdminConfigured = (): boolean => {
  return !!supabaseAdmin;
};

/**
 * Get the properly initialized admin client or throw a descriptive error
 */
export function getSupabaseAdmin(): ReturnType<typeof createClient<Database>> {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase admin client is not configured. Check your environment variables.",
    );
  }
  return supabaseAdmin;
}
