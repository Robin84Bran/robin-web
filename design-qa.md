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

## Multilingual Network release

Date: 2026-08-29 HKT

- Compared the existing live Network page and the revised local page at the same desktop viewport.
- The new long-form page preserves the existing paper, ink, muted-gold, serif, masthead, language-navigation, and footer system.
- English, Simplified Chinese, Traditional Chinese, and Japanese routes each render one H1, five section H2s, and the same 17 external public-record links.
- All four routes were checked at 390 × 844 with no horizontal overflow.
- Japanese copy remains readable and balanced at the mobile breakpoint without widening the shared layout.
- `pnpm run check` passed with 0 errors, 0 warnings, and 0 hints.
- `pnpm run release:check` passed privacy, observability, type, build, SEO, canonical, hreflang, robots, schema, sitemap, internal-link, and edge-file checks.

## English homepage mobile composition

Date: 2026-08-29 HKT

### Evidence

- Source visual truth: `/Users/headlessnick/Documents/Codex/2026-08-19/referenced-chatgpt-conversation-this-is-an/iamrobin-mobile-home-baseline-20260829.png`
- Implementation screenshot: `/Users/headlessnick/Documents/Codex/2026-08-19/referenced-chatgpt-conversation-this-is-an/iamrobin-mobile-home-preview-20260829.png`
- Combined full-view comparison: `/Users/headlessnick/Documents/Codex/2026-08-19/referenced-chatgpt-conversation-this-is-an/iamrobin-mobile-home-before-after-20260829.png`
- Viewport and state: English `/`, 420 × 912 CSS px, normal motion, readable eight-door phase.
- Source and implementation captures are both 420 × 912 pixels. Browser capture normalized the source DPR 2 and implementation DPR 1 to the same CSS-pixel dimensions before comparison.
- Focused-region comparison was not needed: the full-height 420 px capture keeps the identity line, name, complete watch, orbit labels, and hidden lower copy legible; exact center and image-ratio measurements provided the detail check.

### Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the existing families, weights, sizes, wrapping, and hierarchy are preserved; the mobile-only identity-to-name gap increases by 0.35rem.
- Spacing and layout rhythm: the watch face and eight-door garden share the same measured center at `(210, 515.36)`; the decorative core, mantra, duplicate portal row, and side note are hidden only below 46rem.
- Colors and visual tokens: unchanged from the live source.
- Image quality and asset fidelity: the original 829 × 1122 watch photo remains the source asset and renders at a measured ratio of 0.73886, matching 829 / 1122 without stretching.
- Copy and content: no copy changed; mobile-only duplicate supporting copy is hidden, while the header navigation and all eight door links remain available.
- Responsive checks at 390 × 844, 420 × 912, and 430 × 932 have exact face/garden center alignment, no horizontal overflow, and the same intrinsic photo ratio.
- Primary interaction: the Identity orbit link navigated to `/identity/` and returned successfully.
- Browser console: no errors or warnings.
- Desktop protection: at 1440 × 1000, all static homepage rectangles match the live page exactly; the only sampled width difference was the expected animated letter-spacing phase of the mantra.

### Comparison history

- Pass 1: the new shared center was exact, but the composition sat too low and the vertical side note competed with right-side orbit labels.
- Fix: moved the shared mobile center from 57% to 52% and hid the decorative side note at the mobile breakpoint.
- Pass 2: the watch is centered, the face remains clear, all eight doors orbit outside the face, the lower duplicate copy is absent, and the desktop geometry is unchanged.

### Implementation checklist

- [x] Mobile-only scope.
- [x] Shared watch/orbit center.
- [x] Intrinsic image ratio preserved.
- [x] Duplicate lower copy removed from the mobile presentation.
- [x] Nearby iPhone widths verified.
- [x] Desktop baseline preserved.
- [x] No deployment performed.

### Follow-up polish

- The deliberate 14-second bloom cycle makes door tails soften and recede between readable phases; this remains the existing motion language, not a regression.

final result: passed
