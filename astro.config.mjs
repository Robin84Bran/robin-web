import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sites } from '@openai/sites-vite-plugin';

const isSitesBuild = process.env.SITES_BUILD === '1';

export default defineConfig({
  site: 'https://iamrobin.ai',
  output: 'static',
  integrations: [
    sitemap({
      customPages: ['https://iamrobin.ai/intelligence/supply-chain-map/'],
      filter: (page) => {
        const path = new URL(page).pathname;
        return [
          '/', '/about/', '/network/',
          '/zh-hans/', '/zh-hans/about/', '/zh-hans/network/',
          '/zh-hant/', '/zh-hant/about/', '/zh-hant/network/',
          '/ja/', '/ja/about/', '/ja/network/',
          '/intelligence/aidc101/', '/portfolio/', '/books/', '/meaning/', '/ouroboros/', '/ouroboros/execution-ledger/', '/binary/',
        ].includes(path)
          || /^\/intelligence\/(?:hardware\/(?:deliverable-megawatts\/)?|supply-chain\/|supply-chain-map\/|swarm\/)?$/.test(path)
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
