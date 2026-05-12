"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { memo, type ReactNode, useCallback, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export type FeatureTone = "blue" | "cyan" | "emerald" | "violet" | "amber" | "rose";

export interface FeatureGridItem {
  icon: ReactNode;
  title: string;
  description: string;
  /** Optional large statistic to show a compact metric card (e.g. "55%") */
  metric?: string;
  /** Small caption under the metric (optional) */
  metricCaption?: string;
  tone?: FeatureTone;
}

export interface FeatureCardProps {
  item: FeatureGridItem;
  index: number;
  className?: string;
}

const toneMap: Record<
  FeatureTone,
  {
    glow: string;
    border: string;
    icon: string;
    accent: string;
  }
> = {
  blue: {
    glow: "rgba(56, 189, 248, 0.55)",
    border: "from-sky-400/0 via-sky-300/70 to-cyan-400/0",
    icon: "bg-sky-500/15 text-sky-200 ring-sky-400/15",
    accent: "from-sky-400/12 via-transparent to-transparent",
  },
  cyan: {
    glow: "rgba(34, 211, 238, 0.5)",
    border: "from-cyan-400/0 via-cyan-300/70 to-teal-400/0",
    icon: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/15",
    accent: "from-cyan-400/12 via-transparent to-transparent",
  },
  emerald: {
    glow: "rgba(52, 211, 153, 0.52)",
    border: "from-emerald-400/0 via-emerald-300/70 to-lime-400/0",
    icon: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/15",
    accent: "from-emerald-400/12 via-transparent to-transparent",
  },
  violet: {
    glow: "rgba(167, 139, 250, 0.52)",
    border: "from-violet-400/0 via-violet-300/70 to-fuchsia-400/0",
    icon: "bg-violet-500/15 text-violet-200 ring-violet-400/15",
    accent: "from-violet-400/12 via-transparent to-transparent",
  },
  amber: {
    glow: "rgba(251, 191, 36, 0.48)",
    border: "from-amber-400/0 via-amber-300/70 to-orange-400/0",
    icon: "bg-amber-500/15 text-amber-100 ring-amber-300/15",
    accent: "from-amber-400/12 via-transparent to-transparent",
  },
  rose: {
    glow: "rgba(244, 114, 182, 0.5)",
    border: "from-rose-400/0 via-rose-300/70 to-pink-400/0",
    icon: "bg-rose-500/15 text-rose-100 ring-rose-300/15",
    accent: "from-rose-400/12 via-transparent to-transparent",
  },
};

const springConfig = {
  stiffness: 180,
  damping: 22,
  mass: 0.7,
};

function getTone(tone: FeatureTone = "blue") {
  return toneMap[tone] ?? toneMap.blue;
}

function FeatureCardImpl({ item, index, className }: Readonly<FeatureCardProps>) {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [isActive, setIsActive] = useState(false);

  const trackingEnabled = hasFinePointer && !shouldReduceMotion;
  const tone = getTone(item.tone);

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(35);
  const spotlightOpacity = useMotionValue(0);
  const borderGlow = useMotionValue(0);

  const smoothX = useSpring(spotlightX, springConfig);
  const smoothY = useSpring(spotlightY, springConfig);
  const smoothOpacity = useSpring(spotlightOpacity, {
    stiffness: 160,
    damping: 24,
    mass: 0.7,
  });
  const smoothBorderGlow = useSpring(borderGlow, {
    stiffness: 160,
    damping: 24,
    mass: 0.7,
  });

  const spotlightBackground = useMotionTemplate`
    radial-gradient(circle at ${smoothX}% ${smoothY}%, ${tone.glow} 0%, rgba(255, 255, 255, 0.12) 16%, transparent 64%)
  `;

  const handlePointerMove = useCallback<React.PointerEventHandler<HTMLElement>>(
    (event) => {
      if (!trackingEnabled) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
      const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;

      spotlightX.set(Math.max(0, Math.min(100, nextX)));
      spotlightY.set(Math.max(0, Math.min(100, nextY)));
    },
    [spotlightX, spotlightY, trackingEnabled],
  );

  const activate = useCallback(() => {
    setIsActive(true);
    spotlightOpacity.set(trackingEnabled ? 1 : 0.85);
    borderGlow.set(1);

    if (!trackingEnabled) {
      spotlightX.set(50);
      spotlightY.set(35);
    }
  }, [borderGlow, spotlightOpacity, spotlightX, spotlightY, trackingEnabled]);

  const deactivate = useCallback(() => {
    setIsActive(false);
    spotlightOpacity.set(0);
    borderGlow.set(0);
  }, [borderGlow, spotlightOpacity]);

  return (
    <motion.article
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
      className={cn(
        "group relative isolate flex h-full min-h-[180px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-px shadow-[0_1px_0_rgba(255,255,255,0.05),0_24px_60px_rgba(2,6,23,0.34)] outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 dark:border-white/8 dark:bg-slate-950/40",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100",
          "bg-linear-to-r",
          tone.border,
        )}
        style={{
          opacity: smoothOpacity,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.12) 18%, rgba(255,255,255,0.02) 38%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0.08) 100%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-px rounded-[27px] bg-linear-to-b from-slate-950/92 via-slate-950/88 to-slate-900/96 backdrop-blur-xl dark:from-slate-950/92 dark:via-slate-950/86 dark:to-slate-900/94",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        )}
        initial={false}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                boxShadow: isActive
                  ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 22px 55px rgba(2,6,23,0.42)"
                  : "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 36px rgba(2,6,23,0.26)",
              }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
        style={{ opacity: smoothBorderGlow }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
        style={{ opacity: smoothOpacity, backgroundImage: spotlightBackground }}
      />

      {trackingEnabled ? null : (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.1),transparent_40%)]",
            "dark:bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.1),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.08),transparent_40%)]",
          )}
        />
      )}

      <div className="relative z-10 flex h-full flex-col gap-5 rounded-[27px] border border-white/6 bg-white/4 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-colors duration-300 group-hover:bg-white/5.5 group-focus-visible:bg-white/5.5 dark:bg-white/3">
        {item.metric ? (
          // Metric-style compact card (styled to match the screenshot)
          <div className="mx-auto flex h-full w-full max-w-[252px] flex-col justify-between">
            <div className="flex h-full min-h-[224px] flex-col justify-between rounded-[28px] bg-slate-900/95 p-5 ring-1 ring-black/30 shadow-[0_8px_22px_rgba(2,6,23,0.35)]">
              <div className="flex items-center justify-between">
                <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10", tone.icon)}>
                  {item.icon}
                </div>

                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Insight
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="text-[3.45rem] font-extrabold leading-none tracking-[-0.08em] text-white sm:text-[3.75rem]">
                  {item.metric}
                </div>
              </div>

              <div className="h-px w-full bg-white/8" />
            </div>

            <div className="mt-3 text-xs font-medium text-slate-400" />
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ring-1 shadow-[0_10px_30px_rgba(2,6,23,0.18)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105",
                  tone.icon,
                )}
              >
                {item.icon}
              </div>

              <div
                aria-hidden="true"
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50 transition-colors duration-300",
                  "border-white/10 bg-white/3",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-white sm:text-[17px]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300/90 sm:text-[15px]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full bg-current opacity-70", tone.accent)} />
                  <span>Hover or focus for detail</span>
                </span>
                <span className="text-slate-500/80 transition-colors duration-300 group-hover:text-slate-300 group-focus-visible:text-slate-300">
                  Premium motion
                </span>
              </div>
            </div>
          </>
        )}

        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100",
            tone.accent,
          )}
          animate={
            shouldReduceMotion || !isActive
              ? { opacity: 0 }
              : {
                  opacity: 1,
                  x: [0, 5, 0],
                  y: [0, -3, 0],
                }
          }
          transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
    </motion.article>
  );
}

export const FeatureCard = memo(FeatureCardImpl);

export default FeatureCard;
