import {createClient} from "@supabase/supabase-js";

const supabaseURL = import.meta.env.API_URL
const supabaseAnonKey = import.meta.env.anon_key

console.log(supabaseAnonKey)

const supabase = createClient(supabaseURL, supabaseAnonKey)

export default supabase
