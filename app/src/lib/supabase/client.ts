import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import type { User } from "@supabase/supabase-js";
import { isBrowser } from "@supabase/ssr";
import { env } from "$env/dynamic/public";

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a store for the authenticated user
export const user = writable<User | null>(null);

// Initialize user store on client-side only
if (isBrowser()) {
  // Set initial user value on page load
  supabase.auth.getSession().then(({ data: { session } }) => {
    user.set(session?.user || null);
  });

  // Update user store when auth state changes
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user || null);
  });
}

/**
 * Check if a user is currently authenticated
 * @returns Whether a user is authenticated
 */
export function isAuthenticated(): boolean {
  let isAuth = false;
  user.subscribe((u) => {
    isAuth = !!u;
  })();
  return isAuth;
}
