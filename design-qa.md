# Identity core — design QA

final result: passed

## Source visual truth

- `/Users/robin/Aya/growth/identity-story-designs-2026-09-25/02-living-thread.png` (946 × 1663): layout and flowing artwork direction.
- `/Users/robin/Aya/growth/identity-story-designs-2026-09-25/01-open-letter.png` (1122 × 1402): serif typography and text treatment.
- `/Users/robin/Aya/growth/identity-core-2026-09-27/assets/phase-atlas.png` (1254 × 1254): the four generated watercolor scenes.

The requested hybrid deliberately changes the old title, chapter architecture, content, and Identity's purpose. This is a first merged draft, not a pixel-identical copy of obsolete copy.

## Rendered evidence

Local preview: http://127.0.0.1:4380/about/ and /identity/.

Screenshots in `/Users/robin/Aya/growth/identity-core-2026-09-27/`:
`about-desktop.png`, `about-mobile.png`, `identity-mobile.png`, `identity-desktop.png`, `engineering-enso.png`.

Browser DOM viewports checked: 946 × 1663 desktop comparison, 1280px standard desktop, 390 × 844 phone. In-app screenshot capture excludes its scrollbar and may clip to the visible host panel: about-desktop captured 931 × 1066; identity-mobile captured 375 × 812. Comparison used the corresponding visible region, not a claimed full-page pixel match. Original screenshot bytes are retained without resizing or compositing.

## Comparison history

1. Source style 2 and About screenshot displayed together. P2: body column too far right and overlapping the strongest part of the thread. Narrowed chapter rail from 12rem to 7rem and gutter from 4rem to 2rem; shortened rail labels while retaining complete sector box labels.
2. Phone Identity screenshot: P2: four controls in one row forced mid-word wrapping. Changed phone controls to two columns.
3. Recaptured About with source style 2 in the same comparison input. Recaptured phone Identity with the generated atlas in the same comparison input. Artwork remains visible, text uses original serif stack, controls read cleanly. No remaining P0/P1/P2 findings.

## Interactions and content

- Four phase selections expose the matching About link; selecting pauses rotation.
- Play resumes; automatic cycle observed moving from Transformation to Engineering.
- Transformation link arrived at `/about/#transformation`, with section aligned 112px from viewport top after smooth scrolling settled.
- All local links/fragments validated in built HTML.
- Both requested replacement paragraphs match source and rendered text; role trio and company URLs present. The final approved copy places the systems-and-roles paragraphs at the start of Transformation; I AM opens with the website paragraph.
- Mobile DOM reports no horizontal overflow; illustrated region has positive visible dimensions.
- Engineering's particle form inspected: hull, camera, outboard thrusters, tether, manipulator and skid.
- Browser error logs inspected: none observed.

## Limits / follow-up

- Reduced motion code-reviewed; no OS preference changed.
- Robin approved this design and the revised copy for deployment on 27 September 2026.
- Chinese/Japanese existing copy retained; not represented as revised translations.
- Source illustrations intentionally depict conceptual scenes, not historical photographs.
