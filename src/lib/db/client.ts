import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for client-side browser components.
 * Uses the public anon key. Enforces Row Level Security automatically.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
