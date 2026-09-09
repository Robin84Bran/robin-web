# Growth through the eight doors

The eight-door order, homepage, visual shell and existing article routes are preserved.

## Content ownership

- Identity is a concise, factual introduction based on the existing About page. Robin retains authorship of a future personal introduction. About remains the detailed biography; both reference `https://iamrobin.ai/#person`.
- Asymmetry owns the agentic AI / AI infrastructure investment lens, qualitative reliability scorecard and founder preparation questions. No stage, geography, check size, response time or support commitment is asserted.
- Network owns the contact destination at `/network/#contact`, using the existing LinkedIn profile. Existing public-record content is preserved in every language.
- Intelligence teaches investors through existing interactives, an agent evaluation introduction and a qualitative infrastructure bottleneck map.
- Resonance curates existing evaluation projects. Model Olympics is explicitly a future direction, with no invented results.
- Binary retains Build / Invest / Joy and original essay dates. Its introduction describes monthly website collection of Medium / LinkedIn writing. Individual articles keep their self-canonicals and existing publication / modification dates.
- Ouroboros gains context links on its directory only. Daily publication templates, source content and workflows are untouched.
- Meaning, Books and Portfolio receive no content or indexing changes.

## Discovery and operation

The completed Identity, Asymmetry and Resonance pages now have indexable metadata, JSON-LD, sitemap entries and references in the existing generated `llms.txt`. No alternative top-level investment or founder routes were added. Existing language families remain unchanged; the new door guides are English.

The founder path is Identity → Asymmetry → Network → LinkedIn. The investor path is Intelligence → Asymmetry → Network. Shared analytics and crawler policies are unchanged. Continue using the existing Cloudflare monthly aggregate review described in OBSERVABILITY_STANDARD.md. Record relevant founder inquiries manually; a LinkedIn outbound link does not establish a qualified conversation.

## Verification

- `pnpm release:check`: Astro validation, production build, existing privacy/observability/action checks, full SEO verification and both four-test suites passed.
- `node --test scripts/tests/aidc101.test.mjs`: six tests passed.
- Desktop 1440px and mobile 390px: all eight doors returned 200, with no horizontal overflow or browser exceptions. The founder path reached the visible Network contact section.
- Compared 356 protected built pages to the original build: main content, canonical URL and robots metadata were identical. These include Meaning, existing Ouroboros articles, Books, Portfolio and the homepage.
- Updated the Network test to count the five existing public-record sections inside their container, allowing a separate contact section. Fixed the existing date-title test to use an explicit timezone rather than the host timezone.
- `pnpm audit --prod` reports six advisories in the unchanged production dependency lockfile: one critical, three high and two moderate. Dependency upgrades are outside this content change; the separate CI dependency-audit step remains a known release concern.

## Publication boundary

Production deploys from GitHub `main` through Cloudflare Workers Builds. A feature branch or draft pull request does not update iamrobin.ai. After an approved deployment, check live canonical/robots metadata, the three new sitemap entries and real crawler response status in Cloudflare AI Crawl Control. Search indexing and AI citations cannot be inferred from a successful local build.
