# iamrobin.ai — Website v2 / Zen Loop

## Meaning Diary completeness

Long Telegram diaries now collect every batch until `/diary_done`; pauses never
trigger partial publication. The existing bot keeps private, restart-safe
collection state and reports saved counts. See [the intake contract](scripts/diary/README.md).
For new diaries, a first message at or after 13:00 Hong Kong time assigns
tomorrow's diary date; earlier messages keep today. The bot confirms the date,
and existing entries retain their saved dates.

The release check includes `diary:check`: multipart, duplicate-delivery,
interrupted-completion and source-integrity regression tests. The September 7
and September 27, 2026 endings have been restored from Robin's supplied text;
their previous paragraphs, URLs and artwork are preserved.

## Special → Binary story bridge

Use the existing `binaryStory` content collection (`src/content/binary-stories/SLUG/{article,zh-hans,zh-hant,ja}.md`) and `/binary/stories/[...story].astro` for new Special-derived stories. Do not overwrite the dated Blog collection or owner articles. Each four-language set carries `storySlug`, `lane`, `date`, `updated`, `title`, `excerpt`, `hero`, `ogImage`, `keywords`, exact `canonical`, `inLanguage`, `translationReview: PASS` after actual editorial review, `sourceSpecial`, `sourceArtifactSha256`, and `carouselPdf`, `carouselCaption`, `carouselPages` (6–12). PDF/caption paths are `/carousels/SLUG.pdf` and `/carousels/SLUG.txt`. The renderer adds native language links, Article/Person schema, source and download links, and lists the English story in its Binary lane. `autonomy:check` rejects incomplete editions, duplicate source hashes, drifted sources and missing/mismatched PDFs. A page download is not a LinkedIn posting receipt.

## Weekly Intelligence — One Door, Many Hands

`/intelligence/one-door/` is the 2026-W40 experiment: fixed carrying capacity
split into 1, 6 or 24 bodies under service contention and permanent unit loss.
It retains all 640 seeded runs across ten predeclared settings, analytic controls,
source/method downloads and a browser replay using the exact same model.
Canonical research: `06_intelligence/AI_research/AI_swarm/10_one_door/`.
See [method and limitations](public/one-door/README.md). Body-count door slots
and equal per-body failure rates are assumptions, not measured robot behavior.
All arms use the same simple queue; no learning or financial system is involved.
The required release check runs its invariants, byte-exact batch reproduction
and rendered-page checks through `test:swarm-lab`.

## Weekly Intelligence — first autonomous iteration

`/intelligence/three-rule-swarm/` is the 2026-W39 teaching experiment: three-rule walkers, a central learner, and a random control. All 192 seeded runs and exact source are available under `/three-rule-swarm/`. The canonical research folder is `06_intelligence/AI_research/AI_swarm/09_three_rule_swarm/`. Observations are matched; computation and mobility are not. The central learner wins the default synthetic comparison. This is not a claim about real insects, LLM swarms or markets.

A static-first Astro website that turns the I AM ROBIN mnemonic into a quiet
identity cycle: nucleus, growth, sakura drift, and return.

The public site is deployed as the Cloudflare Worker `robin-web`. Cloudflare
Workers Builds watches the GitHub `main` branch and performs the production
build and deployment.

## About and Identity: I AM ROBIN

The English `/about/` is Robin's full first-person story. Copy lives in
`src/data/identityCore.ts`: Roots, Subsea Engineering, FinTech / Web3 / AI Agents,
Entrepreneurship, Transformation, and I AM. Sections 00–03 use Robin's supplied
copy. Transformation opens with her systems-and-roles paragraphs, followed by
her current iSunTV work. I AM begins “iamrobin.ai is where I think in public”.
The page preserves sector evidence links, questions, principles and contact.
The traditional iSunTV link in About is `https://www.isuntv.com` (corrected 27 September 2026).

`/identity/` is a zen watercolor entrance: four illustrated phases rotate gently
and link to the corresponding About sections. Manual selection pauses rotation;
keyboard focus and reduced-motion preferences are respected. Mobile layouts
keep the artwork visible and use two-column phase controls. Both pages retain
the original serif typography and the shared Person identifier. About's language
routes remain available with their existing copy; these are not new translations
of the revised English story. No private chats or source documents are published.

## Homepage: current work and transformation

The homepage eyebrow above “Robin Xie” is “ENTREPRENEUR · INVESTOR · ENGINEER”.

The English homepage introduces Robin as an entrepreneur and investor with an
engineering background. Its Now section links iSunTV's Traditional Chinese
(`isuntv.com`, labelled 陽光衛視) and Simplified Chinese (`isun1.com`, labelled 阳光卫视) sites, the AI-native news lab
(`isun1.news`), and streaming commerce (`isuntvmall.com`). The first-person
introduction and the regular-weight “I am the technical team” describe Robin's
current work. A Past section distills the existing About biography into five
short paragraphs covering engineering, entrepreneurship and FinTech, capital
allocation, AI experimentation, and writing across disciplines. The former
large “Find the bottleneck” closing statement has been removed.

The lower homepage uses the approved “Dissolve / become” particle ensō. The same
1,000 particles recur through four forms in a 40-second cycle:

- **Engineering:** a conceptual subsea robot with thrusters, camera, tether, manipulator and skid.
- **FinTech:** a flowing infinity ribbon.
- **Entrepreneurship:** a seed expanding into a spiral, with a 0 → 1 cue.
- **Transformation:** a winged form suggesting metamorphosis.

Each form gathers, holds, and dissolves. Its name becomes bold and slightly
larger once assembled; selecting a name pauses at that form. The caption is
“Elemental. Emergent. Transformative.” Motion has a pause/play control, stops
offscreen and in hidden tabs, and starts paused for reduced-motion preferences.
Canvas painting is capped at 30fps with device pixel ratio capped at 2. A static
subsea illustration remains visible without JavaScript or a usable canvas. The upper watch
portrait and I AM ROBIN eight-door entrance remain in place.

Shared navigation offers both official profiles (TideiSun and iSunTV). The
public GitHub profile is `https://github.com/RobinXie1984`; the private Quant Lab
profile is no longer advertised. Medium promotion, social links, article
“Also published” links, Person sameAs and crawler-profile links are removed.
Historical source-only distribution metadata is retained; it is not rendered.
Repository-specific evidence links continue to identify their actual repositories.
The existing Person `@id` is preserved. Regenerate `llms.txt` with
`pnpm run robots:sync` after editing `src/data/robot-welcome.json`.

## Autonomous publishing

The September 25 operating contract promotes primary-source research to the
08:00 HKT daily run. Ouroboros retains eight signals, the Action Flow and Signal
5 deep dive. Specials are selected autonomously, targeting at least four
verified issues per ISO week; completed Specials feed BUILD/INVEST/JOY stories
and 6–12-page carousel downloads. Monthly taste reviews and weekly Intelligence
simulations share the existing private bot's resumable job ledger.

See [operating and verification contract](scripts/autonomy/README.md).
The [September 25 release evidence](docs/AUTONOMY_RELEASE_20260925.md) links the
first autonomous Special, its distinct INVEST story, the reviewed seven-page
carousel and the first weekly Intelligence game.
The scripts are source mirrors; Cloudflare serves static content, not the
private research worker. No private chats, preferences, bot state or credentials
are bundled. PDF delivery does not imply a LinkedIn post. Only verified
artifacts count as complete; scheduling policy does not prove weekly output.

BTC Probability Atlas and the HK IPO Blind Box now belong to Asymmetry:
`/asymmetry/btc_probability_atlas/` and `/asymmetry/hkipoblindbox/`.
Old bookmarks redirect permanently; the Atlas's existing data/asset URLs remain
compatible. These remain research/manual systems, with no new trading authority.

## Local preview commands

```sh
pnpm install
pnpm dev
```

## Validation

```sh
TZ=UTC pnpm run release:check
pnpm audit --prod
```

The release check validates Astro/TypeScript, builds all routes, and inspects
canonical URLs, robots directives, Open Graph/Twitter metadata, JSON-LD,
sitemaps, internal links, and edge files.

## Swarm Lab

Eight small, interactive worlds live at `/intelligence/swarm-lab/`: cooperation,
local self-assembly, a resource-conserving habitat model, and transferable memory.
Each has paired controls, deterministic seeds, time scrubbing, CSV/JSON downloads,
32-seed batch receipts, readable source and explicit limits. These are educational
toy models—not biological experiments, habitat designs or an actual Voyager run.

The canonical research source is RobinOS2's `06_intelligence/AI_research/AI_swarm`;
its explicit public allowlist is mirrored into `public/swarm-lab/`. Browser and
Node runs use the same model files. See [reproduction notes](public/swarm-lab/README.md)
and the [complete playing guide](public/swarm-lab/HOW_TO_PLAY.md). Worlds 5–8
test known-label discount, attention geometry, taste feedback and shared-channel
herding using synthetic rule-based models. Each world explains all controls.
Version 1.1.0 preserves the first four models; no real AI or biological experiment
is claimed. Equal record-reads in world 6 do not mean equal total compute.
`pnpm run test:swarm-lab` checks invariants, reproduces every saved batch result
and validates the rendered routes after a build. It is part of `release:check`.

Intelligence features the lab without replacing the earlier swarm sketches or
other lessons. All four September 24 diary editions link to it in an afterword;
their preserved document bodies are unchanged. The lab's explanatory interface
is in English with Chinese experiment subtitles. No scheduler or external API
is involved, and simulation playback starts only on request.

## BTC Probability Atlas

The public Atlas is at
<https://iamrobin.ai/asymmetry/btc_probability_atlas/>. English is the default;
its page-level language menu also supports Simplified Chinese, Traditional
Chinese and Japanese. The forecast algorithm runs locally each day, while the
public page remains a reviewed frozen snapshot and does not automatically publish
daily outputs. See `docs/btc-probability-atlas.md` for the release boundary and
verification map.

## Ouroboros / Daily Special

Signal 5 remains the daily canonical deep dive. Effective September 25, after
the three daily outputs are verified, the existing private bot selects a bounded
research action from Signals 1–4 and 6–8 without a selection prompt. Its target
is at least four verified Specials per ISO week, with spare-day recovery. The
earlier optional-choice policy is historical; it is not the current workflow.

`/ouroboros/` includes **03 Daily Special**. Only a completed,
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
