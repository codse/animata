/**
 * Motion tokens for JavaScript animation (Motion, WAAPI). Mirrors the --ease-* tokens in
 * styles/globals.css; keep both in sync.
 */

export type CubicBezier = readonly [number, number, number, number];

export const ease = {
  /** UI responses: hover, press, menus, toasts. */
  out: [0.22, 1, 0.36, 1],
  /** Exits only, kept short. */
  in: [0.64, 0, 0.78, 0],
  /** On-screen moves between two states. */
  inOut: [0.4, 0, 0, 1],
  /** Large, expressive moves: page transitions, hero reveals. */
  glide: [0.65, 0, 0.05, 1],
  /** Micro feedback that should feel instant. */
  snap: [0.16, 1, 0.3, 1],
  /** Playful arrivals with a small overshoot. */
  overshoot: [0.34, 1.56, 0.64, 1],
} as const satisfies Record<string, CubicBezier>;

/** Seconds, for Motion. Multiply by 1000 for CSS or WAAPI. */
export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  epic: 1.2,
} as const;

/** Delay between items in a list or a split headline. */
export const stagger = {
  tight: 0.03,
  base: 0.05,
  loose: 0.08,
} as const;

export function toCssBezier([x1, y1, x2, y2]: CubicBezier) {
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}
