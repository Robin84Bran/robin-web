# iamrobin.ai Visual Standards

Version: Website v1.2, July 2026

The visual system is a quiet zen garden: warm, spacious, slightly transient, and precise. It uses wabi-sabi restraint rather than decorative minimalism. Every surface should feel composed, but never over-resolved.

## 1. Color Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#f7f2ea` | Primary warm-white ground |
| `--color-canvas-deep` | `#ece8e1` | Lower-page depth and footer transition |
| `--color-surface` | `rgba(255, 252, 247, 0.78)` | Translucent card surface |
| `--color-surface-strong` | `rgba(255, 255, 255, 0.9)` | Higher-emphasis surface |
| `--color-ink` | `#342d27` | Primary text and structural marks |
| `--color-muted` | `#786f66` | Body copy, metadata, and quiet labels |
| `--color-accent` | `#bc9d70` | Sacred gold: actions, glyphs, small emphasis |
| `--color-accent-strong` | `#8d7050` | Stronger gold for readable emphasis |
| `--color-petal` | `#e8bccd` | Sakura atmosphere and organic motion |
| `--color-mist` | `#9fb6c9` | Moonlit mist and cooler balance |
| `--color-line` | `rgba(113, 96, 79, 0.14)` | Hairline borders and separators |

Color rules:

- Warm white carries the page; gold supplies judgment and structure.
- Sakura pink and mist blue remain atmospheric. They do not become button colors.
- Contrast is calm, but text readability takes priority over softness.
- Glows stay diffuse, low-opacity, and larger than the element they illuminate.

## 2. Typography Adjustments

The system uses one serif and one sans family.

- Display and major headings: `"Iowan Old Style"`, with Palatino and Georgia fallbacks.
- Navigation, labels, body, metadata, and actions: `"Avenir Next"`, with Segoe UI and Helvetica fallbacks.
- Display: `clamp(2.4rem, 4.6vw, 4.15rem)`, weight `500`, line-height `0.98`.
- Section heading: `clamp(1.7rem, 3vw, 2.55rem)`, weight `500`, line-height `1.1`.
- Card title: `clamp(1.38rem, 2.15vw, 1.85rem)`.
- Lead text: `clamp(1.2rem, 2vw, 1.55rem)`.
- Body: `1.05rem`, line-height `1.76`.
- Action: `0.98rem`, weight `600`.
- Metadata: `0.95rem`, line-height `1.55`.
- Eyebrow: `0.9rem`, weight `600`, tracking `0.18em`, uppercase where the language supports it.

Typography rules:

- Serif is reserved for identity, section hierarchy, and manuscript titles.
- Sans carries explanation and interface behavior.
- Chinese and Japanese inherit the same hierarchy and spacing, using native system glyph fallbacks.
- Line length stays editorial: approximately 34 to 62 characters depending on role.
- Small text must remain readable; delicacy comes from color and spacing, not undersizing.

## 3. Background Treatment

The background combines three restrained layers:

1. A vertical warm-white to pale-stone gradient.
2. Large blurred fields of sakura pink and mist blue.
3. A faint horizontal rhythm and top-light treatment.

Ambient behavior begins after three seconds without interaction:

- Cherry blossoms form gently near the upper edge before falling.
- A minority of particles are leaf forms in mist blue or muted botanical gold.
- Flowers and leaves move with individual drift, sway, rotation, and fall speed.
- Particles disappear at the viewport floor.
- New emission stops immediately when interaction resumes; existing particles finish naturally.

The implementation uses one transparent canvas, a device-pixel ratio capped at `2`, and a maximum of `20` desktop or `12` touch-sized particles.

## 4. Card Treatment

Cards are pale floating modules, not boxes.

- Radius: generally `2rem`.
- Border: warm hairline at roughly `10%` to `14%` opacity.
- Surface: translucent white-to-stone gradient.
- Shadow: broad and shallow, approximately `18px 42px rgba(71, 57, 45, 0.08)`.
- Inner highlight: one subtle white line at the top edge.
- Hover: no more than `2px` upward drift.
- Transition: approximately `700ms`, easing gently rather than snapping.

Cards should hold one clear idea. When copy becomes dense, remove explanation before adding chrome.

## 5. Hero Treatment

The hero is a disciplined two-column editorial composition:

- Left: identity, thesis, two actions, and the current lens.
- Right: one portrait object with generous air.
- Portrait ratio is preserved and the panel adapts to the image.
- The portrait links to `iamrobin.eth`.
- Light enters from above through a blurred radial field.
- Copy width is intentionally narrower than the available column.

Hero motion is limited to a soft rise on entry and slow ambient background breathing. The portrait may scale by approximately `1%` on hover.

## 6. Motion Rules

Motion expresses impermanence, growth, and return.

- Interface transitions: `500ms` to `700ms`.
- Initial content rise: `900ms` to `1100ms`.
- Ambient background drift: `30s` to `36s`.
- Idle threshold: `3s`.
- Pointer organism cycle: `18s`.
- No particle libraries, physics dependencies, or continuous DOM churn.

The pointer organism follows four phases:

1. A small stem emerges.
2. Mirrored spiral branches suggest DNA and code.
3. Leaves appear briefly.
4. The structure resolves into an Ouroboros ring and fades.

The Portfolio uses one continuous spatial system:

- Eight translucent petals share one tilted 3D plane.
- The full lotus completes one revolution in `72s`.
- Paired allocations orbit as opposing quantum nodes.
- Single allocations hold the nucleus while one electron circles them.
- Every icon uses the same `68px × 68px` interaction box and `40px × 40px` glyph viewport.
- On iPhone, every icon uses the same `52px × 52px` touch target and `32px × 32px` glyph viewport.
- The mobile lotus keeps all eight petals, with a shallower 3D pitch, a tighter orbit, and an `88s` revolution for easier inspection and tapping.
- Hovering or focusing an icon pauses its moving frame; a discreet pause control stops the full system.
- The portfolio suppresses the idle blossom and cursor layers so only one motion vocabulary is active.

Interaction rules:

- Motion is decorative and never captures pointer events.
- Moving, clicking, scrolling, typing, or touching stops new ambient generation.
- The pointer organism dismisses when the pointer moves.
- Pointer-specific motion runs only on fine-pointer devices.
- `prefers-reduced-motion: reduce` disables the blossom canvas, pointer organism, and nonessential entrance motion.
- At rest, motion should be discoverable. During use, the interface should become quiet again.
