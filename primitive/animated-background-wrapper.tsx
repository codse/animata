"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "aurora" | "beam" | "grid" | "particles";
type Intensity = "subtle" | "medium" | "strong";

export interface AnimatedBackgroundProps {
  variant?: Variant;
  children?: ReactNode;
  className?: string;
  intensity?: Intensity;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INTENSITY_SCALE: Record<Intensity, number> = {
  subtle: 0.5,
  medium: 1,
  strong: 1.5,
};

// Deterministic particle data — avoids hydration mismatch from Math.random()
const PARTICLE_DATA = [
  { x: 5, size: 3, duration: 14, delay: 0, opacity: 0.3 },
  { x: 12, size: 2, duration: 18, delay: 2.5, opacity: 0.2 },
  { x: 20, size: 4, duration: 11, delay: 1.0, opacity: 0.35 },
  { x: 28, size: 2, duration: 16, delay: 4.0, opacity: 0.25 },
  { x: 35, size: 3, duration: 20, delay: 0.5, opacity: 0.18 },
  { x: 42, size: 5, duration: 13, delay: 3.0, opacity: 0.28 },
  { x: 50, size: 2, duration: 17, delay: 1.5, opacity: 0.22 },
  { x: 58, size: 4, duration: 12, delay: 5.0, opacity: 0.32 },
  { x: 65, size: 3, duration: 19, delay: 2.0, opacity: 0.2 },
  { x: 72, size: 2, duration: 15, delay: 3.5, opacity: 0.28 },
  { x: 78, size: 5, duration: 10, delay: 0.8, opacity: 0.15 },
  { x: 85, size: 3, duration: 22, delay: 4.5, opacity: 0.35 },
  { x: 90, size: 2, duration: 14, delay: 1.2, opacity: 0.22 },
  { x: 8, size: 4, duration: 16, delay: 6.0, opacity: 0.28 },
  { x: 18, size: 3, duration: 13, delay: 2.8, opacity: 0.18 },
  { x: 32, size: 2, duration: 21, delay: 7.0, opacity: 0.3 },
  { x: 45, size: 5, duration: 15, delay: 1.8, opacity: 0.2 },
  { x: 60, size: 3, duration: 18, delay: 3.2, opacity: 0.25 },
  { x: 75, size: 2, duration: 11, delay: 5.5, opacity: 0.32 },
  { x: 92, size: 4, duration: 20, delay: 0.3, opacity: 0.18 },
] as const;

interface AuroraBlobConfig {
  keyframe: string;
  duration: string;
  color: string;
  position: string;
  baseOpacity: number;
}

const AURORA_BLOBS: AuroraBlobConfig[] = [
  {
    keyframe: "animata-aurora-1",
    duration: "15s",
    color: "bg-violet-500",
    position: "left-[-10%] top-[-10%]",
    baseOpacity: 0.4,
  },
  {
    keyframe: "animata-aurora-2",
    duration: "20s",
    color: "bg-blue-500",
    position: "left-[55%]  top-[-5%]",
    baseOpacity: 0.35,
  },
  {
    keyframe: "animata-aurora-3",
    duration: "18s",
    color: "bg-indigo-500",
    position: "left-[20%]  top-[40%]",
    baseOpacity: 0.3,
  },
  {
    keyframe: "animata-aurora-4",
    duration: "22s",
    color: "bg-fuchsia-500",
    position: "left-[-5%]  top-[20%]",
    baseOpacity: 0.25,
  },
];

const KEYFRAME_STYLES = `
@keyframes animata-aurora-1 {
  0%, 100% { transform: translate(0%,   0%)   scale(1);    }
  25%       { transform: translate(30%, -20%)  scale(1.10); }
  50%       { transform: translate(15%,  10%)  scale(0.95); }
  75%       { transform: translate(-10%, 15%)  scale(1.05); }
}
@keyframes animata-aurora-2 {
  0%, 100% { transform: translate(0%,   0%)   scale(1.05); }
  30%       { transform: translate(-35%, 25%)  scale(1.00); }
  65%       { transform: translate(-15%, -20%) scale(1.08); }
}
@keyframes animata-aurora-3 {
  0%, 100% { transform: translate(0%,   0%)   scale(1.00); }
  33%       { transform: translate(-25%, -35%) scale(1.10); }
  66%       { transform: translate(20%, -15%)  scale(0.95); }
}
@keyframes animata-aurora-4 {
  0%, 100% { transform: translate(0%,   0%)   scale(1.02); }
  25%       { transform: translate(35%, -25%)  scale(0.95); }
  50%       { transform: translate(15%,  10%)  scale(1.05); }
  75%       { transform: translate(45%,  20%)  scale(1.00); }
}
@keyframes animata-beam-sweep {
  0%   { transform: translateX(-200%) rotate(-45deg); }
  100% { transform: translateX(300%)  rotate(-45deg); }
}
@keyframes animata-grid-breathe {
  0%, 100% { transform: perspective(600px) rotateX(50deg) scale(2.00) translateY(-5%); }
  50%       { transform: perspective(600px) rotateX(50deg) scale(2.05) translateY(-5%); }
}
@keyframes animata-float-up {
  0%   { transform: translateY(110vh); opacity: 0; }
  10%  { opacity: 1;                               }
  90%  { opacity: 1;                               }
  100% { transform: translateY(-5vh);  opacity: 0; }
}
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clampOpacity(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

// ─── Variant sub-components ───────────────────────────────────────────────────

function AuroraBackground({ reduced, intensity }: { reduced: boolean; intensity: Intensity }) {
  const scale = INTENSITY_SCALE[intensity];

  return (
    <>
      {AURORA_BLOBS.map((blob, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn(
            "absolute h-[600px] w-[600px] rounded-full blur-[100px]",
            blob.position,
            blob.color,
          )}
          style={{
            opacity: clampOpacity(blob.baseOpacity * scale),
            willChange: reduced ? "auto" : "transform",
            animation: reduced ? "none" : `${blob.keyframe} ${blob.duration} ease-in-out infinite`,
          }}
        />
      ))}
    </>
  );
}

function BeamBackground({ show, intensity }: { show: boolean; intensity: Intensity }) {
  if (!show) return null;

  const scale = INTENSITY_SCALE[intensity];

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-0 top-[-50%] h-[200%] w-[40%] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: clampOpacity(0.08 * scale),
          willChange: "transform",
          animation: "animata-beam-sweep 6s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-[-50%] h-[200%] w-[12%] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: clampOpacity(0.05 * scale),
          willChange: "transform",
          animation: "animata-beam-sweep 6s ease-in-out 2s infinite",
        }}
      />
    </>
  );
}

function GridBackground({ reduced, intensity }: { reduced: boolean; intensity: Intensity }) {
  const scale = INTENSITY_SCALE[intensity];

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 text-foreground"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), " +
            "linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: clampOpacity(0.07 * scale),
          transformOrigin: "50% 100%",
          transform: reduced
            ? "perspective(600px) rotateX(50deg) scale(2.0) translateY(-5%)"
            : undefined,
          animation: reduced ? "none" : "animata-grid-breathe 4s ease-in-out infinite",
          maskImage: "radial-gradient(ellipse at 50% 80%, black 15%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 80%, black 15%, transparent 72%)",
        }}
      />
    </div>
  );
}

function ParticlesBackground({ show, intensity }: { show: boolean; intensity: Intensity }) {
  if (!show) return null;

  const scale = INTENSITY_SCALE[intensity];

  return (
    <>
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute bottom-0 rounded-full bg-foreground"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: clampOpacity(p.opacity * scale),
            animation: `animata-float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function renderVariant(variant: Variant, reduced: boolean, intensity: Intensity): ReactNode {
  switch (variant) {
    case "aurora":
      return <AuroraBackground reduced={reduced} intensity={intensity} />;
    case "beam":
      return <BeamBackground show={!reduced} intensity={intensity} />;
    case "grid":
      return <GridBackground reduced={reduced} intensity={intensity} />;
    case "particles":
      return <ParticlesBackground show={!reduced} intensity={intensity} />;
  }
}

function DefaultShowcase() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
        Animata
      </span>
      <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        Beautiful by default.
      </h2>
      <p className="max-w-md text-lg text-muted-foreground">
        Drop-in animated backgrounds for your next SaaS landing page.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AnimatedBackgroundWrapper({
  variant = "aurora",
  children,
  className,
  intensity = "medium",
}: AnimatedBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <style>{KEYFRAME_STYLES}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {renderVariant(variant, prefersReducedMotion, intensity)}
      </div>
      <div className="relative z-10 w-full">{children ?? <DefaultShowcase />}</div>
    </div>
  );
}
