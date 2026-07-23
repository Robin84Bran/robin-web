# iamrobin.ai — website v1.2

July 2026 working copy for the next personal-site release.

## What changed

- warmer zen-garden / wabi-sabi visual system
- lighter navigation and contact surface
- shorter public copy and reduced secondary explanation
- canonical host set to `https://iamrobin.ai`
- security headers added in [`public/_headers`](./public/_headers)
- CI guardrail added in [`.github/workflows/site-guard.yml`](./.github/workflows/site-guard.yml)

## Local

```bash
npm install
npm run check
npm run build
npm run preview:host
```

## Deployment notes

- Canonical host is `https://iamrobin.ai`
- Cloudflare Pages/Workers should enforce HTTPS
- `www` to apex still needs a Cloudflare Redirect Rule or Single Redirect because domain-level redirects are not supported in Pages `_redirects`
- Email DNS is intentionally unchanged in this release
