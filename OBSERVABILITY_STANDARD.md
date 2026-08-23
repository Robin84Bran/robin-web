# iamrobin.ai observability standard

Updated: 2026-08-23 HKT

## Purpose

Observe whether public ideas are being found and read without constructing a
visitor identity graph. The production system uses only Cloudflare-native Free
plan surfaces and keeps the publishing path static-first.

## Allowed signals

1. Cloudflare Web Analytics: top page paths, referrer hosts, and device class.
2. Cloudflare AI Crawl Control: crawler/operator totals, most-crawled paths,
   response status, robots.txt health, and robots violations.
3. Worker exceptions needed to diagnose a broken public release.

These signals are reviewed as monthly aggregates. Query strings, cookies,
visitor IDs, exact IP addresses, full user-agent strings for human traffic,
session replay, custom events, advertising pixels, and cross-site profiles are
outside the observability contract.

## Production mechanism

- `public/_worker.js` adds the existing Cloudflare Web Analytics beacon to every
  HTML response, including static HTML that does not use the Astro layout.
- The Content Security Policy allows only Cloudflare's beacon host and its RUM
  collection endpoint in addition to same-origin resources.
- `wrangler.jsonc` leaves Worker error logging available while disabling
  request-by-request invocation logs.
- AI Crawl Control remains the crawler source of truth. No second crawler log,
  database, cookie, or fingerprinting layer is created.

## Monthly visibility snapshot

The monthly publishing review accepts an optional normalized Cloudflare
snapshot before or after its existing three Telegram responses:

```text
node bin/monthly-review.mjs visibility-ingest --month YYYY-MM --snapshot cloudflare-visibility.json
```

The snapshot contains only the six allowed aggregate views: top pages,
referrers, device mix, AI crawlers, crawled paths, and robots violations.
Missing dashboard evidence remains `NA`. Ingestion is hash-idempotent and every
changed snapshot creates append-only versioned evidence. A completed publishing
review receives a new version rather than overwriting its earlier scorecard.

## Verification

`pnpm run release:check` verifies the beacon, CSP endpoints, disabled invocation
logs, absence of visitor-identifier collection code, the production build, SEO,
robots.txt, sitemap, and structured data. Public release verification must also
confirm:

- HTML contains exactly one `cf-web-analytics` beacon.
- CSP permits the beacon script and collection endpoint.
- `/robots.txt` returns 200 with the declared content signals.
- Cloudflare AI Crawl Control exposes crawler and path metrics plus robots
  health/violations.
- Web Analytics begins receiving prospective visits; historical data is not
  backfilled.
