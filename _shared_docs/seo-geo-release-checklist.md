# iamrobin.ai SEO + GEO release checklist

Date: 2026-08-10 HKT

Scope: repository-controlled implementation and account-side evidence gates

Policy intent approved by Robin: **Search and generative citation allowed; model training disallowed.**

## Repository implementation

| Workstream | Implementation | Verification evidence |
|---|---|---|
| Stable locale routing | `/` no longer redirects by `request.cf.country`; explicit `/cn/`, `/tw/`, and `/jp/` routes and the visible language selector remain | `astro check`, production build, and `scripts/verify-seo.mjs` |
| Crawler policy | `robots.txt` explicitly allows Googlebot, Bingbot, and OAI-SearchBot; explicitly blocks GPTBot and named training/extended crawlers | Generated `dist/robots.txt` comparison |
| Internal discovery | The visible header exposes only Projects, Portfolio, Press, and Books; the visible footer/site index exposes About, Writing, Contact, GitHub, and the remaining ordinary HTML discovery links | Static internal-link crawl from `/` and visible-navigation assertions |
| Project destinations | Four project cards now resolve to dedicated static pages with unique canonicals, titles, openings, breadcrumbs, and CreativeWork schema | Generated-route and JSON-LD checks |
| Person entity | One `https://iamrobin.ai/#person` ID is reused by WebSite, ProfilePage, Book, Article, and CreativeWork nodes, with maintained names, pronouns, disambiguation, and sameAs profiles | JSON-LD parse and source review |
| Writing architecture | Ghost remains the current external archive; `iamrobin.ai/blog` is the approved future canonical writing home, but no migration is implemented in this release | Documentation review; no `/blog` route expected yet |
| Books and chapters | Book images, canonical IDs, `isPartOf`, chapter images, and BreadcrumbList nodes are emitted from maintained content | JSON-LD parse and source review |
| Accessibility and clarity | Text-use tokens exceed 4.5:1 on the canvas; non-actions were removed from the tab order; identity labels persist; focus is visible; duplicated openings are removed; portfolio context is visible | Contrast calculation, static source checks, and visual/keyboard QA |

## Published-fact boundary

The implementation reuses facts already maintained in the repository:

- public name and role description: `src/data/site.ts`;
- localized alternate names: existing locale content;
- image: `public/social/robin-portrait.jpg`;
- public profile destinations: `src/data/site.ts`;
- project summaries, impact statements, status, and domain: `src/content/projects/_shared_docs/`;
- book and chapter descriptions: maintained content collections.

Affiliations, project dates, project-specific roles, project evidence links, traffic, rankings, index counts, and publication dates remain omitted where maintained evidence is unavailable. Their evidence state is `UNKNOWN`, not false or zero.

## Account-side gates

These cannot be established by the static repository. Record dated screenshots or exports; keep unavailable values as `null` or `UNKNOWN`.

| Gate | Current evidence status | Operator action |
|---|---|---|
| Google Search Console property and sitemap | UNKNOWN | Confirm Domain plus apex URL-prefix properties; submit `https://iamrobin.ai/sitemap-index.xml`; inspect `/`, `/projects/`, one project, one book, one chapter, `/cn/`, and `/jp/` |
| Bing Webmaster property and sitemap | UNKNOWN | Verify apex, submit the same sitemap, and inspect the same URL sample |
| Cloudflare managed robots and AI Crawl Control | UNKNOWN | Confirm that account-side rules do not override or contradict the repository policy |
| Bot request evidence | UNKNOWN | Record dated successful requests for Googlebot, Bingbot, and OAI-SearchBot, plus expected policy behavior for blocked training bots |
| Rich Results Test / Schema.org Validator | UNKNOWN until preview or production URL is available | Validate representative Person/ProfilePage, Project/CreativeWork, Book, and chapter/Article pages |
| Core Web Vitals field data | UNKNOWN | Export Search Console CWV or CrUX evidence; do not infer from a local build |

## Release and rollback

1. Run `astro check`, `astro build`, then `node scripts/verify-seo.mjs` using the repository's Node runtime.
2. Review desktop plus 320, 390, and 430 CSS-pixel mobile previews.
3. Deploy only after the preview checks pass and the Cloudflare policy comparison is recorded.
4. Recheck production canonicals, hreflang, robots, sitemap, links, schema, and locale routes.
5. Observe Google, Bing, and crawler evidence at approximately 2, 7, and 28 days.

Rollback is file-scoped: restore the prior Worker routing only for routing regressions; restore crawler policy only for policy conflicts; do not bundle those rollbacks with schema, content, or accessibility changes.
