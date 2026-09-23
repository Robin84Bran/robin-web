# iamrobin.ai — Website v2 / Zen Loop

A static-first Astro website that turns the I AM ROBIN mnemonic into a quiet
identity cycle: nucleus, growth, sakura drift, and return.

The public site is deployed as the Cloudflare Worker `robin-web`. Cloudflare
Workers Builds watches the GitHub `main` branch and performs the production
build and deployment.

## Local preview

```sh
pnpm install
pnpm dev
```

## Validation

```sh
pnpm run release:check
pnpm audit --prod
```

The release check validates Astro/TypeScript, builds all routes, and inspects
canonical URLs, robots directives, Open Graph/Twitter metadata, JSON-LD,
sitemaps, internal links, and edge files.

## BTC Probability Atlas

The public Atlas is at
<https://iamrobin.ai/resonance/btc_probability_atlas/>. English is the default;
its page-level language menu also supports Simplified Chinese, Traditional
Chinese and Japanese. The forecast algorithm runs locally each day, while the
public page remains a reviewed frozen snapshot and does not automatically publish
daily outputs. See `docs/btc-probability-atlas.md` for the release boundary and
verification map.

## Ouroboros / Daily Special

Signal 5 remains the daily canonical deep dive. After the three daily outputs
are published, the existing private Telegram consumer offers one optional
research choice from Signals 1–4 and 6–8, or No. No reply by midnight Hong Kong
time means No; there is no new scheduler and no automatic selection.

`/ouroboros/` includes **03 Daily Special**. It stays empty until a selected,
verified research artifact is published. Four-language articles live in
`src/content/daily-special/YYYYMMDD/`; downloadable artifacts live in
`public/daily-special/YYYYMMDD/`. The public receipt ledger links exact source
commits and artifact hashes. Research completion never implies a trade,
investment decision, application, or external message was executed.

From September 24, briefs include a prior-action follow-through panel:
completed (with evidence link), queued, or watch only. Immutable source text
is not rewritten. See [the operating contract](scripts/daily-special/README.md).
Only code and sanitized publication receipts belong here; private selections,
runtime state, logs, prompts and Telegram identifiers never enter this repo.
