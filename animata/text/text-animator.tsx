"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import "./text-animator.css";

export type TextAnimationTarget = "whole" | "per-character" | "per-word" | "per-line";

export type TextAnimationStaggerMode = "normal" | "center-out" | "edges-in" | "reverse";

export type TextAnimationCustomRenderer =
  | "kinetic-center-build"
  | "kinetic-top-build"
  | "shared-slide-opacity-stage";

export interface TextAnimationFrameSpec {
  opacity?: number;
  xPx?: number;
  yPx?: number;
  zPx?: number;
  scale?: number;
  rotateDeg?: number;
  rotateXDeg?: number;
  rotateYDeg?: number;
  blurPx?: number;
  letterSpacingEm?: number;
  color?: string;
}

export interface TextAnimationPhaseSpec {
  durationMs: number;
  staggerMs: number;
  easing: string;
  from: TextAnimationFrameSpec;
  to: TextAnimationFrameSpec;
}

export interface TextAnimationSwapSpec {
  mode?: string;
  overlapMs?: number;
  microDelayMs?: number;
}

export interface TextAnimationBuildSpec {
  firstWordDurationMs?: number;
  pushDurationMs?: number;
  exitDurationMs?: number;
  holdMs?: number;
  betweenPhrasesMs?: number;
  entryOffsetPx?: number;
  entryOffsetYPx?: number;
  wordGapPx?: number;
  lineGapPx?: number;
  firstWordYPx?: number;
  entryScale?: number;
  entryBlurPx?: number;
  reflowBlurPx?: number;
  exitYPx?: number;
  exitBlurPx?: number;
  easing?: string;
  exitEasing?: string;
  wordOpacityFrom?: number;
  wordOpacityTo?: number;
  wordOpacityDurationMs?: number;
}

export interface TextAnimationSpec {
  id?: string;
  target?: TextAnimationTarget;
  enter: TextAnimationPhaseSpec;
  exit: TextAnimationPhaseSpec;
  swap?: TextAnimationSwapSpec;
  customRenderer?: TextAnimationCustomRenderer;
  staggerMode?: TextAnimationStaggerMode;
  build?: TextAnimationBuildSpec;
}

export interface TextAnimatorProps {
  spec: TextAnimationSpec;
  samples?: string[];
  phrases?: string[][];
  className?: string;
  stageClassName?: string;
  speed?: number;
  holdMs?: number;
  gapMs?: number;
  yTravel?: number;
}

const DEFAULT_RUNTIME = {
  tileSpeed: 0.72,
  tileHoldMs: 550,
  tileGapMs: 320,
  tileYTravel: 0.58,
};

type TileFrame = {
  color?: string;
  filter: string;
  letterSpacingEm: number | null;
  opacity: number;
  transform: string;
};

type LoopController = {
  animations: Set<Animation>;
  cancelled: boolean;
  stage: HTMLElement;
  timers: Set<number>;
  pendingResolvers: Set<() => void>;
  runtime: typeof DEFAULT_RUNTIME;
};

type KineticStageFrame = { filter: string; opacity: number; transform: string };

type TextPart = { text: string; animate: boolean; block?: boolean };

function splitTextByTarget(text: string, target: TextAnimationTarget): TextPart[] {
  if (target === "whole") return [{ text, animate: true }];
  if (target === "per-word") {
    const parts: TextPart[] = [];
    for (const m of text.matchAll(/(\S+|\s+)/g)) {
      parts.push({ text: m[0], animate: /\S/.test(m[0]) });
    }
    return parts;
  }
  if (target === "per-line") {
    return text.split("\n").map((line) => ({ text: line, animate: true, block: true }));
  }
  return [...text].map((c) => ({ text: c, animate: true }));
}

function getStaggerRanks(count: number, mode: TextAnimationStaggerMode = "normal"): number[] {
  const order: number[] = [];
  if (mode === "center-out") {
    const center = (count - 1) / 2;
    for (let i = 0; i < count; i += 1) order.push(i);
    order.sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b);
  } else if (mode === "edges-in") {
    let l = 0;
    let r = count - 1;
    while (l <= r) {
      order.push(l);
      if (r !== l) order.push(r);
      l += 1;
      r -= 1;
    }
  } else if (mode === "reverse") {
    for (let i = count - 1; i >= 0; i -= 1) order.push(i);
  } else {
    for (let i = 0; i < count; i += 1) order.push(i);
  }
  const ranks = Array.from({ length: count }, () => 0);
  order.forEach((index, rank) => {
    ranks[index] = rank;
  });
  return ranks;
}

function toAnimationFrame(values: TextAnimationFrameSpec | undefined, yTravel: number): TileFrame {
  const f = values ?? {};
  const frame: TileFrame = {
    filter: `blur(${f.blurPx ?? 0}px)`,
    letterSpacingEm: f.letterSpacingEm ?? null,
    opacity: f.opacity ?? 1,
    transform: `translate3d(${f.xPx ?? 0}px, ${(f.yPx ?? 0) * yTravel}px, ${
      f.zPx ?? 0
    }px) rotateX(${f.rotateXDeg ?? 0}deg) rotateY(${f.rotateYDeg ?? 0}deg) rotate(${
      f.rotateDeg ?? 0
    }deg) scale(${f.scale ?? 1})`,
  };
  if (f.color) frame.color = f.color;
  return frame;
}

function materializeTileFrame(
  frame: TileFrame,
  unit: HTMLElement,
  index: number,
  count: number,
  target: TextAnimationTarget,
): Keyframe {
  const k: Keyframe = {
    filter: frame.filter,
    letterSpacing: "0em",
    marginLeft: "0em",
    marginRight: "0em",
    opacity: frame.opacity,
    transform: frame.transform,
  };
  if (frame.color) k.color = frame.color;
  if (frame.letterSpacingEm == null) return k;
  if (target === "per-character") {
    const text = unit.textContent ?? "";
    const isGlyph = /\S/.test(text);
    const halfGap = `${frame.letterSpacingEm / 2}em`;
    k.marginLeft = isGlyph && index > 0 ? halfGap : "0em";
    k.marginRight = isGlyph && index < count - 1 ? halfGap : "0em";
    return k;
  }
  k.letterSpacing = `${frame.letterSpacingEm}em`;
  return k;
}

function makeTitle(doc: Document, text: string, target: TextAnimationTarget) {
  const title = doc.createElement("h3");
  title.className = "text-animation-title";
  const units: HTMLSpanElement[] = [];
  splitTextByTarget(text, target).forEach((part) => {
    const unit = doc.createElement("span");
    unit.className = `text-animation-unit${part.block ? " line" : ""}`;
    unit.textContent = part.text;
    title.appendChild(unit);
    if (part.animate) units.push(unit);
  });
  return { title, units };
}

function applyPhaseStart(
  units: HTMLElement[],
  phase: "enter" | "exit",
  spec: TextAnimationSpec,
  stage: HTMLElement,
  yTravel: number,
) {
  const baseFrame = toAnimationFrame(spec[phase].from, yTravel);
  units.forEach((unit, index) => {
    const kf = materializeTileFrame(
      baseFrame,
      unit,
      index,
      units.length,
      spec.target ?? "per-character",
    );
    Object.assign(unit.style, kf);
  });
  stage.dataset.animationPhase = phase;
}

function animatePhase(
  controller: LoopController,
  units: HTMLElement[],
  phase: "enter" | "exit",
  spec: TextAnimationSpec,
): number {
  const { tileSpeed, tileYTravel } = controller.runtime;
  const currentPhase = spec[phase];
  const fromFrame = toAnimationFrame(currentPhase.from, tileYTravel);
  const toFrame = toAnimationFrame(currentPhase.to, tileYTravel);
  const duration = Math.max(140, Math.round(currentPhase.durationMs * tileSpeed));
  const delayStep = Math.max(0, Math.round(currentPhase.staggerMs * tileSpeed));
  const ranks = getStaggerRanks(units.length, spec.staggerMode ?? "normal");

  units.forEach((unit, index) => {
    const fromK = materializeTileFrame(
      fromFrame,
      unit,
      index,
      units.length,
      spec.target ?? "per-character",
    );
    const toK = materializeTileFrame(
      toFrame,
      unit,
      index,
      units.length,
      spec.target ?? "per-character",
    );
    registerAnimation(
      controller,
      unit.animate([fromK, toK], {
        delay: ranks[index] * delayStep,
        duration,
        easing: currentPhase.easing,
        fill: "forwards",
      }),
    );
  });

  return duration + Math.max(0, units.length - 1) * delayStep;
}

function createLoop(stage: HTMLElement, runtime: typeof DEFAULT_RUNTIME): LoopController {
  return {
    animations: new Set(),
    cancelled: false,
    stage,
    timers: new Set(),
    pendingResolvers: new Set(),
    runtime,
  };
}

function cleanupLoop(c: LoopController) {
  c.cancelled = true;
  c.timers.forEach((t) => {
    window.clearTimeout(t);
  });
  c.timers.clear();
  c.animations.forEach((a) => {
    a.cancel();
  });
  c.animations.clear();
  // Resolve any in-flight sleep() promises so awaiting loop functions can
  // observe the cancellation flag and unwind, releasing closures + DOM refs.
  c.pendingResolvers.forEach((resolve) => {
    resolve();
  });
  c.pendingResolvers.clear();
  clearStage(c.stage);
}

function registerAnimation(c: LoopController, a: Animation): Animation {
  c.animations.add(a);
  void a.finished.finally(() => c.animations.delete(a));
  return a;
}

function schedule(c: LoopController, cb: () => void, delay: number) {
  if (c.cancelled) return;
  const t = window.setTimeout(() => {
    c.timers.delete(t);
    if (!c.cancelled) cb();
  }, delay);
  c.timers.add(t);
}

function sleep(c: LoopController, delay: number): Promise<void> {
  if (c.cancelled || delay <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    const wrapped = () => {
      c.pendingResolvers.delete(wrapped);
      resolve();
    };
    c.pendingResolvers.add(wrapped);
    schedule(c, wrapped, delay);
  });
}

function waitForAnimations(animations: Animation[]) {
  return Promise.all(animations.map((a) => a.finished.catch(() => undefined)));
}

function clearStage(stage: HTMLElement) {
  while (stage.firstChild) stage.removeChild(stage.firstChild);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function setKineticPose(el: HTMLElement, frame: KineticStageFrame) {
  el.style.filter = frame.filter;
  el.style.opacity = `${frame.opacity}`;
  el.style.transform = frame.transform;
}

function buildKineticFrame(
  x: number,
  y: number,
  scale: number,
  blur: number,
  opacity: number,
): KineticStageFrame {
  return {
    filter: `blur(${blur}px)`,
    opacity,
    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  };
}

function titleFrame(values: TextAnimationFrameSpec | undefined, yTravel: number): Keyframe {
  const f = values ?? {};
  return {
    filter: `blur(${f.blurPx ?? 0}px)`,
    opacity: f.opacity ?? 1,
    transform: `translate3d(${f.xPx ?? 0}px, ${(f.yPx ?? 0) * yTravel}px, 0) scale(${f.scale ?? 1})`,
  };
}

async function runGenericLoop(c: LoopController, spec: TextAnimationSpec, samples: string[]) {
  const { stage, runtime } = c;
  const target = spec.target ?? "per-character";
  const microDelay = spec.swap?.microDelayMs ?? 0;
  // For crossfade swaps the new sample's enter starts `overlapMs` before the
  // old sample's exit completes; the two titles share the stage's "title"
  // grid area during that window. Other modes wait for exit + microDelay
  // before the swap.
  const overlap = spec.swap?.mode === "crossfade" ? (spec.swap?.overlapMs ?? 0) : 0;
  let currentIndex = 0;
  let currentTitle: HTMLElement | null = null;
  let currentUnits: HTMLSpanElement[] = [];

  const enterSample = (text: string): number => {
    const { title, units } = makeTitle(stage.ownerDocument, text, target);
    applyPhaseStart(units, "enter", spec, stage, runtime.tileYTravel);
    clearStage(stage);
    stage.appendChild(title);
    currentTitle = title;
    currentUnits = units;
    return animatePhase(c, units, "enter", spec);
  };

  const firstEnter = enterSample(samples[currentIndex]);
  await sleep(c, firstEnter + runtime.tileHoldMs);

  while (!c.cancelled) {
    const oldTitle = currentTitle;
    const exitTotal = currentUnits.length ? animatePhase(c, currentUnits, "exit", spec) : 0;

    if (overlap > 0 && oldTitle) {
      // Crossfade: start the new enter while the old exit is still finishing.
      await sleep(c, Math.max(0, exitTotal - overlap));
      if (c.cancelled) break;

      currentIndex = (currentIndex + 1) % samples.length;
      const next = makeTitle(stage.ownerDocument, samples[currentIndex], target);
      applyPhaseStart(next.units, "enter", spec, stage, runtime.tileYTravel);
      // Mount alongside the still-exiting old title; both share grid-area "title".
      stage.appendChild(next.title);
      const nextEnter = animatePhase(c, next.units, "enter", spec);

      // Drop the old title once its exit finishes (which is `overlap` ms from now).
      schedule(c, () => oldTitle.remove(), overlap);

      currentTitle = next.title;
      currentUnits = next.units;

      await sleep(c, nextEnter + runtime.tileHoldMs);
    } else {
      // Non-overlapping: wait for exit + microDelay, swap, gap, then enter.
      await sleep(c, exitTotal + microDelay);
      if (c.cancelled) break;

      currentIndex = (currentIndex + 1) % samples.length;
      const next = makeTitle(stage.ownerDocument, samples[currentIndex], target);
      applyPhaseStart(next.units, "enter", spec, stage, runtime.tileYTravel);
      clearStage(stage);
      stage.appendChild(next.title);
      currentTitle = next.title;
      currentUnits = next.units;

      await sleep(c, runtime.tileGapMs);
      if (c.cancelled) break;

      const nextEnter = animatePhase(c, next.units, "enter", spec);
      await sleep(c, nextEnter + runtime.tileHoldMs);
    }
  }
}

async function runSharedSlideOpacityLoop(
  c: LoopController,
  spec: TextAnimationSpec,
  samples: string[],
) {
  const { stage, runtime } = c;
  const enter = spec.enter;
  const exit = spec.exit;
  const build = spec.build ?? {};
  const titleDuration = Math.max(180, Math.round((enter.durationMs || 460) * runtime.tileSpeed));
  const wordOpacityDuration = Math.max(
    90,
    Math.round((build.wordOpacityDurationMs ?? 170) * runtime.tileSpeed),
  );
  const wordStaggerMs = Math.max(0, Math.round((enter.staggerMs || 72) * runtime.tileSpeed));
  const exitDuration = Math.max(140, Math.round((exit.durationMs || 300) * runtime.tileSpeed));
  const holdMs = Math.max(380, runtime.tileHoldMs);
  const gapMs = Math.max(180, runtime.tileGapMs);
  const wordOpacityFrom = build.wordOpacityFrom ?? 0;
  const wordOpacityTo = build.wordOpacityTo ?? 1;
  let currentIndex = 0;

  const enterPhrase = async (text: string): Promise<HTMLHeadingElement> => {
    const { title, units } = makeTitle(stage.ownerDocument, text, spec.target ?? "per-word");
    const fromFrame = titleFrame(enter.from, runtime.tileYTravel);
    const toFrame = titleFrame(enter.to, runtime.tileYTravel);
    Object.assign(title.style, fromFrame);
    title.style.willChange = "transform, opacity, filter";
    units.forEach((u) => {
      u.style.opacity = `${wordOpacityFrom}`;
      u.style.willChange = "opacity";
    });
    clearStage(stage);
    stage.appendChild(title);
    const animations = [
      registerAnimation(
        c,
        title.animate([fromFrame, toFrame], {
          duration: titleDuration,
          easing: enter.easing,
          fill: "forwards",
        }),
      ),
      ...units.map((u, i) =>
        registerAnimation(
          c,
          u.animate([{ opacity: wordOpacityFrom }, { opacity: wordOpacityTo }], {
            delay: i * wordStaggerMs,
            duration: wordOpacityDuration,
            easing: enter.easing,
            fill: "forwards",
          }),
        ),
      ),
    ];
    await waitForAnimations(animations);
    Object.assign(title.style, toFrame);
    units.forEach((u) => {
      u.style.opacity = `${wordOpacityTo}`;
    });
    return title;
  };

  const exitPhrase = async (title: HTMLHeadingElement | null) => {
    if (!title || c.cancelled) return;
    const fromFrame = titleFrame(exit.from, runtime.tileYTravel);
    const toFrame = titleFrame(exit.to, runtime.tileYTravel);
    Object.assign(title.style, fromFrame);
    await waitForAnimations([
      registerAnimation(
        c,
        title.animate([fromFrame, toFrame], {
          duration: exitDuration,
          easing: exit.easing,
          fill: "forwards",
        }),
      ),
    ]);
    clearStage(stage);
  };

  while (!c.cancelled) {
    const title = await enterPhrase(samples[currentIndex]);
    await sleep(c, holdMs);
    if (c.cancelled) break;
    await exitPhrase(title);
    await sleep(c, gapMs);
    currentIndex = (currentIndex + 1) % samples.length;
  }
}

async function runKineticCenterBuildLoop(
  c: LoopController,
  spec: TextAnimationSpec,
  phrases: string[][],
) {
  const { stage, runtime } = c;
  const build = spec.build ?? {};
  const line = stage.ownerDocument.createElement("div");
  const firstWordDuration = Math.max(
    180,
    Math.round((build.firstWordDurationMs ?? 360) * runtime.tileSpeed),
  );
  const pushDuration = Math.max(180, Math.round((build.pushDurationMs ?? 480) * runtime.tileSpeed));
  const exitDuration = Math.max(140, Math.round((build.exitDurationMs ?? 260) * runtime.tileSpeed));
  const holdMs = Math.max(380, Math.round((build.holdMs ?? 980) * runtime.tileSpeed));
  const betweenPhrasesMs = Math.max(
    120,
    Math.round((build.betweenPhrasesMs ?? 220) * runtime.tileSpeed),
  );
  const entryOffsetPx = build.entryOffsetPx ?? 96;
  const wordGapPx = build.wordGapPx ?? 16;
  const firstWordLiftPx = build.firstWordYPx ?? 6;
  const entryScale = build.entryScale ?? 0.992;
  const entryBlurPx = build.entryBlurPx ?? 3.5;
  const reflowBlurPx = build.reflowBlurPx ?? 0.8;
  const exitLiftPx = build.exitYPx ?? -6;
  const exitBlurPx = build.exitBlurPx ?? 2.5;
  const easing = build.easing ?? "cubic-bezier(0.2, 0.8, 0.2, 1)";
  const exitEasing = build.exitEasing ?? "cubic-bezier(0.4, 0, 0.2, 1)";
  let phraseIndex = 0;
  let words: HTMLSpanElement[] = [];
  let positions: number[] = [];

  clearStage(stage);
  line.className = "text-animation-kinetic-line";
  stage.appendChild(line);

  const computePositions = (widths: number[]) => {
    const total = widths.reduce((s, w) => s + w, 0) + wordGapPx * Math.max(0, widths.length - 1);
    let cursor = -total / 2;
    return widths.map((w) => {
      const pos = cursor + w / 2;
      cursor += w + wordGapPx;
      return pos;
    });
  };

  const buildPhrase = async (phraseWords: string[]) => {
    line.innerHTML = "";
    words = [];
    positions = [];
    for (const [index, text] of phraseWords.entries()) {
      if (c.cancelled) return;
      const word = stage.ownerDocument.createElement("span");
      word.className = "text-animation-kinetic-word";
      word.textContent = text;
      line.appendChild(word);
      const widths = Array.from(line.children, (n) => (n as HTMLElement).offsetWidth);
      const nextPositions = computePositions(widths);
      const animations: Animation[] = [];
      if (index === 0) {
        const start = buildKineticFrame(0, firstWordLiftPx, entryScale, entryBlurPx, 0);
        setKineticPose(word, start);
        animations.push(
          registerAnimation(
            c,
            word.animate(
              [
                start,
                {
                  ...buildKineticFrame(0, firstWordLiftPx * 0.35, 0.998, entryBlurPx * 0.45, 0.78),
                  offset: 0.58,
                },
                buildKineticFrame(0, 0, 1, 0, 1),
              ],
              { duration: firstWordDuration, easing, fill: "forwards" },
            ),
          ),
        );
      } else {
        words.forEach((currentWord, i) => {
          const cX = positions[i];
          const nX = nextPositions[i];
          animations.push(
            registerAnimation(
              c,
              currentWord.animate(
                [
                  buildKineticFrame(cX, 0, 1, 0, 1),
                  {
                    ...buildKineticFrame(mix(cX, nX, 0.58), 0, 1, reflowBlurPx, 1),
                    offset: 0.52,
                  },
                  buildKineticFrame(nX, 0, 1, 0, 1),
                ],
                { duration: pushDuration, easing, fill: "forwards" },
              ),
            ),
          );
        });
        const targetX = nextPositions[index];
        const startX = targetX + entryOffsetPx;
        setKineticPose(word, buildKineticFrame(startX, 0, entryScale, entryBlurPx, 0));
        animations.push(
          registerAnimation(
            c,
            word.animate(
              [
                buildKineticFrame(startX, 0, entryScale, entryBlurPx, 0),
                {
                  ...buildKineticFrame(
                    mix(startX, targetX, 0.72),
                    0,
                    0.998,
                    entryBlurPx * 0.38,
                    0.84,
                  ),
                  offset: 0.6,
                },
                buildKineticFrame(targetX, 0, 1, 0, 1),
              ],
              { duration: pushDuration, easing, fill: "forwards" },
            ),
          ),
        );
      }
      await waitForAnimations(animations);
      nextPositions.forEach((position, i) => {
        const current = i === words.length ? word : words[i];
        setKineticPose(current, buildKineticFrame(position, 0, 1, 0, 1));
      });
      if (!words.includes(word)) words.push(word);
      positions = nextPositions;
    }
  };

  const exitPhrase = async () => {
    if (!words.length || c.cancelled) return;
    const animations = words.map((word, i) => {
      const p = positions[i];
      return registerAnimation(
        c,
        word.animate(
          [
            buildKineticFrame(p, 0, 1, 0, 1),
            {
              ...buildKineticFrame(p, exitLiftPx * 0.45, 1, exitBlurPx * 0.55, 0.62),
              offset: 0.52,
            },
            buildKineticFrame(p, exitLiftPx, 1, exitBlurPx, 0),
          ],
          { duration: exitDuration, easing: exitEasing, fill: "forwards" },
        ),
      );
    });
    await waitForAnimations(animations);
    line.innerHTML = "";
    words = [];
    positions = [];
  };

  while (!c.cancelled) {
    await buildPhrase(phrases[phraseIndex] ?? phrases[0]);
    await sleep(c, holdMs);
    if (c.cancelled) break;
    await exitPhrase();
    await sleep(c, betweenPhrasesMs);
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
}

async function runKineticTopBuildLoop(
  c: LoopController,
  spec: TextAnimationSpec,
  phrases: string[][],
) {
  const { stage, runtime } = c;
  const build = spec.build ?? {};
  const line = stage.ownerDocument.createElement("div");
  const firstWordDuration = Math.max(
    180,
    Math.round((build.firstWordDurationMs ?? 360) * runtime.tileSpeed),
  );
  const pushDuration = Math.max(180, Math.round((build.pushDurationMs ?? 500) * runtime.tileSpeed));
  const exitDuration = Math.max(140, Math.round((build.exitDurationMs ?? 320) * runtime.tileSpeed));
  const holdMs = Math.max(380, Math.round((build.holdMs ?? 1100) * runtime.tileSpeed));
  const betweenPhrasesMs = Math.max(
    120,
    Math.round((build.betweenPhrasesMs ?? 220) * runtime.tileSpeed),
  );
  const entryOffsetYPx = build.entryOffsetYPx ?? -28;
  const lineGapPx = build.lineGapPx ?? build.wordGapPx ?? 12;
  const firstWordLiftPx = build.firstWordYPx ?? -14;
  const entryScale = build.entryScale ?? 0.992;
  const entryBlurPx = build.entryBlurPx ?? 2.4;
  const reflowBlurPx = build.reflowBlurPx ?? 0.7;
  const exitLiftPx = build.exitYPx ?? 10;
  const exitBlurPx = build.exitBlurPx ?? 1.2;
  const easing = build.easing ?? "cubic-bezier(0.2, 0.8, 0.2, 1)";
  const exitEasing = build.exitEasing ?? "cubic-bezier(0.4, 0, 0.2, 1)";
  let phraseIndex = 0;
  let words: HTMLSpanElement[] = [];
  let positions: number[] = [];

  clearStage(stage);
  line.className = "text-animation-kinetic-stack";
  stage.appendChild(line);

  const computePositions = (heights: number[]) => {
    const total = heights.reduce((s, h) => s + h, 0) + lineGapPx * Math.max(0, heights.length - 1);
    let cursor = -total / 2;
    return heights.map((h) => {
      const pos = cursor + h / 2;
      cursor += h + lineGapPx;
      return pos;
    });
  };

  const buildPhrase = async (phraseWords: string[]) => {
    line.innerHTML = "";
    words = [];
    positions = [];
    for (const [index, text] of phraseWords.entries()) {
      if (c.cancelled) return;
      const word = stage.ownerDocument.createElement("span");
      word.className = "text-animation-kinetic-word";
      word.textContent = text;
      line.appendChild(word);
      const heights = Array.from(line.children, (n) => (n as HTMLElement).offsetHeight);
      const nextPositions = computePositions(heights);
      const animations: Animation[] = [];
      if (index === 0) {
        const start = buildKineticFrame(0, firstWordLiftPx, entryScale, entryBlurPx, 0);
        setKineticPose(word, start);
        animations.push(
          registerAnimation(
            c,
            word.animate(
              [
                start,
                {
                  ...buildKineticFrame(0, firstWordLiftPx * 0.35, 0.998, entryBlurPx * 0.45, 0.78),
                  offset: 0.58,
                },
                buildKineticFrame(0, 0, 1, 0, 1),
              ],
              { duration: firstWordDuration, easing, fill: "forwards" },
            ),
          ),
        );
      } else {
        words.forEach((currentWord, i) => {
          const cY = positions[i];
          const nY = nextPositions[i];
          animations.push(
            registerAnimation(
              c,
              currentWord.animate(
                [
                  buildKineticFrame(0, cY, 1, 0, 1),
                  {
                    ...buildKineticFrame(0, mix(cY, nY, 0.58), 1, reflowBlurPx, 1),
                    offset: 0.52,
                  },
                  buildKineticFrame(0, nY, 1, 0, 1),
                ],
                { duration: pushDuration, easing, fill: "forwards" },
              ),
            ),
          );
        });
        const targetY = nextPositions[index];
        setKineticPose(
          word,
          buildKineticFrame(0, targetY + entryOffsetYPx, entryScale, entryBlurPx, 0),
        );
        animations.push(
          registerAnimation(
            c,
            word.animate(
              [
                buildKineticFrame(0, targetY + entryOffsetYPx, entryScale, entryBlurPx, 0),
                {
                  ...buildKineticFrame(
                    0,
                    mix(targetY + entryOffsetYPx, targetY, 0.72),
                    0.998,
                    entryBlurPx * 0.38,
                    0.84,
                  ),
                  offset: 0.6,
                },
                buildKineticFrame(0, targetY, 1, 0, 1),
              ],
              { duration: pushDuration, easing, fill: "forwards" },
            ),
          ),
        );
      }
      await waitForAnimations(animations);
      nextPositions.forEach((position, i) => {
        const current = i === words.length ? word : words[i];
        setKineticPose(current, buildKineticFrame(0, position, 1, 0, 1));
      });
      if (!words.includes(word)) words.push(word);
      positions = nextPositions;
    }
  };

  const exitPhrase = async () => {
    if (!words.length || c.cancelled) return;
    const animations = words.map((word, i) => {
      const p = positions[i];
      return registerAnimation(
        c,
        word.animate(
          [
            buildKineticFrame(0, p, 1, 0, 1),
            {
              ...buildKineticFrame(0, p + exitLiftPx * 0.45, 1, exitBlurPx * 0.55, 0.62),
              offset: 0.52,
            },
            buildKineticFrame(0, p + exitLiftPx, 1, exitBlurPx, 0),
          ],
          { duration: exitDuration, easing: exitEasing, fill: "forwards" },
        ),
      );
    });
    await waitForAnimations(animations);
    line.innerHTML = "";
    words = [];
    positions = [];
  };

  while (!c.cancelled) {
    await buildPhrase(phrases[phraseIndex] ?? phrases[0]);
    await sleep(c, holdMs);
    if (c.cancelled) break;
    await exitPhrase();
    await sleep(c, betweenPhrasesMs);
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
}

export default function TextAnimator({
  spec,
  samples,
  phrases,
  className,
  stageClassName,
  speed,
  holdMs,
  gapMs,
  yTravel,
}: TextAnimatorProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  // Track samples/phrases by their *content* rather than array reference so
  // a parent that hands us a fresh-but-identical array on every render
  // doesn't tear down and restart the animation. / are sentinels
  // unlikely to appear in user-supplied copy.
  const samplesKey = useMemo(() => samples?.join("") ?? "", [samples]);
  const phrasesKey = useMemo(() => phrases?.map((p) => p.join("")).join("") ?? "", [phrases]);

  // Refs let the effect read the latest samples/phrases without listing them
  // as deps (we drive re-runs via the content keys above).
  const samplesRef = useRef(samples);
  const phrasesRef = useRef(phrases);
  samplesRef.current = samples;
  phrasesRef.current = phrases;

  const effectiveSamples = samples?.length ? samples : ["Animation"];

  // biome-ignore lint/correctness/useExhaustiveDependencies: samplesKey/phrasesKey track content; samples/phrases are read live from refs.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    setFailed(false);
    if (spec.id) stage.dataset.animationId = spec.id;

    const runtime = {
      tileSpeed: speed ?? DEFAULT_RUNTIME.tileSpeed,
      tileHoldMs: holdMs ?? DEFAULT_RUNTIME.tileHoldMs,
      tileGapMs: gapMs ?? DEFAULT_RUNTIME.tileGapMs,
      tileYTravel: yTravel ?? DEFAULT_RUNTIME.tileYTravel,
    };

    const controller = createLoop(stage, runtime);
    const renderer = spec.customRenderer;
    const liveSamples = samplesRef.current;
    const livePhrases = phrasesRef.current;
    const effectiveSamples = liveSamples?.length ? liveSamples : ["Animation"];
    const effectivePhrases = livePhrases?.length ? livePhrases : [["Build", "the", "line"]];

    const launch = () => {
      let loop: Promise<void>;
      if (renderer === "kinetic-center-build") {
        loop = runKineticCenterBuildLoop(controller, spec, effectivePhrases);
      } else if (renderer === "kinetic-top-build") {
        loop = runKineticTopBuildLoop(controller, spec, effectivePhrases);
      } else if (renderer === "shared-slide-opacity-stage") {
        loop = runSharedSlideOpacityLoop(controller, spec, effectiveSamples);
      } else {
        loop = runGenericLoop(controller, spec, effectiveSamples);
      }
      void loop.catch((error) => {
        if (!controller.cancelled) {
          console.error(`Failed to run text animation "${spec.id ?? "unknown"}"`, error);
          setFailed(true);
          cleanupLoop(controller);
        }
      });
    };

    schedule(controller, launch, Math.random() * 400);

    return () => {
      cleanupLoop(controller);
    };
  }, [spec, samplesKey, phrasesKey, speed, holdMs, gapMs, yTravel]);

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div ref={stageRef} className={cn("text-animation-stage absolute inset-0", stageClassName)}>
        {failed && effectiveSamples[0] ? (
          <h3 className="text-animation-title text-animation-fallback">{effectiveSamples[0]}</h3>
        ) : null}
      </div>
    </div>
  );
}
