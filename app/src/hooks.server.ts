// src/hooks.server.ts
import { createSupabaseServerClient } from "$lib/supabase";
import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";

async function getSession(event: RequestEvent) {
  const supabaseServer = createSupabaseServerClient(event);
  const {
    data: { session },
    error,
  } = await supabaseServer.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
    return null;
  }
  return session;
}

export const handle: Handle = async ({ event, resolve }) => {
  // Set the session in locals for server routes to access
  event.locals.session = await getSession(event);

  // Make Supabase available to server-side load functions
  event.locals.getSupabaseServer = () => createSupabaseServerClient(event);

  // Continue resolving the request
  const response = await resolve(event);

  return response;
};
