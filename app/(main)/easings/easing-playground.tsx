"use client";

import { Check, Columns2, Copy, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { type CubicBezier, stagger, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CODE_FORMATS, type CodeFormat, codeFor, formatBezier } from "./code";
import { CurveEditor, CurveFields, Y_MAX, Y_MIN } from "./curve-editor";
import { DurationControl, MAX_DURATION, MIN_DURATION } from "./duration-control";
import { findMoment, MOMENTS, type Moment } from "./moments";
import { type EasingPreset, findPreset, PRESETS, sameBezier } from "./presets";

/** How long each state is held before the stage plays the other direction. */
const HOLD_MS = 1000;
const SPEEDS = [
  { value: 1, label: "1×", name: "Normal speed" },
  { value: 0.5, label: "½×", name: "Half speed" },
  { value: 0.25, label: "¼×", name: "Quarter speed" },
] as const;

/** Press feedback shared by every button on the page. */
const press =
  "transition-[scale,background-color,color,box-shadow] duration-150 ease-out active:scale-[0.97]";
const raised =
  "shadow-[0_0_0_1px_var(--color-border),0_1px_2px_rgb(0_0_0/0.05),0_12px_32px_-14px_rgb(0_0_0/0.18)]";

type Slot = { preset: EasingPreset | null; bezier: CubicBezier; durationMs: number };

const clampDuration = (ms: number) => Math.min(MAX_DURATION, Math.max(MIN_DURATION, ms));
const presetOf = (id: string) => findPreset(id) ?? PRESETS[0];
const slotFrom = (preset: EasingPreset, durationMs: number): Slot => ({
  preset,
  bezier: preset.bezier,
  durationMs,
});

function parseCurve(value: string | null): CubicBezier | null {
  if (!value) return null;
  const parts = value.split(",").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) return null;
  const [x1, y1, x2, y2] = parts;
  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) return null;
  // Keep shared links inside the editor's range so both handles stay reachable.
  const y = (value: number) => Math.min(Y_MAX, Math.max(Y_MIN, value));
  return [x1, y(y1), x2, y(y2)];
}

function MiniCurve({ bezier, className }: { bezier: CubicBezier; className?: string }) {
  const [x1, y1, x2, y2] = bezier;
  const px = (x: number) => 2 + x * 16;
  const py = (y: number) => 12 - y * 9;
  return (
    <svg
      viewBox="0 0 20 14"
      aria-hidden="true"
      className={cn("h-3.5 w-5 shrink-0 overflow-visible", className)}
    >
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
        className="fill-none stroke-current stroke-[1.7] [stroke-linecap:round]"
      />
    </svg>
  );
}

export function EasingPlayground() {
  const reducedMotion = usePrefersReducedMotion();
  const [query, setQuery] = useQueryStates(
    { m: parseAsString, p: parseAsString, c: parseAsString, d: parseAsInteger },
    { history: "replace", throttleMs: 250 },
  );

  // The moment and its first curve live in the URL, so a link shares exactly this view.
  const moment = findMoment(query.m) ?? MOMENTS[1];
  const customA = parseCurve(query.c);
  const presetA = customA ? null : (findPreset(query.p) ?? presetOf(moment.suggest[0]));
  const a: Slot = {
    preset: presetA,
    bezier: customA ?? (presetA ?? PRESETS[0]).bezier,
    durationMs: clampDuration(query.d ?? (query.p && presetA ? presetA.duration : moment.duration)),
  };
  const [b, setB] = useState<Slot>(() => slotFrom(presetOf(moment.suggest[1]), moment.duration));

  const [compare, setCompare] = useState(false);
  const [editing, setEditing] = useState<"a" | "b">("a");
  const [speed, setSpeed] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  /** Bumped by Replay and by every change, so the cycle restarts from a fresh open. */
  const [cycle, setCycle] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [format, setFormat] = useState<CodeFormat>("css");
  const [copied, setCopied] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageVisible, setStageVisible] = useState(true);

  const editingB = compare && editing === "b";
  const active = editingB ? b : a;
  const autoplay = !reducedMotion && stageVisible;
  const longest = Math.max(a.durationMs, compare ? b.durationMs : 0) / speed;

  const replay = useCallback(() => {
    setOpen(true);
    setPlayKey((key) => key + 1);
    setCycle((value) => value + 1);
  }, []);

  // One clock for every pane, so a comparison is fair: open, hold, close, hold.
  // biome-ignore lint/correctness/useExhaustiveDependencies: cycle restarts the clock on purpose
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setOpen((value) => !value);
      setPlayKey((key) => key + 1);
    }, longest + HOLD_MS);
    return () => window.clearInterval(id);
  }, [autoplay, longest, cycle]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStageVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const pickMoment = (next: Moment) => {
    setQuery({ m: next.id, p: next.suggest[0], c: null, d: next.duration });
    setB(slotFrom(presetOf(next.suggest[1]), next.duration));
    setEditing("a");
    setOpen(false);
    setCycle((value) => value + 1);
  };

  const pickPreset = (preset: EasingPreset) => {
    if (editingB) setB(slotFrom(preset, preset.duration));
    else setQuery({ p: preset.id, c: null, d: preset.duration });
    replay();
  };

  const setCurve = (bezier: CubicBezier) => {
    const match = PRESETS.find((item) => sameBezier(item.bezier, bezier)) ?? null;
    if (editingB) setB((slot) => ({ ...slot, preset: match, bezier }));
    else
      setQuery(
        match ? { p: match.id, c: null } : { p: null, c: formatBezier(bezier).replaceAll(" ", "") },
      );
  };

  const setDuration = (ms: number) => {
    if (editingB) setB((slot) => ({ ...slot, durationMs: ms }));
    else setQuery({ d: ms });
  };

  const name = active.preset?.name ?? "Custom";
  const code = codeFor(format, active.bezier, active.durationMs, name);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const chips = showAll ? PRESETS : moment.suggest.map(presetOf);
  const panes = compare ? [a, b] : [a];

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pt-[clamp(28px,5vw,48px)] pb-24 sm:px-6 lg:px-8">
      <header className="grid items-end gap-x-12 gap-y-3 lg:grid-cols-[auto_minmax(0,26rem)] lg:justify-between">
        <h1 className="m-0 font-(family-name:--font-display) text-[clamp(2.125rem,3.7vw,3.125rem)] leading-none font-bold tracking-[-0.04em] text-balance lg:whitespace-nowrap">
          Find the timing that feels right
        </h1>
        <p className="m-0 text-[15px]/[1.55] text-pretty text-muted-foreground lg:pb-1">
          Pick the moment you're building and watch it move. Try the curves made for it, compare
          two, and copy the one that feels right.
        </p>
      </header>

      <div className="mt-7 grid gap-5 lg:mt-8 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-10">
        {/* Moments: a list on desktop with one gliding highlight, a scrolling row below. */}
        <nav
          aria-label="Moments"
          className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:sticky lg:top-[calc(var(--site-header-height,56px)+24px)] lg:mx-0 lg:grid lg:gap-0.5 lg:self-start lg:overflow-visible lg:px-0 lg:pt-14 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {MOMENTS.map((item) => {
            const current = item.id === moment.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={current}
                onClick={() => pickMoment(item)}
                className={cn(
                  "relative flex h-9 shrink-0 items-center justify-between gap-3 rounded-[11px] px-3.5 text-[15px] font-medium tracking-[-0.01em] text-muted-foreground hover:text-foreground lg:h-10",
                  "shadow-[inset_0_0_0_1px_var(--color-border)] aria-pressed:bg-foreground aria-pressed:text-background",
                  "lg:shadow-none lg:aria-pressed:bg-transparent lg:aria-pressed:text-foreground",
                  press,
                )}
              >
                {current ? (
                  <motion.span
                    layoutId="moment-highlight"
                    aria-hidden="true"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", bounce: 0, duration: 0.45 }
                    }
                    className={cn(
                      "absolute inset-0 hidden rounded-[11px] bg-background lg:block",
                      raised,
                    )}
                  />
                ) : null}
                <span className="relative">{item.name}</span>
                <span className="relative hidden font-mono text-[11px] text-muted-foreground tabular-nums lg:inline">
                  {item.duration}
                </span>
              </button>
            );
          })}
        </nav>

        <section aria-label="Studio" className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="m-0 mr-auto font-(family-name:--font-display) text-[1.75rem] leading-none font-bold tracking-[-0.03em]">
              {moment.name}
            </h2>
            <div
              className={cn(
                "flex items-center gap-0.5 rounded-[12px] bg-background p-[3px]",
                raised,
              )}
            >
              {SPEEDS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={speed === item.value}
                  aria-label={item.name}
                  onClick={() => {
                    setSpeed(item.value);
                    replay();
                  }}
                  className={cn(
                    "h-[30px] min-w-9 rounded-[9px] px-2.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                    "aria-pressed:bg-foreground aria-pressed:text-background",
                    press,
                  )}
                >
                  {item.label}
                </button>
              ))}
              <span aria-hidden="true" className="mx-1 h-[18px] w-px bg-border" />
              <button
                type="button"
                aria-pressed={compare}
                onClick={() => {
                  setCompare((value) => !value);
                  setEditing("a");
                  replay();
                }}
                className={cn(
                  "inline-flex h-[30px] items-center gap-1.5 rounded-[9px] px-2.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  "aria-pressed:bg-foreground aria-pressed:text-background",
                  press,
                )}
              >
                <Columns2 aria-hidden="true" className="size-[15px]" />
                Compare
              </button>
              <button
                type="button"
                aria-label="Replay"
                onClick={replay}
                className={cn(
                  "grid size-[30px] place-items-center rounded-[9px] text-muted-foreground hover:bg-muted hover:text-foreground",
                  press,
                )}
              >
                <RotateCcw aria-hidden="true" className="size-[15px]" />
              </button>
            </div>
          </div>

          <div ref={stageRef} className={cn("grid gap-3.5", compare && "sm:grid-cols-2")}>
            {panes.map((slot, index) => {
              const key = index === 0 ? "a" : "b";
              const selected = compare && editing === key;
              const ms = Math.round(slot.durationMs / speed);
              return (
                <figure key={key} className="m-0 grid gap-3">
                  <button
                    type="button"
                    aria-label={
                      compare && !selected
                        ? `Edit ${key.toUpperCase()}`
                        : `Replay ${moment.name.toLowerCase()}`
                    }
                    onClick={() => (compare && !selected ? setEditing(key) : replay())}
                    className={cn(
                      "relative block w-full overflow-hidden rounded-[24px] text-left text-foreground outline-none",
                      "bg-[radial-gradient(130%_100%_at_50%_0%,var(--color-background)_0%,color-mix(in_oklab,var(--color-muted)_55%,var(--color-background))_55%,var(--color-muted)_100%)]",
                      "shadow-[inset_0_0_0_1px_var(--color-border)] transition-shadow duration-200 focus-visible:shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_2px_var(--color-foreground)]",
                      selected &&
                        "shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_2px_var(--color-foreground)]",
                      compare
                        ? "aspect-[1.15/1] lg:aspect-[1.6/1]"
                        : "aspect-[1.15/1] sm:aspect-[2/1] lg:aspect-[3/1]",
                    )}
                    style={
                      {
                        "--ez-ease": toCssBezier(slot.bezier),
                        "--ez-dur": `${ms}ms`,
                        "--ez-stagger": `${(stagger.base * 1000) / speed}ms`,
                      } as CSSProperties
                    }
                  >
                    <span aria-hidden="true" inert className="absolute inset-0 block">
                      {moment.render(open)}
                    </span>
                    {/* The timeline: a playhead crosses it at the pane's own pace. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-7 bottom-4 z-[2] flex items-center gap-2.5 font-mono text-[10.5px] text-muted-foreground tabular-nums"
                    >
                      0
                      <span className="relative h-0.5 flex-1 rounded-full bg-foreground/[0.14]">
                        <span
                          className={cn(
                            "absolute inset-0 transition-transform ease-linear",
                            open && "translate-x-full",
                          )}
                          style={{ transitionDuration: `${ms}ms` }}
                        >
                          <span className="absolute top-1/2 left-0 size-2 -translate-1/2 rounded-full bg-foreground" />
                        </span>
                      </span>
                      {slot.durationMs}ms
                    </span>
                  </button>
                  {compare ? (
                    <figcaption className="flex items-baseline gap-2.5 px-1">
                      <span className="font-(family-name:--font-display) text-[1.375rem] leading-none font-bold tracking-[-0.03em]">
                        {key.toUpperCase()}
                      </span>
                      <span className="font-medium">{slot.preset?.name ?? "Custom"}</span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {slot.durationMs}ms
                      </span>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setEditing(key)}
                        className="ml-auto text-[13px] font-medium text-muted-foreground hover:text-foreground aria-pressed:text-foreground"
                      >
                        {selected ? "Editing" : "Edit"}
                      </button>
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>

          {/* Tuning sits right under the stage: no panel, three columns under one hairline. */}
          <div className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-6 border-t border-border pt-5 md:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="order-last grid content-start gap-2.5 md:order-none">
              <span className="text-xs text-muted-foreground">Curve</span>
              <div
                className={cn(
                  "mx-auto w-full max-w-[16rem] rounded-[14px] bg-background p-1.5",
                  raised,
                )}
              >
                <CurveEditor
                  bezier={active.bezier}
                  onChange={setCurve}
                  playKey={playKey}
                  durationMs={active.durationMs / speed}
                />
              </div>
              <details className="group/values">
                <summary className="flex h-6 cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="transition-[rotate] duration-200 ease-out group-open/values:rotate-90"
                  >
                    ›
                  </span>
                  Exact values
                </summary>
                <div className="mt-2.5">
                  <CurveFields bezier={active.bezier} onChange={setCurve} />
                </div>
              </details>
            </div>

            <div className="grid content-start gap-5">
              <div className="grid gap-2.5">
                <div className="flex items-baseline justify-between gap-3 text-xs text-muted-foreground">
                  <span>
                    {showAll ? "All curves" : `Made for ${moment.plural}`}
                    {compare ? ` · editing ${editing.toUpperCase()}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAll((value) => !value)}
                    className="font-medium hover:text-foreground"
                  >
                    {showAll ? "Suggested only" : "All curves"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {chips.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={active.preset?.id === preset.id}
                      aria-label={`${preset.name}, ${preset.duration} milliseconds. ${preset.use}`}
                      onClick={() => pickPreset(preset)}
                      className={cn(
                        "inline-flex h-9 items-center gap-2 rounded-[11px] bg-background pr-3 pl-2.5 text-[13px] font-medium text-muted-foreground shadow-[0_0_0_1px_var(--color-border)] hover:text-foreground",
                        "aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:shadow-[0_0_0_1px_var(--color-foreground),0_8px_20px_-10px_rgb(0_0_0/0.4)]",
                        press,
                      )}
                    >
                      <MiniCurve bezier={preset.bezier} />
                      {preset.short}
                      <span className="font-mono text-[11px] tabular-nums opacity-60">
                        {preset.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <DurationControl
                value={active.durationMs}
                onChange={setDuration}
                onCommit={replay}
                suggested={active.preset?.duration}
              />
            </div>

            <div className="grid content-start gap-3 md:col-span-2 lg:col-span-1">
              <p className="m-0 min-h-[3lh] text-sm/[1.55] text-pretty text-muted-foreground">
                {active.preset ? (
                  <>
                    <span className="font-medium text-foreground">{active.preset.use}.</span>{" "}
                    {active.preset.note}
                  </>
                ) : (
                  <>
                    <span className="font-medium text-foreground">Your own curve.</span> The address
                    bar keeps it, so you can share the link.
                  </>
                )}
              </p>
              <div className={cn("overflow-hidden rounded-[14px] bg-background", raised)}>
                <div className="flex items-center gap-0.5 border-b border-border p-1.5">
                  <div role="radiogroup" aria-label="Code format" className="flex gap-0.5">
                    {CODE_FORMATS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={format === item.id}
                        onClick={() => setFormat(item.id)}
                        className={cn(
                          "h-[26px] rounded-[7px] px-2 text-xs font-medium text-muted-foreground hover:text-foreground",
                          "aria-checked:bg-muted aria-checked:text-foreground",
                          press,
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Copied" : `Copy ${format} code`}
                    className={cn(
                      "ml-auto inline-flex h-7 items-center rounded-[8px] bg-foreground px-2.5 text-xs font-medium text-background hover:bg-foreground/85",
                      press,
                    )}
                  >
                    {/* The label morphs instead of snapping, so the confirmation reads as a change. */}
                    <span className="grid overflow-hidden">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={copied ? "copied" : "copy"}
                          className="col-start-1 row-start-1 inline-flex items-center gap-1.5"
                          initial={
                            reducedMotion ? false : { y: 10, opacity: 0, filter: "blur(3px)" }
                          }
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={
                            reducedMotion
                              ? { opacity: 0, transition: { duration: 0 } }
                              : { y: -10, opacity: 0, filter: "blur(3px)" }
                          }
                          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        >
                          {copied ? (
                            <Check aria-hidden="true" className="size-3.5" />
                          ) : (
                            <Copy aria-hidden="true" className="size-3.5" />
                          )}
                          {copied ? "Copied" : "Copy"}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </button>
                </div>
                <pre
                  data-lenis-prevent
                  className="m-0 h-[5.75rem] overflow-auto px-4 py-3 font-mono text-xs/[1.65] text-muted-foreground [scrollbar-width:thin]"
                >
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
