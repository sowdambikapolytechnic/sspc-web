import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Browser-safe client (anon key, respects RLS) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only admin client (service-role key, bypasses RLS).
 * NEVER import this in client components or expose it to the browser.
 */
export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "media";
