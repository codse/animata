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

export interface RollTextProps extends Omit<React.ComponentPropsWithoutRef<"span">, "children"> {
  /** Label duplicated across the two stacked roll layers. */
  text: string;
  /**
   * When true, the roll plays when the nearest `[data-roll-group]` or
   * `group/roll` ancestor receives hover or focus. The span is not tabbable —
   * put `href` / actions on the wrapping link or button.
   * @default false
   */
  groupHover?: boolean;
  /**
   * When true, hover and focus do not trigger the roll — use for active nav
   * items or other states where motion should stay static.
   * @default false
   */
  disabled?: boolean;
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
  return {
    delay: staggerDelay(index, count, staggerMs),
    duration: durationMs,
  };
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
  onStackAnimationEnd,
}: {
  segment: RollSegment;
  onStackAnimationEnd?: (event: React.AnimationEvent<HTMLSpanElement>) => void;
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
      <span className="roll-unit__stack" aria-hidden onAnimationEnd={onStackAnimationEnd}>
        <span className="roll-unit__line">{segment.value}</span>
        <span className="roll-unit__line">{segment.value}</span>
      </span>
    </span>
  );
});

/**
 * Decorative roll label — always a `span`. Wrap in `<a>`, `<Link>`, or `<button>`
 * for navigation or actions.
 */
export default function RollText({
  text,
  groupHover = false,
  disabled = false,
  stagger = "none",
  staggerMs = 32,
  durationMs = 250,
  className,
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

  const rootRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<RollPhase>("closed");
  const disabledRef = useRef(disabled);
  const segmentCountRef = useRef(segments.length);
  const remainingRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [phase, setPhase] = useState<RollPhase>("closed");

  const resolvedTabIndex = tabIndex ?? (groupHover ? undefined : 0);

  segmentCountRef.current = segments.length;
  disabledRef.current = disabled;

  if (disabled && phase !== "closed") {
    setPhase("closed");
  }

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
    if (disabledRef.current || phaseRef.current === "animating") return;

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
    if (!groupHover || disabled) return;

    const node = rootRef.current;
    const group = findRollGroup(node);
    if (!group) return;

    group.addEventListener("mouseenter", playOpen);
    group.addEventListener("focusin", playOpen);

    return () => {
      group.removeEventListener("mouseenter", playOpen);
      group.removeEventListener("focusin", playOpen);
    };
  }, [groupHover, disabled, playOpen]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    onMouseEnter?.(event);
    if (!groupHover && !disabled) playOpen();
  };

  const handleFocus = (event: React.FocusEvent<HTMLSpanElement>) => {
    onFocus?.(event);
    if (!groupHover && !disabled) playOpen();
  };

  const handleStackAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLSpanElement>) => {
      onAnimationEnd?.(event);
      if (phaseRef.current !== "animating") return;

      remainingRef.current -= 1;
      if (remainingRef.current <= 0) setPhase("open");
    },
    [onAnimationEnd],
  );

  return (
    <span
      ref={rootRef}
      tabIndex={resolvedTabIndex}
      className={cn(
        "roll-text relative inline-block cursor-default",
        phase === "animating" && "roll-text--animating",
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
            <RollUnit segment={segment} onStackAnimationEnd={handleStackAnimationEnd} />
          </Fragment>
        ))}
      </span>
    </span>
  );
}
