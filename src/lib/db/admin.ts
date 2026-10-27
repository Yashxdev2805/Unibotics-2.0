import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client using the service role key.
 * 
 * SECURITY INVARIANT:
 * - This file MUST ONLY be imported in server route handlers or server actions.
 * - Never expose SUPABASE_SERVICE_ROLE_KEY to the client bundle.
 * - Used exclusively for Turnstile-validated public submissions and audit logging.
 */
export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder-service-role-key";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
