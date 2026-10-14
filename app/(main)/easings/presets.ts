import { type CubicBezier, duration, ease } from "@/lib/motion";

export type EasingGroup = "animata" | "classic" | "baseline";

export type EasingPreset = {
  id: string;
  name: string;
  group: EasingGroup;
  bezier: CubicBezier;
  /** Suggested duration in milliseconds. */
  duration: number;
  /** What it suits, in a few words. */
  use: string;
  /** One sentence on how it feels. */
  note: string;
};

const ms = (seconds: number) => Math.round(seconds * 1000);

export const PRESETS: EasingPreset[] = [
  {
    id: "out",
    name: "Out",
    group: "animata",
    bezier: ease.out,
    duration: ms(duration.base),
    use: "Menus, popovers, toasts",
    note: "Starts immediately and spends most of its time settling, so a response never feels late.",
  },
  {
    id: "snap",
    name: "Snap",
    group: "animata",
    bezier: ease.snap,
    duration: ms(duration.fast),
    use: "Press, toggles, hover",
    note: "Almost all of the movement happens in the first frames. Reads as instant without a jump.",
  },
  {
    id: "in-out",
    name: "In-out",
    group: "animata",
    bezier: ease.inOut,
    duration: 420,
    use: "Tabs, drawers, layout moves",
    note: "Leaves smoothly, then takes its time to land. For things that travel across the screen.",
  },
  {
    id: "glide",
    name: "Glide",
    group: "animata",
    bezier: ease.glide,
    duration: 800,
    use: "Page transitions, hero reveals",
    note: "A slow gather, a decisive sweep, and a long soft landing. Give it room: 600ms and up.",
  },
  {
    id: "overshoot",
    name: "Overshoot",
    group: "animata",
    bezier: ease.overshoot,
    duration: 480,
    use: "Badges, success, playful arrivals",
    note: "Passes its target slightly and settles back. Use sparingly so it stays special.",
  },
  {
    id: "quart-out",
    name: "Quart out",
    group: "classic",
    bezier: [0.25, 1, 0.5, 1],
    duration: 400,
    use: "General UI",
    note: "A calmer ease-out with a softer finish. A safe default for most interfaces.",
  },
  {
    id: "circ-out",
    name: "Circ out",
    group: "classic",
    bezier: [0, 0.55, 0.45, 1],
    duration: 400,
    use: "Sliding panels",
    note: "Fast out of the gate with an even, round deceleration.",
  },
  {
    id: "sheet",
    name: "Sheet",
    group: "classic",
    bezier: [0.32, 0.72, 0, 1],
    duration: 500,
    use: "Bottom sheets, drawers",
    note: "The curve mobile sheets use: confident start, long glide into place.",
  },
  {
    id: "emphasized",
    name: "Emphasized",
    group: "classic",
    bezier: [0.05, 0.7, 0.1, 1],
    duration: 450,
    use: "Entering elements",
    note: "A strong deceleration for things arriving on screen, in the style of Material 3.",
  },
  {
    id: "css-ease",
    name: "CSS ease",
    group: "baseline",
    bezier: [0.25, 0.1, 0.25, 1],
    duration: 300,
    use: "Browser default",
    note: "What `transition` uses when you don't choose. Compare it with Out to see the difference.",
  },
  {
    id: "css-ease-in-out",
    name: "CSS ease-in-out",
    group: "baseline",
    bezier: [0.42, 0, 0.58, 1],
    duration: 300,
    use: "Loops, not responses",
    note: "Symmetric and slow to start. Fine for looping motion; it makes UI responses feel late.",
  },
  {
    id: "linear",
    name: "Linear",
    group: "baseline",
    bezier: [0, 0, 1, 1],
    duration: 300,
    use: "Progress, spinners",
    note: "Constant speed. Mechanical for movement, right for progress and continuous rotation.",
  },
];

export const GROUP_LABELS: Record<EasingGroup, string> = {
  animata: "Animata",
  classic: "Classics",
  baseline: "Baselines",
};

export function findPreset(id: string | null | undefined) {
  return PRESETS.find((preset) => preset.id === id) ?? null;
}

export function sameBezier(a: CubicBezier, b: CubicBezier) {
  return a.every((value, index) => Math.abs(value - b[index]) < 0.0005);
}
