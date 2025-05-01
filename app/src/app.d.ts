// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/database/supabase-types";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session: {
        user: {
          id: string;
          email: string;
        };
      } | null;
      getSupabaseServer: () => SupabaseClient<Database>;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
