# AGENTS.md

## Product Intent

- This repo is the main identity site for `iamrobin.ai`.
- The site should present Robin Xie as an engineer, capital allocator, writer, and builder.
- The tone should feel editorial, intelligent, slightly tech-forward, and calm.
- Ghost at `iamrobin.ghost.io` remains the canonical writing home.
- Medium is secondary syndication only, never the primary archive.

## Design Principles

- Preserve the restrained palette and quiet grid treatment.
- Favor sharp typography, measured spacing, and light visual chrome.
- Avoid generic startup UI patterns, marketing fluff, and dashboard styling.
- Keep GitHub prominent in navigation surfaces and contact pathways.
- Prefer elegance through hierarchy and copy discipline, not decorative complexity.

## Architecture Boundaries

- Keep the main site static-first.
- Do not merge Ghost into this repo.
- Use `src/content` and `src/data` for durable structured content.
- Keep reusable presentational logic in `src/components` and page assembly in `src/pages`.
- Keep SEO helpers centralized in `src/components/seo` and `src/lib/seo.ts`.
- Keep Ghost API work isolated in `src/lib/ghost.ts` and environment variables.

## Coding Standards

- TypeScript-first where logic exists.
- Prefer simple Astro components over client-side islands.
- Keep components small, composable, and semantically named.
- Use Tailwind utilities plus the shared tokens in `src/styles/global.css`.
- Avoid introducing heavy dependencies without a clear need.

## Performance Rules

- Default to zero hydration.
- Do not add heavy animation libraries in v1.
- Be careful with external fonts, scripts, embeds, and trackers.
- Keep images optimized and replace placeholders before launch.
- Protect Core Web Vitals when editing the homepage.

## Content Rules

- Copy should be concise, modern, and systems-literate.
- Avoid corporate finance cliches, generic founder copy, or lifestyle-blog language.
- Books should feel alive and evolving, not like stale launch pages.
- Projects should stay curated. Resist turning the site into a dump of everything.
- Do not reintroduce the old mailing address or an old-style contact form by default.
- Use exact dates on the `Now` page when updating it.

## Do Not Change Casually

- The separation between main site, Ghost blog, and Medium syndication
- The navigation order
- GitHub prominence in contact/footer surfaces
- The site-wide metadata defaults and schema scaffolding
- The static-first architecture and minimal-JS stance
