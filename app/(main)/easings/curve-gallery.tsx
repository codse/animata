"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { type KeyboardEvent, useRef, useState } from "react";

import { type CubicBezier, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { Moment } from "./moments";
import { type EasingGroup, type EasingPreset, GROUP_LABELS, PRESETS } from "./presets";
import { press } from "./ui";

export type GallerySlot = { preset: EasingPreset | null; bezier: CubicBezier };

type Filter = "suggested" | "all";

type CurveGalleryProps = {
  moment: Moment;
  slots: { a: GallerySlot; b: GallerySlot };
  /** Which slot a pick applies to. */
  editing: "a" | "b";
  compare: boolean;
  /** The stage's open state: every card runs its own curve off the same clock. */
  open: boolean;
  /** Duration every card plays at, so only the curve differs between them. */
  playMs: number;
  reducedMotion: boolean;
  onPick: (preset: EasingPreset) => void;
};

const GROUP_ORDER: EasingGroup[] = ["animata", "classic", "baseline"];

const FILTERS: { id: Filter; label: (moment: Moment) => string }[] = [
  { id: "suggested", label: (moment) => `For ${moment.plural}` },
  { id: "all", label: () => `All ${PRESETS.length}` },
];

/** The curve drawn in a 100×64 box, with room above and below for overshoot. */
const px = (x: number) => 8 + x * 84;
const py = (y: number) => 52 - y * 36;

function curvePath([x1, y1, x2, y2]: CubicBezier) {
  return `M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`;
}

function Segmented({
  value,
  onChange,
  moment,
  reducedMotion,
}: {
  value: Filter;
  onChange: (value: Filter) => void;
  moment: Moment;
  reducedMotion: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Which curves to show"
      className="inline-flex rounded-[11px] bg-muted p-[3px]"
    >
      {FILTERS.map((item) => {
        const checked = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative h-7 rounded-[8px] px-3 text-[13px] font-medium whitespace-nowrap text-muted-foreground hover:text-foreground aria-checked:text-foreground",
              press,
            )}
          >
            {checked ? (
              <motion.span
                layoutId="curve-filter-thumb"
                aria-hidden="true"
                transition={
                  reducedMotion ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.35 }
                }
                className="absolute inset-0 rounded-[8px] bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_3px_rgb(0_0_0/0.08)]"
              />
            ) : null}
            <span className="relative">{item.label(moment)}</span>
          </button>
        );
      })}
    </div>
  );
}

function Card({
  preset,
  bezier,
  selected,
  marker,
  open,
  playMs,
  reducedMotion,
  focusable,
  onSelect,
  onKeyDown,
  buttonRef,
}: {
  preset: EasingPreset | null;
  bezier: CubicBezier;
  selected: boolean;
  /** The slot this curve is in, when comparing. */
  marker: { label: string; active: boolean } | null;
  open: boolean;
  playMs: number;
  reducedMotion: boolean;
  focusable: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const name = preset?.name ?? "Custom";
  return (
    <button
      ref={buttonRef}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={focusable ? 0 : -1}
      aria-label={[
        preset
          ? `${preset.name}. ${preset.use}. ${preset.duration} milliseconds.`
          : "Your own curve.",
        marker ? `Chosen for ${marker.label}.` : "",
      ]
        .join(" ")
        .trim()}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "group/card relative grid w-full content-start gap-2.5 rounded-[18px] bg-background p-3 text-left text-muted-foreground outline-none",
        "shadow-[0_0_0_1px_var(--color-border),0_1px_2px_rgb(0_0_0/0.04)] hover:text-foreground hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-foreground)_22%,transparent),0_10px_24px_-12px_rgb(0_0_0/0.22)]",
        "focus-visible:text-foreground aria-checked:text-foreground",
        "transition-[scale,box-shadow,color] duration-200 ease-out active:scale-[0.98]",
      )}
    >
      {selected ? (
        <motion.span
          layoutId="curve-ring"
          aria-hidden="true"
          transition={
            reducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.12, duration: 0.5 }
          }
          className="pointer-events-none absolute -inset-px rounded-[19px] shadow-[0_0_0_2px_var(--color-foreground),0_12px_28px_-14px_rgb(0_0_0/0.35)]"
        />
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-foreground)_35%,transparent)] transition-opacity duration-150 group-focus-visible/card:opacity-100"
      />

      <svg
        viewBox="0 0 100 64"
        aria-hidden="true"
        className="block w-full overflow-visible rounded-[10px] bg-muted/60"
      >
        {[0, 1].map((y) => (
          <line
            key={y}
            x1={px(0)}
            x2={px(1)}
            y1={py(y)}
            y2={py(y)}
            className="stroke-foreground/[0.14] [stroke-dasharray:2_3]"
            strokeWidth={0.8}
          />
        ))}
        <path
          d={curvePath(bezier)}
          className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] transition-[stroke-width] duration-200"
          strokeWidth={selected ? 3 : 2.4}
        />
        <circle cx={px(0)} cy={py(0)} r={2} className="fill-current opacity-40" />
        <circle cx={px(1)} cy={py(1)} r={2} className="fill-current" />
      </svg>

      {/* The same move the stage makes, on this curve: a dot crossing a rail. */}
      <span aria-hidden="true" className="relative mx-1.5 block h-3">
        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-foreground/[0.12]" />
        <span
          className={cn("absolute inset-0 transition-transform", open && "translate-x-full")}
          style={{
            transitionDuration: reducedMotion ? "0ms" : `${playMs}ms`,
            transitionTimingFunction: toCssBezier(bezier),
          }}
        >
          <span className="absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-[0_0_0_2px_var(--color-background)]" />
        </span>
      </span>

      <span className="grid gap-0.5 px-0.5">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[14px] font-semibold tracking-[-0.01em] text-foreground">
            {name}
          </span>
          {preset ? (
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {preset.duration}
            </span>
          ) : null}
        </span>
        <span className="line-clamp-2 min-h-[2lh] text-xs/[1.4] text-muted-foreground">
          {preset ? preset.use : "Kept in the link, so you can share it."}
        </span>
      </span>

      {selected && !marker ? (
        <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-foreground text-background shadow-[0_0_0_2px_var(--color-background)]">
          <Check aria-hidden="true" className="size-3" strokeWidth={3} />
        </span>
      ) : null}
      {marker ? (
        <span
          className={cn(
            "absolute top-2 right-2 grid size-5 place-items-center rounded-full text-[11px] font-semibold shadow-[0_0_0_2px_var(--color-background)]",
            marker.active
              ? "bg-foreground text-background"
              : "bg-background text-foreground shadow-[0_0_0_1px_var(--color-foreground)]",
          )}
        >
          {marker.label}
        </span>
      ) : null}
    </button>
  );
}

export function CurveGallery({
  moment,
  slots,
  editing,
  compare,
  open,
  playMs,
  reducedMotion,
  onPick,
}: CurveGalleryProps) {
  const [filter, setFilter] = useState<Filter>("suggested");
  const [switched, setSwitched] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = slots[editing];
  const custom = active.preset === null;
  const suggested = moment.suggest
    .map((id) => PRESETS.find((preset) => preset.id === id))
    .filter((preset): preset is EasingPreset => Boolean(preset));

  const groups: { id: string; label: string | null; items: EasingPreset[] }[] =
    filter === "suggested"
      ? [{ id: "suggested", label: null, items: suggested }]
      : GROUP_ORDER.map((group) => ({
          id: group,
          label: GROUP_LABELS[group],
          items: PRESETS.filter((preset) => preset.group === group),
        }));

  // One flat list drives focus: a custom curve first, then every visible preset.
  const flat: (EasingPreset | null)[] = [
    ...(custom ? [null] : []),
    ...groups.flatMap((group) => group.items),
  ];
  const checkedIndex = flat.findIndex((preset) =>
    preset === null ? custom : preset.id === active.preset?.id,
  );
  const tabStop = checkedIndex >= 0 ? checkedIndex : 0;

  const markerFor = (preset: EasingPreset | null): { label: string; active: boolean } | null => {
    if (!compare) return null;
    const hit = (["a", "b"] as const).filter((key) =>
      preset === null ? slots[key].preset === null : slots[key].preset?.id === preset.id,
    );
    if (hit.length === 0) return null;
    const key = hit.includes(editing) ? editing : hit[0];
    return { label: key.toUpperCase(), active: key === editing };
  };

  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = flat.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? Math.min(last, index + 1)
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? Math.max(0, index - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    refs.current[next]?.focus();
    const target = flat[next];
    if (target) onPick(target);
  };

  let index = -1;
  const renderCard = (preset: EasingPreset | null, position: number) => {
    index += 1;
    const i = index;
    const delay = Math.min(i, 8) * 0.03;
    return (
      <motion.div
        key={preset?.id ?? "custom"}
        initial={reducedMotion || !switched ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4, delay }}
        data-position={position}
      >
        <Card
          preset={preset}
          bezier={preset ? preset.bezier : active.bezier}
          selected={preset === null ? custom : active.preset?.id === preset.id}
          marker={markerFor(preset)}
          open={open}
          playMs={playMs}
          reducedMotion={reducedMotion}
          focusable={i === tabStop}
          onSelect={() => {
            if (preset) onPick(preset);
          }}
          onKeyDown={(event) => move(event, i)}
          buttonRef={(node) => {
            refs.current[i] = node;
          }}
        />
      </motion.div>
    );
  };

  const cols = "grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <section aria-label="Curves" className="grid gap-3.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <div className="mr-auto flex items-baseline gap-2.5">
          <h3 className="m-0 font-(family-name:--font-display) text-[1.375rem] leading-none font-bold tracking-[-0.03em]">
            Curves
          </h3>
          <span className="text-[13px] text-muted-foreground">
            {compare ? (
              <>
                Choosing for{" "}
                <span className="font-semibold text-foreground">{editing.toUpperCase()}</span>
              </>
            ) : (
              `Pick one to try it on the ${moment.name.toLowerCase()}`
            )}
          </span>
        </div>
        <Segmented
          value={filter}
          moment={moment}
          reducedMotion={reducedMotion}
          onChange={(next) => {
            setFilter(next);
            setSwitched(true);
          }}
        />
      </div>

      <div role="radiogroup" aria-label="Curve" className="grid gap-4">
        {custom ? <div className={cols}>{renderCard(null, -1)}</div> : null}
        {groups.map((group) => (
          <div key={group.id} className="grid gap-2.5">
            {group.label ? (
              <h4 className="m-0 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                {group.label}
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              </h4>
            ) : null}
            <div className={cols}>
              {group.items.map((preset, position) => renderCard(preset, position))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
