# Animata — Claude Code Instructions

## Project overview

Animata is a free, open-source library of animated React components built with Next.js 16, Tailwind CSS v4, and TypeScript. Components live in `animata/` and are documented via MDX in `content/docs/`. The site itself is the primary showcase — the landing page at `app/(main)/page.tsx` and the docs at `app/(main)/docs/`.

## Key conventions

- Components go in `animata/<category>/<name>.tsx` with a matching `<name>.stories.tsx`
- Use `cn()` from `@/lib/utils` for class merging — never raw string concatenation
- CSS animations belong in inline `<style>` blocks inside the component (see `marquee.tsx`)
- No CSS modules, no styled-components — Tailwind only
- Fonts: `--font-display` = Young Serif (headings/display), `--font-sans` = IBM Plex Sans (body), `--font-mono` = Lilex
- Brand yellow: `#ffcc00` (from logo) — use for highlights and badges
- shadcn registry URL format: `https://animata.design/r/{category}/{name}.json` — always use this in docs/changelog, never bare `npx shadcn add component-name`
- Theme accent: `hsl(var(--accent))` = purple/violet
- All new components must be theme-responsive (light + dark)

## Changelog rule — ALWAYS update this

The changelog lives at `content/docs/changelog/` — one MDX file per month plus an index.

### Structure

```
content/docs/changelog/
  index.mdx        # overview page — shows 2 most recent months + table linking all others
  2026-04.mdx      # April 2026 (newest first)
  2026-03.mdx
  ...
```

### When adding a new month

1. Create `content/docs/changelog/YYYY-MM.mdx` with this frontmatter:
   ```yaml
   ---
   title: Month YYYY
   description: One-line summary of the main themes.
   date: YYYY-MM-DD
   ---
   ```
2. Write the content as prose, not bullet lists. Each new component gets a short paragraph — what it is, when you'd use it, anything notable about the implementation.
3. Add the new month to `config/docs.ts` under the Changelog items array (newest first).
4. Update `content/docs/changelog/index.mdx`: promote the new month to "Recent releases" and move the oldest of the current two into the table.

### When updating an existing month

Add to the relevant `YYYY-MM.mdx` file. No need to touch the index unless the summary line there is now misleading.

### What warrants a changelog entry

| Action | Update changelog? |
|---|---|
| New component | Yes — new section in the current month file |
| Landing/docs UI update | Yes — brief paragraph |
| Major dependency upgrade | Yes — explain what changed and why it matters |
| User-visible bug fix | Yes — one sentence is fine |
| Dependency patch bumps | No |
| CI / GitHub Actions only | No |
| Typo fix in docs | No |

### Writing style

- Past tense. "Added X" not "We're excited to announce X."
- No emojis, no prefix symbols (no ✨ 🛠 🐛).
- Each component gets a description of what it does and when you'd use it — not just its name.
- If a fix has a root cause worth knowing, say so briefly.

## File map (quick reference)

```
animata/               # Component source (copy-paste friendly)
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
  changelog.mdx        # ← KEEP THIS UPDATED
  contributing/        # Contributor guides
config/
  docs.ts              # Sidebar nav config — register new component categories here
styles/globals.css     # Tailwind v4 theme tokens
```

## Running locally

```bash
yarn dev        # Next.js dev server
yarn storybook  # Component workbench
yarn build      # Production build
```
