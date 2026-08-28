# Identity Loop Refinement — Design QA

Date: 2026-08-28 HKT

## Visual target

- Preserve the existing paper, ink, muted-gold, and Japanese-quiet design language.
- Correct the Japanese name wrap without changing the other locale hierarchy.
- Add low-frequency motion only where it communicates the Origin → Diverge → Converge → Origin loop.
- Use real raster artwork for sakura and the Ouroboros ring, and library-sourced icons for the four stages.

## Browser-rendered checks

- Compared the supplied Japanese reference and the revised local page side by side at 1532 × 1784.
- Japanese heading: 91.2 px, single line, 83.9 px rendered height, no orphaned `（謝玢）` fragment.
- Simplified Chinese heading at the same viewport: 104 px, preserving the intended one-size hierarchy difference.
- Japanese mobile at 390 × 844: single-line heading, 358 px content width, no horizontal overflow.
- English home: `Accredited Investor` visible; old `Systems under uncertainty.` heading absent; 9 sakura petals, 4 stage icons, and one Ouroboros artwork present.
- English, Simplified Chinese, Traditional Chinese, and Japanese About routes: 7 sakura petals each and no horizontal overflow.
- Motion freezes to a stable composition under `prefers-reduced-motion: reduce`.

## Deterministic gates

- `pnpm run check`: 0 errors, 0 warnings, 0 hints.
- `pnpm run release:check`: privacy, observability, type, build, SEO, canonical, robots, schema, sitemap, internal-link, and edge-file checks passed.

## Asset provenance

- `public/visuals/sakura-petal.png`: generated specifically for the sakura drift slots; transparent 512 × 512 PNG.
- `public/visuals/ouroboros-ring.png`: generated specifically for the identity orbit; transparent 900 × 900 PNG.
- `public/icons/*.svg`: Phosphor Icons Core 2.1.1 regular icons; MIT license retained in `public/icons/PHOSPHOR-LICENSE`.

final result: passed
