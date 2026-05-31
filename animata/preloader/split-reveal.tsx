"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type PreloaderPhase = "loading" | "reveal" | "done";

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
  zIndex: number;
  isActive: boolean;
}

const SplitRevealContext = createContext<SplitRevealContextValue | null>(null);

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
  holdMs?: number;
  zIndex?: number;
  lockScroll?: boolean;
  onComplete?: () => void;
}

function preloadImages(urls: string[], onProgress: (loaded: number, total: number) => void) {
  const total = urls.length;

  if (total === 0) {
    onProgress(0, 0);
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let loaded = 0;

    const markDone = () => {
      loaded += 1;
      onProgress(loaded, total);
      if (loaded >= total) {
        resolve();
      }
    };

    for (const url of urls) {
      const img = new Image();
      img.decoding = "async";
      img.onload = markDone;
      img.onerror = markDone;
      img.src = url;
    }
  });
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

function SplitRevealOverlayFrame({ className, children, ...props }: ComponentProps<"div">) {
  const { phase, zIndex, isActive } = useSplitReveal();

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
      style={{ zIndex }}
      aria-busy={phase === "loading"}
      aria-live="polite"
      role="status"
      data-split-reveal-overlay=""
      {...props}
    >
      {children}
    </div>
  );
}

function SplitRevealShutter({
  side,
  className,
  ...props
}: ComponentProps<typeof motion.div> & { side: "top" | "bottom" }) {
  const { phase, backgroundColor, revealDuration } = useSplitReveal();

  return (
    <motion.div
      className={cn(
        "absolute inset-x-0 h-1/2 will-change-transform",
        side === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ backgroundColor }}
      initial={{ y: "0%" }}
      animate={phase === "reveal" ? { y: side === "top" ? "-100%" : "100%" } : { y: "0%" }}
      transition={{
        duration: revealDuration,
        ease: [0.76, 0, 0.24, 1] as const,
      }}
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
      style={{ backgroundColor: `${foregroundColor}14` }}
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

function SplitRevealProgressSlot({
  className,
  children,
  ...props
}: ComponentProps<typeof motion.div>) {
  const { phase } = useSplitReveal();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
        className,
      )}
      initial={{ opacity: 1 }}
      animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      data-split-reveal-progress=""
      {...props}
    >
      <div className="w-[min(18rem,70vw)]">{children}</div>
    </motion.div>
  );
}

function SplitRevealProgress({
  className,
  children,
  ...props
}: ComponentProps<typeof motion.div> & {
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
  holdMs = 240,
  zIndex = 100,
  lockScroll = true,
  onComplete,
}: SplitRevealProps) {
  const reduceMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  const uniqueImages = useMemo(() => [...new Set(images.filter(Boolean))], [images]);

  const progress = total === 0 ? 100 : Math.round((loaded / total) * 100);
  const isActive = phase !== "done";

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    let revealTimer: number | undefined;
    let doneTimer: number | undefined;

    setPhase("loading");
    setLoaded(0);
    setTotal(uniqueImages.length);

    const finish = () => {
      onCompleteRef.current?.();
      setPhase("done");
    };

    preloadImages(uniqueImages, (nextLoaded, nextTotal) => {
      if (cancelled) {
        return;
      }
      setLoaded(nextLoaded);
      setTotal(nextTotal);
    }).then(() => {
      if (cancelled) {
        return;
      }

      if (reduceMotion) {
        finish();
        return;
      }

      revealTimer = window.setTimeout(() => {
        setPhase("reveal");
        doneTimer = window.setTimeout(finish, revealDuration * 1000);
      }, holdMs);
    });

    return () => {
      cancelled = true;
      if (revealTimer !== undefined) {
        window.clearTimeout(revealTimer);
      }
      if (doneTimer !== undefined) {
        window.clearTimeout(doneTimer);
      }
    };
  }, [holdMs, reduceMotion, revealDuration, uniqueImages]);

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
