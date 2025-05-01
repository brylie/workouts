/**
 * Server-side Supabase client functions
 * This file provides utilities for working with Supabase on the server side
 */
import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import type { Database } from "$lib/database/supabase-types";

/**
 * Create a Supabase client for server-side use that preserves the user's session
 * @param eventOrOptions A RequestEvent or an object with request and cookies properties
 */
export function createSupabaseServerClient(
  eventOrOptions: RequestEvent | { request: Request; cookies?: any },
) {
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing Supabase environment variables. Check your .env file configuration.",
    );
  }

  // Create a custom storage adapter that uses SvelteKit's cookies
  const cookieStorage = {
    getItem: (key: string) => {
      // Handle both standard RequestEvent and custom objects safely
      if (
        "cookies" in eventOrOptions &&
        eventOrOptions.cookies &&
        typeof eventOrOptions.cookies.get === "function"
      ) {
        return eventOrOptions.cookies.get(key) ?? null;
      }
      // Fallback to no session when cookies aren't available
      return null;
    },
    setItem: (key: string, value: string) => {
      // Only set cookies if the cookies object exists and has the set method
      if (
        "cookies" in eventOrOptions &&
        eventOrOptions.cookies &&
        typeof eventOrOptions.cookies.set === "function"
      ) {
        // Max age is 100 days in seconds (same as Supabase default)
        eventOrOptions.cookies.set(key, value, {
          path: "/",
          maxAge: 60 * 60 * 24 * 100,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
      }
    },
    removeItem: (key: string) => {
      // Only delete cookies if the cookies object exists and has the delete method
      if (
        "cookies" in eventOrOptions &&
        eventOrOptions.cookies &&
        typeof eventOrOptions.cookies.delete === "function"
      ) {
        eventOrOptions.cookies.delete(key, { path: "/" });
      }
    },
  };

  return createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,
      storage: cookieStorage,
    },
    global: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
}

/**
 * Create a Supabase admin client with service role permissions
 * CAUTION: This bypasses RLS policies - only use on the server!
 */
export function createSupabaseAdminClient() {
  if (!PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase admin environment variables. Check your .env file configuration.",
    );
  }

  return createClient<Database>(
    PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
