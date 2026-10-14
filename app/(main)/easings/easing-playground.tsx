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
import { PresetShelf } from "./preset-shelf";
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

function MiniCurve({ bezier, className }: { bezier: CubicBezier; className?: string }) {
  const [x1, y1, x2, y2] = bezier;
  // 0–1 mapped into a 24×24 box with headroom for overshoot.
  const px = (x: number) => 2 + x * 20;
  const py = (y: number) => 19 - y * 14;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 shrink-0 overflow-visible", className)}
    >
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
        className="fill-none stroke-current stroke-[1.6] [stroke-linecap:round]"
      />
    </svg>
  );
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const workbenchRef = useRef<HTMLElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const [galleryVisible, setGalleryVisible] = useState(true);

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

  const choosePreset = (next: EasingPreset) => {
    setQuery({ p: next.id, c: null, d: null });
    replay();
  };

  const step = (direction: 1 | -1) => {
    const from = presetIndex === -1 ? 0 : presetIndex;
    choosePreset(PRESETS[(from + direction + PRESETS.length) % PRESETS.length]);
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

  const showCurves = () => {
    shelfRef.current?.scrollIntoView({ block: "center" });
    shelfRef.current?.querySelector<HTMLElement>("[aria-pressed='true']")?.focus({
      preventScroll: true,
    });
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

  return (
    <div
      className="mx-auto w-full max-w-[1240px] px-4 pt-[clamp(48px,8vw,104px)] pb-32 sm:px-6 lg:px-8 lg:pb-24"
      style={vars}
    >
      <header className="max-w-4xl">
        <h1 className="m-0 font-(family-name:--font-display) text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
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
                initial={reducedMotion ? false : { y: "0.55em", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={
                  reducedMotion
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { y: "-0.55em", opacity: 0, filter: "blur(6px)" }
                }
                transition={{ duration: Math.min(durationMs, 700) / 1000, ease: [...bezier] }}
              >
                {name}
              </motion.span>
            </AnimatePresence>
          </button>{" "}
          moves real interfaces
        </h1>
        <p className="m-0 mt-6 max-w-[36rem] text-[17px]/[1.6] text-pretty text-muted-foreground">
          Pick a curve or drag your own, set the duration, and watch twelve everyday transitions use
          it. Copy the result as CSS, Tailwind, Motion, or GSAP.
        </p>
      </header>

      <section ref={shelfRef} aria-label="Curves" className="mt-12 scroll-mt-24 lg:mt-14">
        <PresetShelf selected={preset} onSelect={choosePreset} />
      </section>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,352px)_minmax(0,1fr)] lg:gap-8">
        <aside
          ref={workbenchRef}
          aria-label="Curve"
          className="scroll-mt-20 lg:sticky lg:top-[calc(var(--site-header-height,50px)+16px)] lg:max-h-[calc(100svh-var(--site-header-height,50px)-32px)] lg:overflow-y-auto lg:[scrollbar-width:thin]"
        >
          <div className="grid gap-4 rounded-[12px] border border-border bg-background p-4 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_12px_32px_-24px_rgb(0_0_0/0.14)]">
            <div className="flex items-center justify-between gap-3">
              <div className="grid min-w-0 gap-1">
                <h2 className="m-0 truncate font-(family-name:--font-display) text-lg leading-tight font-semibold tracking-[-0.015em]">
                  {name}
                </h2>
                <p className="m-0 truncate font-mono text-xs leading-tight text-muted-foreground tabular-nums">
                  cubic-bezier({formatBezier(bezier)})
                </p>
              </div>
              <div className="flex gap-1">
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

            <CurveEditor
              bezier={bezier}
              onChange={setCurve}
              playKey={playKey}
              durationMs={durationMs}
            />

            <DurationControl
              value={durationMs}
              onChange={setDuration}
              onCommit={replay}
              suggested={preset?.duration}
            />

            <p className="m-0 min-h-[3lh] text-[13px]/relaxed text-muted-foreground">
              {preset ? (
                <>
                  <span className="font-medium text-foreground">{preset.use}.</span> {preset.note}
                </>
              ) : (
                "Your own curve. The address bar keeps it, so you can share the link."
              )}
            </p>

            <div className="grid gap-3 border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <div
                  role="radiogroup"
                  aria-label="Code format"
                  className="grid flex-1 grid-cols-4 rounded-[8px] bg-muted p-0.5"
                >
                  {CODE_FORMATS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={format === item.id}
                      onClick={() => setFormat(item.id)}
                      className={cn(segment, "px-0")}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={copy}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/85",
                    press,
                  )}
                >
                  {copied ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Copy aria-hidden="true" className="size-3.5" />
                  )}
                  <span className="w-11 text-left">{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <details className="group/code">
                <summary className="flex h-6 cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 transition-[rotate] duration-200 ease-out group-open/code:rotate-90"
                  />
                  Values and code
                </summary>
                <div className="mt-3 grid gap-2">
                  <CurveFields bezier={bezier} onChange={setCurve} />
                  <pre
                    data-lenis-prevent
                    className="m-0 max-h-56 overflow-auto rounded-[6px] bg-muted p-3 font-mono text-[11px]/relaxed"
                  >
                    <code>{code}</code>
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </aside>

        <section aria-label="Transitions" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
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

          <div
            ref={galleryRef}
            className="mt-4 grid grid-flow-dense grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2"
          >
            {scenes.map((scene, index) => {
              const isOpen = overrides[scene.id] ?? open;
              // Wide cards keep every row full: two in the full gallery, the first of three
              // in a filtered one.
              const wide = category === "all" ? scene.wide : index === 0;
              return (
                <figure key={scene.id} className={cn("m-0 grid gap-2.5", wide && "sm:col-span-2")}>
                  <button
                    type="button"
                    aria-label={`Play ${scene.title}`}
                    onClick={() => {
                      setOverrides((current) => ({ ...current, [scene.id]: !isOpen }));
                      setPlayKey((key) => key + 1);
                    }}
                    className={cn(
                      "group/scene relative block aspect-4/3 w-full overflow-hidden rounded-[12px] border border-border bg-muted/50 text-left text-foreground",
                      // A faint dotted canvas, like a design tool's stage.
                      "bg-[radial-gradient(var(--color-border)_1px,transparent_1.2px)] bg-size-[14px_14px] bg-center",
                      "transition-[scale,border-color,box-shadow] duration-200 ease-out active:scale-[0.985]",
                      "hover:border-foreground/20 hover:shadow-[0_12px_32px_-22px_rgb(0_0_0/0.3)] focus-visible:border-foreground/30",
                      wide && "sm:aspect-[2/1]",
                    )}
                  >
                    <span aria-hidden="true" className="absolute inset-0 block" inert>
                      {scene.render(isOpen)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-[8px] bg-background/90 text-muted-foreground opacity-0 shadow-[0_0_0_1px_var(--color-border),0_4px_12px_-6px_rgb(0_0_0/0.2)] backdrop-blur transition-[opacity,scale] duration-200 ease-out group-hover/scene:opacity-100 group-focus-visible/scene:opacity-100 scale-90 group-hover/scene:scale-100 group-focus-visible/scene:scale-100"
                    >
                      <RotateCcw className="size-3.5" />
                    </span>
                  </button>
                  <figcaption className="grid gap-0.5 px-0.5">
                    <span className="text-sm font-medium">{scene.title}</span>
                    <span className="truncate text-[13px] text-muted-foreground">{scene.hint}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </div>

      {/* Phones: the panel scrolls away, so the current curve stays reachable here. */}
      <div className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 flex items-center gap-1 rounded-[14px] border border-border bg-background/90 p-1.5 shadow-[0_16px_48px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl lg:hidden">
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
          <span className="grid min-w-0 gap-0.5">
            <strong className="truncate font-mono text-[13px] leading-none font-medium">
              {name}
            </strong>
            <span className="font-mono text-[11px] leading-none text-muted-foreground">
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
