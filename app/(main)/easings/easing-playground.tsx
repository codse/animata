"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { type CubicBezier, stagger, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CODE_FORMATS, type CodeFormat, codeFor, formatBezier } from "./code";
import { CurveEditor, CurveFields, Y_MAX, Y_MIN } from "./curve-editor";
import { DurationControl, MAX_DURATION, MIN_DURATION } from "./duration-control";
import { MiniCurve, PresetIndex, PresetShelf } from "./preset-shelf";
import { type EasingPreset, findPreset, PRESETS, sameBezier } from "./presets";
import { CATEGORY_LABELS, SCENES, type SceneCategory } from "./scenes";

const DEFAULT_PRESET = PRESETS[0];
/** How long each state is held before the gallery plays the other direction. */
const HOLD_MS = 1100;

/** Press feedback shared by every button on the page. */
const press =
  "transition-[scale,background-color,border-color,color] duration-150 ease-out active:scale-[0.97]";

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
    { p: parseAsString, c: parseAsString, d: parseAsInteger },
    { history: "replace", throttleMs: 250 },
  );

  const urlPreset = findPreset(query.p);
  const customCurve = parseCurve(query.c);
  const preset: EasingPreset | null = customCurve ? null : (urlPreset ?? DEFAULT_PRESET);
  const bezier: CubicBezier = customCurve ?? (preset ?? DEFAULT_PRESET).bezier;
  const durationMs = Math.min(
    MAX_DURATION,
    Math.max(MIN_DURATION, query.d ?? preset?.duration ?? DEFAULT_PRESET.duration),
  );
  const name = preset?.name ?? "Custom";
  const presetIndex = preset ? PRESETS.indexOf(preset) : -1;

  const [category, setCategory] = useState<SceneCategory | "all">("all");
  const [playing, setPlaying] = useState(true);
  const [open, setOpen] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [playKey, setPlayKey] = useState(0);
  const [format, setFormat] = useState<CodeFormat>("css");
  const [copied, setCopied] = useState(false);
  /** Which way the curve name slides: next moves left, previous moves right. */
  const [direction, setDirection] = useState<1 | -1>(1);
  /** The preset an edited curve came from, so Reset can return to it. */
  const [base, setBase] = useState<EasingPreset | null>(preset);
  useEffect(() => {
    if (preset) setBase(preset);
  }, [preset]);
  const edited = base !== null && (preset === null || durationMs !== base.duration);
  const galleryRef = useRef<HTMLDivElement>(null);
  const workbenchRef = useRef<HTMLElement>(null);
  const [galleryVisible, setGalleryVisible] = useState(true);
  /** The dock only appears once the instrument has scrolled out of view. */
  const [instrumentVisible, setInstrumentVisible] = useState(true);

  const autoplay = playing && !reducedMotion && galleryVisible;

  const replay = useCallback(() => {
    setOverrides({});
    setOpen((value) => !value);
    setPlayKey((key) => key + 1);
  }, []);

  // One shared cycle keeps every scene in step, so they are easy to compare.
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") replay();
    }, durationMs + HOLD_MS);
    return () => window.clearInterval(id);
  }, [autoplay, durationMs, replay]);

  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setGalleryVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = workbenchRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInstrumentVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const choosePreset = (next: EasingPreset, towards?: 1 | -1) => {
    const from = PRESETS.indexOf(preset ?? base ?? DEFAULT_PRESET);
    setDirection(towards ?? (PRESETS.indexOf(next) >= from ? 1 : -1));
    setQuery({ p: next.id, c: null, d: null });
    replay();
  };

  const step = (towards: 1 | -1) => {
    const from = presetIndex === -1 ? PRESETS.indexOf(base ?? DEFAULT_PRESET) : presetIndex;
    choosePreset(PRESETS[(from + towards + PRESETS.length) % PRESETS.length], towards);
  };

  /** Forgiving editing: one press returns an edited curve to the preset it came from. */
  const reset = () => {
    if (!base) return;
    setQuery({ p: base.id, c: null, d: null });
    replay();
  };

  const setCurve = (next: CubicBezier) => {
    const match = PRESETS.find((item) => sameBezier(item.bezier, next));
    if (match) {
      setQuery({ p: match.id, c: null, d: durationMs === match.duration ? null : durationMs });
    } else {
      setQuery({ p: null, c: formatBezier(next).replaceAll(" ", ""), d: durationMs });
    }
  };

  const setDuration = (ms: number) => {
    setQuery({ d: ms === preset?.duration ? null : ms });
  };

  /** Jump to the chosen curve in whichever list is showing: the index or the shelf. */
  const showCurves = () => {
    const current = [
      ...document.querySelectorAll<HTMLElement>("[data-preset][aria-pressed='true']"),
    ].find((node) => node.offsetParent !== null);
    current?.scrollIntoView({ block: "center", inline: "nearest" });
    current?.focus({ preventScroll: true });
  };

  const showWorkbench = () => {
    workbenchRef.current?.scrollIntoView({ block: "start" });
  };

  const code = codeFor(format, bezier, durationMs, name);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const scenes = useMemo(
    () => SCENES.filter((scene) => category === "all" || scene.category === category),
    [category],
  );

  const vars = {
    "--ez-ease": toCssBezier(bezier),
    "--ez-dur": `${durationMs}ms`,
    "--ez-stagger": `${stagger.base * 1000}ms`,
  } as CSSProperties;

  /** One segmented-control look for every switch on the page. */
  const segment = cn(
    "h-7 rounded-[6px] px-3 text-xs font-medium text-muted-foreground hover:text-foreground",
    "aria-checked:bg-background aria-checked:text-foreground aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
    "aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
    press,
  );
  const iconButton = cn(
    "grid size-8 shrink-0 place-items-center rounded-[8px] text-muted-foreground hover:bg-muted hover:text-foreground",
    press,
  );

  const nameMorph = (offset: number, blur: number) => ({
    initial: reducedMotion
      ? (false as const)
      : { x: direction * offset, opacity: 0, filter: `blur(${blur}px)` },
    animate: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: reducedMotion
      ? { opacity: 0, transition: { duration: 0 } }
      : { x: direction * -offset, opacity: 0, filter: `blur(${blur}px)` },
  });

  return (
    <div
      className="mx-auto w-full max-w-[1240px] px-4 pt-[clamp(40px,6vw,72px)] pb-32 sm:px-6 lg:px-8"
      style={vars}
    >
      <header className="grid items-end gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <h1 className="m-0 font-(family-name:--font-display) text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
          See how{" "}
          <button
            type="button"
            onClick={showCurves}
            aria-label={`${name}, choose another curve`}
            className={cn(
              "relative inline-grid overflow-hidden rounded-[0.24em] bg-muted px-[0.22em] pb-[0.02em] align-baseline font-mono text-[0.84em] font-medium tracking-[-0.045em] shadow-[inset_0_0_0_1px_var(--color-border)] hover:bg-border/60",
              press,
            )}
          >
            {/* The name swaps with the selected curve itself, so the heading demonstrates it. */}
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={name}
                className="col-start-1 row-start-1 inline-block"
                initial={
                  reducedMotion
                    ? false
                    : { x: `${direction * 0.5}em`, opacity: 0, filter: "blur(6px)" }
                }
                animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                exit={
                  reducedMotion
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { x: `${direction * -0.5}em`, opacity: 0, filter: "blur(6px)" }
                }
                transition={{ duration: Math.min(durationMs, 700) / 1000, ease: [...bezier] }}
              >
                {name}
              </motion.span>
            </AnimatePresence>
          </button>{" "}
          moves real interfaces
        </h1>
        <p className="m-0 max-w-[36rem] text-[15px]/[1.55] text-pretty text-muted-foreground lg:pb-1.5">
          Pick a curve or drag your own, set the duration, and watch twelve everyday transitions use
          it. Copy the result as CSS, Tailwind, Motion, or GSAP.
        </p>
      </header>

      {/* Below desktop the index becomes a scrolling shelf above the instrument. */}
      <section aria-label="Curves" className="mt-10 lg:hidden">
        <PresetShelf selected={preset} onSelect={choosePreset} />
      </section>

      {/* The instrument: index, plot, and controls on one strip, divided by hairlines. */}
      <section
        ref={workbenchRef}
        aria-label="Curve"
        className="mt-6 grid scroll-mt-20 border-y border-border md:grid-cols-[minmax(0,1fr)_minmax(0,20.5rem)] lg:mt-12 lg:grid-cols-[13.5rem_minmax(0,1fr)_20.5rem]"
      >
        <nav aria-label="Curves" className="hidden py-7 pr-6 lg:block">
          <PresetIndex selected={preset} onSelect={choosePreset} reducedMotion={reducedMotion} />
        </nav>

        <div className="grid min-w-0 content-start gap-6 py-7 md:pr-8 lg:border-x lg:border-border lg:px-8">
          <div className="flex items-start justify-between gap-3">
            <div className="grid min-w-0 gap-1.5">
              <h2 className="m-0 grid overflow-hidden font-(family-name:--font-display) text-[1.625rem] leading-none font-semibold tracking-[-0.025em]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={name}
                    className="col-start-1 row-start-1 truncate pb-0.5"
                    {...nameMorph(20, 4)}
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  >
                    {name}
                  </motion.span>
                </AnimatePresence>
              </h2>
              <p className="m-0 truncate font-mono text-xs leading-tight text-muted-foreground tabular-nums">
                {edited && base ? (
                  <span className="font-sans">Edited from {base.name}</span>
                ) : (
                  `cubic-bezier(${formatBezier(bezier)})`
                )}
              </p>
            </div>
            <div className="flex gap-1">
              {edited ? (
                <button
                  type="button"
                  onClick={reset}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-[8px] px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                    press,
                  )}
                >
                  <RotateCcw aria-hidden="true" className="size-3.5" />
                  Reset
                </button>
              ) : null}
              <button
                type="button"
                aria-label="Previous curve"
                onClick={() => step(-1)}
                className={iconButton}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next curve"
                onClick={() => step(1)}
                className={iconButton}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[29rem]">
            <CurveEditor
              bezier={bezier}
              onChange={setCurve}
              playKey={playKey}
              durationMs={durationMs}
            />
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-6 border-t border-border py-7 md:border-t-0 md:border-l md:pl-8 lg:border-l-0">
          <DurationControl
            value={durationMs}
            onChange={setDuration}
            onCommit={replay}
            suggested={preset?.duration}
          />

          <p className="m-0 min-h-[4lh] text-[13px]/relaxed text-muted-foreground">
            {preset ? (
              <>
                <span className="font-medium text-foreground">{preset.use}.</span> {preset.note}
              </>
            ) : (
              "Your own curve. The address bar keeps it, so you can share the link."
            )}
          </p>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-border pt-6">
            {/* A small code window: format tabs and Copy in its bar, the snippet below. A
                fixed height keeps the column still when the format changes. */}
            <div className="overflow-hidden rounded-[10px] border border-border bg-muted/40">
              <div className="flex h-10 items-center justify-between gap-2 border-b border-border px-1.5">
                <div role="radiogroup" aria-label="Code format" className="flex gap-0.5">
                  {CODE_FORMATS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={format === item.id}
                      onClick={() => setFormat(item.id)}
                      className={cn(
                        "h-7 rounded-[6px] px-2 text-xs font-medium text-muted-foreground hover:text-foreground",
                        "aria-checked:bg-background aria-checked:text-foreground aria-checked:shadow-[0_0_0_1px_var(--color-border),0_1px_2px_rgb(0_0_0/0.06)]",
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
                    "inline-flex h-7 shrink-0 items-center rounded-[6px] bg-foreground px-2.5 text-xs font-medium text-background hover:bg-foreground/85",
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
                className="m-0 h-44 overflow-auto p-3 font-mono text-[11px]/relaxed text-foreground/85 [scrollbar-width:thin]"
              >
                <code>{code}</code>
              </pre>
            </div>
            <details className="group/code">
              <summary className="flex h-6 cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 transition-[rotate] duration-200 ease-out group-open/code:rotate-90"
                />
                Exact values
              </summary>
              <div className="mt-3">
                <CurveFields bezier={bezier} onChange={setCurve} />
              </div>
            </details>
          </div>
        </div>
      </section>

      <section aria-labelledby="transitions-title" className="mt-20 lg:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="grid gap-2">
            <h2
              id="transitions-title"
              className="m-0 font-(family-name:--font-display) text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            >
              Twelve transitions, one curve
            </h2>
            <p className="m-0 text-[15px]/[1.55] text-muted-foreground">
              Every scene below plays{" "}
              <span className="font-mono text-[0.92em] text-foreground">{name}</span> at{" "}
              <span className="text-foreground tabular-nums">{durationMs}ms</span>. Press one to
              replay it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Transition type"
              className="flex max-w-full rounded-[8px] bg-muted p-0.5"
            >
              {(["all", ...Object.keys(CATEGORY_LABELS)] as (SceneCategory | "all")[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  className={cn(segment, "shrink-0 px-2.5 sm:px-3")}
                >
                  {id === "all" ? "All" : CATEGORY_LABELS[id]}
                </button>
              ))}
            </div>
            {reducedMotion ? (
              <span className="text-xs text-muted-foreground">
                Reduced motion is on. Press a scene to play it.
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={!playing}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  press,
                )}
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-3.5" />
                ) : (
                  <Play aria-hidden="true" className="size-3.5" />
                )}
                {playing ? "Pause" : "Play"}
              </button>
            )}
          </div>
        </div>

        <div
          ref={galleryRef}
          className="mt-8 grid grid-flow-dense grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {scenes.map((scene, index) => {
            const isOpen = overrides[scene.id] ?? open;
            // Two columns: wide cards keep every row full (two in the full gallery, the first
            // of three in a filtered one). Three columns fill evenly without them.
            const wide = category === "all" ? scene.wide : index === 0;
            return (
              <figure
                key={scene.id}
                className={cn("m-0 grid gap-3", wide && "sm:col-span-2 lg:col-span-1")}
              >
                <button
                  type="button"
                  aria-label={`Play ${scene.title}`}
                  onClick={() => {
                    setOverrides((current) => ({ ...current, [scene.id]: !isOpen }));
                    setPlayKey((key) => key + 1);
                  }}
                  className={cn(
                    "group/scene relative block aspect-4/3 w-full overflow-hidden rounded-[12px] border border-border bg-muted/50 text-left text-foreground",
                    "transition-[scale,border-color,box-shadow] duration-200 ease-out active:scale-[0.985]",
                    "hover:border-foreground/20 hover:shadow-[0_12px_32px_-22px_rgb(0_0_0/0.3)] focus-visible:border-foreground/30",
                    wide && "sm:aspect-[2/1] lg:aspect-4/3",
                  )}
                >
                  <span aria-hidden="true" className="absolute inset-0 block" inert>
                    {scene.render(isOpen)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-2.5 right-2.5 grid size-7 scale-90 place-items-center rounded-[8px] bg-background/90 text-muted-foreground opacity-0 shadow-[0_0_0_1px_var(--color-border),0_4px_12px_-6px_rgb(0_0_0/0.2)] backdrop-blur transition-[opacity,scale] duration-200 ease-out group-hover/scene:scale-100 group-hover/scene:opacity-100 group-focus-visible/scene:scale-100 group-focus-visible/scene:opacity-100"
                  >
                    <RotateCcw className="size-3.5" />
                  </span>
                </button>
                <figcaption className="flex items-baseline justify-between gap-3 px-0.5">
                  <span className="text-sm font-medium">{scene.title}</span>
                  <span className="truncate text-[13px] text-muted-foreground">{scene.hint}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Once the instrument scrolls away, the current curve stays in reach here. */}
      <div
        inert={instrumentVisible}
        className={cn(
          "fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 z-40 flex w-[min(calc(100%-24px),26rem)] -translate-x-1/2 items-center gap-1 rounded-[14px] border border-border bg-background/90 p-1.5 shadow-[0_16px_48px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl",
          "transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          instrumentVisible && "pointer-events-none translate-y-[calc(100%+24px)] opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Previous curve"
          onClick={() => step(-1)}
          className={cn(iconButton, "size-10")}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 px-1">
          <MiniCurve bezier={bezier} />
          <span className="grid min-w-0 gap-1">
            <strong className="truncate font-mono text-[13px] leading-none font-medium">
              {name}
            </strong>
            <span className="text-[11px] leading-none text-muted-foreground tabular-nums">
              {durationMs}ms
            </span>
          </span>
        </div>
        <button
          type="button"
          aria-label="Next curve"
          onClick={() => step(1)}
          className={cn(iconButton, "size-10")}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={showWorkbench}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-[8px] bg-foreground px-3.5 text-xs font-medium text-background",
            press,
          )}
        >
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Edit
        </button>
      </div>
    </div>
  );
}
