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

## Swarm Lab

Four small, interactive worlds live at `/intelligence/swarm-lab/`: cooperation,
local self-assembly, a resource-conserving habitat model, and transferable memory.
Each has paired controls, deterministic seeds, time scrubbing, CSV/JSON downloads,
32-seed batch receipts, readable source and explicit limits. These are educational
toy models—not biological experiments, habitat designs or an actual Voyager run.

The canonical research source is RobinOS2's `06_intelligence/AI_research/AI_swarm`;
its explicit public allowlist is mirrored into `public/swarm-lab/`. Browser and
Node runs use the same model files. See [reproduction notes](public/swarm-lab/README.md).
`pnpm run test:swarm-lab` checks invariants, reproduces every saved batch result
and validates the rendered routes after a build. It is part of `release:check`.

Intelligence features the lab without replacing the earlier swarm sketches or
other lessons. All four September 24 diary editions link to it in an afterword;
their preserved document bodies are unchanged. The lab's explanatory interface
is in English with Chinese experiment subtitles. No scheduler or external API
is involved, and simulation playback starts only on request.

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

New authored essays follow [Public Editorial Voice](docs/PUBLIC_EDITORIAL_VOICE.md):
explain the mechanism to a curious reader, retain meaningful uncertainty in
ordinary language, and keep operational status tokens in their evidence records.
An owner-authorized editorial companion lives under `YYYYMMDD/<editionSlug>/`,
links its original article, and has its own download and hash. It does not create
a second action-completion receipt or overwrite the original.

## Owner-document diary editions

The September 24 diary was explicitly supplied and authorized as a Word document,
including English, Traditional Chinese and Japanese translations. Its original
Chinese text, paragraph boundaries, emphasis, colors, links and tables are kept.
This is a specific owner-approved exception to the usual original-only diary
workflow, not automatic translation of all diaries. Each edition has its own
canonical, reciprocal language links and body hash; translated editions require
native editorial review. The archive lists the source once. Private source
documents and import receipts stay outside the public repository.
