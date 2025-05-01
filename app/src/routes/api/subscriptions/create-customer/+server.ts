import { json } from "@sveltejs/kit";
import { stripe, isStripeConfigured } from "$lib/server/stripe";
import {
  getSupabaseAdmin,
  isSupabaseAdminConfigured,
} from "$lib/server/supabase-admin";
import type { RequestHandler } from "./$types";

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

    // Ensure user is authenticated
    const session = await locals.getSession();
    if (!session) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_id } = await request.json();

    // Ensure the authenticated user is only creating a customer for themselves
    if (session.user.id !== user_id) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data to create customer
    const { data: userData, error: userError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (userError) {
      console.error("Error fetching user profile:", userError);
      return json({ error: "Failed to fetch user profile" }, { status: 500 });
    }

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: userData.full_name || session.user.email,
      metadata: {
        user_id,
      },
    });

    // Save the customer ID in our database
    const { error: insertError } = await supabaseAdmin
      .from("stripe_customers")
      .insert({
        user_id,
        stripe_customer_id: customer.id,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error saving customer ID:", insertError);
      return json({ error: "Failed to save customer ID" }, { status: 500 });
    }

    return json({ customerId: customer.id });
  } catch (error) {
    console.error("Error creating customer:", error);
    return json({ error: "Failed to create customer" }, { status: 500 });
  }
};
