/**
 * Category tile glyphs — 64×64 viewBox, visually centered on (32, 32).
 * Stroke-first, Apple-style pictograms. Each glyph is a literal symbol of the
 * category so users can recognize it at a glance.
 *
 * Shading uses three tokens on the parent SVG (--cg-ink / --cg-soft / --cg-faint).
 * Hover micro-interactions use Tailwind on each part; ancestor must be `group/cg`.
 */

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const INK = "var(--cg-ink)";
const SOFT = "var(--cg-soft)";
const FAINT = "var(--cg-faint)";
const CAP = "round" as const;
const JOIN = "round" as const;

/** Horizontally centered rounded bar. */
function Bar({
  cx,
  y,
  w,
  h = 3.5,
  r,
  fill = INK,
  o,
  className,
}: {
  cx: number;
  y: number;
  w: number;
  h?: number;
  r?: number;
  fill?: string;
  o?: number;
  className?: string;
}) {
  return (
    <rect
      x={cx - w / 2}
      y={y}
      width={w}
      height={h}
      rx={r ?? h / 2}
      fill={fill}
      opacity={o}
      className={className}
    />
  );
}

const GLYPHS: Record<string, ReactNode> = {
  /** Animated type — capital "A" with a motion trail */
  text: (
    <>
      <path
        d="M15 44 L23 18 L31 44"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap={CAP}
        strokeLinejoin={JOIN}
      />
      <path d="M18 36 H28" stroke={INK} strokeWidth="2.2" strokeLinecap={CAP} />
      <path
        d="M37 22 H49"
        stroke={SOFT}
        strokeWidth="2.2"
        strokeLinecap={CAP}
        className={cn("cg-motion", "origin-left motion-safe:group-hover/cg:scale-x-125")}
      />
      <path
        d="M37 30 H46"
        stroke={SOFT}
        strokeWidth="2.2"
        strokeLinecap={CAP}
        className={cn(
          "cg-motion",
          "origin-left motion-safe:group-hover/cg:scale-x-150 motion-safe:group-hover/cg:delay-[60ms]",
        )}
      />
      <path
        d="M37 38 H43"
        stroke={FAINT}
        strokeWidth="2.2"
        strokeLinecap={CAP}
        className={cn(
          "cg-motion",
          "origin-left motion-safe:group-hover/cg:scale-x-[1.8] motion-safe:group-hover/cg:delay-[120ms]",
        )}
      />
    </>
  ),

  /** Ambient field — symmetric waves + floating particles */
  background: (
    <>
      {[
        [22, SOFT],
        [32, INK],
        [42, SOFT],
      ].map(([y, stroke], i) => (
        <path
          key={y}
          d={`M10 ${y} Q21 ${Number(y) - 8} 32 ${y} T54 ${y}`}
          fill="none"
          stroke={String(stroke)}
          strokeWidth="2.2"
          strokeLinecap={CAP}
          className={cn(
            "cg-motion",
            i === 1
              ? "motion-safe:group-hover/cg:-translate-x-[3px]"
              : "motion-safe:group-hover/cg:translate-x-[3px]",
          )}
        />
      ))}
      {[
        [20, 16],
        [44, 16],
        [20, 48],
        [44, 48],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="1.5"
          fill={SOFT}
          className={cn(
            "cg-motion",
            "motion-safe:group-hover/cg:scale-[1.4] motion-safe:group-hover/cg:fill-[var(--cg-ink)]",
          )}
        />
      ))}
    </>
  ),

  /** Photo — frame, sun, mountains */
  image: (
    <>
      <rect
        x="14"
        y="16"
        width="36"
        height="32"
        rx="4"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
      />
      <circle
        cx="24.5"
        cy="26"
        r="3.5"
        fill={INK}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:-translate-y-[2.5px] motion-safe:group-hover/cg:scale-[1.15]",
        )}
      />
      <path
        d="M14 42 L24 31 L31 38 L41 27 L50 36 V48 H14 Z"
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-y-px")}
      />
    </>
  ),

  /** Avatar rows */
  list: (
    <>
      {[
        [17, 24, INK],
        [27, 18, SOFT],
        [37, 24, SOFT],
        [47, 18, FAINT],
      ].map(([y, w, shade], i) => (
        <g key={y}>
          <circle
            cx="18"
            cy={Number(y)}
            r="3.5"
            fill="none"
            stroke={String(shade)}
            strokeWidth="1.6"
          />
          <rect
            x="26"
            y={Number(y) - 1.75}
            width={Number(w)}
            height="3.5"
            rx="1.75"
            fill={String(shade)}
            className={cn(
              "cg-motion",
              "origin-left",
              i < 2
                ? "motion-safe:group-hover/cg:scale-x-[1.3]"
                : "motion-safe:group-hover/cg:scale-x-[0.7]",
            )}
          />
        </g>
      ))}
    </>
  ),

  /** Wrapper frame clipping a marquee of content blocks */
  container: (
    <>
      <defs>
        <clipPath id="cg-container-clip">
          {/* concentric with the frame: inner rx = outer rx − inset */}
          <rect x="12" y="20" width="40" height="24" rx="2" />
        </clipPath>
      </defs>
      <rect
        x="10"
        y="18"
        width="44"
        height="28"
        rx="4"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
      />
      <g
        clipPath="url(#cg-container-clip)"
        className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-x-3.5")}
      >
        {[
          [14, SOFT],
          [28, INK],
          [42, SOFT],
          [56, INK],
        ].map(([x, shade]) => (
          <rect key={x} x={Number(x)} y="25" width="10" height="14" rx="2.5" fill={String(shade)} />
        ))}
      </g>
    </>
  ),

  /** FAQ — closed, open (focal, with content), closed */
  accordion: (
    <>
      <rect x="12" y="12" width="40" height="8" rx="2" fill={FAINT} />
      <Bar cx={25} y={14.5} w={18} h={3} fill={SOFT} />
      <path
        d="M45 16 H49 M47 14 V18"
        stroke={SOFT}
        strokeWidth="1.6"
        strokeLinecap={CAP}
        className={cn("cg-motion", "motion-safe:group-hover/cg:rotate-90")}
      />

      <rect x="12" y="22" width="40" height="20" rx="2" fill={FAINT} />
      <Bar cx={26} y={25.5} w={20} h={3} />
      <path d="M45 27 H49" stroke={INK} strokeWidth="1.6" strokeLinecap={CAP} />
      <Bar
        cx={30}
        y={32.5}
        w={28}
        h={2.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:fill-[var(--cg-ink)]")}
      />
      <Bar
        cx={28}
        y={37.5}
        w={24}
        h={2.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:fill-[var(--cg-ink)]")}
      />

      <rect x="12" y="44" width="40" height="8" rx="2" fill={FAINT} />
      <Bar cx={25} y={46.5} w={18} h={3} fill={SOFT} />
      <path
        d="M45 48 H49 M47 46 V50"
        stroke={SOFT}
        strokeWidth="1.6"
        strokeLinecap={CAP}
        className={cn("cg-motion", "motion-safe:group-hover/cg:rotate-90")}
      />
    </>
  ),

  /** Fanned stack of cards */
  card: (
    <>
      <rect
        x="20"
        y="16"
        width="32"
        height="24"
        rx="4"
        fill={FAINT}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:translate-x-[3px] motion-safe:group-hover/cg:-translate-y-[3px]",
        )}
      />
      <rect
        x="16"
        y="20"
        width="32"
        height="24"
        rx="4"
        fill={SOFT}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:translate-x-[1.5px] motion-safe:group-hover/cg:-translate-y-[1.5px]",
        )}
      />
      <rect
        x="12"
        y="24"
        width="32"
        height="24"
        rx="4"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
      />
      <Bar cx={28} y={31} w={20} h={3} />
      <Bar cx={28} y={37} w={14} h={2.5} fill={SOFT} />
    </>
  ),

  /** Segmented control + panel */
  tabs: (
    <>
      <rect x="10" y="14" width="44" height="12" rx="6" fill={FAINT} />
      <rect
        x="12"
        y="16"
        width="12"
        height="8"
        rx="4"
        fill={INK}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-x-3.5")}
      />
      <Bar
        cx={18}
        y={18.75}
        w={8}
        h={2.5}
        fill={SOFT}
        o={0}
        className={cn(
          "cg-motion",
          "opacity-0 motion-safe:group-hover/cg:opacity-100 motion-safe:group-hover/cg:delay-100",
        )}
      />
      <Bar
        cx={32}
        y={18.75}
        w={8}
        h={2.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-0")}
      />
      <Bar cx={46} y={18.75} w={8} h={2.5} fill={SOFT} />

      <rect x="10" y="31" width="44" height="19" rx="4" fill={FAINT} />
      <Bar cx={32} y={37} w={28} h={3} fill={SOFT} />
      <Bar cx={32} y={43} w={20} h={2.5} fill={SOFT} />
    </>
  ),

  /** Pricing — three tiers, featured center */
  section: (
    <>
      <Bar cx={32} y={12} w={32} h={4} />

      <rect x="10" y="24" width="12" height="24" rx="2" fill={FAINT} />
      <Bar cx={16} y={28} w={7} h={2.5} fill={SOFT} />
      <rect x="12.5" y="34" width="7" height="7" rx="1" fill={SOFT} />

      <g className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-y-0.5")}>
        <rect x="26" y="18" width="12" height="34" rx="2" fill={SOFT} />
        <Bar cx={32} y={22.5} w={8} h={2.5} />
        <rect x="28.5" y="29" width="7" height="9" rx="1" fill={INK} />
        <rect x="28.5" y="44" width="7" height="4" rx="2" fill={INK} />
      </g>

      <rect x="42" y="24" width="12" height="24" rx="2" fill={FAINT} />
      <Bar cx={48} y={28} w={7} h={2.5} fill={SOFT} />
      <rect x="44.5" y="34" width="7" height="7" rx="1" fill={SOFT} />
    </>
  ),

  /** Touch ripple — concentric rings */
  icon: (
    <>
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="none"
        stroke={FAINT}
        strokeWidth="1.6"
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-ping motion-safe:group-hover/cg:[animation-delay:0.3s]",
        )}
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke={SOFT}
        strokeWidth="2"
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-ping motion-safe:group-hover/cg:[animation-delay:0.15s]",
        )}
      />
      <circle
        cx="32"
        cy="32"
        r="6"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        className={cn("cg-motion-frame", "motion-safe:group-hover/cg:animate-cg-ping")}
      />
      <circle cx="32" cy="32" r="2.5" fill={INK} />
    </>
  ),

  /** Split reveal — panels parting outward */
  preloader: (
    <>
      <rect
        x="10"
        y="14"
        width="21"
        height="36"
        rx="2"
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-x-[3px]")}
      />
      <rect
        x="33"
        y="14"
        width="21"
        height="36"
        rx="2"
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-x-[3px]")}
      />
      <path d="M32 14 V50" stroke={INK} strokeWidth="2.2" strokeLinecap={CAP} />
      <path
        d="M25 28 L21 32 L25 36"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap={CAP}
        strokeLinejoin={JOIN}
        className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-x-[3px]")}
      />
      <path
        d="M39 28 L43 32 L39 36"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap={CAP}
        strokeLinejoin={JOIN}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-x-[3px]")}
      />
    </>
  ),

  /** Ring progress at ~70% */
  progress: (
    <>
      <circle cx="32" cy="32" r="18" fill="none" stroke={FAINT} strokeWidth="3.5" />
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="none"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap={CAP}
        strokeDasharray="79 113"
        transform="rotate(-90 32 32)"
        className="cg-progress-arc motion-safe:group-hover/cg:[stroke-dasharray:105_113]"
      />
      <Bar cx={32} y={30.25} w={14} h={3.5} fill={SOFT} />
    </>
  ),

  /** Ascending bar chart */
  graphs: (
    <>
      {[
        [15, 10, SOFT],
        [24, 16, SOFT],
        [33, 22, INK],
        [42, 28, INK],
      ].map(([x, h, shade], i) => (
        <rect
          key={x}
          x={Number(x)}
          y={47 - Number(h)}
          width="7"
          height={Number(h)}
          rx="2"
          fill={String(shade)}
          className={cn(
            "cg-motion",
            "origin-[center_bottom] motion-safe:group-hover/cg:scale-y-[1.18]",
            i === 1 && "motion-safe:group-hover/cg:delay-[50ms]",
            i === 2 && "motion-safe:group-hover/cg:delay-100",
            i === 3 && "motion-safe:group-hover/cg:delay-150",
          )}
        />
      ))}
      <rect x="12" y="47" width="40" height="2" rx="1" fill={FAINT} />
    </>
  ),

  /** Modal floating above dimmed page content */
  overlay: (
    <>
      <Bar
        cx={32}
        y={9}
        w={40}
        h={3.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-45")}
      />
      <Bar
        cx={32}
        y={26}
        w={48}
        h={3.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-45")}
      />
      <Bar
        cx={32}
        y={36}
        w={48}
        h={3.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-45")}
      />
      <Bar
        cx={32}
        y={51.5}
        w={40}
        h={3.5}
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-45")}
      />
      <g className={cn("cg-motion", "motion-safe:group-hover/cg:scale-[1.05]")}>
        <rect
          x="17"
          y="19"
          width="30"
          height="26"
          rx="4"
          fill={FAINT}
          stroke={INK}
          strokeWidth="2.2"
        />
        <path
          d="M41.5 22.5 L44.5 25.5 M44.5 22.5 L41.5 25.5"
          stroke={SOFT}
          strokeWidth="1.6"
          strokeLinecap={CAP}
        />
        <Bar cx={32} y={26} w={16} h={3} />
        <Bar cx={32} y={31.5} w={20} h={2.5} fill={SOFT} />
        <rect x="25" y="37" width="14" height="5" rx="2.5" fill={INK} />
      </g>
    </>
  ),

  /** CTA pill with a click cursor */
  button: (
    <>
      <g className={cn("cg-motion", "motion-safe:group-hover/cg:scale-[1.06]")}>
        <rect x="12" y="18" width="40" height="16" rx="8" fill={INK} />
        <rect x="21" y="24.25" width="16" height="3.5" rx="1.75" fill={FAINT} />
      </g>
      <path
        d="M42 30 L42 46 L46.5 41.5 L49 48 L52 46.8 L49.5 40.5 L55 40 Z"
        fill={INK}
        stroke={FAINT}
        strokeWidth="1"
        strokeLinejoin={JOIN}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:-translate-x-[3px] motion-safe:group-hover/cg:-translate-y-[3px] motion-safe:group-hover/cg:scale-[0.92]",
        )}
      />
    </>
  ),

  /** Clock widget tile */
  widget: (
    <>
      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        rx="8"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
      />
      <circle cx="32" cy="32" r="11" fill="none" stroke={SOFT} strokeWidth="2" />
      <path
        d="M32 32 V24"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap={CAP}
        className={cn(
          "cg-motion",
          "origin-[center_bottom] motion-safe:group-hover/cg:rotate-[30deg]",
        )}
      />
      <path
        d="M32 32 L37 35"
        stroke={SOFT}
        strokeWidth="2"
        strokeLinecap={CAP}
        className={cn("cg-motion", "origin-[0%_0%] motion-safe:group-hover/cg:rotate-[60deg]")}
      />
      <circle cx="32" cy="32" r="1.4" fill={INK} />
    </>
  ),

  /** Bento composition */
  "bento-grid": (
    <>
      <rect
        x="10"
        y="12"
        width="24"
        height="22"
        rx="3"
        fill={INK}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:-translate-x-[1.5px] motion-safe:group-hover/cg:-translate-y-[1.5px]",
        )}
      />
      <rect
        x="36"
        y="12"
        width="18"
        height="10"
        rx="3"
        fill={SOFT}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:translate-x-[1.5px] motion-safe:group-hover/cg:-translate-y-[1.5px]",
        )}
      />
      <rect
        x="36"
        y="24"
        width="18"
        height="10"
        rx="3"
        fill={FAINT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-x-[1.5px]")}
      />
      <rect
        x="10"
        y="36"
        width="44"
        height="16"
        rx="3"
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-y-[1.5px]")}
      />
    </>
  ),

  /** Headline + CTA + scroll cue */
  hero: (
    <>
      <Bar cx={32} y={14} w={40} h={6} />
      <Bar cx={32} y={24} w={30} h={4} fill={SOFT} />
      <g className={cn("cg-motion", "motion-safe:group-hover/cg:scale-[1.08]")}>
        <rect x="22" y="32" width="20" height="10" rx="5" fill={INK} />
        <Bar cx={32} y={35.5} w={10} h={3} fill={FAINT} />
      </g>
      <path
        d="M29 47 L32 50 L35 47"
        fill="none"
        stroke={SOFT}
        strokeWidth="2"
        strokeLinecap={CAP}
        strokeLinejoin={JOIN}
        className={cn("cg-motion-frame", "motion-safe:group-hover/cg:animate-cg-bounce")}
      />
    </>
  ),

  /** Sections + scrollbar thumb */
  scroll: (
    <>
      <g className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-y-3.5")}>
        <rect
          x="10"
          y="14"
          width="36"
          height="8"
          rx="2"
          fill={INK}
          className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-0")}
        />
        <rect x="10" y="28" width="36" height="8" rx="2" fill={SOFT} />
        <rect x="10" y="42" width="36" height="8" rx="2" fill={FAINT} />
        <rect
          x="10"
          y="56"
          width="36"
          height="8"
          rx="2"
          fill={FAINT}
          opacity="0"
          className={cn("cg-motion", "motion-safe:group-hover/cg:opacity-100")}
        />
      </g>
      <rect x="50" y="14" width="3.5" height="36" rx="1.75" fill={FAINT} />
      <rect
        x="50"
        y="18"
        width="3.5"
        height="11"
        rx="1.75"
        fill={SOFT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-y-[13px]")}
      />
    </>
  ),

  /** Center slide + side peeks + pagination dots */
  carousel: (
    <>
      <rect
        x="6"
        y="15"
        width="10"
        height="26"
        rx="4"
        fill={FAINT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:-translate-x-0.5")}
      />
      <rect
        x="48"
        y="15"
        width="10"
        height="26"
        rx="4"
        fill={FAINT}
        className={cn("cg-motion", "motion-safe:group-hover/cg:translate-x-0.5")}
      />

      <g className={cn("cg-motion", "motion-safe:group-hover/cg:scale-[1.04]")}>
        <rect
          x="20"
          y="10"
          width="24"
          height="36"
          rx="4"
          fill="none"
          stroke={INK}
          strokeWidth="2.2"
        />
        <rect x="24" y="14" width="16" height="12" rx="2" fill={SOFT} />
        <Bar cx={32} y={31} w={14} h={3} fill={SOFT} />
        <Bar cx={32} y={37} w={10} h={2.5} fill={FAINT} />
      </g>

      <circle cx="25" cy="52" r="1.8" fill={SOFT} />
      <circle
        cx="32"
        cy="52"
        r="2.2"
        fill={INK}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:scale-[0.82] motion-safe:group-hover/cg:fill-[var(--cg-soft)]",
        )}
      />
      <circle
        cx="39"
        cy="52"
        r="1.8"
        fill={SOFT}
        className={cn(
          "cg-motion",
          "motion-safe:group-hover/cg:scale-[1.22] motion-safe:group-hover/cg:fill-[var(--cg-ink)] motion-safe:group-hover/cg:delay-[60ms]",
        )}
      />
    </>
  ),

  /** Loading placeholder layout */
  skeleton: (
    <>
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        rx="4"
        fill="none"
        stroke={FAINT}
        strokeWidth="2.2"
      />
      <circle
        cx="21"
        cy="21"
        r="5"
        fill={SOFT}
        className={cn("cg-motion-frame", "motion-safe:group-hover/cg:animate-cg-shimmer")}
      />
      <rect
        x="30"
        y="17.5"
        width="16"
        height="3"
        rx="1.5"
        fill={SOFT}
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-shimmer motion-safe:group-hover/cg:[animation-delay:0.1s]",
        )}
      />
      <rect
        x="30"
        y="23"
        width="12"
        height="2.5"
        rx="1.25"
        fill={FAINT}
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-shimmer motion-safe:group-hover/cg:[animation-delay:0.2s]",
        )}
      />
      <rect
        x="16"
        y="32"
        width="32"
        height="3"
        rx="1.5"
        fill={SOFT}
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-shimmer motion-safe:group-hover/cg:[animation-delay:0.3s]",
        )}
      />
      <rect
        x="16"
        y="39"
        width="28"
        height="3"
        rx="1.5"
        fill={SOFT}
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-shimmer motion-safe:group-hover/cg:[animation-delay:0.4s]",
        )}
      />
      <rect
        x="16"
        y="46"
        width="24"
        height="3"
        rx="1.5"
        fill={FAINT}
        className={cn(
          "cg-motion-frame",
          "motion-safe:group-hover/cg:animate-cg-shimmer motion-safe:group-hover/cg:[animation-delay:0.5s]",
        )}
      />
    </>
  ),

  /** Tilted feature card + highlight sparkle */
  "feature-cards": (
    <>
      <g className="cg-feature-tilt motion-safe:group-hover/cg:rotate-0">
        <rect
          x="16"
          y="18"
          width="32"
          height="28"
          rx="4"
          fill="none"
          stroke={INK}
          strokeWidth="2.2"
        />
        <rect x="20" y="22" width="12" height="9" rx="2" fill={SOFT} />
        <Bar cx={40} y={24.5} w={9} h={3} />
        <Bar cx={32} y={36} w={24} h={2.5} fill={SOFT} />
        <Bar cx={32} y={41} w={18} h={2.5} fill={FAINT} />
      </g>
      <path
        d="M51 9 L52.5 13 L56.5 14.5 L52.5 16 L51 20 L49.5 16 L45.5 14.5 L49.5 13 Z"
        fill={INK}
        className={cn("cg-motion-frame", "motion-safe:group-hover/cg:animate-cg-twinkle")}
      />
    </>
  ),

  /** Speed dial — FAB with an upward fan of actions */
  fabs: (
    <>
      {[
        [12, 40],
        [18, 26],
        [32, 20],
        [46, 26],
        [52, 40],
      ].map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          fill={SOFT}
          className={cn(
            "cg-motion",
            i === 0 && "motion-safe:group-hover/cg:-translate-x-[2.5px]",
            i === 1 &&
              "motion-safe:group-hover/cg:-translate-x-[1.8px] motion-safe:group-hover/cg:-translate-y-[1.8px]",
            i === 2 && "motion-safe:group-hover/cg:-translate-y-[2.5px]",
            i === 3 &&
              "motion-safe:group-hover/cg:translate-x-[1.8px] motion-safe:group-hover/cg:-translate-y-[1.8px]",
            i === 4 && "motion-safe:group-hover/cg:translate-x-[2.5px]",
          )}
        />
      ))}
      <circle cx="32" cy="40" r="8" fill={INK} />
      <path
        d="M32 36 V44 M28 40 H36"
        stroke={FAINT}
        strokeWidth="2"
        strokeLinecap={CAP}
        className={cn("cg-motion", "motion-safe:group-hover/cg:rotate-45")}
      />
    </>
  ),
};

const DEFAULT_GLYPH = (
  <>
    {[16, 32, 48].map((cx) =>
      [16, 32, 48].map((cy) => (
        <rect key={`${cx}-${cy}`} x={cx - 5} y={cy - 5} width="10" height="10" rx="2" fill={SOFT} />
      )),
    )}
  </>
);

export function CategoryGlyph({ variant }: { variant: string }) {
  return <g>{GLYPHS[variant] ?? DEFAULT_GLYPH}</g>;
}
