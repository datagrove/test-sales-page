import {createClient} from "@supabase/supabase-js";

const supabaseURL = import.meta.env.PUBLIC_VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseURL, supabaseAnonKey)
