import { supabase, user } from "$lib/supabase/client";
import type { AuthError, Provider } from "@supabase/supabase-js";

/**
 * Register a new user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Object containing success status and error message if any
 */
export async function registerWithEmail(
  email: string,
  password: string,
): Promise<{ success: boolean; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    return { success: true, error: null };
  }

  return { success: false, error };
}

/**
 * Login with email and password
 * @param email User's email
 * @param password User's password
 * @returns Object containing success status and error message if any
 */
export async function loginWithEmail(
  email: string,
  password: string,
): Promise<{ success: boolean; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data.user) {
    return { success: true, error: null };
  }

  return { success: false, error };
}

/**
 * Login with an OAuth provider
 * @param provider OAuth provider (e.g., 'google', 'github')
 * @returns Object containing success status and error message if any
 */
export async function loginWithOAuth(
  provider: Provider,
): Promise<{ success: boolean; error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (!error) {
    return { success: true, error: null };
  }

  return { success: false, error };
}

/**
 * Send a password reset email
 * @param email User's email
 * @returns Object containing success status and error message if any
 */
export async function resetPassword(
  email: string,
): Promise<{ success: boolean; error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  return { success: !error, error };
}

/**
 * Logout the current user
 * @returns Object containing success status and error message if any
 */
export async function logout(): Promise<{
  success: boolean;
  error: AuthError | null;
}> {
  const { error } = await supabase.auth.signOut();

  return { success: !error, error };
}

/**
 * Get the current user's ID
 * @returns The user ID if authenticated, null otherwise
 */
export function getCurrentUserId(): string | null {
  let userId: string | null = null;
  user.subscribe((u) => {
    userId = u?.id || null;
  })();

  return userId;
}
