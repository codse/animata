"use client";

import { motion, useAnimation } from "motion/react";
import {
  createRef,
  forwardRef,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn, getDistance, lerp } from "@/lib/utils";

interface AnimatedImageRef {
  show: ({
    x,
    y,
    newX,
    newY,
    zIndex,
  }: {
    x: number;
    y: number;
    zIndex: number;
    newX: number;
    newY: number;
  }) => void;
  isActive: () => boolean;
}

interface AnimatedImageProps {
  src: string;
  onActivityChange?: (delta: number) => void;
}

const AnimatedImage = forwardRef<AnimatedImageRef, AnimatedImageProps>(
  ({ src, onActivityChange }, ref) => {
    const controls = useAnimation();
    const isRunning = useRef(false);
    const onActivityChangeRef = useRef(onActivityChange);
    onActivityChangeRef.current = onActivityChange;

    useImperativeHandle(ref, () => ({
      isActive: () => isRunning.current,
      show: async ({
        x,
        y,
        newX,
        newY,
        zIndex,
      }: {
        x: number;
        y: number;
        zIndex: number;
        newX: number;
        newY: number;
      }) => {
        controls.stop();

        controls.set({
          opacity: isRunning.current ? 1 : 0.75,
          zIndex,
          x,
          y,
          scale: 1,
          transition: { ease: "circOut" },
        });

        isRunning.current = true;
        onActivityChangeRef.current?.(1);

        try {
          await controls.start({
            opacity: 1,
            x: newX,
            y: newY,
            scale: 1,
            transition: { duration: 0.9, ease: "circOut" },
          });

          await Promise.all([
            controls.start({
              x: newX,
              y: newY,
              scale: 0.1,
              transition: { duration: 1, ease: "easeInOut" },
            }),
            controls.start({
              opacity: 0,
              transition: { duration: 1.1, ease: "easeOut" },
            }),
          ]);
        } finally {
          isRunning.current = false;
          onActivityChangeRef.current?.(-1);
        }
      },
    }));

    return (
      <motion.img
        initial={{ opacity: 0, scale: 1 }}
        animate={controls}
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute h-56 w-44 -translate-x-1/2 -translate-y-1/2 select-none object-cover"
      />
    );
  },
);

AnimatedImage.displayName = "AnimatedImage";

const DEFAULT_IMAGES = [
  "https://assets.lummi.ai/assets/Qma1aBRXFsApFohRJrpJczE5QXGY6HhHKz24ybuw1khbou?auto=format&w=500",
  "https://assets.lummi.ai/assets/QmZBpAeh18DHxVNEEcJErt1UXGjZYCedSidJ6cybrDZdeS?auto=format&w=500",
  "https://assets.lummi.ai/assets/QmbMZFEfk2qwQkkmXYncpvHapkNQF5HuTrcascJC7edpfW?auto=format&w=500",
  "https://assets.lummi.ai/assets/QmXm6HVi3wwGy3jaCmECfoL8AULPerjQQh6abKTVhFMewK?auto=format&w=500",
  "https://assets.lummi.ai/assets/QmRy3tpFDCbgA3CQgRpySTGN6tNdomQE96rMpV31HeBUUd?auto=format&w=500",
];

export interface TrailingImageProps {
  images?: string[];
  className?: string;
  children?: ReactNode;
  /** Distance in px between trail spawns. Default 50. */
  threshold?: number;
  /** Full-viewport trail layer; tracks pointer on `window` so UI stays clickable. */
  edgeToEdge?: boolean;
  /** Render only the trail layer (no children wrapper). */
  layerOnly?: boolean;
  /** Pin to `absolute inset-0` inside a positioned parent instead of `fixed`. */
  contained?: boolean;
  /** Wrapper classes for interactive content when `edgeToEdge` is set. */
  contentClassName?: string;
  /** Pointer regions where trail spawns are suppressed (viewport/client coordinates). */
  excludeRefs?: RefObject<HTMLElement | null>[];
  /** Cap inline z-index so trails stay under foreground UI (e.g. z-20 content). */
  maxTrailZIndex?: number;
}

function isPointInRect(clientX: number, clientY: number, rect: DOMRect) {
  return (
    clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
  );
}

/** Fast exclusion: DOM contains first, then cached viewport rects (no layout reads per move). */
function isPointerOverExcludeZones(
  clientX: number,
  clientY: number,
  target: EventTarget | null,
  excludeRefs: RefObject<HTMLElement | null>[],
  excludeRects: DOMRect[],
) {
  if (target instanceof Node) {
    for (const ref of excludeRefs) {
      if (ref.current?.contains(target)) {
        return true;
      }
    }
  }

  for (const rect of excludeRects) {
    if (isPointInRect(clientX, clientY, rect)) {
      return true;
    }
  }

  return false;
}

function useExcludeZoneRects(excludeRefs: RefObject<HTMLElement | null>[], enabled: boolean) {
  const excludeRectsRef = useRef<DOMRect[]>([]);
  const excludeRefsRef = useRef(excludeRefs);
  excludeRefsRef.current = excludeRefs;

  const measureExcludeRects = useCallback(() => {
    excludeRectsRef.current = excludeRefsRef.current.flatMap((ref) => {
      const rect = ref.current?.getBoundingClientRect();
      return rect ? [rect] : [];
    });
  }, []);

  useLayoutEffect(() => {
    if (!enabled || excludeRefsRef.current.length === 0) {
      excludeRectsRef.current = [];
      return;
    }

    measureExcludeRects();

    const observers: ResizeObserver[] = [];
    for (const ref of excludeRefsRef.current) {
      if (!ref.current) continue;
      const observer = new ResizeObserver(measureExcludeRects);
      observer.observe(ref.current);
      observers.push(observer);
    }

    window.addEventListener("scroll", measureExcludeRects, { passive: true, capture: true });
    window.addEventListener("resize", measureExcludeRects, { passive: true });

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", measureExcludeRects, { capture: true });
      window.removeEventListener("resize", measureExcludeRects);
    };
  }, [enabled, measureExcludeRects]);

  return { excludeRectsRef, measureExcludeRects };
}

export default function TrailingImage({
  images = DEFAULT_IMAGES,
  className,
  children,
  threshold = 50,
  edgeToEdge = false,
  layerOnly = false,
  contained = false,
  contentClassName,
  excludeRefs = [],
  maxTrailZIndex,
}: TrailingImageProps) {
  const resolvedImages = images.length > 0 ? images : DEFAULT_IMAGES;
  const containerRef = useRef<HTMLDivElement>(null);
  const trailCount = Math.max(20, resolvedImages.length);
  const trailsRef = useRef(
    Array.from(
      { length: trailCount },
      () => createRef<AnimatedImageRef>() as RefObject<AnimatedImageRef>,
    ),
  );

  const lastPosition = useRef({ x: 0, y: 0 });
  const cachedPosition = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const zIndex = useRef(1);
  const activeTrailCountRef = useRef(0);
  const excludeRefsRef = useRef(excludeRefs);
  excludeRefsRef.current = excludeRefs;
  const maxTrailZIndexRef = useRef(maxTrailZIndex);
  maxTrailZIndexRef.current = maxTrailZIndex;
  const hasExcludeZones = excludeRefs.length > 0;
  const { excludeRectsRef } = useExcludeZoneRects(excludeRefs, hasExcludeZones);

  const pendingPointerRef = useRef<{
    x: number;
    y: number;
    target: EventTarget | null;
  } | null>(null);
  const frameRef = useRef<number | null>(null);

  const handleTrailActivity = useCallback((delta: number) => {
    activeTrailCountRef.current += delta;
  }, []);

  const runUpdate = useCallback(
    (cursor: { x: number; y: number }, eventTarget: EventTarget | null = null) => {
      if (
        hasExcludeZones &&
        isPointerOverExcludeZones(
          cursor.x,
          cursor.y,
          eventTarget,
          excludeRefsRef.current,
          excludeRectsRef.current,
        )
      ) {
        lastPosition.current = cursor;
        cachedPosition.current = cursor;
        return;
      }

      if (activeTrailCountRef.current === 0) {
        zIndex.current = 1;
      }

      const distance = getDistance(
        cursor.x,
        cursor.y,
        lastPosition.current.x,
        lastPosition.current.y,
      );

      const newCachePosition = {
        x: lerp(cachedPosition.current.x || cursor.x, cursor.x, 0.1),
        y: lerp(cachedPosition.current.y || cursor.y, cursor.y, 0.1),
      };
      cachedPosition.current = newCachePosition;

      if (distance > threshold) {
        imageIndex.current = (imageIndex.current + 1) % trailsRef.current.length;
        const nextZ = zIndex.current + 1;
        zIndex.current =
          maxTrailZIndexRef.current !== undefined
            ? Math.min(nextZ, maxTrailZIndexRef.current)
            : nextZ;
        lastPosition.current = cursor;
        trailsRef.current[imageIndex.current].current?.show?.({
          x: newCachePosition.x,
          y: newCachePosition.y,
          zIndex: zIndex.current,
          newX: cursor.x,
          newY: cursor.y,
        });
      }
    },
    [hasExcludeZones, excludeRectsRef, threshold],
  );

  const scheduleUpdate = useCallback(
    (cursor: { x: number; y: number }, eventTarget: EventTarget | null = null) => {
      pendingPointerRef.current = { x: cursor.x, y: cursor.y, target: eventTarget };
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const pending = pendingPointerRef.current;
        if (!pending) {
          return;
        }
        runUpdate({ x: pending.x, y: pending.y }, pending.target);
      });
    },
    [runUpdate],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useMousePosition(containerRef, edgeToEdge ? undefined : runUpdate);

  useEffect(() => {
    if (!edgeToEdge) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      scheduleUpdate({ x: event.clientX, y: event.clientY }, event.target);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      scheduleUpdate({ x: touch.clientX, y: touch.clientY }, event.target);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [edgeToEdge, scheduleUpdate]);

  const trailLayer = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {trailsRef.current.map((ref, index) => (
        <AnimatedImage
          key={index}
          ref={ref}
          src={resolvedImages[index % resolvedImages.length]!}
          onActivityChange={handleTrailActivity}
        />
      ))}
    </div>
  );

  if (edgeToEdge && layerOnly) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none overflow-hidden",
          contained ? "absolute inset-0" : "fixed inset-0",
          className,
        )}
        aria-hidden
      >
        {trailLayer}
      </div>
    );
  }

  if (edgeToEdge) {
    return (
      <>
        <div
          ref={containerRef}
          className={cn(
            "pointer-events-none overflow-hidden",
            contained ? "absolute inset-0" : "fixed inset-0",
            className,
          )}
          aria-hidden
        >
          {trailLayer}
        </div>
        {children ? <div className={cn("relative z-10", contentClassName)}>{children}</div> : null}
      </>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {trailLayer}
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

export { DEFAULT_IMAGES as TRAILING_IMAGE_DEFAULTS };
