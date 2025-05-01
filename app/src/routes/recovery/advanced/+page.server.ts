import { error, redirect } from "@sveltejs/kit";
import { checkSubscription } from "$lib/subscription/subscription_middleware";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, supabaseServiceRole, getSession },
}) => {
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(303, "/login?redirect=/recovery/advanced");
  }

  // Check subscription status
  const {
    isSubscribed,
    subscription,
    error: subError,
  } = await checkSubscription({
    supabaseServiceRole,
    user: session.user,
  });

  if (subError) {
    console.error("Error checking subscription:", subError);
  }

  // If user is not subscribed, redirect to pricing
  if (!isSubscribed) {
    redirect(303, "/pricing?feature=advanced-recovery");
  }

  // User has access to premium feature
  return {
    subscription,
  };
};
