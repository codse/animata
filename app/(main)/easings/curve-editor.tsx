"use client";

import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";

import type { CubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { round } from "./code";

/** Y limits for control points. Numeric input and shared links clamp to the same range. */
export const Y_MIN = -0.6;
export const Y_MAX = 1.7;

const SIZE = 200;
const PAD = 14;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Plot only as much vertical range as the curve needs, with a little air. */
function plotRange([, y1, , y2]: CubicBezier) {
  return {
    min: Math.max(Y_MIN, Math.min(-0.15, y1 - 0.15, y2 - 0.15)),
    max: Math.min(Y_MAX, Math.max(1.15, y1 + 0.15, y2 + 0.15)),
  };
}

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
  /** Changes whenever the scenes play, so the dot traces the curve in real time. */
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
  const dragging = useRef<0 | 1 | null>(null);
  const [x1, y1, x2, y2] = bezier;

  // The range follows the curve, but holds still while a handle is dragged so the handle
  // stays under the pointer.
  const [range, setRange] = useState(() => plotRange(bezier));
  useEffect(() => {
    if (dragging.current === null) setRange(plotRange(bezier));
  }, [bezier]);

  const height = SIZE * (range.max - range.min);
  const toX = (x: number) => PAD + x * SIZE;
  const toY = (y: number) => PAD + ((range.max - y) / (range.max - range.min)) * height;

  // Trace the curve over the real duration each time the scenes play.
  // biome-ignore lint/correctness/useExhaustiveDependencies: toY derives from range
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || playKey === 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const x = Math.min(1, (now - start) / durationMs);
      dot.setAttribute("cx", String(toX(x)));
      dot.setAttribute("cy", String(toY(sampleBezier(bezier, x))));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey, durationMs, bezier, range]);

  const pointFromEvent = (event: PointerEvent<SVGSVGElement>) => {
    const matrix = svgRef.current?.getScreenCTM()?.inverse();
    if (!matrix) return null;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
    const x = clamp((point.x - PAD) / SIZE, 0, 1);
    const y = clamp(range.max - ((point.y - PAD) / height) * (range.max - range.min), Y_MIN, Y_MAX);
    return [round(x), round(y)] as const;
  };

  const move = (handle: 0 | 1, x: number, y: number) => {
    onChange(handle === 0 ? [x, y, x2, y2] : [x1, y1, x, y]);
  };

  const onPointerDown = (handle: 0 | 1) => (event: PointerEvent<SVGCircleElement>) => {
    event.preventDefault();
    dragging.current = handle;
    svgRef.current?.setPointerCapture(event.pointerId);
    (event.currentTarget as SVGCircleElement).focus();
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null) return;
    const point = pointFromEvent(event);
    if (point) move(dragging.current, point[0], point[1]);
  };

  const onPointerUp = (event: PointerEvent<SVGSVGElement>) => {
    dragging.current = null;
    setRange(plotRange(bezier));
    if (svgRef.current?.hasPointerCapture(event.pointerId)) {
      svgRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (handle: 0 | 1) => (event: KeyboardEvent<SVGCircleElement>) => {
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

  return (
    <div className={cn("grid gap-3", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE + PAD * 2} ${height + PAD * 2}`}
        className="max-h-48 w-full touch-none overflow-visible select-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="group"
        aria-label="Easing curve. Drag or use arrow keys on the two control points."
      >
        <rect
          x={toX(0)}
          y={toY(1)}
          width={SIZE}
          height={toY(0) - toY(1)}
          rx={6}
          className="fill-muted stroke-border"
        />
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(1)}
          y2={toY(1)}
          className="stroke-border [stroke-dasharray:3_4]"
        />
        <line
          x1={toX(0)}
          y1={toY(0)}
          x2={toX(x1)}
          y2={toY(y1)}
          className="stroke-muted-foreground/60"
        />
        <line
          x1={toX(1)}
          y1={toY(1)}
          x2={toX(x2)}
          y2={toY(y2)}
          className="stroke-muted-foreground/60"
        />
        <path
          d={path}
          className="fill-none stroke-foreground stroke-[2.5] [stroke-linecap:round]"
        />
        <circle ref={dotRef} cx={toX(1)} cy={toY(1)} r={5} className="fill-accent" />
        {(
          [
            [0, x1, y1],
            [1, x2, y2],
          ] as const
        ).map(([handle, hx, hy]) => (
          <circle
            key={handle}
            cx={toX(hx)}
            cy={toY(hy)}
            r={8}
            tabIndex={0}
            role="button"
            aria-label={`Control point ${handle + 1}: x ${hx}, y ${hy}. Arrow keys move it; hold Shift for larger steps.`}
            className="cursor-grab fill-background stroke-foreground stroke-2 outline-none focus-visible:stroke-accent focus-visible:stroke-[3] active:cursor-grabbing"
            onPointerDown={onPointerDown(handle)}
            onKeyDown={onKeyDown(handle)}
          />
        ))}
      </svg>
    </div>
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
      <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={draft ?? String(value)}
        className="h-8 w-full rounded-lg border border-border bg-background pr-2 pl-7 text-right font-mono text-xs tabular-nums text-foreground outline-none transition-colors focus-visible:border-foreground"
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
