/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_SUPABASE_URL: string;
    // more env variables...
  }
