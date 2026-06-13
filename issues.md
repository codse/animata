# React Doctor — remediation log

Baseline scan: **602 source files**, Next.js 16 + React 19.  
Final scan: **0 errors, 0 warnings** (`npx -y react-doctor@latest . -y --no-telemetry`).

## How to re-run

```bash
# Full scan
npx -y react-doctor@latest . -y --verbose

# Lint only (faster)
npx -y react-doctor@latest . -y --no-dead-code

# PR diff (matches CI)
pnpm dlx react-doctor@latest . -y --diff main --blocking error
```

Always pass `-y` on macOS — the interactive project picker can fail with `spawn Unknown system error -86`.

Config: [`doctor.config.ts`](doctor.config.ts)  
CI: [`.github/workflows/react-doctor.yml`](.github/workflows/react-doctor.yml)

---

## Baseline (before)

| Metric | Count |
|--------|-------|
| Errors | 11 |
| Warnings | 491–575 |
| Dead-code items | 77 |

Top rules at baseline: `no-react19-deprecated-apis` (55), `use-lazy-motion` (44), `no-array-index-as-key` (42), `nextjs-no-img-element` (36), `button-has-type` (31).

---

## P0 — Errors fixed (11/11)

| File | Rule | Fix |
|------|------|-----|
| `components/copy-button.tsx` ×4 | `effect-needs-cleanup` | `hooks/use-copy-reset.ts` — reset timer keyed on `hasCopied` with cleanup |
| `animata/text/counter.tsx` | `effect-needs-cleanup` | `useMotionValueEvent` instead of manual `springValue.on` subscription |
| `animata/card/card-stack.tsx` | `no-adjust-state-on-prop-change` | Render-time sync when `items` prop changes |
| `animata/text/roll-text.tsx` | same | Render-time sync when `disabled` changes |
| `animata/text/typing-text.tsx` | same | Derived `isComplete` from `index` / `total` / `repeat` |
| `animata/text/text-animator.tsx` | same | Render-time reset of `failed` on content key change |
| `components/sidebar-nav.tsx` | same | Render-time edge reset when `enabled` toggles |
| `components/in-view.tsx` | same | `key={rootMargin}` remounts observer subtree |
| `animata/text/circular-text.tsx` | `jsx-key` | Stable keys on character spans |

---

## P1 — Security

- [x] **`pnpm-workspace.yaml`** — `minimumReleaseAge: 10080`, `trustPolicy: no-downgrade`, plus `trustPolicyExclude` for four legacy transitive packages required for install
- [x] **`no-danger`** — documented overrides for JSON-LD (`blog-json-ld`, `doc-json-ld`) and trusted demo panels in `doctor.config.ts`

---

## P2 — Dead code audit

### Deleted (confirmed orphans)

| File | Reason |
|------|--------|
| `components/announcement.tsx` | Superseded by `animata/container/announcement-ribbon` |
| `components/drawer.tsx` | Superseded by Radix Sheet / `mobile-nav` |
| `components/header-dock-item.tsx` | No importers |
| `components/main-nav.tsx` | Superseded by inline nav in `site-header` |
| `components/shapes/*` (except `card-stack-mask-defs.tsx`) | Duplicated masks; barrel unused |
| `app/(main)/_landing/mode-switcher.tsx` | Superseded by `components/mode-toggle` |
| `app/(main)/_landing/thunder.tsx` | Orphan decorative SVG |

### Archived (kept for future landing variants)

Moved to `app/(main)/_landing/_archive/`:

- `beam-cta`, `card-stack-bento`, `component-gallery`, `grid-view`, `hero`, `hero-showcase`, `hero-title`, `hero-variants`, `highlight`, `reveal`, `skeleton-section`, `tech-stack`, `why-animata`, `widget-section`, `wound-and-promise`

Also archived: `components/component-card.tsx`, `footer-stamp.tsx`, `resources/grid-backdrop.tsx`, `app/demo/library/shared/card-stack-people.ts`, `profile-stack-card.tsx`

Archive paths are ignored for `deslop/unused-file` in `doctor.config.ts`.

### Kept (intentional utilities)

| File | Reason |
|------|--------|
| `hooks/use-lock-body.ts` | Standard shadcn-style hook |
| `hooks/use-media-query.ts` | Same |
| `hooks/use-mobile.tsx` | Same |
| `hooks/use-mutation-observer.ts` | Same |

### Dependencies removed

`@xyflow/react`, `commander`, `date-fns`, `schema-dts`, `sonner`, `unist-builder`, `@rehype-pretty/transformers`, `vaul`

### Dependencies kept

`wrangler` — used by `scripts/build-og-images.mjs`, `scripts/upload-og-r2.mjs`, CI (react-doctor false positive)

---

## P3 — Code quality fixes (highlights)

### Mechanical

- [x] `type="button"` on 26+ non-submit buttons
- [x] Metadata on `credits/page.tsx`, `text-animations/page.tsx`
- [x] Hydration fixes: `led-board`, `flipping-cards`, `expense-tracker`, `footer-wordmark`
- [x] React 19: removed `forwardRef` from `components/ui/*` and flagged animata files

### Motion

- [x] **LazyMotion reverted (2026-06-13)** — full `motion` from `motion/react` is intentional. Animata is a motion library; `LazyMotion`/`m` added boilerplate and caused bugs (e.g. `trailing-image`). `react-doctor/use-lazy-motion` disabled globally in `doctor.config.ts`.

### Accessibility

- [x] Labels / `htmlFor` on toggle-switch, email-feature-card, reminder-scheduler
- [x] Div-onClick → `<button>` or keyboard handlers across cards, modals, grids
- [x] `aria-label` on icon-only controls

### State / effects

- [x] Derived state refactors in card-stack, pricing, typing-text, team-clock, component-preview, and others
- [x] Unused exports trimmed from demo-registry, site-stats, pager, icons, footer-grid, resources

---

## P4 — `doctor.config.ts` overrides

Rules turned **off globally** (copy-paste library defaults):

- `nextjs-no-img-element` — raw `<img>` is intentional in registry components
- `no-array-index-as-key` — many animation demos require index keys

Path-scoped **ignores** document intentional patterns:

- `_archive/**` — preserved landing sections
- `hooks/**` — utility hooks kept for future use
- `animata/**` — co-located helpers, multi-component files, long transitions, perf hints
- Per-file overrides for shooting-stars (ResizeObserver seeding), component-preview (dynamic story import), sidebar-nav (scroll edge logic)

See [`doctor.config.ts`](doctor.config.ts) for the full list.

---

## Wire-up candidates (not done)

These archived sections could be re-added to [`home-page.tsx`](app/(main)/_landing/home-page.tsx) if desired:

| Section | File |
|---------|------|
| How it works | `_archive/wound-and-promise.tsx` |
| Tech stack strip | `_archive/tech-stack.tsx` |
| Card stack bento showcase | `_archive/card-stack-bento.tsx` |

---

## Verification

```bash
npx -y react-doctor@latest . -y --no-telemetry   # 0 errors, 0 warnings
pnpm exec tsc --noEmit                             # pass
pnpm lint                                          # biome
pnpm build                                         # production build
```

---

## Appendix — rule disposition summary

| Disposition | Rules |
|-------------|-------|
| **Fixed in code** | All 11 errors; button-has-type; forwardRef; hydration; most a11y |
| **Reverted** | LazyMotion migration — full `motion` kept on purpose |
| **Removed deps** | 8 unused packages |
| **Archived files** | 20 files moved to `_archive/` |
| **Deleted files** | 7 confirmed orphans + shapes folder |
| **Config override** | img/key globals off; animata maintainability/perf; JSON-LD no-danger; archive unused-file |

Generated from react-doctor v0.5.1 scan on 2026-06-12.
