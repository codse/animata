"use client";

import type React from "react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import "./roll-text.css";

export type RollStagger = "none" | "word" | "character";

export interface RollTextProps extends React.HTMLAttributes<HTMLElement> {
  /** Label duplicated across the two stacked roll layers. */
  text: string;
  as?: "span" | "a" | "button" | "p";
  /**
   * When true, the roll plays when the nearest `[data-roll-group]` or
   * `group/roll` ancestor receives hover or focus.
   * @default false
   */
  groupHover?: boolean;
  /**
   * Stagger the roll across words or characters. `none` animates the whole
   * label at once.
   * @default "none"
   */
  stagger?: RollStagger;
  /** Delay step between staggered units in ms. @default 32 */
  staggerMs?: number;
  /** Per-unit travel duration in ms. @default 250 */
  durationMs?: number;
  /** Button `type` when `as="button"`. @default "button" */
  type?: "button" | "submit" | "reset";
}

type RollPhase = "closed" | "animating" | "open";

type RollSegment = {
  key: string;
  value: string;
  delay: number;
  duration: number;
};

function staggerDelay(index: number, count: number, staggerMs: number): number {
  if (count <= 1) return 0;
  return index * staggerMs;
}

function segmentTiming(
  index: number,
  count: number,
  staggerMs: number,
  durationMs: number,
): { delay: number; duration: number } {
  const delay = staggerDelay(index, count, staggerMs);

  if (count <= 1) {
    return { delay, duration: durationMs };
  }

  const maxDelay = staggerDelay(count - 1, count, staggerMs);
  return { delay, duration: durationMs + maxDelay - delay };
}

function splitSegments(
  text: string,
  stagger: RollStagger,
  staggerMs: number,
  durationMs: number,
): RollSegment[] {
  if (stagger === "none") {
    return [{ key: "whole", value: text, delay: 0, duration: durationMs }];
  }

  if (stagger === "word") {
    const words = text.trim().split(/\s+/);
    return words.map((word, index) => {
      const timing = segmentTiming(index, words.length, staggerMs, durationMs);
      return {
        key: `${index}-${word}`,
        value: word,
        ...timing,
      };
    });
  }

  return [...text].map((char, index) => {
    const timing = segmentTiming(index, text.length, staggerMs, durationMs);
    return {
      key: `${index}-${char}`,
      value: char,
      ...timing,
    };
  });
}

const ROLL_GROUP_SELECTOR = "[data-roll-group], .group\\/roll";

function findRollGroup(node: HTMLElement | null) {
  return node?.closest(ROLL_GROUP_SELECTOR) ?? null;
}

const RollUnit = memo(function RollUnit({
  segment,
  onFrontAnimationEnd,
}: {
  segment: RollSegment;
  onFrontAnimationEnd?: (event: React.AnimationEvent<HTMLSpanElement>) => void;
}) {
  return (
    <span
      className="roll-unit"
      style={
        {
          "--roll-delay": `${segment.delay}ms`,
          "--roll-unit-duration": `${segment.duration}ms`,
        } as React.CSSProperties
      }
    >
      <span className="roll-unit__sizer" aria-hidden>
        {segment.value}
      </span>
      <span className="roll-panel-back" aria-hidden>
        {segment.value}
      </span>
      <span className="roll-panel-front" aria-hidden onAnimationEnd={onFrontAnimationEnd}>
        {segment.value}
      </span>
    </span>
  );
});

/**
 * Two stacked text layers — top slides up and out, back layer rises from below.
 * Both layers share the same color for a seamless vertical roll.
 */
export default function RollText({
  text,
  as: Tag = "span",
  groupHover = false,
  stagger = "none",
  staggerMs = 32,
  durationMs = 250,
  className,
  type,
  tabIndex,
  style,
  onMouseEnter,
  onFocus,
  onAnimationEnd,
  ...props
}: RollTextProps) {
  const segments = useMemo(
    () => splitSegments(text, stagger, staggerMs, durationMs),
    [text, stagger, staggerMs, durationMs],
  );

  const rootRef = useRef<HTMLElement>(null);
  const phaseRef = useRef<RollPhase>("closed");
  const segmentCountRef = useRef(segments.length);
  const remainingRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [phase, setPhase] = useState<RollPhase>("closed");

  const isStaticSpan = Tag === "span" && !groupHover;
  const resolvedTabIndex = tabIndex ?? (isStaticSpan ? 0 : undefined);
  const isMotionActive = phase === "animating" || phase === "open";

  segmentCountRef.current = segments.length;

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;

    const onChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const playOpen = useCallback(() => {
    if (phaseRef.current === "animating") return;

    if (reducedMotionRef.current) {
      setPhase("open");
      return;
    }

    remainingRef.current = segmentCountRef.current;

    if (phaseRef.current === "open") {
      setPhase("closed");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("animating"));
      });
      return;
    }

    setPhase("animating");
  }, []);

  useLayoutEffect(() => {
    if (!groupHover) return;

    const node = rootRef.current;
    const group = findRollGroup(node);
    if (!group) return;

    group.addEventListener("mouseenter", playOpen);
    group.addEventListener("focusin", playOpen);

    return () => {
      group.removeEventListener("mouseenter", playOpen);
      group.removeEventListener("focusin", playOpen);
    };
  }, [groupHover, playOpen]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    onMouseEnter?.(event);
    playOpen();
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    onFocus?.(event);
    playOpen();
  };

  const handleFrontAnimationEnd = (event: React.AnimationEvent<HTMLSpanElement>) => {
    onAnimationEnd?.(event);
    if (phaseRef.current !== "animating") return;

    remainingRef.current -= 1;
    if (remainingRef.current <= 0) setPhase("open");
  };

  const setRootRef = useCallback((node: HTMLElement | null) => {
    rootRef.current = node;
  }, []);

  return (
    <Tag
      ref={setRootRef}
      {...(Tag === "button" ? { type: type ?? "button" } : {})}
      tabIndex={resolvedTabIndex}
      className={cn(
        "roll-text relative inline-block cursor-default",
        isMotionActive && "roll-text--animating",
        phase === "open" && "roll-text--open",
        className,
      )}
      style={
        {
          ...style,
          "--roll-duration": `${durationMs}ms`,
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...props}
    >
      <span className="sr-only">{text}</span>

      <span className="roll-text__track select-none" aria-hidden>
        {segments.map((segment, index) => (
          <Fragment key={segment.key}>
            {stagger === "word" && index > 0 ? " " : null}
            <RollUnit segment={segment} onFrontAnimationEnd={handleFrontAnimationEnd} />
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
