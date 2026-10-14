"use client";

import {
  type MotionStyle,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type FocusEvent,
  type ReactNode,
  type RefObject,
  use,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import "./aperture-reveal.css";

const EXPAND_END = 0.55;
const CAPTION_START = 0.6;
const CAPTION_END = 0.92;
const ACTION_READY = 0.85;
const WHITESPACE = /\s+/;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

type ApertureContextValue = {
  /** Reduced motion: every part renders in reading order with no scroll sequence. */
  isStatic: boolean;
  headlineId: string;
  read: MotionValue<number>;
  trackRef: RefObject<HTMLDivElement | null>;
  openingRef: RefObject<HTMLSpanElement | null>;
};

const ApertureContext = createContext<ApertureContextValue | null>(null);

function useAperture(part: string) {
  const context = use(ApertureContext);
  if (!context) {
    throw new Error(`ApertureReveal.${part} must be used within <ApertureReveal>.`);
  }
  return context;
}

export type ApertureRevealProps = Omit<ComponentProps<"section">, "children"> & {
  children: ReactNode;
  /** Scroll distance for the whole sequence, in stage heights. Minimum 1.5. */
  length?: number;
  /**
   * Render as a self-contained scroll box of this height in pixels instead of
   * following page scroll. Use for previews and embedded panels.
   */
  viewportHeight?: number;
};

function ApertureRevealRoot({
  children,
  length = 3,
  viewportHeight,
  className,
  style,
  ...props
}: ApertureRevealProps) {
  const isStatic = usePrefersReducedMotion();
  const headlineId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLSpanElement>(null);
  const contained = viewportHeight !== undefined && !isStatic;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    container: contained ? rootRef : undefined,
    offset: ["start start", "end end"],
  });
  // One progress value drives every layer through CSS variables; scrolling never re-renders.
  const expand = useTransform(scrollYProgress, (p) => easeInOutCubic(clamp01(p / EXPAND_END)));
  const read = useTransform(scrollYProgress, (p) =>
    clamp01((p - CAPTION_START) / (CAPTION_END - CAPTION_START)),
  );

  // The photograph is clipped to the opening's rectangle, then released to the full stage.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const opening = openingRef.current;
    if (isStatic || !stage || !opening) return;

    let active = true;
    const measure = () => {
      if (!active) return;
      const s = stage.getBoundingClientRect();
      const w = opening.getBoundingClientRect();
      // Rects include ancestor transforms (scaled previews); clip-path uses local pixels.
      const scale = stage.offsetWidth ? s.width / stage.offsetWidth : 1;
      const local = (value: number) => `${value / scale}px`;
      stage.style.setProperty("--aperture-top", local(w.top - s.top));
      stage.style.setProperty("--aperture-right", local(s.right - w.right));
      stage.style.setProperty("--aperture-bottom", local(s.bottom - w.bottom));
      stage.style.setProperty("--aperture-left", local(w.left - s.left));
      stage.style.setProperty("--aperture-radius", local(w.height / 2));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    // The opening moves when the words beside it rewrap, without changing its own size.
    for (const sibling of opening.parentElement?.children ?? []) observer.observe(sibling);
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [isStatic]);

  const context = useMemo(
    () => ({ isStatic, headlineId, read, trackRef, openingRef }),
    [isStatic, headlineId, read],
  );

  const rootStyle = {
    ...style,
    "--aperture-length": Math.max(1.5, length),
    ...(contained ? { "--aperture-viewport": `${viewportHeight}px` } : null),
  } as CSSProperties;

  return (
    <ApertureContext value={context}>
      <section
        ref={rootRef}
        aria-labelledby={headlineId}
        {...props}
        className={cn("aperture", className)}
        data-static={isStatic ? "" : undefined}
        data-contained={contained ? "" : undefined}
        // A scroll box must be reachable by keyboard to be scrollable without a pointer.
        tabIndex={contained ? 0 : props.tabIndex}
        style={rootStyle}
      >
        <div ref={trackRef} className="aperture__track">
          <motion.div
            ref={stageRef}
            className="aperture__stage"
            style={isStatic ? undefined : ({ "--e": expand, "--q": read } as MotionStyle)}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </ApertureContext>
  );
}

/** The photograph or video. Its child should fill the box: `img`, `video`, or Next `Image fill`. */
function ApertureMedia({ className, children, ...props }: ComponentProps<"div">) {
  useAperture("Media");
  return (
    <div className={cn("aperture__media", className)} {...props}>
      {children}
      <div className="aperture__wash" aria-hidden="true" />
    </div>
  );
}

type ApertureHeadlineProps = ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
};

function ApertureHeadline({ as: Heading = "h2", className, ...props }: ApertureHeadlineProps) {
  const { headlineId } = useAperture("Headline");
  return <Heading id={headlineId} className={cn("aperture__headline", className)} {...props} />;
}

/** Words before the opening. They part left, or up on narrow stages. */
function ApertureLead({ className, children, ...props }: ComponentProps<"span">) {
  useAperture("Lead");
  return (
    <span className={cn("aperture__lead", className)} {...props}>
      {children}
      {/* Keeps the heading's accessible name "lead trail", not "leadtrail". */}{" "}
    </span>
  );
}

/** Words after the opening. They part right, or down on narrow stages. */
function ApertureTrail({ className, ...props }: ComponentProps<"span">) {
  useAperture("Trail");
  return <span className={cn("aperture__trail", className)} {...props} />;
}

/**
 * The gap in the headline the photograph grows from. Decorative. With reduced motion it is
 * hidden unless given children, such as a small copy of the photograph.
 */
function ApertureOpening({ className, children, ...props }: ComponentProps<"span">) {
  const { openingRef } = useAperture("Opening");
  return (
    <span
      ref={openingRef}
      aria-hidden="true"
      className={cn("aperture__opening", className)}
      data-filled={children ? "" : undefined}
      {...props}
    >
      {children}
    </span>
  );
}

/** Overlay for the text and action shown once the photograph fills the stage. */
function ApertureCaption({ className, ...props }: ComponentProps<"div">) {
  useAperture("Caption");
  return <div className={cn("aperture__caption", className)} {...props} />;
}

type ApertureTextProps = Omit<ComponentProps<"p">, "children"> & {
  /** Plain text, read in word by word. */
  children: string;
};

function ApertureText({ children, className, ...props }: ApertureTextProps) {
  useAperture("Text");
  const words = children.split(WHITESPACE).filter(Boolean);
  return (
    <p className={cn("aperture__text", className)} {...props}>
      <span className="aperture__sr-only">{children}</span>
      <span aria-hidden="true" style={{ "--n": words.length } as CSSProperties}>
        {words.map((word, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: words repeat; position is identity
            key={index}
            className="aperture__word"
            style={{ "--i": index } as CSSProperties}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}

/**
 * Wraps a link or button, such as `<a>` or Next `<Link>`. It appears after the text has been
 * read. Focusing it early scrolls to the end of the sequence so its context is visible.
 */
function ApertureAction({ className, onFocus, ...props }: ComponentProps<"div">) {
  const { isStatic, read, trackRef } = useAperture("Action");
  const ref = useRef<HTMLDivElement>(null);

  useMotionValueEvent(read, "change", (value) => {
    ref.current?.toggleAttribute("data-ready", value > ACTION_READY);
  });

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    if (!isStatic && read.get() < ACTION_READY) {
      trackRef.current?.scrollIntoView({ block: "end" });
    }
  };

  return (
    // Focus bubbles from the link or button inside; the wrapper itself is not interactive.
    // biome-ignore lint/a11y/noStaticElementInteractions: delegated focus listener only
    <div ref={ref} className={cn("aperture__action", className)} onFocus={handleFocus} {...props} />
  );
}

/** Small cue at the bottom of the stage. Fades as soon as the opening starts to widen. */
function ApertureHint({ className, ...props }: ComponentProps<"span">) {
  useAperture("Hint");
  return <span aria-hidden="true" className={cn("aperture__hint", className)} {...props} />;
}

const ApertureReveal = Object.assign(ApertureRevealRoot, {
  Media: ApertureMedia,
  Headline: ApertureHeadline,
  Lead: ApertureLead,
  Opening: ApertureOpening,
  Trail: ApertureTrail,
  Caption: ApertureCaption,
  Text: ApertureText,
  Action: ApertureAction,
  Hint: ApertureHint,
}) as typeof ApertureRevealRoot & {
  Media: typeof ApertureMedia;
  Headline: typeof ApertureHeadline;
  Lead: typeof ApertureLead;
  Opening: typeof ApertureOpening;
  Trail: typeof ApertureTrail;
  Caption: typeof ApertureCaption;
  Text: typeof ApertureText;
  Action: typeof ApertureAction;
  Hint: typeof ApertureHint;
};

export default ApertureReveal;
export {
  ApertureAction,
  ApertureCaption,
  ApertureHeadline,
  ApertureHint,
  ApertureLead,
  ApertureMedia,
  ApertureOpening,
  ApertureReveal,
  ApertureRevealRoot,
  ApertureText,
  ApertureTrail,
};
