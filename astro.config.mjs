import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import cloudflare from "@astrojs/cloudflare";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), mdx()],
  output: 'server',
  adapter: cloudflare({
    mode: 'directory'
  }),
  vite: {
    define: {
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.anon_key': JSON.stringify(process.env.anon_key),
      'process.env.PUBLIC_STRIPE_API': JSON.stringify(process.env.PUBLIC_STRIPE_API),
      'process.env.PRIVATE_STRIPE_API': JSON.stringify(process.env.PRIVATE_STRIPE_API),
      'process.env.PRIVATE_STRIPE_ENDPOINT': JSON.stringify(process.env.PRIVATE_STRIPE_ENDPOINT)
    }
  }
});