# iamrobin.ai SEO + GEO manifest

Date: 2026-08-10 HKT

Scope: local production build from Git commit `769e9b0` plus the uncommitted cleanup described here

Release state: build-verified locally; not committed, pushed, or deployed by this task

## Discovery architecture

- The visible primary header contains exactly four ordinary HTML links, in this order: Projects, Portfolio, Press, Books.
- About, Writing, and Contact are ordinary internal HTML links in the visible footer site index. GitHub is the first ordinary external HTML link in the adjacent visible footer index.
- The footer is not hidden and does not use `hidden`, `sr-only`, `display:none`, or `visibility:hidden` link treatment.
- All indexable pages remain discoverable through the internal-link graph and XML sitemap.
- No hidden SEO or GEO link layer was added.

## Canonical Person entity

Stable ID used by every Person node and every WebSite, ProfilePage, Book, Article, and CreativeWork reference:

`https://iamrobin.ai/#person`

| Field | Emitted value |
|---|---|
| `@type` | `Person` |
| `@id` | `https://iamrobin.ai/#person` |
| `name` | Robin Xie |
| `honorificPrefix` | Ms. |
| `alternateName` | Ms. Robin Xie; Bin “Robin” Xie; 谢玢; 謝玢; nanobin; ロビン・シエ |
| `pronouns` | she/her |
| `disambiguatingDescription` | Ms. Robin Xie, also known as Bin “Robin” Xie and nanobin, is the engineer, investor, and writer represented by iamrobin.ai. |
| `description` | Personal site of Robin Xie: engineer, capital allocator, writer, and builder across AI, markets, systems, and digital identity. |
| `jobTitle` | Engineer, Capital Allocator, Writer |
| `url` | `https://iamrobin.ai/` |
| `image` | `https://iamrobin.ai/social/robin-portrait.jpg` |
| `mainEntityOfPage.@id` | `https://iamrobin.ai/about/#profile` |

### sameAs destinations and evidence state

All six approved identity destinations are emitted in `sameAs`.

| Destination | URL | Evidence state on 2026-08-10 |
|---|---|---|
| Official TideiSun profile | `https://www.tideisun.com/en/robin` | Search result resolves to “Ms. Robin Xie” and links back to iamrobin.ai |
| LinkedIn | `https://www.linkedin.com/in/nanobin` | Search result resolves to Bin “Robin” Xie at TideiSun Group |
| GitHub | `https://github.com/Robin84Bran/` | Maintained repository account; current public repository and workflow are visible |
| X | `https://x.com/nanobin1984` | Maintained repository destination; independent crawler confirmation is `UNKNOWN` |
| Medium | `https://medium.com/@iamrobin-ai` | Maintained repository destination; independent crawler confirmation is `UNKNOWN` |
| ENS | `https://app.ens.domains/iamrobin.eth` | Maintained repository destination; independent crawler confirmation is `UNKNOWN` |

`UNKNOWN` here means the external crawler did not provide independent ownership/reachability evidence during this run. It is not a false, failed, or rejected identity claim.

## Titles, descriptions, canonicals, hreflang, and schema

Canonical rule: every indexable HTML page emits exactly one absolute, self-referential canonical at `https://iamrobin.ai` plus the route shown below.

Hreflang sets:

- `HOME`: `en` → `/`; `zh-Hans` → `/cn/`; `zh-Hant` → `/tw/`; `ja` → `/jp/`; `x-default` → `/`.
- `EN/CN`: paired English and Simplified Chinese routes, with `x-default` pointing to English.
- `—`: no alternate is claimed because a maintained equivalent page is not present.

| Route | Title | Description | Canonical | Hreflang | Schema types |
|---|---|---|---|---|---|
| `/` | Robin Xie \| Engineer, Capital Allocator, Writer | Personal site of Robin Xie: engineer, capital allocator, writer, and builder across AI, markets, systems, and digital identity. | `https://iamrobin.ai/` | HOME | WebSite, Person |
| `/about/` | About \| Robin Xie | About Robin Xie: engineer, executive, investor, writer, and systems thinker working across AI, markets, and digital identity. | `https://iamrobin.ai/about/` | EN/CN | Person, ProfilePage, BreadcrumbList |
| `/books/` | Books \| Robin Xie | Living book manuscripts by Robin Xie on AGI, leverage, longevity, and financial systems. | `https://iamrobin.ai/books/` | EN/CN | Person, Book |
| `/contact/` | Contact \| Robin Xie | Contact Robin Xie for thoughtful conversations and serious work. | `https://iamrobin.ai/contact/` | EN/CN | Person |
| `/now/` | Press \| Robin Xie | Earlier public moments from Robin Xie across blockchain banking, cross-border finance, and financial inclusion. | `https://iamrobin.ai/now/` | EN/CN | Person |
| `/portfolio/` | Portfolio \| Robin Xie | Robin Xie's portfolio of capital, systems, tools, institutions, and long-horizon attention. | `https://iamrobin.ai/portfolio/` | — | Person, BreadcrumbList |
| `/projects/` | Projects \| Robin Xie | Selected projects by Robin Xie across AI, markets, infrastructure, and education. | `https://iamrobin.ai/projects/` | EN/CN | Person |
| `/writing/` | Writing \| Robin Xie | Writing by Robin Xie on AI, markets, systems, capital, and identity, with the current external archive on Ghost. | `https://iamrobin.ai/writing/` | EN/CN | Person |
| `/cn/` | 谢玢 \| 系统、资本与生成中的界面 | 谢玢的个人站点。系统、资本、叙事与媒介，在此并流。 | `https://iamrobin.ai/cn/` | HOME | WebSite, Person |
| `/cn/about/` | 关于 \| 谢玢 | 关于谢玢：在系统、资本、媒体与叙事之间工作。 | `https://iamrobin.ai/cn/about/` | EN/CN | Person, ProfilePage, BreadcrumbList |
| `/cn/books/` | 书稿 \| 谢玢 | 未竟之书，缓慢成形。 | `https://iamrobin.ai/cn/books/` | EN/CN | Person |
| `/cn/contact/` | 联系 \| 谢玢 | 如有同频，可由此相遇。 | `https://iamrobin.ai/cn/contact/` | EN/CN | Person |
| `/cn/now/` | 报道 \| 谢玢 | 谢玢早期关于区块链银行、跨境金融与普惠支付的公开足迹。 | `https://iamrobin.ai/cn/now/` | EN/CN | Person |
| `/cn/projects/` | 项目 \| 谢玢 | 关键项目、系统实验与长期方向。 | `https://iamrobin.ai/cn/projects/` | EN/CN | Person |
| `/cn/writing/` | 写作 \| 谢玢 | 边界之处，信号浮现。 | `https://iamrobin.ai/cn/writing/` | EN/CN | Person |
| `/tw/` | 謝玢 \| 工程、投資、寫作 | 謝玢的個人網站。智能、資本、系統與仍在生長的作品。 | `https://iamrobin.ai/tw/` | HOME | WebSite, Person |
| `/jp/` | ロビン・シエ \| エンジニア、投資家、作家 | ロビン・シエの個人サイト。知性、資本、システム、そして育ち続ける仕事。 | `https://iamrobin.ai/jp/` | HOME | WebSite, Person |
| `/books/agi-awakening/` | AGI Awakening \| Robin Xie | A co-evolution diary about intelligence learning to look back and writing its own source code. | `https://iamrobin.ai/books/agi-awakening/` | EN/CN | Person, Book, BreadcrumbList |
| `/books/build-1-billion-block/` | Build 1 Billion Block \| Robin Xie | A playbook for compounding attention, capital, and asymmetric edge until emergence is inevitable. | `https://iamrobin.ai/books/build-1-billion-block/` | EN/CN | Person, Book, BreadcrumbList |
| `/books/derivatives/` | Derivatives \| Robin Xie | Bedtime stories that teach children optionality before adults make it frightening. | `https://iamrobin.ai/books/derivatives/` | EN/CN | Person, Book, BreadcrumbList |
| `/books/longevity-cheat-code/` | Longevity Cheat Code \| Robin Xie | A metaphoric inquiry into entropy, rogue cells, regeneration, and the higher wisdom of life and consciousness. | `https://iamrobin.ai/books/longevity-cheat-code/` | EN/CN | Person, Book, BreadcrumbList |
| `/cn/books/agi-awakening/` | 智源觉醒 \| Robin Xie | 智能开始回望 人与代码，互为镜像 源代码，也在写自己 | `https://iamrobin.ai/cn/books/agi-awakening/` | EN/CN | Person |
| `/cn/books/build-1-billion-block/` | 万亿区块 \| Robin Xie | 注意力先聚，资本随后 不对称优势，缓慢复利 直到涌现成为必然 | `https://iamrobin.ai/cn/books/build-1-billion-block/` | EN/CN | Person |
| `/cn/books/derivatives/` | 衍生故事 \| Robin Xie | 复杂未必要艰深 选择，可以先成为故事 孩子先懂，大人再别害怕 | `https://iamrobin.ai/cn/books/derivatives/` | EN/CN | Person |
| `/cn/books/longevity-cheat-code/` | 长寿秘诀 \| Robin Xie | 熵在增长，生命仍会回身 离群者未必是敌 再生，也许始于理解 | `https://iamrobin.ai/cn/books/longevity-cheat-code/` | EN/CN | Person |
| `/books/agi-awakening/bitcoin-and-buddha/` | Bitcoin and Buddha \| AGI Awakening \| Robin Xie | A chapter about consensus, conviction, and what spiritual language can still illuminate in markets. | `https://iamrobin.ai/books/agi-awakening/bitcoin-and-buddha/` | — | Person, Article, BreadcrumbList |
| `/books/agi-awakening/ouroboros/` | Ouroboros \| AGI Awakening \| Robin Xie | The opening coil where software stops feeling like a tool and starts behaving like a mirror. | `https://iamrobin.ai/books/agi-awakening/ouroboros/` | — | Person, Article, BreadcrumbList |
| `/books/agi-awakening/rebirth-protocol/` | Rebirth Protocol \| AGI Awakening \| Robin Xie | A closing chapter on authorship, identity, and how to keep becoming legible to the future. | `https://iamrobin.ai/books/agi-awakening/rebirth-protocol/` | — | Person, Article, BreadcrumbList |
| `/books/build-1-billion-block/alpha-lab/` | Alpha Lab \| Build 1 Billion Block \| Robin Xie | A lab chapter where hypotheses face live conditions instead of staying protected inside theory. | `https://iamrobin.ai/books/build-1-billion-block/alpha-lab/` | — | Person, Article, BreadcrumbList |
| `/books/build-1-billion-block/five-states/` | Five States \| Build 1 Billion Block \| Robin Xie | A chapter about naming the states an allocator moves through and designing transitions between them. | `https://iamrobin.ai/books/build-1-billion-block/five-states/` | — | Person, Article, BreadcrumbList |
| `/books/build-1-billion-block/four-pillars/` | Four Pillars \| Build 1 Billion Block \| Robin Xie | A design chapter on stability, leverage, decision rights, and the architecture of compounding systems. | `https://iamrobin.ai/books/build-1-billion-block/four-pillars/` | — | Person, Article, BreadcrumbList |
| `/books/derivatives/futures-for-tomorrow/` | Futures for Tomorrow \| Derivatives \| Robin Xie | A chapter about promises, planning, and how futures make tomorrow speak in today's language. | `https://iamrobin.ai/books/derivatives/futures-for-tomorrow/` | — | Person, Article, BreadcrumbList |
| `/books/derivatives/options-like-umbrellas/` | Options Like Umbrellas \| Derivatives \| Robin Xie | A story chapter where umbrellas explain protection, optionality, and why some choices are worth paying for in advance. | `https://iamrobin.ai/books/derivatives/options-like-umbrellas/` | — | Person, Article, BreadcrumbList |
| `/books/derivatives/the-bedtime-market/` | The Bedtime Market \| Derivatives \| Robin Xie | An opening story that turns the market into a place of weather, timing, and friendly observation. | `https://iamrobin.ai/books/derivatives/the-bedtime-market/` | — | Person, Article, BreadcrumbList |
| `/books/longevity-cheat-code/fountain-of-wells/` | Fountain of Wells \| Longevity Cheat Code \| Robin Xie | A chapter on repair as a systems problem, where health is built through reserve rather than purity. | `https://iamrobin.ai/books/longevity-cheat-code/fountain-of-wells/` | — | Person, Article, BreadcrumbList |
| `/books/longevity-cheat-code/oocyte-discussion/` | The Oocyte Discussion \| Longevity Cheat Code \| Robin Xie | A chapter about biological timing, female optionality, and the emotional weight of irreversible windows. | `https://iamrobin.ai/books/longevity-cheat-code/oocyte-discussion/` | — | Person, Article, BreadcrumbList |
| `/books/longevity-cheat-code/you-are-on-time/` | You Are on Time \| Longevity Cheat Code \| Robin Xie | A quieter chapter about pacing, reassurance, and the kind of care that restores signal instead of fear. | `https://iamrobin.ai/books/longevity-cheat-code/you-are-on-time/` | — | Person, Article, BreadcrumbList |
| `/projects/childrens-ai-education-apps/` | Bran Lab \| Projects \| Robin Xie | Games and small worlds built with my son, where AI is curious before it becomes useful. | `https://iamrobin.ai/projects/childrens-ai-education-apps/` | — | Person, CreativeWork, BreadcrumbList |
| `/projects/quant-lab/` | Quant Lab \| Projects \| Robin Xie | Design from First Principles. Sandbox by Occam’s razor. QA by adversarial review. Production by Murphy’s law. Evolution measured by Pareto. | `https://iamrobin.ai/projects/quant-lab/` | — | Person, CreativeWork, BreadcrumbList |
| `/projects/robinos/` | RobinOS \| Projects \| Robin Xie | The spoon is fake. The experience is true. A personal journey with AGI for turning thought into product, system, and memory. | `https://iamrobin.ai/projects/robinos/` | — | Person, CreativeWork, BreadcrumbList |
| `/projects/watts-to-satoshi/` | Watts to Satoshi \| Projects \| Robin Xie | Energy becomes computation. Computation makes intelligence abundant. What remains scarce? Attention, judgment, and meaning. | `https://iamrobin.ai/projects/watts-to-satoshi/` | — | Person, CreativeWork, BreadcrumbList |
| `/signal/` | Signal \| Robin Xie | Filtered notes and public traces that rise high enough to pass. | `https://iamrobin.ai/signal/` | — | Person |
| `/signal/threshold/` | Threshold \| Robin Xie | What rises high enough to be seen. | `https://iamrobin.ai/signal/threshold/` | — | Person |
| `/systems/` | Systems \| Robin Xie | Working structures, designed with enough pressure to reveal what holds. | `https://iamrobin.ai/systems/` | — | Person |
| `/systems/surface-tension/` | Surface Tension \| Robin Xie | Systems reveal themselves under load. | `https://iamrobin.ai/systems/surface-tension/` | — | Person |
| `/lab/` | Lab \| Robin Xie | A deeper layer for experiments, tests, and unfinished thinking that still has charge. | `https://iamrobin.ai/lab/` | — | Person |
| `/lab/depth-notes/` | Depth Notes \| Robin Xie | Experiments held below the surface. | `https://iamrobin.ai/lab/depth-notes/` | — | Person |
| `/taste/` | Taste \| Robin Xie | A filter layer inside RobinOS. | `https://iamrobin.ai/taste/` | — | Person |

The production build generated 49 HTML pages: 48 indexable pages in the sitemap plus the excluded 404 page.

## Sitemap and crawler policy

- Sitemap index: `https://iamrobin.ai/sitemap-index.xml`
- Child sitemap: `https://iamrobin.ai/sitemap-0.xml`
- Generated sitemap entries: 48
- Every sitemap URL maps to generated HTML and is reachable from the homepage link graph.
- `Googlebot`, `Bingbot`, and `OAI-SearchBot`: allowed.
- `GPTBot`, `Google-Extended`, `Applebot-Extended`, and `ClaudeBot`: disallowed.
- All other user agents: allowed.
- Policy intent: search and generative citation allowed; model training disallowed.
- Account-side Cloudflare robots or AI Crawl Control overrides remain `UNKNOWN` until verified in Cloudflare.

## Writing architecture decision

Ghost remains the current external archive during this release. It is no longer the future canonical writing architecture. The approved future canonical home is `https://iamrobin.ai/blog`.

No `/blog` route, content import, redirect, canonical switch, or Ghost migration is implemented in this cleanup.

## Verification record

| Check | Result |
|---|---|
| Astro check | PASS — 69 files, 0 errors, 0 warnings, 0 hints |
| Astro production build | PASS — 49 pages generated |
| SEO verifier | PASS — routes, visible navigation, links, canonicals, hreflang, Person JSON-LD, sitemap, edge routing, crawler policy, contrast, and semantics |
| Sitemap inventory | PASS — 48 indexable URLs; 404 excluded |
| Git diff whitespace check | PASS |

## GitHub site-guard incident

Run: `https://github.com/Robin84Bran/robin-web/actions/runs/31396698361`

Commit: `769e9b0`

Job: `site-guard / verify`

The workflow's checkout, dependency install, Astro check, and Astro build steps passed. The final `npm audit --omit=dev` step failed with four known production-dependency advisories:

- `fast-uri` 3.0.0–3.1.4 — high
- `js-yaml` 4.0.0–4.3.0 — high
- `nanoid` below 3.3.17 — high
- `postcss` through 8.5.22 — moderate

This is a known dependency-audit failure, not an Astro build or SEO-output failure. Dependency remediation was not attempted because this task is limited to final SEO/GEO cleanup and verification.

## Remaining verification items

| Item | Evidence status | Evidence needed to resolve it |
|---|---|---|
| Production contains this cleanup | NOT DEPLOYED | Commit, push, successful GitHub/Cloudflare deployment, then fetch production HTML |
| Google Search Console ownership, sitemap acceptance, and indexing | UNKNOWN | Dated Search Console screenshots or export |
| Bing Webmaster ownership, sitemap acceptance, and indexing | UNKNOWN | Dated Bing Webmaster screenshots or export |
| Cloudflare managed robots and AI Crawl Control compatibility | UNKNOWN | Dated Cloudflare rules/policy export and bot-request evidence |
| Rich Results / Schema.org production validation | UNKNOWN | Validate representative live Person/ProfilePage, CreativeWork, Book, and Article URLs after deployment |
| Core Web Vitals field performance | UNKNOWN | Search Console CWV or CrUX evidence |
| X profile reachability/ownership confirmation | UNKNOWN | Authenticated profile inspection or dated owner-provided evidence |
| Medium profile reachability/ownership confirmation | UNKNOWN | Authenticated profile inspection or dated owner-provided evidence |
| ENS name ownership and current records | UNKNOWN | ENS app or on-chain record evidence for `iamrobin.eth` |
| `/blog` migration scope, timing, content model, redirects, and canonical cutover | UNKNOWN / NOT IMPLEMENTED | Separately approved migration plan and source-content inventory |
| Dependency advisory remediation | KNOWN OPEN | Separately approved lockfile/dependency update followed by check, build, SEO verification, and `npm audit --omit=dev` |
