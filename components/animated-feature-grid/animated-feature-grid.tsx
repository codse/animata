"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { FeatureCard, type FeatureGridItem } from "./feature-card";

export interface AnimatedFeatureGridProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  items: readonly FeatureGridItem[];
  layout?: "stacked" | "split";
  columns?: 2 | 3 | 4;
  className?: string;
  gridClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  spotlightClassName?: string;
  renderFooter?: ReactNode;
}

function getColumnClasses(columns: 2 | 3 | 4) {
  if (columns === 2) return "md:grid-cols-2";
  if (columns === 4) return "md:grid-cols-2 xl:grid-cols-4";
  return "md:grid-cols-2 xl:grid-cols-3";
}

export function AnimatedFeatureGrid({
  title = "Feature grid",
  description = "A premium, interactive feature layout with polished motion, spotlight glow, and responsive behavior.",
  eyebrow = "Product highlights",
  items,
  layout = "stacked",
  columns = 3,
  className,
  gridClassName,
  headerClassName,
  contentClassName,
  spotlightClassName,
  renderFooter,
}: Readonly<AnimatedFeatureGridProps>) {
  const reduceMotion = useReducedMotion();
  const isSplit = layout === "split";

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white px-5 py-8 text-slate-950 shadow-lg sm:px-6 sm:py-10 dark:border-white/8 dark:bg-slate-950 dark:text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]",
          "bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_center,black,transparent_84%)]",
        )}
      />

      <div className={cn("relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", contentClassName)}>
        <div
          className={cn(
            "mx-auto grid gap-10",
            isSplit ? "lg:grid-cols-2 lg:items-center lg:gap-12" : "",
          )}
        >
          <div className={cn("max-w-xl space-y-4", headerClassName)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {eyebrow}
            </p>

            <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white">
              {title}
            </h2>

            <p className="max-w-xl text-pretty text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
              {description}
            </p>
          </div>

          <div>
            <motion.ul
              aria-label={title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3",
                isSplit ? "" : "mt-8",
                getColumnClasses(columns),
                gridClassName,
              )}
            >
              {items.map((item, index) => (
                <li key={item.title} className="h-full">
                  <FeatureCard item={item} index={index} />
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {renderFooter ? <div className="mt-6">{renderFooter}</div> : null}
      </div>
    </section>
  );
}

export default AnimatedFeatureGrid;
