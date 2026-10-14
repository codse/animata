"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { type CubicBezier, stagger, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CODE_FORMATS, type CodeFormat, codeFor, formatBezier } from "./code";
import { CurveEditor, CurveFields, Y_MAX, Y_MIN } from "./curve-editor";
import { type EasingPreset, findPreset, GROUP_LABELS, PRESETS, sameBezier } from "./presets";
import { CATEGORY_LABELS, SCENES, type SceneCategory } from "./scenes";

const DEFAULT_PRESET = PRESETS[0];
const MIN_DURATION = 80;
const MAX_DURATION = 1600;
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

/** The chosen curve races a faint constant-speed dot across one rail. */
function Rail({ open }: { open: boolean }) {
  const runner =
    "absolute inset-y-0.5 left-0.5 w-[calc(100%-20px)] transition-[translate] duration-(--ez-dur) group-data-open/rail:translate-x-full";
  return (
    <div
      className="group/rail flex items-center gap-3"
      data-open={open || undefined}
      aria-hidden="true"
    >
      <div className="relative h-5 flex-1 rounded-full bg-muted">
        <div className={cn(runner, "ease-linear")}>
          <span className="block size-4 rounded-full bg-muted-foreground/30" />
        </div>
        <div className={cn(runner, "ease-(--ez-ease)")}>
          <span className="block size-4 rounded-full bg-accent shadow-[0_1px_4px_rgb(0_0_0/0.2)]" />
        </div>
      </div>
      <span className="shrink-0 text-[11px] text-muted-foreground">vs linear</span>
    </div>
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

  const showWorkbench = () => {
    workbenchRef.current?.scrollIntoView({ block: "start" });
    workbenchRef.current?.querySelector<HTMLElement>("[aria-pressed='true']")?.focus({
      preventScroll: true,
    });
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

  return (
    <div
      className="mx-auto w-full max-w-[1320px] px-4 pt-[clamp(40px,7vw,96px)] pb-32 sm:px-6 lg:pb-28"
      style={vars}
    >
      <header className="max-w-5xl">
        <h1 className="m-0 text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
          See how{" "}
          <button
            type="button"
            onClick={showWorkbench}
            className={cn(
              "inline rounded-[0.2em] bg-muted px-[0.18em] pb-[0.04em] font-mono text-[0.86em] tracking-[-0.03em] hover:bg-border",
              press,
            )}
          >
            {name}
          </button>{" "}
          moves real interfaces
        </h1>
        <p className="mt-5 max-w-xl text-base/relaxed text-muted-foreground">
          Pick a curve or drag your own, set the duration, and watch twelve everyday transitions use
          it. Copy the result as CSS, Tailwind, Motion, or GSAP.
        </p>
      </header>

      <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-12">
        <aside
          ref={workbenchRef}
          aria-label="Curve"
          className="scroll-mt-20 lg:sticky lg:top-[calc(var(--site-header-height,50px)+16px)] lg:max-h-[calc(100svh-var(--site-header-height,50px)-32px)] lg:overflow-y-auto lg:[scrollbar-width:thin]"
        >
          <div className="rounded-2xl border border-border bg-background p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-24px_rgb(0_0_0/0.18)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="m-0 truncate font-mono text-[15px] font-medium">{name}</p>
                <p className="m-0 mt-0.5 text-[13px] text-muted-foreground">
                  {preset ? `${GROUP_LABELS[preset.group]} · ${preset.use}` : "Custom curve"}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {(
                  [
                    [-1, "Previous curve", ChevronLeft],
                    [1, "Next curve", ChevronRight],
                  ] as const
                ).map(([direction, label, Icon]) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => step(direction)}
                    className={cn(
                      "grid size-8 place-items-center rounded-lg border border-border hover:bg-muted",
                      press,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            <CurveEditor
              className="mt-3"
              bezier={bezier}
              onChange={setCurve}
              playKey={playKey}
              durationMs={durationMs}
            />

            <div className="mt-3">
              <Rail open={open} />
            </div>

            <label className="mt-4 grid gap-2 text-[13px]">
              <span className="flex justify-between">
                Duration
                <output className="font-mono tabular-nums">{durationMs}ms</output>
              </span>
              <input
                type="range"
                min={MIN_DURATION}
                max={MAX_DURATION}
                step={10}
                value={durationMs}
                onChange={(event) => setDuration(Number(event.target.value))}
                onPointerUp={replay}
                onKeyUp={replay}
                className="w-full accent-foreground"
              />
            </label>

            <div
              role="group"
              aria-label="Curves"
              className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-3"
            >
              {PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  title={`${item.name}, ${item.duration}ms`}
                  aria-pressed={item === preset}
                  onClick={() => choosePreset(item)}
                  className={cn(
                    "flex h-8 min-w-0 items-center gap-1.5 rounded-lg border border-border px-1.5 text-left text-muted-foreground",
                    "hover:border-foreground/25 hover:text-foreground",
                    item.group === "baseline" && "border-dashed",
                    "aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background",
                    press,
                  )}
                >
                  <MiniCurve bezier={item.bezier} className="size-5" />
                  <span className="truncate text-xs leading-none">{item.short}</span>
                </button>
              ))}
            </div>

            <p className="m-0 mt-3 min-h-[2lh] text-[13px]/snug text-muted-foreground">
              {preset
                ? preset.note
                : "Your own curve. The address bar keeps it, so you can share the link."}
            </p>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <div
                  role="radiogroup"
                  aria-label="Code format"
                  className="flex flex-1 rounded-lg bg-muted p-0.5"
                >
                  {CODE_FORMATS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={format === item.id}
                      onClick={() => setFormat(item.id)}
                      className={cn(
                        "h-7 flex-1 rounded-md text-xs text-muted-foreground hover:text-foreground",
                        "aria-checked:bg-background aria-checked:text-foreground aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
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
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/85",
                    press,
                  )}
                >
                  {copied ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Copy aria-hidden="true" className="size-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <details className="group/code mt-3 [&[open]>summary]:mb-3">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 transition-[rotate] duration-200 ease-out group-open/code:rotate-90"
                  />
                  Values and code
                </summary>
                <CurveFields bezier={bezier} onChange={setCurve} />
                <pre
                  data-lenis-prevent
                  className="mt-2 max-h-56 overflow-auto rounded-lg bg-muted p-3 font-mono text-[11px]/relaxed"
                >
                  <code>{code}</code>
                </pre>
              </details>
            </div>
          </div>
        </aside>

        <section aria-label="Transitions" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Transition type"
              className="flex max-w-full rounded-full bg-muted p-1"
            >
              {(["all", ...Object.keys(CATEGORY_LABELS)] as (SceneCategory | "all")[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  className={cn(
                    "h-8 shrink-0 rounded-full px-2.5 text-[13px] text-muted-foreground hover:text-foreground sm:px-3.5",
                    "aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
                    press,
                  )}
                >
                  {id === "all" ? "All" : CATEGORY_LABELS[id]}
                </button>
              ))}
            </div>
            {reducedMotion ? (
              <span className="text-[13px] text-muted-foreground">
                Reduced motion is on. Press a scene to play it.
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={!playing}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-[13px] hover:bg-muted",
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
            className="mt-5 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {scenes.map((scene, index) => {
              const isOpen = overrides[scene.id] ?? open;
              // Wide cards keep every row full: two in the full gallery, the first of three
              // in a filtered one.
              const wide = category === "all" ? scene.wide : index === 0;
              return (
                <figure key={scene.id} className={cn("m-0", wide && "sm:col-span-2")}>
                  <button
                    type="button"
                    aria-label={`Play ${scene.title}`}
                    onClick={() => {
                      setOverrides((current) => ({ ...current, [scene.id]: !isOpen }));
                      setPlayKey((key) => key + 1);
                    }}
                    className={cn(
                      "relative block aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted/60 text-left text-foreground",
                      "transition-[scale] duration-150 ease-out active:scale-[0.985]",
                      wide && "sm:aspect-[2/1]",
                    )}
                  >
                    <span aria-hidden="true" className="absolute inset-0 block" inert>
                      {scene.render(isOpen)}
                    </span>
                  </button>
                  <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 px-1 text-[13px]">
                    <span className="font-medium">{scene.title}</span>
                    <span className="truncate text-muted-foreground">{scene.hint}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </div>

      {/* Phones: the workbench scrolls away, so the current curve stays reachable here. */}
      <div className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 flex items-center gap-1 rounded-2xl border border-border bg-background/90 p-1.5 shadow-[0_16px_48px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl lg:hidden">
        <button
          type="button"
          aria-label="Previous curve"
          onClick={() => step(-1)}
          className={cn("grid size-10 place-items-center rounded-xl hover:bg-muted", press)}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 px-1">
          <MiniCurve bezier={bezier} />
          <span className="grid min-w-0 text-[13px] leading-tight">
            <strong className="truncate font-mono font-medium">{name}</strong>
            <span className="font-mono text-[11px] text-muted-foreground">{durationMs}ms</span>
          </span>
        </div>
        <button
          type="button"
          aria-label="Next curve"
          onClick={() => step(1)}
          className={cn("grid size-10 place-items-center rounded-xl hover:bg-muted", press)}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={showWorkbench}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-xl bg-foreground px-3.5 text-[13px] font-medium text-background",
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
