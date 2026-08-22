import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sites } from '@openai/sites-vite-plugin';

const isSitesBuild = process.env.SITES_BUILD === '1';

export default defineConfig({
  site: 'https://iamrobin.ai',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return [
          '/',
          '/portfolio/',
          '/books/',
          '/meaning/',
          '/ouroboros/',
          '/intelligence/',
          '/intelligence/swarm/',
          '/intelligence/hardware/',
          '/intelligence/supply-chain/',
        ].includes(path)
          || /^\/meaning\/diary\/\d{6}\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/(?:zh-hans|zh-hant|ja)\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/action_item\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/action_item\/(?:zh-hans|zh-hant|ja)\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/actions\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/actions\/(?:zh-hans|zh-hant|ja)\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/blog\/$/.test(path)
          || /^\/ouroboros\/\d{6}\/\d{8}\/blog\/(?:zh-hans|zh-hant|ja)\/$/.test(path);
      },
    }),
  ],
  trailingSlash: 'always',
  vite: {
    plugins: isSitesBuild ? [sites()] : [],
  },
});
