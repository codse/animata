"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";

import BlurOutUp from "@/animata/text/blur-out-up";
import BottomUpLetters from "@/animata/text/bottom-up-letters";
import FadeThrough from "@/animata/text/fade-through";
import FocusBlurResolve from "@/animata/text/focus-blur-resolve";
import KineticCenterBuild from "@/animata/text/kinetic-center-build";
import LineByLineSlide from "@/animata/text/line-by-line-slide";
import MaskRevealUp from "@/animata/text/mask-reveal-up";
import MicroScaleFade from "@/animata/text/micro-scale-fade";
import PerCharacterRise from "@/animata/text/per-character-rise";
import PerWordCrossfade from "@/animata/text/per-word-crossfade";
import ScaleDownFade from "@/animata/text/scale-down-fade";
import SharedAxisY from "@/animata/text/shared-axis-y";
import SharedAxisZ from "@/animata/text/shared-axis-z";
import ShimmerSweep from "@/animata/text/shimmer-sweep";
import ShortSlideDown from "@/animata/text/short-slide-down";
import ShortSlideRight from "@/animata/text/short-slide-right";
import SoftBlurIn from "@/animata/text/soft-blur-in";
import SpringScaleIn from "@/animata/text/spring-scale-in";
import TopDownLetters from "@/animata/text/top-down-letters";
import Typewriter from "@/animata/text/typewriter";

type Preset = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType<{ className?: string }>;
};

const PRESETS: Preset[] = [
  {
    id: "soft-blur-in",
    title: "Soft Blur",
    description:
      "Per-character fade-in with a gentle blur and upward motion. Apple's signature hero-title reveal.",
    Component: SoftBlurIn,
  },
  {
    id: "per-character-rise",
    title: "Per-Character Rise",
    description:
      "Letters slide up from below with no blur — crisp, deliberate, kinetic. Apple's clean tvOS-style reveal.",
    Component: PerCharacterRise,
  },
  {
    id: "per-word-crossfade",
    title: "Per-Word Crossfade",
    description:
      "Words gently fade into place one after another, with a short vertical drift for a calm keynote rhythm.",
    Component: PerWordCrossfade,
  },
  {
    id: "spring-scale-in",
    title: "Spring Scale In",
    description:
      "Words pop in with a soft overshoot scale, like a physical spring settling into place.",
    Component: SpringScaleIn,
  },
  {
    id: "mask-reveal-up",
    title: "Mask Reveal Up",
    description: "Lines reveal upward with a soft masked feel and compact stagger.",
    Component: MaskRevealUp,
  },
  {
    id: "line-by-line-slide",
    title: "Line-by-Line Slide",
    description:
      "Each line enters from the left with a staggered slide and exits to the right for a flowing paragraph reveal.",
    Component: LineByLineSlide,
  },
  {
    id: "typewriter",
    title: "Typewriter",
    description: "Per-character stepped reveal with a minimal editorial typing rhythm.",
    Component: Typewriter,
  },
  {
    id: "micro-scale-fade",
    title: "Micro Scale Fade",
    description: "A calm, tiny scale pop used as subtle premium polish for labels and headings.",
    Component: MicroScaleFade,
  },
  {
    id: "shimmer-sweep",
    title: "Shimmer Sweep",
    description:
      "A subtle sweep across a clean headline, blending in while gliding from left to center.",
    Component: ShimmerSweep,
  },
  {
    id: "fade-through",
    title: "Fade Through",
    description:
      "A Material-style content transition: old fades out, new fades in with a soft delay.",
    Component: FadeThrough,
  },
  {
    id: "shared-axis-y",
    title: "Shared Axis Y",
    description: "Per-word hard-cut transition with staircase timing for sharp editorial swaps.",
    Component: SharedAxisY,
  },
  {
    id: "shared-axis-z",
    title: "Shared Axis Z",
    description: "Scale-based shared-axis transition for focus shifts and context depth.",
    Component: SharedAxisZ,
  },
  {
    id: "blur-out-up",
    title: "Blur Out Up",
    description: "Words arrive clean and depart upward with increasing blur for airy exits.",
    Component: BlurOutUp,
  },
  {
    id: "scale-down-fade",
    title: "Scale Down Fade",
    description: "Subtle premium settle-in with a restrained scale-down fade on exit.",
    Component: ScaleDownFade,
  },
  {
    id: "focus-blur-resolve",
    title: "Focus Blur Resolve",
    description: "A premium focus pull from heavy blur to crisp text, then a soft blur-out exit.",
    Component: FocusBlurResolve,
  },
  {
    id: "bottom-up-letters",
    title: "Bottom-Up Letters",
    description:
      "Letters rise from below in a pronounced staircase, one symbol at a time, with zero blur.",
    Component: BottomUpLetters,
  },
  {
    id: "top-down-letters",
    title: "Top-Down Letters",
    description:
      "Letters descend from above in a pronounced staircase, one symbol at a time, with zero blur.",
    Component: TopDownLetters,
  },
  {
    id: "kinetic-center-build",
    title: "Kinetic Center Build",
    description:
      "A word appears in the center; each new word enters from right to left with a soft blur and pushes the existing line until the full phrase locks centered.",
    Component: KineticCenterBuild,
  },
  {
    id: "short-slide-right",
    title: "Short Slide Right",
    description:
      "The whole phrase glides in from the left as one compact move, while the words themselves are revealed in sequence only through opacity.",
    Component: ShortSlideRight,
  },
  {
    id: "short-slide-down",
    title: "Short Slide Down",
    description:
      "Each new word drops in from above into its own line and pushes the existing stack downward until a centered three-line composition locks in place.",
    Component: ShortSlideDown,
  },
];

function LazyTile({ preset }: { preset: Preset }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const { Component } = preset;

  return (
    <article ref={ref} className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        {visible ? <Component className="absolute inset-0" /> : null}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{preset.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{preset.description}</p>
      </div>
    </article>
  );
}

export default function TextAnimationsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Text Animations</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          Twenty keynote-style text effects. Each tile below lazy-mounts when it scrolls into view,
          so animations only run when you can see them.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PRESETS.map((preset) => (
          <LazyTile key={preset.id} preset={preset} />
        ))}
      </div>
    </div>
  );
}
