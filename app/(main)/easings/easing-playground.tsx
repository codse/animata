"use client";

import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Pause,
  Play,
  Shuffle,
  SlidersHorizontal,
} from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { type CubicBezier, stagger, toCssBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CODE_FORMATS, type CodeFormat, codeFor, formatBezier } from "./code";
import { CurveEditor, Y_MAX, Y_MIN } from "./curve-editor";
import { type EasingPreset, findPreset, GROUP_LABELS, PRESETS, sameBezier } from "./presets";
import { CATEGORY_LABELS, SCENES, type SceneCategory } from "./scenes";

import "./easings.css";

const DEFAULT_PRESET = PRESETS[0];
const MIN_DURATION = 80;
const MAX_DURATION = 1600;
/** How long each state is held before the gallery plays the other direction. */
const HOLD_MS = 1100;

function parseCurve(value: string | null): CubicBezier | null {
  if (!value) return null;
  const parts = value.split(",").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) return null;
  const [x1, y1, x2, y2] = parts;
  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) return null;
  // Keep shared links inside the editor's plot so both handles stay reachable.
  const y = (value: number) => Math.min(Y_MAX, Math.max(Y_MIN, value));
  return [x1, y(y1), x2, y(y2)];
}

function MiniCurve({ bezier, className }: { bezier: CubicBezier; className?: string }) {
  const [x1, y1, x2, y2] = bezier;
  // 0–1 mapped into a 24×24 box with headroom for overshoot.
  const px = (x: number) => 2 + x * 20;
  const py = (y: number) => 18 - y * 13;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("ez-mini", className)}>
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
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
  const [panel, setPanel] = useState<"adjust" | "code" | null>(null);
  const [format, setFormat] = useState<CodeFormat>("css");
  const [copied, setCopied] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
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

  const shuffle = () => {
    const others = PRESETS.filter((item) => item !== preset);
    choosePreset(others[Math.floor(Math.random() * others.length)]);
  };

  const setCurve = (next: CubicBezier) => {
    const match = PRESETS.find((item) => sameBezier(item.bezier, next));
    if (match)
      setQuery({ p: match.id, c: null, d: durationMs === match.duration ? null : durationMs });
    else setQuery({ p: null, c: formatBezier(next).replaceAll(" ", ""), d: durationMs });
  };

  const setDuration = (ms: number) => {
    setQuery({ d: ms === preset?.duration ? null : ms });
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
    <div className="ez" style={vars}>
      <header className="ez-hero">
        <h1 className="ez-hero__title">
          Feel{" "}
          <button
            type="button"
            className="ez-hero__word"
            onClick={() => setPanel(panel === "adjust" ? null : "adjust")}
            aria-expanded={panel === "adjust"}
            aria-controls="ez-panel"
          >
            {name}
          </button>{" "}
          on real interfaces
        </h1>
        <p className="ez-hero__lede">
          Pick a curve, tune it, and watch twelve everyday transitions use it. Copy the result as
          CSS, Tailwind, Motion, or GSAP.
        </p>
      </header>

      <section aria-label="Presets" className="ez-presets">
        {(Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[]).map((group) => (
          <div key={group} className="ez-presets__group">
            <span className="ez-presets__label">{GROUP_LABELS[group]}</span>
            <div className="ez-presets__row">
              {PRESETS.filter((item) => item.group === group).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="ez-chip"
                  aria-pressed={item === preset}
                  onClick={() => choosePreset(item)}
                >
                  <MiniCurve bezier={item.bezier} />
                  <span className="ez-chip__name">{item.name}</span>
                  <span className="ez-chip__meta">{item.duration}ms</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="ez-toolbar">
        <div className="ez-filters" role="group" aria-label="Scene type">
          {(["all", ...Object.keys(CATEGORY_LABELS)] as (SceneCategory | "all")[]).map((id) => (
            <button
              key={id}
              type="button"
              className="ez-filter"
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {id === "all" ? "All" : CATEGORY_LABELS[id]}
            </button>
          ))}
        </div>
        {reducedMotion ? (
          <span className="ez-toolbar__note">Reduced motion is on. Press a scene to play it.</span>
        ) : (
          <button
            type="button"
            className="ez-filter"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={!playing}
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

      <div ref={galleryRef} className="ez-grid">
        {scenes.map((scene) => {
          const isOpen = overrides[scene.id] ?? open;
          return (
            <figure key={scene.id} className="ez-scene">
              <button
                type="button"
                className="ez-scene__frame"
                aria-label={`Play ${scene.title}`}
                onClick={() => {
                  setOverrides((current) => ({ ...current, [scene.id]: !isOpen }));
                  setPlayKey((key) => key + 1);
                }}
              >
                <span aria-hidden="true" className="ez-scene__inner" inert>
                  {scene.render(isOpen)}
                </span>
              </button>
              <figcaption className="ez-scene__caption">
                <span>{scene.title}</span>
                <span>{CATEGORY_LABELS[scene.category]}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="ez-dock">
        {panel ? (
          <section
            id="ez-panel"
            className="ez-panel"
            aria-label={panel === "adjust" ? "Adjust curve" : "Code"}
          >
            {panel === "adjust" ? (
              <div className="ez-panel__adjust">
                <CurveEditor
                  bezier={bezier}
                  onChange={setCurve}
                  playKey={playKey}
                  durationMs={durationMs}
                />
                <div className="ez-panel__side">
                  <label className="ez-duration">
                    <span>
                      Duration <output>{durationMs}ms</output>
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
                    />
                  </label>
                  <p className="ez-panel__note">
                    {preset ? (
                      <>
                        <strong>{preset.use}.</strong> {preset.note}
                      </>
                    ) : (
                      "Your own curve. The link in the address bar keeps it, so you can share it."
                    )}
                  </p>
                  <button type="button" className="ez-filter" onClick={replay}>
                    <Play aria-hidden="true" className="size-3.5" /> Replay
                  </button>
                </div>
              </div>
            ) : (
              <div className="ez-panel__code">
                <div className="ez-filters" role="tablist" aria-label="Code format">
                  {CODE_FORMATS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={format === item.id}
                      className="ez-filter"
                      onClick={() => setFormat(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button type="button" className="ez-filter ez-filter--end" onClick={copy}>
                    <Copy aria-hidden="true" className="size-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="ez-code" role="tabpanel" data-lenis-prevent>
                  <code>{code}</code>
                </pre>
              </div>
            )}
          </section>
        ) : null}

        <div className="ez-bar">
          <button
            type="button"
            className="ez-bar__icon"
            onClick={() => step(-1)}
            aria-label="Previous preset"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <div className="ez-bar__current">
            <MiniCurve bezier={bezier} className="ez-mini--bar" />
            <span>
              <strong>{name}</strong>
              <span className="ez-bar__meta">
                {presetIndex === -1 ? "custom" : `${presetIndex + 1} of ${PRESETS.length}`} ·{" "}
                {durationMs}ms
              </span>
            </span>
          </div>
          <button
            type="button"
            className="ez-bar__icon"
            onClick={() => step(1)}
            aria-label="Next preset"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
          <span className="ez-bar__divider" />
          <button type="button" className="ez-bar__action" onClick={shuffle}>
            <Shuffle aria-hidden="true" className="size-4" />
            <span>Shuffle</span>
          </button>
          <button
            type="button"
            className="ez-bar__action"
            aria-expanded={panel === "adjust"}
            aria-controls="ez-panel"
            onClick={() => setPanel(panel === "adjust" ? null : "adjust")}
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            <span>Adjust</span>
          </button>
          <button
            type="button"
            className="ez-bar__action ez-bar__action--primary"
            aria-expanded={panel === "code"}
            aria-controls="ez-panel"
            onClick={() => setPanel(panel === "code" ? null : "code")}
          >
            <Code2 aria-hidden="true" className="size-4" />
            <span>Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}
