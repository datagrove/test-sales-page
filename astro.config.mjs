import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import solidJs from "@astrojs/solid-js";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), image(), solidJs()],
  output: 'server',
  adapter: cloudflare()
});