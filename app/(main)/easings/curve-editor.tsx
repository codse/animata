"use client";

import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";

import type { CubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { round } from "./code";

/**
 * Y limits for control points, and the plot's fixed vertical range. Every preset fits,
 * including a 1.56 overshoot, so the editor never changes size while you work.
 * Numeric input and shared links clamp to the same range.
 */
export const Y_MIN = -0.3;
export const Y_MAX = 1.6;

/** Plot units: the 0–1 box is WIDTH wide and WIDTH * Y_SCALE tall. */
const WIDTH = 320;
const Y_SCALE = 0.55;
const PAD_X = 14;
const PAD_TOP = 10;
const PAD_BOTTOM = 10;
const HANDLE_HIT = 22;
const GRID = [0.25, 0.5, 0.75];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Past a limit the handle keeps following, with growing resistance, up to `limit` px. */
const RUBBER_LIMIT = 28;
function rubberband(distance: number, limit = RUBBER_LIMIT) {
  if (distance === 0) return 0;
  return Math.sign(distance) * limit * (1 - 1 / ((Math.abs(distance) * 0.55) / limit + 1));
}

type Stretch = { handle: 0 | 1; dx: number; dy: number } | null;

/** The plot always shows the full allowed range. */
const RANGE = { min: Y_MIN, max: Y_MAX };

/** Progress at time `x` (0–1) for a cubic bezier, solved with Newton's method then bisection. */
export function sampleBezier([x1, y1, x2, y2]: CubicBezier, x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const curveX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  let t = x;
  for (let i = 0; i < 8; i++) {
    const error = curveX(t) - x;
    const slope = slopeX(t);
    if (Math.abs(error) < 1e-5) break;
    if (Math.abs(slope) < 1e-6) break;
    t -= error / slope;
  }
  if (t < 0 || t > 1 || Math.abs(curveX(t) - x) > 1e-4) {
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 30; i++) {
      if (curveX(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
  }
  return ((ay * t + by) * t + cy) * t;
}

type CurveEditorProps = {
  bezier: CubicBezier;
  onChange: (bezier: CubicBezier) => void;
  /** Changes whenever the scenes play, so the playhead sweeps in real time. */
  playKey: number;
  durationMs: number;
  className?: string;
};

export function CurveEditor({
  bezier,
  onChange,
  playKey,
  durationMs,
  className,
}: CurveEditorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const playheadRef = useRef<SVGLineElement>(null);
  const dragging = useRef<0 | 1 | null>(null);
  /** Pointer-to-handle distance at grab time, in plot units, so the handle never jumps. */
  const grabOffset = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState<0 | 1 | null>(null);
  const [stretch, setStretch] = useState<Stretch>(null);
  const [x1, y1, x2, y2] = bezier;

  const range = RANGE;
  const unit = WIDTH * Y_SCALE;
  const height = (range.max - range.min) * unit;
  const viewWidth = WIDTH + PAD_X * 2;
  const viewHeight = height + PAD_TOP + PAD_BOTTOM;
  const toX = (x: number) => PAD_X + x * WIDTH;
  const toY = (y: number) => PAD_TOP + (range.max - y) * unit;

  // A playhead sweeps across time while the dot rides the curve, at the real duration.
  // biome-ignore lint/correctness/useExhaustiveDependencies: toX and toY are pure helpers of constants
  useEffect(() => {
    const dot = dotRef.current;
    const playhead = playheadRef.current;
    if (!dot || !playhead || playKey === 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const x = Math.min(1, (now - start) / durationMs);
      const px = String(toX(x));
      dot.setAttribute("cx", px);
      dot.setAttribute("cy", String(toY(sampleBezier(bezier, x))));
      playhead.setAttribute("x1", px);
      playhead.setAttribute("x2", px);
      playhead.style.opacity = x < 1 ? "1" : "0";
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey, durationMs, bezier]);

  /** Pointer position in plot units, unclamped. */
  const toPlot = (event: PointerEvent<SVGSVGElement>) => {
    const matrix = svgRef.current?.getScreenCTM()?.inverse();
    if (!matrix) return null;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
    return { x: (point.x - PAD_X) / WIDTH, y: range.max - (point.y - PAD_TOP) / unit };
  };

  const move = (handle: 0 | 1, x: number, y: number) => {
    onChange(handle === 0 ? [x, y, x2, y2] : [x1, y1, x, y]);
  };

  const startDrag = (handle: 0 | 1, event: PointerEvent<SVGSVGElement>) => {
    dragging.current = handle;
    setActive(handle);
    try {
      svgRef.current?.setPointerCapture(event.pointerId);
    } catch {
      // The pointer can already be gone (for example a cancelled touch); dragging still
      // works while it stays over the plot.
    }
  };

  // Pressing anywhere on the plot grabs the nearest handle, so the whole plot is a target.
  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    const point = toPlot(event);
    if (!point) return;
    event.preventDefault();
    const distance = (hx: number, hy: number) =>
      Math.hypot((point.x - hx) * WIDTH, (point.y - hy) * unit);
    const handle = distance(x1, y1) <= distance(x2, y2) ? 0 : 1;
    const [hx, hy] = handle === 0 ? [x1, y1] : [x2, y2];
    startDrag(handle, event);
    if ((event.target as Element).closest("[data-handle]")) {
      // Grabbed the handle: keep the offset so it moves with the pointer, not to it.
      grabOffset.current = { x: hx - point.x, y: hy - point.y };
    } else {
      // Pressed the plot: pull the nearest handle to the pointer, then track 1:1.
      grabOffset.current = { x: 0, y: 0 };
      move(handle, round(clamp(point.x, 0, 1)), round(clamp(point.y, Y_MIN, Y_MAX)));
    }
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const handle = dragging.current;
    if (handle === null) return;
    const point = toPlot(event);
    if (!point) return;
    const x = point.x + grabOffset.current.x;
    const y = point.y + grabOffset.current.y;
    const cx = clamp(x, 0, 1);
    const cy = clamp(y, Y_MIN, Y_MAX);
    move(handle, round(cx), round(cy));
    // Past a limit, show the pull rather than stopping dead.
    const dx = rubberband((x - cx) * WIDTH);
    const dy = rubberband(-(y - cy) * unit);
    setStretch(dx || dy ? { handle, dx, dy } : null);
  };

  const onPointerUp = (event: PointerEvent<SVGSVGElement>) => {
    dragging.current = null;
    setActive(null);
    setStretch(null);
    if (svgRef.current?.hasPointerCapture(event.pointerId)) {
      svgRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (handle: 0 | 1) => (event: KeyboardEvent<SVGGElement>) => {
    const step = event.shiftKey ? 0.1 : 0.01;
    const [hx, hy] = handle === 0 ? [x1, y1] : [x2, y2];
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const delta = moves[event.key];
    if (!delta) return;
    event.preventDefault();
    move(handle, round(clamp(hx + delta[0], 0, 1)), round(clamp(hy + delta[1], Y_MIN, Y_MAX)));
  };

  const path = `M ${toX(0)} ${toY(0)} C ${toX(x1)} ${toY(y1)}, ${toX(x2)} ${toY(y2)}, ${toX(1)} ${toY(1)}`;
  const handles = [
    [0, x1, y1],
    [1, x2, y2],
  ] as const;

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className={cn(
          "block w-full touch-none select-none overflow-visible",
          active === null ? "cursor-crosshair" : "cursor-grabbing",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="group"
        aria-label="Easing curve. Drag a control point, press anywhere to pull the nearest one, or use arrow keys on a focused point."
      >
        {/* One surface for the whole range. Hairlines at 0 and 1 mark the start and end
            values; the room beyond them is where curves overshoot or anticipate. */}
        <rect
          x={toX(0)}
          y={PAD_TOP}
          width={WIDTH}
          height={height}
          rx={10}
          className="fill-muted/60"
        />
        {GRID.map((g) => (
          <g key={g} className="stroke-foreground/[0.05]">
            <line x1={toX(g)} y1={toY(0)} x2={toX(g)} y2={toY(1)} />
            <line x1={toX(0)} y1={toY(g)} x2={toX(1)} y2={toY(g)} />
          </g>
        ))}
        {[0, 1].map((y) => (
          <line
            key={y}
            x1={toX(0)}
            y1={toY(y)}
            x2={toX(1)}
            y2={toY(y)}
            className="stroke-foreground/15"
          />
        ))}
        <text x={toX(0) + 10} y={toY(0) + 18} className="fill-muted-foreground text-[12px]">
          Start
        </text>
        <text
          x={toX(1) - 10}
          y={toY(1) - 9}
          textAnchor="end"
          className="fill-muted-foreground text-[12px]"
        >
          End
        </text>
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(1)}
          y2={toY(1)}
          className="stroke-foreground/15 [stroke-dasharray:2_5]"
        />

        <line
          ref={playheadRef}
          x1={toX(0)}
          y1={PAD_TOP}
          x2={toX(0)}
          y2={PAD_TOP + height}
          className="stroke-accent/50 opacity-0"
        />

        {handles.map(([handle, hx, hy]) => (
          <line
            key={handle}
            x1={toX(handle)}
            y1={toY(handle)}
            x2={toX(hx) + (stretch?.handle === handle ? stretch.dx : 0)}
            y2={toY(hy) + (stretch?.handle === handle ? stretch.dy : 0)}
            className={cn(
              "stroke-[1.5] transition-[stroke] duration-150",
              active === handle ? "stroke-accent" : "stroke-accent/45",
            )}
          />
        ))}

        <path
          d={path}
          className="fill-none stroke-foreground stroke-[2.5] [stroke-linecap:round]"
        />
        <circle cx={toX(0)} cy={toY(0)} r={3.5} className="fill-foreground" />
        <circle ref={dotRef} cx={toX(1)} cy={toY(1)} r={6} className="fill-accent" />

        {handles.map(([handle, hx, hy]) => (
          <g
            key={handle}
            data-handle=""
            tabIndex={0}
            role="button"
            aria-label={`Control point ${handle + 1}: x ${hx}, y ${hy}. Arrow keys move it; hold Shift for larger steps.`}
            onKeyDown={onKeyDown(handle)}
            onFocus={() => setActive(handle)}
            onBlur={() => dragging.current === null && setActive(null)}
            className={cn(
              "group/handle cursor-grab outline-none",
              // Springs back from a rubber-band pull; tracks the pointer 1:1 while dragging.
              stretch?.handle !== handle &&
                "transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
            )}
            style={{
              transform:
                stretch?.handle === handle
                  ? `translate(${stretch.dx}px, ${stretch.dy}px)`
                  : "translate(0px, 0px)",
            }}
          >
            {/* Generous invisible hit area around a small visible point. */}
            <circle cx={toX(hx)} cy={toY(hy)} r={HANDLE_HIT} className="fill-transparent" />
            <circle
              cx={toX(hx)}
              cy={toY(hy)}
              r={13}
              className={cn(
                "fill-accent/15 transition-opacity duration-150",
                active === handle ? "opacity-100" : "opacity-0 group-hover/handle:opacity-100",
              )}
            />
            <circle
              cx={toX(hx)}
              cy={toY(hy)}
              r={7}
              className={cn(
                "stroke-[2.5] transition-[fill,stroke] duration-150",
                active === handle
                  ? "fill-accent stroke-background"
                  : "fill-background stroke-accent",
              )}
            />
          </g>
        ))}

        {active !== null ? (
          <HandleLabel
            x={toX(handles[active][1])}
            y={toY(handles[active][2])}
            text={`${handles[active][1].toFixed(2)}, ${handles[active][2].toFixed(2)}`}
            maxX={viewWidth}
          />
        ) : null}
      </svg>
    </div>
  );
}

/** Coordinates shown beside the active handle; flips below the point near the top edge. */
function HandleLabel({ x, y, text, maxX }: { x: number; y: number; text: string; maxX: number }) {
  const width = 76;
  const left = clamp(x - width / 2, 0, maxX - width);
  const top = y - 40 < 0 ? y + 18 : y - 40;
  return (
    <g className="pointer-events-none">
      <rect x={left} y={top} width={width} height={22} rx={6} className="fill-foreground" />
      <text
        x={left + width / 2}
        y={top + 15}
        textAnchor="middle"
        className="fill-background font-mono text-[11px] tabular-nums"
      >
        {text}
      </text>
    </g>
  );
}

/** Exact control-point values, editable as text. */
export function CurveFields({
  bezier,
  onChange,
}: {
  bezier: CubicBezier;
  onChange: (bezier: CubicBezier) => void;
}) {
  const setValue = (index: number, value: number) => {
    const next = [...bezier] as [number, number, number, number];
    next[index] = value;
    onChange(next);
  };

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {(["x1", "y1", "x2", "y2"] as const).map((label, index) => (
        <ControlField
          key={label}
          label={label}
          value={bezier[index]}
          min={index % 2 === 0 ? 0 : Y_MIN}
          max={index % 2 === 0 ? 1 : Y_MAX}
          onCommit={(value) => setValue(index, value)}
        />
      ))}
    </div>
  );
}

/** A complete number: rejects in-progress text such as "", "-", "0.", or ".". */
const COMPLETE_NUMBER = /^-?(\d+\.?\d*|\.\d+)$/;

type ControlFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onCommit: (value: number) => void;
};

/**
 * Keeps the typed text while it is incomplete, so clearing the field or starting a
 * decimal or negative number doesn't snap to 0. Complete numbers commit, clamped; blur
 * shows the committed value again.
 */
function ControlField({ label, value, min, max, onCommit }: ControlFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);

  const commit = (next: number) => onCommit(round(clamp(next, min, max)));

  return (
    <label className="relative block">
      <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 font-mono text-[11px] text-muted-foreground">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={draft ?? String(value)}
        className="h-8 w-full rounded-[6px] border border-border bg-background pr-2 pl-7 text-right font-mono text-xs text-foreground tabular-nums outline-none transition-colors focus-visible:border-foreground"
        onChange={(event) => {
          const raw = event.target.value.trim();
          setDraft(raw);
          if (COMPLETE_NUMBER.test(raw) && !raw.endsWith(".")) commit(Number(raw));
        }}
        onBlur={() => setDraft(null)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
          event.preventDefault();
          const step = (event.shiftKey ? 0.1 : 0.01) * (event.key === "ArrowUp" ? 1 : -1);
          setDraft(null);
          commit(value + step);
        }}
      />
    </label>
  );
}
