# Robin Web Spec

## Objective

Create the main identity site for `iamrobin.ai` as a fast, elegant, static-first web property that reflects Robin Xie as an engineer, capital allocator, writer, and builder.

## Audience

- Founders, operators, and technical collaborators
- Investors, allocators, and strategic partners
- Readers following Robin’s essays, books, and public thinking
- Curious high-signal visitors encountering the site for the first time

## Design Principles

- Editorial minimalism over startup-template gloss
- High readability, strong hierarchy, and calm whitespace
- Subtle sophistication rather than trend-chasing
- Mobile-first layouts with low interaction cost
- Minimal JavaScript and static-first rendering
- Visual restraint: light chrome, quiet grid, careful color, no loud gradients

## Page Requirements

- Home: hero, identity strip, featured books, writing preview, project grid, signal block, contact links
- About: positioning, background, operating principles
- Books: living manuscript shelf, no dead product-page energy
- Writing: Ghost as canonical home, Medium as secondary syndication
- Projects: curated project list, not a full archive
- Now: current focus snapshot with exact update date
- Contact: channel-based outreach, no generic form
- 404: branded fallback with useful recovery links

## Component List

- `BaseLayout`
- `MetaTags`
- `SiteHeader`
- `SiteFooter`
- `PageIntro`
- `SectionHeading`
- `ButtonLink`
- `ContactLinks`
- Home sections: `Hero`, `IdentityStrip`, `FeaturedBooks`, `WritingPreview`, `ProjectsGrid`, `SignalBlock`

## SEO Requirements

- Unique title and description per page
- Canonical tags
- Open Graph tags
- Twitter card tags
- JSON-LD for `Person`, `WebSite`, and `Book` where relevant
- XML sitemap
- `robots.txt`
- Semantic heading structure
- Strong internal linking and low-friction crawl paths

## Performance Budget

- Static-first rendering for all current pages
- Zero client hydration unless there is a clear need
- Lean CSS and no animation library in v1
- Optimized images and lightweight placeholder assets during development
- Lighthouse mobile target: 90+ where practical

## Non-Goals For V1

- No CMS for main static pages
- No auth or user accounts
- No fancy animation system
- No complex backend
- No automation pipeline
- No attempt to merge Ghost into the same repo
