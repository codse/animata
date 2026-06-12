# Animata — Claude Code Instructions

## Project overview

Animata is a free, open-source library of animated React components built with Next.js 16, Tailwind CSS v4, and TypeScript. Components live in `animata/` and are documented via MDX in `content/docs/`. The site itself is the primary showcase — the landing page at `app/(main)/page.tsx` and the docs at `app/(main)/docs/`.

## Key conventions

- Components go in `animata/<category>/<name>.tsx` with a matching `<name>.stories.tsx`
- Use `cn()` from `@/lib/utils` for class merging — never raw string concatenation
- Tailwind for layout, color, spacing, and transitions on the component itself
- Co-located `<name>.css` imported from the TSX for keyframes, pseudo-elements, and selectors Tailwind cannot express (see `roll-text.tsx`, `metis-text.tsx`)
- No inline `<style>` blocks — use co-located `<name>.css` imported from the TSX (see `marquee.tsx`, `roll-text.tsx`)
- No CSS modules, no styled-components
- Fonts: `--font-display` = Instrument Sans (headings/display), `--font-sans` = IBM Plex Sans (body), `--font-mono` = Lilex
- Brand yellow: `#ffcc00` (from logo) — use for highlights and badges
- shadcn registry URL format: `https://animata.design/r/{category}/{name}.json` — always use this in docs/changelog, never bare `npx shadcn add component-name`
- Theme accent: `hsl(var(--accent))` = purple/violet
- All new components must be theme-responsive (light + dark)
- **New component category?** Add a category glyph for `/components` — read `content/docs/contributing/category-glyphs.mdx` (three-shade tokens, stroke tiers, `cg-motion` hover). Full repo spec: `content/docs/contributing/category-glyphs-spec.md`. Do not put spec markdown under `animata/` (webpack lazy-loads that tree).

## Changelog rule — ALWAYS update this

Release notes use **four tiers**. Full process, examples, and checklist: [contributing changelog](/docs/contributing/changelog).

| Tier | Where | Length |
| --- | --- | --- |
| 1 — Site overview | `content/docs/changelog/index.mdx` | One line per month |
| 2 — Monthly release | `content/docs/changelog/YYYY-MM.mdx` | Paragraph + component cards |
| 3 — Category index | `content/docs/{category}/index.mdx` | Table: date · component · change |
| 4 — Component doc | `content/docs/{category}/{name}.mdx` → `## Changelog` | Dated bullets, most detail |

```text
content/docs/changelog/
  index.mdx        # tier 1 — recent months + table of all months
  YYYY-MM.mdx      # tier 2 — one file per month (newest first)
content/docs/{category}/
  index.mdx        # tier 3 — Recent changes table
  {name}.mdx       # tier 4 — ## Changelog at bottom
```

### When adding a new month

1. Create `content/docs/changelog/YYYY-MM.mdx` with frontmatter (`title`, `description`, `date`).
2. Write tier-2 prose and `<ChangeLogEntry>` blocks — see [contributing changelog](/docs/contributing/changelog).
3. Add the month to `config/docs.ts` under Changelog (newest first).
4. Update tier 1 in `changelog/index.mdx`: promote to **Recent releases**, demote oldest to **All releases**.

### When updating an existing month

Add to the relevant `YYYY-MM.mdx`. Update tier 3 (category index table) and tier 4 (component `## Changelog`). Touch tier 1 only if the month summary line is now misleading.

### What warrants a changelog entry

| Action | Update? |
| --- | --- |
| New component | All four tiers |
| User-visible update or fix | Tiers 2–4; tier 1 if it shapes the month |
| Landing/docs UI (site-wide) | Tiers 1–2 |
| Major dependency upgrade | Tiers 1–2 |
| Dependency patch bumps | No |
| CI / GitHub Actions only | No |
| Typo fix in docs | No |

### Writing style

- Past tense. "Added X" not "We're excited to announce X."
- No emojis, no prefix symbols.
- Detail increases down the tiers — one line at the top, bullets at the component doc.

## File map (quick reference)

```text
animata/               # Component source (copy-paste friendly)
  skeleton/
    category-glyphs.tsx    # /components tile SVG pictograms (GLYPHS map)
    category-glyphs.css    # cg-motion base + SVG scale/rotate hover exceptions
    category-skeleton.tsx  # Tile frame + shade tokens
  container/           # Layout wrappers (marquee, dock, ribbon…)
  text/                # Text animation effects
  button/              # Button variants
  card/                # Card components
  widget/              # Complex interactive widgets
app/(main)/
  page.tsx             # Landing page
  _landing/            # Landing page sections
  docs/                # Docs app shell
components/
  site-header.tsx      # Top nav
  icons.tsx            # SVG icon set (logo is here — brand yellow #ffcc00)
content/docs/
  changelog/
    index.mdx          # overview + table of all months — ← KEEP THIS UPDATED
    YYYY-MM.mdx        # one file per month (e.g. 2026-04.mdx)
  contributing/
    category-glyphs.mdx      # Category tile SVG guide (published)
    category-glyphs-spec.md  # Full spec — keep in sync; not under animata/
    changelog.mdx            # Four-tier release notes process
config/
  docs.ts              # Sidebar nav config — register new component categories here
styles/globals.css     # Tailwind v4 theme tokens
```

## Running locally

```bash
pnpm dev        # Next.js dev server
pnpm storybook  # Component workbench
pnpm build      # Production build
```
