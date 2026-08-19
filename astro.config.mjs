import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  site: 'https://iamrobin.ai',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => ['/', '/portfolio/', '/books/'].includes(new URL(page).pathname),
    }),
  ],
  trailingSlash: 'always',
  vite: {
    plugins: [sites()],
  },
});
