"use client";

import { type KeyboardEvent, type PointerEvent, useEffect, useRef } from "react";

import type { CubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { round } from "./code";

const SIZE = 200;
const PAD = 16;
const Y_MIN = -0.6;
const Y_MAX = 1.7;
const HEIGHT = SIZE * (Y_MAX - Y_MIN);

const toX = (x: number) => PAD + x * SIZE;
const toY = (y: number) => PAD + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * HEIGHT;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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

  // Trace the curve over the real duration each time the scenes play.
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
  }, [playKey, durationMs, bezier]);

  const pointFromEvent = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM()?.inverse();
    if (!svg || !matrix) return null;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
    const x = clamp((point.x - PAD) / SIZE, 0, 1);
    const y = clamp(Y_MAX - ((point.y - PAD) / HEIGHT) * (Y_MAX - Y_MIN), Y_MIN, Y_MAX);
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

  const setValue = (index: number, raw: string) => {
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    const next = [...bezier] as [number, number, number, number];
    next[index] = index % 2 === 0 ? clamp(value, 0, 1) : clamp(value, -1, 2);
    onChange(next);
  };

  const path = `M ${toX(0)} ${toY(0)} C ${toX(x1)} ${toY(y1)}, ${toX(x2)} ${toY(y2)}, ${toX(1)} ${toY(1)}`;

  return (
    <div className={cn("easing-editor", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE + PAD * 2} ${HEIGHT + PAD * 2}`}
        className="easing-editor__plot"
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
          className="easing-editor__frame"
        />
        <line x1={toX(0)} y1={toY(0)} x2={toX(1)} y2={toY(1)} className="easing-editor__diagonal" />
        <line x1={toX(0)} y1={toY(0)} x2={toX(x1)} y2={toY(y1)} className="easing-editor__arm" />
        <line x1={toX(1)} y1={toY(1)} x2={toX(x2)} y2={toY(y2)} className="easing-editor__arm" />
        <path d={path} className="easing-editor__curve" />
        <circle ref={dotRef} cx={toX(1)} cy={toY(1)} r={5} className="easing-editor__dot" />
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
            r={9}
            tabIndex={0}
            role="button"
            aria-label={`Control point ${handle + 1}: x ${hx}, y ${hy}. Arrow keys move it; hold Shift for larger steps.`}
            className="easing-editor__handle"
            onPointerDown={onPointerDown(handle)}
            onKeyDown={onKeyDown(handle)}
          />
        ))}
      </svg>

      <div className="easing-editor__inputs">
        {(["x1", "y1", "x2", "y2"] as const).map((label, index) => (
          <label key={label} className="easing-editor__field">
            <span>{label}</span>
            <input
              type="number"
              inputMode="decimal"
              step={0.01}
              min={index % 2 === 0 ? 0 : -1}
              max={index % 2 === 0 ? 1 : 2}
              value={bezier[index]}
              onChange={(event) => setValue(index, event.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
