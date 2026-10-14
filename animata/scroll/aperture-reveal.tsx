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
  type Ref,
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

/** Lets a consumer's ref and the component's own ref point at the same element. */
function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as RefObject<T | null>).current = node;
    }
  };
}
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
  ref,
  ...props
}: ApertureRevealProps) {
  const isStatic = usePrefersReducedMotion();
  const headlineId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const setRootRef = useMemo(() => mergeRefs(rootRef, ref), [ref]);
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
        ref={setRootRef}
        aria-labelledby={headlineId}
        {...props}
        className={cn(
          // `aperture` scopes the scroll-driven CSS; tokens are overridable with style or class.
          "aperture group/aperture relative w-full bg-(--aperture-ground) font-(family-name:--aperture-font) text-(--aperture-ink)",
          "[--aperture-accent-ink:#141413] [--aperture-accent:#ffcc00] [--aperture-ground:#ebe9e4] [--aperture-ink:#141413] [--aperture-opening:#d6d3cc] [--aperture-viewport:100svh]",
          "[--aperture-font:var(--font-display,var(--font-sans,ui-sans-serif,system-ui,sans-serif))]",
          "dark:[--aperture-ground:#111112] dark:[--aperture-ink:#ebe9e4] dark:[--aperture-opening:#26262a]",
          "data-contained:h-(--aperture-viewport) data-contained:overflow-y-auto data-contained:[scrollbar-width:none] data-contained:[&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--aperture-ink)",
          className,
        )}
        data-static={isStatic ? "" : undefined}
        data-contained={contained ? "" : undefined}
        // A scroll box must be reachable by keyboard to be scrollable without a pointer.
        tabIndex={contained ? 0 : props.tabIndex}
        style={rootStyle}
      >
        <div
          ref={trackRef}
          className="relative h-[calc(var(--aperture-length)*var(--aperture-viewport))] group-data-static/aperture:h-auto"
        >
          <motion.div
            ref={stageRef}
            className={cn(
              "aperture__stage sticky top-0 h-(--aperture-viewport) overflow-hidden [container:stage/size]",
              "group-data-static/aperture:relative group-data-static/aperture:grid group-data-static/aperture:h-auto group-data-static/aperture:[container:stage/inline-size] group-data-static/aperture:[grid-template-areas:'headline'_'media']",
            )}
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
    <div
      className={cn(
        "aperture__media absolute inset-0 z-1 overflow-hidden bg-(--aperture-opening)",
        "group-data-static/aperture:relative group-data-static/aperture:aspect-[16/10] group-data-static/aperture:max-h-svh group-data-static/aperture:min-h-[420px] group-data-static/aperture:[grid-area:media]",
        className,
      )}
      {...props}
    >
      {children}
      <div
        className="aperture__wash absolute inset-0 bg-linear-to-t from-[rgb(10_10_11/0.82)] via-[rgb(10_10_11/0.35)] via-55% to-[rgb(10_10_11/0.1)]"
        aria-hidden="true"
      />
    </div>
  );
}

type ApertureHeadlineProps = Omit<ComponentProps<"h2">, "id"> & {
  as?: "h1" | "h2" | "h3";
};

function ApertureHeadline({ as: Heading = "h2", className, ...props }: ApertureHeadlineProps) {
  const { headlineId } = useAperture("Headline");
  // The id is set last: the section's aria-labelledby depends on it.
  return (
    <Heading
      {...props}
      className={cn(
        "aperture__headline pointer-events-none absolute inset-0 z-2 m-0 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-[0.22em] px-[clamp(16px,4cqw,56px)] font-semibold text-[clamp(2.25rem,6.4cqw,6.25rem)] leading-[0.95] tracking-[-0.04em] text-balance wrap-break-word",
        "@max-[640px]/stage:grid-cols-1 @max-[640px]/stage:grid-rows-[auto_auto_auto] @max-[640px]/stage:content-center @max-[640px]/stage:justify-items-center @max-[640px]/stage:gap-y-[0.14em] @max-[640px]/stage:text-center @max-[640px]/stage:text-[clamp(2.25rem,12cqw,4.5rem)]",
        "group-data-static/aperture:static group-data-static/aperture:flex group-data-static/aperture:flex-wrap group-data-static/aperture:justify-center group-data-static/aperture:gap-x-[0.22em] group-data-static/aperture:gap-y-[0.08em] group-data-static/aperture:py-[clamp(64px,12cqw,160px)] group-data-static/aperture:text-center group-data-static/aperture:[grid-area:headline]",
        className,
      )}
      id={headlineId}
    />
  );
}

/** Words before the opening. They part left, or up on narrow stages. */
function ApertureLead({ className, children, ...props }: ComponentProps<"span">) {
  useAperture("Lead");
  return (
    <span
      className={cn(
        "aperture__lead min-w-0 justify-self-end text-right @max-[640px]/stage:justify-self-center @max-[640px]/stage:text-center group-data-static/aperture:text-center",
        className,
      )}
      {...props}
    >
      {children}
      {/* Keeps the heading's accessible name "lead trail", not "leadtrail". */}{" "}
    </span>
  );
}

/** Words after the opening. They part right, or down on narrow stages. */
function ApertureTrail({ className, ...props }: ComponentProps<"span">) {
  useAperture("Trail");
  return (
    <span
      className={cn(
        "aperture__trail min-w-0 justify-self-start text-left @max-[640px]/stage:justify-self-center @max-[640px]/stage:text-center group-data-static/aperture:text-center",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The gap in the headline the photograph grows from. Decorative. With reduced motion it is
 * hidden unless given children, such as a small copy of the photograph.
 */
function ApertureOpening({ className, children, ref, ...props }: ComponentProps<"span">) {
  const { openingRef } = useAperture("Opening");
  const setRef = useMemo(() => mergeRefs(openingRef, ref), [openingRef, ref]);
  return (
    <span
      ref={setRef}
      aria-hidden="true"
      className={cn(
        "block h-[0.86em] w-[2.1em] overflow-hidden rounded-full @max-[640px]/stage:h-[1.1em] @max-[640px]/stage:w-[2.6em]",
        "group-data-static/aperture:hidden group-data-static/aperture:data-filled:relative group-data-static/aperture:data-filled:block group-data-static/aperture:data-filled:bg-(--aperture-opening) group-data-static/aperture:*:size-full group-data-static/aperture:*:object-cover",
        className,
      )}
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
  return (
    <div
      className={cn(
        "aperture__caption absolute inset-x-0 bottom-0 z-3 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 p-[clamp(20px,5cqw,64px)] text-[#f4f2ed]",
        "@max-[640px]/stage:flex-col @max-[640px]/stage:items-start",
        "group-data-static/aperture:relative group-data-static/aperture:self-end group-data-static/aperture:[grid-area:media]",
        className,
      )}
      {...props}
    />
  );
}

type ApertureTextProps = Omit<ComponentProps<"p">, "children"> & {
  /** Plain text, read in word by word. */
  children: string;
};

function ApertureText({ children, className, ...props }: ApertureTextProps) {
  useAperture("Text");
  const words = children.split(WHITESPACE).filter(Boolean);
  return (
    <p
      className={cn(
        "aperture__text m-0 max-w-[30em] font-medium text-[clamp(1.125rem,2.7cqw,2.25rem)] leading-[1.2] tracking-[-0.02em] text-pretty",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{children}</span>
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
function ApertureAction({
  className,
  onFocus,
  ref: forwardedRef,
  ...props
}: ComponentProps<"div">) {
  const { isStatic, read, trackRef } = useAperture("Action");
  const ref = useRef<HTMLDivElement>(null);
  const setRef = useMemo(() => mergeRefs(ref, forwardedRef), [forwardedRef]);

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
    <div
      {...props}
      ref={setRef}
      className={cn(
        "aperture__action pointer-events-none focus-within:pointer-events-auto data-ready:pointer-events-auto group-data-static/aperture:pointer-events-auto",
        // Styles the link or button passed in, whatever component renders it.
        "*:inline-flex *:min-h-12 *:cursor-pointer *:items-center *:whitespace-nowrap *:rounded-full *:border-0 *:bg-(--aperture-accent) *:px-6 *:font-semibold *:text-(--aperture-accent-ink) *:text-[15px] *:tracking-[-0.005em] *:no-underline *:transition-colors *:duration-200",
        "*:hover:bg-[color-mix(in_srgb,var(--aperture-accent)_86%,white)] *:focus-visible:outline-2 *:focus-visible:outline-[#f4f2ed] *:focus-visible:outline-offset-3",
        className,
      )}
      onFocus={handleFocus}
    />
  );
}

/** Small cue at the bottom of the stage. Fades as soon as the opening starts to widen. */
function ApertureHint({ className, ...props }: ComponentProps<"span">) {
  useAperture("Hint");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "aperture__hint pointer-events-none absolute bottom-[clamp(16px,4cqh,32px)] left-1/2 z-2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em] group-data-static/aperture:hidden",
        className,
      )}
      {...props}
    />
  );
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
