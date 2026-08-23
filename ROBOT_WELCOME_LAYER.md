# Robot Welcome Layer

iamrobin.ai welcomes public search indexing, AI retrieval, and model training. The intended machine-use signal is:

`search=yes, ai-input=yes, ai-train=yes, use=reference`

## Source of truth

- `src/data/robot-welcome.json` owns Robin's canonical machine-readable identity, public profiles, and highest-value routes.
- `scripts/generate-robot-welcome.mjs` renders that source deterministically to `public/llms.txt`.
- `public/robots.txt` contains the human welcome comment, permissive wildcard policy, Content-Signal, and sitemap declaration.
- `src/components/SeoHead.astro` exposes `/llms.txt` through `rel="describedby"` on every HTML page.
- `public/_worker.js` exposes the same Content-Signal and discovery link as response headers for public text responses.

Run `pnpm run robots:sync` after changing the source manifest. Normal development and production builds run it automatically. `pnpm run release:check` fails when the generated file, crawler policy, discovery link, schema, sitemap, or internal routes diverge.

## Cloudflare boundary

For the `iamrobin.ai` zone:

- **Block AI training bots:** `Do not block (allow crawlers)`
- **Manage your robots.txt:** `Disable robots.txt configuration`
- **AI Crawl Control → Security:** all crawler block switches remain off
- **Markdown for Agents:** unavailable on the current Free plan; do not upgrade automatically

Cloudflare's managed robots setting must remain disabled. Enabling its training block injects crawler-specific `Disallow: /` rules and an `ai-train=no` Content-Signal that override this public welcome layer.

## Release proof

After deployment, verify both ordinary and crawler user agents receive HTTPS 200, `robots.txt` contains no Cloudflare-managed section or negative signal, `/llms.txt` is public, every HTML document exposes `rel="describedby"`, sitemap and JSON-LD remain present, and public text responses carry the permissive Content-Signal header.

When a future Cloudflare plan supports Markdown for Agents, enable it only after `Accept: text/markdown` returns `Content-Type: text/markdown` while preserving canonical links, Content-Signal, and the ordinary HTML response.
