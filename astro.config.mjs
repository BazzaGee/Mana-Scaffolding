import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'),
    }),
  ],
  site: 'https://mana-scaffolding.pages.dev',
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
  }
});