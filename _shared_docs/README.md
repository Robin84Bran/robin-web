# Robin Web

Main identity site for `iamrobin.ai`, built as a static-first Astro website. This repo is only for the primary personal site. Ghost at `iamrobin.ghost.io` remains the current external writing archive, and Medium is selective syndication. The approved future canonical writing home is `iamrobin.ai/blog`; that migration is not part of the current release.

## Purpose

The site should present Robin Xie as an engineer, capital allocator, writer, and systems builder working across AI, markets, digital identity, infrastructure, and media. It is designed to feel editorial, calm, fast, and durable rather than startup-generic.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Astro Content Collections
- Astro Sitemap

## Local Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies with `npm install`.
3. Start local development with `npm run dev`.
4. Run `npm run build` before shipping changes.
5. Run `npm run check` when touching content models or Astro types.

## Project Structure

```text
robin-web/
├─ public/
│  ├─ og/
│  ├─ social/
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ common/
│  │  ├─ home/
│  │  ├─ layout/
│  │  ├─ seo/
│  │  └─ ui/
│  ├─ content/
│  │  ├─ books/
│  │  ├─ pages/
│  │  └─ projects/
│  ├─ data/
│  ├─ layouts/
│  ├─ lib/
│  ├─ pages/
│  └─ styles/
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ spec.md
└─ AGENTS.md
```

## Deployment Notes

- The site is static-first and ready for static hosting.
- Production is deployed from `main` through the existing Cloudflare Git integration.
- Keep the main site and current Ghost archive as separate deployment units until the separately approved `/blog` migration.
- Set `PUBLIC_SITE_URL` and `PUBLIC_BLOG_URL` in production so canonical links and schemas stay correct.
- Replace placeholder OG images and social avatar before production launch.

## Revision Log

### Website v1.3 — 2026-08-11 HKT

- Completed the final SEO/GEO crawlability pass: four-link primary header, visible footer site index, canonical Person identity, sitemap and crawler-policy verification, and the durable SEO/GEO manifest.
- Recorded `iamrobin.ai/blog` as the future canonical writing architecture without implementing the migration.
- Cleared the production dependency audit with the smallest non-force lockfile updates for `fast-uri`, `js-yaml`, `nanoid`, and `postcss`.
- Advanced the package, footer, visual-standard, and maintained page-update labels to v1.3 / August 2026.
- Updated files: `VISUAL_STANDARDS.md`, `_shared_docs/README.md`, `_shared_docs/seo-geo-release-checklist.md`, `_shared_docs/spec.md`, `package.json`, `package-lock.json`, `scripts/verify-seo.mjs`, `seo_geo_manifest_20260810.md`, `src/content/pages/_shared_docs/about.md`, `src/content/pages/_shared_docs/books.md`, `src/content/pages/_shared_docs/contact.md`, `src/content/pages/_shared_docs/now.md`, `src/content/pages/_shared_docs/projects.md`, `src/content/pages/_shared_docs/writing.md`, `src/data/cn.ts`, `src/data/locales.ts`, `src/data/site.ts`, `src/lib/seo.ts`, and `src/pages/writing.astro`.

## Roadmap

- Phase 1: Branded shell, homepage, core pages, SEO scaffolding, responsive layout.
- Phase 2: Plan the separately approved migration to `iamrobin.ai/blog`; do not treat a Ghost preview integration as the future canonical architecture.
- Phase 3: Refine imagery, tighten copy with final profile links, and add richer project/book surfaces if needed.
