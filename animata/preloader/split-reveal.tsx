"use client";

import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type ReactNode,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/utils";

type PreloaderPhase = "loading" | "fade-ui" | "reveal" | "done";

export interface SplitRevealProgressState {
  phase: PreloaderPhase;
  progress: number;
  loaded: number;
  total: number;
}

interface SplitRevealContextValue extends SplitRevealProgressState {
  backgroundColor: string;
  foregroundColor: string;
  revealDuration: number;
  progressFadeMs: number;
  zIndex: number;
  isActive: boolean;
}

const SplitRevealContext = createContext<SplitRevealContextValue | null>(null);

const REVEAL_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

export function useSplitReveal() {
  const context = use(SplitRevealContext);
  if (!context) {
    throw new Error("SplitReveal primitives must be used within <SplitReveal>.");
  }
  return context;
}

export interface SplitRevealProps {
  images: string[];
  /** Full overlay override — shutters, progress, all of it */
  children?: ReactNode;
  /** Swap the center progress UI while keeping default shutters */
  renderProgress?: (state: SplitRevealProgressState) => ReactNode;
  overlayClassName?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  revealDuration?: number;
  /** Progress UI fade duration before shutters move */
  progressFadeMs?: number;
  holdMs?: number;
  zIndex?: number;
  lockScroll?: boolean;
  onComplete?: () => void;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

function preloadImages(urls: string[], onProgress: (loaded: number, total: number) => void) {
  const total = urls.length;

  if (total === 0) {
    onProgress(0, 0);
    return Promise.resolve();
  }

  let loaded = 0;

  const preloadOne = (url: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      let settled = false;

      const settle = () => {
        if (settled) {
          return;
        }
        settled = true;
        loaded += 1;
        onProgress(loaded, total);
        resolve();
      };

      const ready = () => {
        if (typeof img.decode === "function") {
          img.decode().then(settle).catch(settle);
          return;
        }
        settle();
      };

      img.onload = ready;
      img.onerror = settle;
      img.decoding = "async";
      img.src = url;

      if (img.complete && img.naturalWidth > 0) {
        ready();
      }
    });

  return Promise.all(urls.map((url) => preloadOne(url))).then(() => undefined);
}

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.touchAction = previous.bodyTouchAction;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}

function SplitRevealStyles() {
  return (
    <style>{`
      @keyframes split-reveal-shutter-top {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(0, -100%, 0);
        }
      }

      @keyframes split-reveal-shutter-bottom {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(0, 100%, 0);
        }
      }

      [data-split-reveal-overlay] [data-split-reveal-progress] {
        opacity: 1;
        transition: opacity var(--split-reveal-progress-fade) ease-out;
      }

      [data-split-reveal-overlay][data-phase="fade-ui"] [data-split-reveal-progress],
      [data-split-reveal-overlay][data-phase="reveal"] [data-split-reveal-progress] {
        opacity: 0;
      }

      [data-split-reveal-overlay][data-phase="reveal"] [data-split-reveal-shutter="top"] {
        animation: split-reveal-shutter-top var(--split-reveal-duration) ${REVEAL_EASE} forwards;
      }

      [data-split-reveal-overlay][data-phase="reveal"] [data-split-reveal-shutter="bottom"] {
        animation: split-reveal-shutter-bottom var(--split-reveal-duration) ${REVEAL_EASE} forwards;
      }

      @media (prefers-reduced-motion: reduce) {
        [data-split-reveal-overlay][data-phase="reveal"] [data-split-reveal-shutter] {
          animation: none;
          opacity: 0;
        }

        [data-split-reveal-overlay] [data-split-reveal-progress] {
          transition: none;
        }
      }
    `}</style>
  );
}

function SplitRevealOverlayFrame({ className, children, ...props }: ComponentProps<"div">) {
  const { phase, zIndex, revealDuration, progressFadeMs, isActive } = useSplitReveal();

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 overscroll-none touch-none",
        phase === "loading" ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      style={
        {
          zIndex,
          "--split-reveal-duration": `${revealDuration}s`,
          "--split-reveal-progress-fade": `${progressFadeMs}ms`,
        } as CSSProperties
      }
      data-phase={phase}
      aria-busy={phase === "loading"}
      aria-live="polite"
      role="status"
      data-split-reveal-overlay=""
      {...props}
    >
      <SplitRevealStyles />
      {children}
    </div>
  );
}

function SplitRevealShutter({
  side,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { side: "top" | "bottom" }) {
  const { backgroundColor } = useSplitReveal();

  return (
    <div
      className={cn(
        "absolute inset-x-0 h-1/2 will-change-transform",
        side === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ backgroundColor, ...style }}
      data-split-reveal-shutter={side}
      {...props}
    />
  );
}

function SplitRevealProgressTrack({
  progress,
  foregroundColor,
  className,
}: {
  progress: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <div
      className={cn("h-px w-full", className)}
      style={{ backgroundColor: `color-mix(in srgb, ${foregroundColor} 8%, transparent)` }}
    >
      <div
        className="h-px transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%`, backgroundColor: foregroundColor }}
      />
    </div>
  );
}

function SplitRevealProgressCount({
  loaded,
  total,
  foregroundColor,
  className,
}: {
  loaded: number;
  total: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 text-center text-[11px] font-medium tabular-nums tracking-[0.12em]",
        className,
      )}
      style={{ color: `${foregroundColor}73` }}
    >
      {String(loaded).padStart(2, "0")}
      <span style={{ color: `${foregroundColor}33` }}> / </span>
      {String(total).padStart(2, "0")}
    </p>
  );
}

function SplitRevealProgressSlot({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
        className,
      )}
      data-split-reveal-progress=""
      {...props}
    >
      <div className="w-[min(18rem,70vw)]">{children}</div>
    </div>
  );
}

function SplitRevealProgress({
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  children?: ReactNode | ((state: SplitRevealProgressState) => ReactNode);
}) {
  const { phase, progress, loaded, total, foregroundColor } = useSplitReveal();

  const content =
    typeof children === "function"
      ? children({ progress, loaded, total, phase })
      : (children ?? (
          <>
            <SplitRevealProgressTrack progress={progress} foregroundColor={foregroundColor} />
            <SplitRevealProgressCount
              loaded={loaded}
              total={total}
              foregroundColor={foregroundColor}
            />
          </>
        ));

  return (
    <SplitRevealProgressSlot className={className} {...props}>
      {content}
    </SplitRevealProgressSlot>
  );
}

function SplitRevealDefaultOverlay({
  renderProgress,
}: {
  renderProgress?: (state: SplitRevealProgressState) => ReactNode;
}) {
  const state = useSplitReveal();

  return (
    <>
      <SplitRevealShutter side="top" />
      <SplitRevealShutter side="bottom" />
      {renderProgress ? (
        <SplitRevealProgressSlot>
          {renderProgress({
            phase: state.phase,
            progress: state.progress,
            loaded: state.loaded,
            total: state.total,
          })}
        </SplitRevealProgressSlot>
      ) : (
        <SplitRevealProgress />
      )}
    </>
  );
}

function SplitRevealRoot({
  images,
  children,
  renderProgress,
  overlayClassName,
  backgroundColor = "#fff",
  foregroundColor = "#000",
  revealDuration = 0.85,
  progressFadeMs = 280,
  holdMs = 240,
  zIndex = 100,
  lockScroll = true,
  onComplete,
}: SplitRevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const phaseRef = useRef<PreloaderPhase>("loading");
  const [bootId, setBootId] = useState(0);
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  phaseRef.current = phase;

  const uniqueImages = useMemo(() => [...new Set(images.filter(Boolean))], [images]);

  const progress = total === 0 ? 100 : Math.round((loaded / total) * 100);
  const isActive = phase !== "done";

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // bootId intentionally restarts preload after bfcache / tab restore
  // biome-ignore lint/correctness/useExhaustiveDependencies: bootId is the restart signal
  useEffect(() => {
    let runId = 0;
    let fadeTimer: number | undefined;
    let revealTimer: number | undefined;
    let doneTimer: number | undefined;

    const clearTimers = () => {
      if (fadeTimer !== undefined) {
        window.clearTimeout(fadeTimer);
        fadeTimer = undefined;
      }
      if (revealTimer !== undefined) {
        window.clearTimeout(revealTimer);
        revealTimer = undefined;
      }
      if (doneTimer !== undefined) {
        window.clearTimeout(doneTimer);
        doneTimer = undefined;
      }
    };

    const finish = (currentRun: number) => {
      if (currentRun !== runId) {
        return;
      }
      onCompleteRef.current?.();
      setPhase("done");
    };

    const startReveal = (currentRun: number) => {
      if (reduceMotion) {
        finish(currentRun);
        return;
      }

      setPhase("fade-ui");

      revealTimer = window.setTimeout(() => {
        if (currentRun !== runId) {
          return;
        }

        setPhase("reveal");
        doneTimer = window.setTimeout(() => finish(currentRun), revealDuration * 1000);
      }, progressFadeMs);
    };

    const start = () => {
      runId += 1;
      const currentRun = runId;
      clearTimers();

      const imageCount = uniqueImages.length;

      setPhase("loading");
      setLoaded(0);
      setTotal(imageCount);

      if (imageCount === 0) {
        fadeTimer = window.setTimeout(() => startReveal(currentRun), holdMs);
        return;
      }

      preloadImages(uniqueImages, (nextLoaded, nextTotal) => {
        if (currentRun !== runId) {
          return;
        }
        setLoaded(nextLoaded);
        setTotal(nextTotal);
      }).then(() => {
        if (currentRun !== runId) {
          return;
        }

        fadeTimer = window.setTimeout(() => startReveal(currentRun), holdMs);
      });
    };

    start();

    return () => {
      runId += 1;
      clearTimers();
    };
  }, [bootId, holdMs, progressFadeMs, reduceMotion, revealDuration, uniqueImages]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && phaseRef.current !== "done") {
        setBootId((id) => id + 1);
      }
    };

    const onResume = () => {
      if (phaseRef.current !== "done") {
        setBootId((id) => id + 1);
      }
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("resume", onResume);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("resume", onResume);
    };
  }, []);

  useScrollLock(lockScroll && isActive);

  const contextValue = useMemo<SplitRevealContextValue>(
    () => ({
      phase,
      progress,
      loaded,
      total,
      backgroundColor,
      foregroundColor,
      revealDuration,
      progressFadeMs,
      zIndex,
      isActive,
    }),
    [
      backgroundColor,
      foregroundColor,
      isActive,
      loaded,
      phase,
      progress,
      progressFadeMs,
      revealDuration,
      total,
      zIndex,
    ],
  );

  if (!isActive) {
    return null;
  }

  return (
    <SplitRevealContext value={contextValue}>
      <SplitRevealOverlayFrame className={overlayClassName}>
        {children ?? <SplitRevealDefaultOverlay renderProgress={renderProgress} />}
      </SplitRevealOverlayFrame>
    </SplitRevealContext>
  );
}

const SplitReveal = Object.assign(SplitRevealRoot, {
  Shutter: SplitRevealShutter,
  Progress: SplitRevealProgress,
  ProgressTrack: SplitRevealProgressTrack,
  ProgressCount: SplitRevealProgressCount,
});

export default SplitReveal;
export {
  type PreloaderPhase,
  preloadImages,
  SplitReveal,
  SplitRevealOverlayFrame,
  SplitRevealProgress,
  SplitRevealProgressCount,
  SplitRevealProgressSlot,
  SplitRevealProgressTrack,
  SplitRevealRoot,
  SplitRevealShutter,
  useScrollLock,
};
