"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { type KeyboardEvent, useRef, useState } from "react";

import { type CubicBezier, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { Moment } from "./moments";
import { type EasingGroup, type EasingPreset, GROUP_LABELS, PRESETS } from "./presets";
import { press } from "./ui";

export type ListSlot = { preset: EasingPreset | null; bezier: CubicBezier };

type Filter = "suggested" | "all";

type CurveListProps = {
  moment: Moment;
  slots: { a: ListSlot; b: ListSlot };
  /** Which slot a pick applies to. */
  editing: "a" | "b";
  compare: boolean;
  /** The stage's open state: every row runs its own curve off the same clock. */
  open: boolean;
  /** Duration every row plays at, so only the curve differs between them. */
  playMs: number;
  reducedMotion: boolean;
  onPick: (preset: EasingPreset) => void;
};

const GROUP_ORDER: EasingGroup[] = ["animata", "classic", "baseline"];

/** The curve drawn in a 44×32 box, with room above and below for overshoot. */
const px = (x: number) => 4 + x * 36;
const py = (y: number) => 25 - y * 18;

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
  const options: { id: Filter; label: string }[] = [
    { id: "suggested", label: `For ${moment.plural}` },
    { id: "all", label: `All ${PRESETS.length}` },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Which curves to show"
      className="grid grid-cols-2 rounded-[10px] bg-muted p-[3px]"
    >
      {options.map((item) => {
        const checked = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative h-7 truncate rounded-[7px] px-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground aria-checked:text-foreground",
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
                className="absolute inset-0 rounded-[7px] bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_3px_rgb(0_0_0/0.08)]"
              />
            ) : null}
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Row({
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
        "group/row relative grid w-full grid-cols-[2.75rem_6px_minmax(0,1fr)_auto] items-center gap-x-3 rounded-[12px] py-2 pr-2.5 pl-2 text-left text-muted-foreground outline-none",
        "hover:bg-muted/60 hover:text-foreground focus-visible:shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-foreground)_35%,transparent)] aria-checked:text-foreground",
        "transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.985]",
      )}
    >
      {selected ? (
        <motion.span
          layoutId="curve-row"
          aria-hidden="true"
          transition={
            reducedMotion ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.4 }
          }
          className="absolute inset-0 -z-10 rounded-[12px] bg-muted"
        />
      ) : null}

      <svg
        viewBox="0 0 44 32"
        aria-hidden="true"
        className="relative block h-8 w-11 overflow-visible rounded-[8px] bg-background shadow-[0_0_0_1px_var(--color-border)]"
      >
        <path
          d={curvePath(bezier)}
          className="fill-none stroke-current [stroke-linecap:round]"
          strokeWidth={selected ? 2 : 1.6}
        />
      </svg>

      {/* The curve's value over time: the dot rises as the stage plays. */}
      <span aria-hidden="true" className="relative block h-7 w-1.5">
        <span className="absolute inset-x-[2px] inset-y-0 rounded-full bg-foreground/[0.12]" />
        <span
          className={cn("absolute inset-0 transition-transform", open && "-translate-y-full")}
          style={{
            transitionDuration: reducedMotion ? "0ms" : `${playMs}ms`,
            transitionTimingFunction: toCssBezier(bezier),
          }}
        >
          <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-current" />
        </span>
      </span>

      <span className="relative grid min-w-0 gap-px">
        <span className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
          {preset?.name ?? "Custom"}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {preset ? preset.use : "Kept in the link, so you can share it."}
        </span>
      </span>

      <span className="relative flex items-center gap-2">
        {preset ? (
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {preset.duration}
          </span>
        ) : null}
        {marker ? (
          <span
            className={cn(
              "grid size-[18px] place-items-center rounded-full text-[10.5px] font-semibold",
              marker.active
                ? "bg-foreground text-background"
                : "text-foreground shadow-[inset_0_0_0_1px_var(--color-foreground)]",
            )}
          >
            {marker.label}
          </span>
        ) : selected ? (
          <Check aria-hidden="true" className="size-3.5 text-foreground" strokeWidth={2.5} />
        ) : (
          <span className="size-3.5" />
        )}
      </span>
    </button>
  );
}

export function CurveList({
  moment,
  slots,
  editing,
  compare,
  open,
  playMs,
  reducedMotion,
  onPick,
}: CurveListProps) {
  const [filter, setFilter] = useState<Filter>("suggested");
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
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? Math.min(last, index + 1)
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
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
  const renderRow = (preset: EasingPreset | null) => {
    index += 1;
    const i = index;
    return (
      <Row
        key={preset?.id ?? "custom"}
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
    );
  };

  return (
    <div className="grid gap-2.5">
      <Segmented
        value={filter}
        moment={moment}
        reducedMotion={reducedMotion}
        onChange={setFilter}
      />
      <div role="radiogroup" aria-label="Curve" className="isolate -mx-1.5 grid gap-0.5">
        {custom ? renderRow(null) : null}
        {groups.map((group) => (
          <div key={group.id} className="grid gap-0.5">
            {group.label ? (
              <h4 className="m-0 px-2 pt-2.5 pb-1 text-[11px] font-medium tracking-[0.02em] text-muted-foreground">
                {group.label}
              </h4>
            ) : null}
            {group.items.map((preset) => renderRow(preset))}
          </div>
        ))}
      </div>
    </div>
  );
}
