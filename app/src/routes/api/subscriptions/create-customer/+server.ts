import { json } from "@sveltejs/kit";
import { isStripeConfigured } from "$lib/server/stripe";
import {
  getSupabaseAdmin,
  isSupabaseAdminConfigured,
} from "$lib/server/supabase-admin";
import { getOrCreateCustomerId } from "$lib/server/subscription";
import type { RequestHandler } from "./$types";
import { createSupabaseServerClient } from "$lib/supabase";

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    // Ensure services are properly configured
    if (!isStripeConfigured()) {
      return json(
        { error: "Stripe API key is not configured" },
        { status: 500 },
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return json(
        { error: "Supabase admin client is not configured" },
        { status: 500 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Authentication check - multiple methods for robustness
    let session = locals.session;

    // 1. Try Authorization header if no session in locals
    if (!session) {
      const authHeader = request.headers.get("Authorization");

      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);

        // Create a Supabase client with the provided token
        const supabaseServer = createSupabaseServerClient({
          request,
          cookies: locals.cookies,
        });

        const { data, error } = await supabaseServer.auth.getUser(token);

        if (!error && data?.user) {
          // Use getSession to get the full session
          const { data: sessionData } = await supabaseServer.auth.getSession();
          session = sessionData.session;
        }
      }
    }

    // 2. Try getSupabaseServer if available
    if (!session && locals.getSupabaseServer) {
      const supabaseServer = locals.getSupabaseServer();
      const { data: sessionData } = await supabaseServer.auth.getSession();
      session = sessionData.session;
    }

    // If still no session, return unauthorized
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_id } = await request.json();

    // Ensure the authenticated user is only creating a customer for themselves
    if (session.user.id !== user_id) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use the server helper to get or create customer ID
    const { customerId, error: customerError } = await getOrCreateCustomerId({
      supabaseAdmin,
      user: session.user,
    });

    if (customerError || !customerId) {
      console.error("Error creating customer:", customerError);
      return json({ error: "Failed to create customer" }, { status: 500 });
    }

    return json({ customerId });
  } catch (error) {
    console.error("Error creating customer:", error);
    return json({ error: "Failed to create customer" }, { status: 500 });
  }
};
