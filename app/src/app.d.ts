// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { SupabaseClient, Session, type AMREntry } from "@supabase/supabase-js";
import type { Database } from "$lib/database/DatabaseDefinitions";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      supabaseServiceRole: SupabaseClient<Database>;
      getSession: () => Promise<{
        session: Session | null;
      }>;
    }

    interface PageData {
      session: Session | null;
    }
    // interface Error {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
