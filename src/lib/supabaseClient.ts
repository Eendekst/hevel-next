
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time crashes if env vars are missing
export const getSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase Env Vars missing. Check Vercel Settings.");
    }

    return createClient(supabaseUrl, supabaseKey);
};
