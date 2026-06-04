export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

/** Public Supabase URL + anon key; null when env is missing (local dev without .env.local). */
export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !anonKey) return null;
  return { url, anonKey };
}
