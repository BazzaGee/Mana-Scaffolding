import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/postcss';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare-binding',
    sessionKVBindingName: 'SESSION',
  }),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'),
    }),
  ],
  site: 'https://mana-scaffolding.manascaffolding.workers.dev',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
});