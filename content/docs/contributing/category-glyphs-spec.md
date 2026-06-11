# Category glyph spec

Guidelines for the SVG pictograms on `/components` — one tile per docs category. Read this before adding or editing a category glyph.

**Files**

| File | Role |
|------|------|
| `animata/skeleton/category-glyphs.tsx` | Glyph SVG markup, `GLYPHS` map, hover Tailwind on animated parts |
| `animata/skeleton/category-glyphs.css` | Motion base classes, keyframe definitions, transition defaults |
| `animata/skeleton/category-skeleton.tsx` | Card frame; shade tokens on the tile SVG; scales glyph into the tile |
| `animata/skeleton/category-skeleton.stories.tsx` | Storybook preview per variant (`group/cg` decorator) |

**When you need a new glyph**

1. Add the category to `config/docs.ts` (`sidebarNav` + `href: "/docs/<slug>"`).
2. Add a category index MDX at `content/docs/<slug>/index.mdx`.
3. Add an entry to `GLYPHS` in `category-glyphs.tsx` keyed by the **slug** (e.g. `"bento-grid"`, not `"Bento grid"`).
4. Compose hover motion on animated parts in `category-glyphs.tsx` with `cn("cg-motion", …)` plus Tailwind `motion-safe:group-hover/cg:*` utilities (see Hover micro-interactions).
5. Add a Storybook story in `category-skeleton.stories.tsx`.
6. Confirm `/components` lists the category (via `lib/component-categories.ts` — automatic when published count > 0).

---

## Canvas

- **ViewBox:** `0 0 64 64`
- **Optical center:** `(32, 32)` — balance mass around this point, not just the bounding box.
- **Safe area:** keep meaningful ink inside ~`(8, 8)`–`(56, 56)` so the glyph survives scale on the card.
- **Style:** stroke-first, Apple-style pictograms. Literal symbol of the category (carousel = slide + peeks, overlay = modal over page), not abstract decoration.

---

## Color — exactly three shades

Defined on the tile SVG in `category-skeleton.tsx` via Tailwind arbitrary properties (`--cg-ink`, `--cg-soft`, `--cg-faint`). **Never hardcode hex or rgba in glyph markup.**

| Token | CSS var | Light mode | Dark mode | Use for |
|-------|---------|------------|-----------|---------|
| **INK** | `--cg-ink` | `#76756f` | `#e3e3e3` | Focal / active / interactive — primary strokes, CTAs, featured tier |
| **SOFT** | `--cg-soft` | `color-mix(in oklab, ink 50%, transparent)` | same formula | Supporting content — secondary bars, inactive labels, mid stack layers |
| **FAINT** | `--cg-faint` | `#e3e3e3` | `#76756f` | Surfaces, tracks, distant layers, **knockouts on INK fills** |

In TSX use the constants:

```tsx
const INK = "var(--cg-ink)";
const SOFT = "var(--cg-soft)";
const FAINT = "var(--cg-faint)";
```

**Shade = story, not decoration**

- Each shade must answer: *what layer is this?* (foreground / content / surface / background).
- **INK** = what the user should look at first (open accordion row, active tab, front card, modal frame).
- **SOFT** = readable but secondary (body lines, side peeks, closed rows).
- **FAINT** = structural chrome (panels, tracks, page behind a modal, back of a card stack).
- Do **not** use opacity to fake a fourth shade. Crossfade between tokens on hover (`fill` transition), not `opacity: 0.5` on INK.
- **Knockout labels:** text on an INK pill uses `fill={FAINT}` (see `button`, `hero` CTA). Same vocabulary everywhere.

---

## Stroke tiers

Match stroke weight to shade importance:

| Weight | Use |
|--------|-----|
| **2.2** | Primary object frames and seams (card outline, modal, image frame, wave lines, letterforms) |
| **2** | Interior details (clock dial, chevrons, FAB plus, inner rings) |
| **1.6** | Micro accessories (close ×, accordion ±, list avatar rings) |

Always `strokeLinecap="round"` and `strokeLinejoin="round"` on paths.

---

## Corner radius

| Element | `rx` |
|---------|------|
| Card-like frames (image, card stack, modal, skeleton frame, carousel slide) | **4** |
| Pills / segmented controls | **h / 2** (fully rounded) |
| Small bars | **h / 2** via `Bar` helper |
| Concentric clip inside a frame | **outer rx − inset** (e.g. frame `rx={4}` inset 2 → clip `rx={2}`) |

Do not mix `rx={3}`, `rx={3.5}`, `rx={6}` on the same object class.

---

## Helpers

**`Bar`** — horizontally centered rounded bar:

```tsx
<Bar cx={32} y={14} w={40} h={6} />           // INK title
<Bar cx={32} y={24} w={30} h={4} fill={SOFT} /> // subtitle
```

**`CategoryGlyph`** — renders `GLYPHS[variant]` or a default grid fallback.

---

## Hover micro-interactions

Hover transforms live in **TSX**, not CSS. Tag animated parts with `className={cn("cg-motion", …)}` and compose Tailwind utilities on the same element:

```tsx
className={cn(
  "cg-motion",
  "origin-left motion-safe:group-hover/cg:scale-x-125",
)}
```

- The tile ancestor must be **`group/cg`** (`Link` on `/components`, Storybook decorator) so `group-hover/cg:*` variants fire.
- `category-glyphs.css` does **not** define hover transforms. It only sets shared motion bases:
  - **`.cg-motion`** — `transform-box`, `transform-origin`, and transition properties (gated by `prefers-reduced-motion`).
  - **`.cg-motion-frame`** — same box/origin, no transform transition (for keyframe-driven parts so CSS animation is not fighting transitions).
  - **`.cg-progress-arc`** — `stroke-dasharray` transition only (no `transform-box`; conflicts with SVG rotate).
  - **`.cg-feature-tilt`** — resting `-8deg` tilt; pair with `motion-safe:group-hover/cg:rotate-0`.
- Keyframe loops (`animate-cg-ping`, `animate-cg-bounce`, etc.) are defined in `category-glyphs.css` `@theme` and applied via Tailwind on `cg-motion-frame` parts.
- Animation should **mimic the component category** (button swells, scroll rows translate, accordion content darkens to INK, container marquee slides).

---

## Checklist for a new glyph

- [ ] Literal, symmetric, recognizable at ~48px rendered size
- [ ] Mass centered on `(32, 32)`; no category feels heavier top/bottom vs peers
- [ ] Only `INK` / `SOFT` / `FAINT` — no raw colors
- [ ] Stroke tier matches role (2.2 / 2 / 1.6)
- [ ] Card frames use `rx={4}`; pills fully rounded
- [ ] Layer story is clear (which element is focal?)
- [ ] Hover behavior matches category semantics (optional but preferred)
- [ ] Decorative SVGs in stories: include `<title>` if Biome `noSvgWithoutTitle` fires
- [ ] Story added; spot-check light + dark on `/components`

---

## Reference glyphs

| Category | Layer story | Hover idea |
|----------|-------------|------------|
| `card` | FAINT → SOFT → INK stack back to front | Fan apart |
| `accordion` | Closed rows SOFT; open row INK + SOFT body | ± rotates; body → INK |
| `overlay` | SOFT page bars behind; FAINT modal + INK CTA | Modal scales; page dims |
| `container` | INK frame; SOFT/INK blocks clipped inside | Track marquees left |
| `scroll` | INK → SOFT → FAINT rows; thumb at top | Rows translate up |
| `button` | INK pill; FAINT knockout label | Pill scales; cursor presses |

---

## Card surface (do not change per glyph)

`category-skeleton.tsx` draws the tile background with theme-aware `currentColor` at low opacity. Glyphs inherit contrast from the three shade tokens on the tile SVG — do not add per-glyph background fills.

---

## Docs mirror

Published copy: [/docs/contributing/category-glyphs](/docs/contributing/category-glyphs). Keep this file in sync when you change the spec.
