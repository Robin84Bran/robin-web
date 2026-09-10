import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sites } from '@openai/sites-vite-plugin';

const isSitesBuild = process.env.SITES_BUILD === '1';

export default defineConfig({
  site: 'https://iamrobin.ai',
  output: 'static',
  integrations: [
    sitemap({
      customPages: ["https://iamrobin.ai/intelligence/supply-chain-map/", "https://iamrobin.ai/meaning/Bran_lab/", "https://iamrobin.ai/meaning/Bran_lab/SuperRun/", "https://iamrobin.ai/meaning/Bran_lab/GeoDash/", "https://iamrobin.ai/meaning/Bran_lab/PacMan/", "https://iamrobin.ai/meaning/Bran_lab/BlockLab/", "https://iamrobin.ai/meaning/Bran_lab/WonderTrail/", "https://iamrobin.ai/meaning/Bran_lab/KartLab/", "https://iamrobin.ai/meaning/Bran_lab/CloudMunch/", "https://iamrobin.ai/meaning/Bran_lab/BounceTrials/", "https://iamrobin.ai/meaning/Bran_lab/StarboundMath/"],
      filter: (page) => {
        const path = new URL(page).pathname;
        return [
          '/', '/about/', '/network/', '/resonance/btc_probability_atlas/', '/resonance/eval/ai_berkshire/',
          '/zh-hans/', '/zh-hans/about/', '/zh-hans/network/',
          '/zh-hant/', '/zh-hant/about/', '/zh-hant/network/',
          '/ja/', '/ja/about/', '/ja/network/',
          '/intelligence/attention_all_you_need/', '/intelligence/aidc101/', '/intelligence/aidc101/101-1/', '/portfolio/', '/books/', '/meaning/', '/ouroboros/', '/ouroboros/execution-ledger/', '/binary/',
        ].includes(path)
          || /^\/meaning\/Bran_lab\/(?:SuperRun|GeoDash|PacMan|BlockLab|WonderTrail|KartLab|CloudMunch|BounceTrials|StarboundMath)?\/?$/.test(path)
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
