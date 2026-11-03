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
import { CurveList } from "./curve-list";
import { DurationControl, MAX_DURATION, MIN_DURATION } from "./duration-control";
import { findMoment, MOMENTS, type Moment } from "./moments";
import { type EasingPreset, findPreset, PRESETS, sameBezier } from "./presets";
import { press, raised } from "./ui";

/** How long each state is held before the stage plays the other direction. The open
 *  state is the result, so it stays on screen longer than the empty one. */
const OPEN_HOLD_MS = 1600;
const CLOSED_HOLD_MS = 700;
const SPEEDS = [
  { value: 1, label: "1×", name: "Normal speed" },
  { value: 0.5, label: "½×", name: "Half speed" },
  { value: 0.25, label: "¼×", name: "Quarter speed" },
] as const;

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
    let id = 0;
    const tick = () => {
      if (document.visibilityState !== "visible") {
        id = window.setTimeout(tick, 500);
        return;
      }
      setOpen((value) => !value);
      setPlayKey((key) => key + 1);
    };
    id = window.setTimeout(tick, longest + (open ? OPEN_HOLD_MS : CLOSED_HOLD_MS));
    return () => window.clearTimeout(id);
  }, [autoplay, longest, cycle, open]);

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

  const panes = compare ? [a, b] : [a];
  const thumb = reducedMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.4 } as const);

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 pt-[clamp(24px,4vw,40px)] pb-24 sm:px-6 lg:px-8">
      <header className="grid items-end gap-x-12 gap-y-2.5 lg:grid-cols-[auto_minmax(0,25rem)] lg:justify-between">
        <h1 className="m-0 font-(family-name:--font-display) text-[clamp(2rem,3.2vw,2.75rem)] leading-none font-bold tracking-[-0.04em] text-balance lg:whitespace-nowrap">
          Find the timing that feels right
        </h1>
        <p className="m-0 text-[15px]/[1.55] text-pretty text-muted-foreground lg:pb-0.5">
          Pick the moment you're building and watch it move. Try the curves made for it, compare
          two, and copy the code.
        </p>
      </header>

      {/* The moment you're building, with playback beside it. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 lg:mt-8">
        <nav
          aria-label="Moments"
          className="-mx-4 min-w-0 basis-full overflow-x-auto px-4 xl:flex-1 xl:basis-0 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="inline-flex gap-0.5 rounded-[12px] bg-muted p-[3px]">
            {MOMENTS.map((item) => {
              const current = item.id === moment.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={current}
                  onClick={() => pickMoment(item)}
                  className={cn(
                    "relative h-[30px] shrink-0 rounded-[9px] px-3 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground hover:text-foreground aria-pressed:text-foreground",
                    press,
                  )}
                >
                  {current ? (
                    <motion.span
                      layoutId="moment-thumb"
                      aria-hidden="true"
                      transition={thumb}
                      className="absolute inset-0 rounded-[9px] bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_3px_rgb(0_0_0/0.08)]"
                    />
                  ) : null}
                  <span className="relative">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div
          className={cn("flex items-center gap-0.5 rounded-[12px] bg-background p-[3px]", raised)}
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

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:items-start lg:gap-5">
        {/* The canvas stays in view while you tune, so every change plays where you look. */}
        <div
          ref={stageRef}
          className={cn(
            "z-10 grid gap-3 bg-background pb-1 lg:sticky lg:top-[calc(var(--site-header-height,56px)+16px)] lg:pb-0",
            compare
              ? "sm:grid-cols-2"
              : "max-lg:sticky max-lg:top-[var(--site-header-height,56px)] max-lg:pt-2",
          )}
        >
          {panes.map((slot, index) => {
            const key = index === 0 ? "a" : "b";
            const selected = compare && editing === key;
            const ms = Math.round(slot.durationMs / speed);
            return (
              <figure key={key} className="m-0 grid gap-2.5">
                <button
                  type="button"
                  aria-label={
                    compare && !selected
                      ? `Edit ${key.toUpperCase()}`
                      : `Replay ${moment.name.toLowerCase()}`
                  }
                  onClick={() => (compare && !selected ? setEditing(key) : replay())}
                  className={cn(
                    "relative block w-full overflow-hidden rounded-[22px] bg-muted/55 text-left text-foreground outline-none",
                    "shadow-[inset_0_0_0_1px_var(--color-border)] transition-shadow duration-200 focus-visible:shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_2px_var(--color-foreground)]",
                    selected &&
                      "shadow-[inset_0_0_0_1px_var(--color-border),0_0_0_2px_var(--color-foreground)]",
                    compare ? "aspect-[1/1] lg:aspect-[5/6]" : "aspect-[4/3] sm:aspect-[16/10]",
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
                </button>
                {/* The timeline: a playhead crosses it at the pane's own pace. */}
                <figcaption className="flex items-center gap-2.5 overflow-x-clip px-1.5 font-mono text-[11px] text-muted-foreground tabular-nums">
                  {compare ? (
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={`Edit ${key.toUpperCase()}`}
                      onClick={() => setEditing(key)}
                      className={cn(
                        "inline-flex h-6 max-w-[45%] items-center gap-1.5 rounded-full pr-2.5 pl-1 font-sans text-xs font-medium text-muted-foreground hover:text-foreground aria-pressed:text-foreground",
                        press,
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-[18px] shrink-0 place-items-center rounded-full text-[10.5px] font-semibold",
                          selected
                            ? "bg-foreground text-background"
                            : "shadow-[inset_0_0_0_1px_currentColor]",
                        )}
                      >
                        {key.toUpperCase()}
                      </span>
                      <span className="truncate">{slot.preset?.name ?? "Custom"}</span>
                    </button>
                  ) : (
                    <span aria-hidden="true">0</span>
                  )}
                  <span
                    aria-hidden="true"
                    className="relative h-0.5 flex-1 rounded-full bg-foreground/[0.14]"
                  >
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
                  <span aria-hidden="true">{slot.durationMs}ms</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* The inspector: everything that shapes the motion, in the order you reach for it. */}
        <aside
          aria-label="Timing"
          className={cn("grid divide-y divide-border rounded-[20px] bg-background", raised)}
        >
          <section className="grid gap-3 p-4">
            <div className="flex h-7 items-center justify-between gap-3">
              {compare ? (
                <div
                  role="radiogroup"
                  aria-label="Editing"
                  className="grid grid-cols-2 rounded-[9px] bg-muted p-[3px]"
                >
                  {(["a", "b"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={editing === key}
                      aria-label={`Edit ${key.toUpperCase()}`}
                      onClick={() => setEditing(key)}
                      className={cn(
                        "relative h-[22px] w-9 rounded-[6px] text-xs font-semibold text-muted-foreground aria-checked:text-foreground",
                        press,
                      )}
                    >
                      {editing === key ? (
                        <motion.span
                          layoutId="slot-thumb"
                          aria-hidden="true"
                          transition={thumb}
                          className="absolute inset-0 rounded-[6px] bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_3px_rgb(0_0_0/0.08)]"
                        />
                      ) : null}
                      <span className="relative">{key.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Edit curve</span>
              )}
              <span className="truncate text-[13px] font-semibold tracking-[-0.01em]">{name}</span>
            </div>
            <div className="rounded-[14px] bg-background">
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
          </section>

          <section className="p-4">
            <DurationControl
              value={active.durationMs}
              onChange={setDuration}
              onCommit={replay}
              suggested={active.preset?.duration}
            />
          </section>

          <section className="grid gap-3 p-4">
            <span className="text-xs text-muted-foreground">Curves</span>
            <CurveList
              moment={moment}
              slots={{ a, b }}
              editing={compare ? editing : "a"}
              compare={compare}
              open={open}
              playMs={Math.round(active.durationMs / speed)}
              reducedMotion={reducedMotion}
              onPick={pickPreset}
            />
          </section>

          <section className="grid gap-3 p-4">
            <p className="m-0 text-[13px]/[1.55] text-pretty text-muted-foreground">
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
            <div className="overflow-hidden rounded-[14px] bg-muted/50 shadow-[inset_0_0_0_1px_var(--color-border)]">
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
                        "aria-checked:bg-background aria-checked:text-foreground aria-checked:shadow-[0_0_0_1px_var(--color-border)]",
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
                  aria-label={
                    copied
                      ? "Copied"
                      : `Copy ${CODE_FORMATS.find((item) => item.id === format)?.label} code`
                  }
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
                        initial={reducedMotion ? false : { y: 10, opacity: 0, filter: "blur(3px)" }}
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
                className="m-0 h-[6.5rem] overflow-auto px-4 py-3 font-mono text-xs/[1.65] text-muted-foreground [scrollbar-width:thin]"
              >
                <code>{code}</code>
              </pre>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
