# Robin Web

Main identity site for `iamrobin.ai`, built as a static-first Astro website. This repo is only for the primary personal site. The blog remains on Ghost at `iamrobin.ghost.io`, and Medium is treated as selective syndication rather than the canonical archive.

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
- Preferred edge and DNS layer for later deployment is Cloudflare.
- Keep the main site and Ghost blog as separate deployment units.
- Set `PUBLIC_SITE_URL` and `PUBLIC_BLOG_URL` in production so canonical links and schemas stay correct.
- Replace placeholder OG images and social avatar before production launch.

## Roadmap

- Phase 1: Branded shell, homepage, core pages, SEO scaffolding, responsive layout.
- Phase 2: Pull writing previews from the Ghost Content API.
- Phase 3: Refine imagery, tighten copy with final profile links, and add richer project/book surfaces if needed.
