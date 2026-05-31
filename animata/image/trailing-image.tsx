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

const AnimatedImage = forwardRef<AnimatedImageRef, { src: string }>(({ src }, ref) => {
  const controls = useAnimation();
  const isRunning = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

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
      const rect = imgRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const center = (posX: number, posY: number) => {
        const coords = {
          x: posX - rect.width / 2,
          y: posY - rect.height / 2,
        };
        return `translate(${coords.x}px, ${coords.y}px)`;
      };

      controls.stop();

      controls.set({
        opacity: isRunning.current ? 1 : 0.75,
        zIndex,
        transform: `${center(x, y)} scale(1)`,
        transition: { ease: "circOut" },
      });

      isRunning.current = true;

      await controls.start({
        opacity: 1,
        transform: `${center(newX, newY)} scale(1)`,
        transition: { duration: 0.9, ease: "circOut" },
      });

      await Promise.all([
        controls.start({
          transition: { duration: 1, ease: "easeInOut" },
          transform: `${center(newX, newY)} scale(0.1)`,
        }),
        controls.start({
          opacity: 0,
          transition: { duration: 1.1, ease: "easeOut" },
        }),
      ]);

      isRunning.current = false;
    },
  }));

  return (
    <motion.img
      ref={imgRef}
      initial={{ opacity: 0, scale: 1 }}
      animate={controls}
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none absolute h-56 w-44 select-none object-cover"
    />
  );
});

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

function isInsideExcludeZones(
  clientX: number,
  clientY: number,
  excludeRefs: RefObject<HTMLElement | null>[],
) {
  return excludeRefs.some((ref) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return false;
    }

    return (
      clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    );
  });
}

function isPointerOverExcludeZones(
  clientX: number,
  clientY: number,
  target: EventTarget | null,
  excludeRefs: RefObject<HTMLElement | null>[],
) {
  if (target instanceof Node) {
    for (const ref of excludeRefs) {
      if (ref.current?.contains(target)) {
        return true;
      }
    }
  }

  if (isInsideExcludeZones(clientX, clientY, excludeRefs)) {
    return true;
  }

  if (typeof document.elementsFromPoint !== "function") {
    return false;
  }

  return document
    .elementsFromPoint(clientX, clientY)
    .some((element) =>
      excludeRefs.some(
        (ref) => ref.current && (ref.current === element || ref.current.contains(element)),
      ),
    );
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
  const excludeRefsRef = useRef(excludeRefs);
  excludeRefsRef.current = excludeRefs;
  const maxTrailZIndexRef = useRef(maxTrailZIndex);
  maxTrailZIndexRef.current = maxTrailZIndex;

  const update = useCallback(
    (cursor: { x: number; y: number }, eventTarget: EventTarget | null = null) => {
      if (isPointerOverExcludeZones(cursor.x, cursor.y, eventTarget, excludeRefsRef.current)) {
        lastPosition.current = cursor;
        cachedPosition.current = cursor;
        return;
      }

      const activeRefCount = trailsRef.current.filter((ref) => ref.current?.isActive()).length;
      if (activeRefCount === 0) {
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
    [threshold],
  );

  useMousePosition(containerRef, edgeToEdge ? undefined : update);

  useEffect(() => {
    if (!edgeToEdge) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      update({ x: event.clientX, y: event.clientY }, event.target);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      update({ x: touch.clientX, y: touch.clientY }, event.target);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [edgeToEdge, update]);

  const trailLayer = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {trailsRef.current.map((ref, index) => (
        <AnimatedImage key={index} ref={ref} src={resolvedImages[index % resolvedImages.length]!} />
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
