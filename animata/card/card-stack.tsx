"use client";

import type { LucideIcon } from "lucide-react";
import { AnimatePresence, type HTMLMotionProps, motion, type Transition } from "motion/react";
import {
  type ComponentProps,
  cloneElement,
  createContext,
  isValidElement,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { CardStackMaskDefs } from "@/components/shapes/card-stack-mask-defs";
import { cn } from "@/lib/utils";

export const CARD_STACK_MASK_IDS = [
  "cardstack_mask_ellipse-1",
  "cardstack_mask_flower-14",
  "cardstack_mask_flower-1",
  "cardstack_mask_misc-5",
] as const;

export type CardStackMaskId = (typeof CARD_STACK_MASK_IDS)[number];

export type CardStackMediaAspect = "fill" | "square" | "4/5" | "3/4" | "16/10";

export interface CardStackItem {
  id: string;
  image: string;
  title: string;
  tagline: string;
  counts?: {
    like: number;
    comment: number;
  };
  maskId: CardStackMaskId;
}

export interface CardStackLayerMotion {
  className: string;
  initial: HTMLMotionProps<"article">["initial"];
  animate: HTMLMotionProps<"article">["animate"];
  exit?: HTMLMotionProps<"article">["exit"];
  transition: Transition;
  style?: HTMLMotionProps<"article">["style"];
}

const DEFAULT_STACK_DEPTH = 3;
const DEFAULT_AUTOPLAY_INTERVAL = 4500;
/** How long before the next click is accepted — decoupled from exit spring settle */
const STEP_COOLDOWN_MS = 260;

/** Peek offsets as % of each card’s height so stacks scale with card size */
const STACK_LAYER_PRESETS = [
  { y: "0%", scale: 1, rotate: 0, zIndex: 20 },
  { y: "-5%", scale: 0.84, rotate: -1, zIndex: 5 },
  { y: "-7.5%", scale: 0.72, rotate: 1, zIndex: 0 },
] as const;

const PROMOTE_SPRING: Transition = {
  type: "spring",
  visualDuration: 0.22,
  bounce: 0,
};

/** Top-card press — same transform channel as stack promote / throw */
const PRESS_SPRING: Transition = {
  type: "spring",
  visualDuration: 0.1,
  bounce: 0,
};

const PRESS_SCALE_FACTOR = 0.985;

const THROW_SPRING: Transition = {
  type: "spring",
  visualDuration: 0.24,
  bounce: 0.06,
  restSpeed: 2,
  restDelta: 0.001,
};

export interface CardStackThrowImpulse {
  x: string;
  rotate: number;
  yVelocity: number;
  rotateVelocity: number;
}

export function createCardStackThrowImpulse(): CardStackThrowImpulse {
  const drift = Math.random() - 0.5;

  return {
    x: `${(drift * 7).toFixed(2)}%`,
    rotate: drift * 6 + (Math.random() - 0.5) * 1.5,
    yVelocity: 3.5 + Math.random() * 2.8,
    rotateVelocity: drift * 10,
  };
}

const CARD_STACK_STACK_ORIGIN = "50% 0%";
const CARD_STACK_EXIT_Y = "200%";

const CARD_STACK_MASK_STYLE = {
  maskSize: "cover",
  maskPosition: "center",
  maskRepeat: "no-repeat",
} as const;

const MEDIA_ASPECT_CLASS: Record<Exclude<CardStackMediaAspect, "fill">, string> = {
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
};

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

export function getCardStackLayers(
  reducedMotion: boolean,
  depth = DEFAULT_STACK_DEPTH,
): CardStackLayerMotion[] {
  const stackTransition: Transition = reducedMotion ? { duration: 0 } : PROMOTE_SPRING;

  const layers: CardStackLayerMotion[] = STACK_LAYER_PRESETS.map((preset) => ({
    className: "",
    initial: {
      y: preset.y,
      rotate: preset.rotate,
      scale: preset.scale,
      opacity: 1,
      zIndex: preset.zIndex,
    },
    animate: {
      y: preset.y,
      rotate: preset.rotate,
      scale: preset.scale,
      opacity: 1,
      zIndex: preset.zIndex,
    },
    exit: reducedMotion
      ? {
          y: preset.y,
          scale: preset.scale,
          opacity: 1,
          zIndex: preset.zIndex,
        }
      : {
          y: CARD_STACK_EXIT_Y,
          rotate: 0,
          scale: 0.93,
          opacity: 0,
          zIndex: 30,
        },
    transition: stackTransition,
    style: { transformOrigin: CARD_STACK_STACK_ORIGIN },
  }));

  return layers.slice(0, depth);
}

function getLayerScale(layer: CardStackLayerMotion): number {
  const target = layer.animate;
  if (
    target &&
    typeof target === "object" &&
    "scale" in target &&
    typeof target.scale === "number"
  ) {
    return target.scale;
  }
  return 1;
}

function getCardStackInitial(
  stackIndex: number,
  depth: number,
  layer: CardStackLayerMotion,
): HTMLMotionProps<"article">["initial"] {
  if (stackIndex !== 0 && stackIndex !== depth - 1) {
    return false;
  }

  return layer.initial;
}

function getCardStackExit(
  stackIndex: number,
  layer: CardStackLayerMotion,
  reducedMotion: boolean,
  throwImpulse: CardStackThrowImpulse | null,
): HTMLMotionProps<"article">["exit"] {
  if (stackIndex !== 0) {
    return undefined;
  }

  if (reducedMotion) {
    return layer.exit;
  }

  const impulse = throwImpulse ?? createCardStackThrowImpulse();

  return {
    y: CARD_STACK_EXIT_Y,
    x: impulse.x,
    rotate: impulse.rotate,
    scale: 0.9,
    opacity: 0,
    zIndex: 30,
    transition: {
      y: { ...THROW_SPRING, velocity: impulse.yVelocity * 0.4 },
      x: THROW_SPRING,
      rotate: { ...THROW_SPRING, velocity: impulse.rotateVelocity * 0.35 },
      scale: THROW_SPRING,
      opacity: { type: "tween", duration: 0.16, ease: [0.4, 0, 1, 1] },
    },
  };
}

interface CardStackContextValue {
  items: CardStackItem[];
  visibleItems: CardStackItem[];
  activeItem: CardStackItem | undefined;
  depth: number;
  isAnimating: boolean;
  pressActive: boolean;
  setPressActive: (active: boolean) => void;
  throwImpulse: CardStackThrowImpulse | null;
  advance: () => void;
  handleExitComplete: () => void;
  reducedMotion: boolean;
  layers: CardStackLayerMotion[];
}

const CardStackContext = createContext<CardStackContextValue | null>(null);

export function useCardStack() {
  const context = use(CardStackContext);
  if (!context) {
    throw new Error("CardStack primitives must be used within <CardStack>.");
  }
  return context;
}

interface CardStackRootProps {
  items: CardStackItem[];
  depth?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  onItemsChange?: (items: CardStackItem[]) => void;
  children: ReactNode;
}

function CardStackRoot({
  items,
  depth = DEFAULT_STACK_DEPTH,
  autoplay = false,
  autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  onItemsChange,
  children,
}: CardStackRootProps) {
  const reducedMotion = usePrefersReducedMotion();
  const stackDepth = Math.min(Math.max(1, depth), STACK_LAYER_PRESETS.length);
  const layers = useMemo(
    () => getCardStackLayers(reducedMotion, stackDepth),
    [reducedMotion, stackDepth],
  );
  const [itemList, setItemList] = useState(items);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pressActive, setPressActive] = useState(false);
  const [throwImpulse, setThrowImpulse] = useState<CardStackThrowImpulse | null>(null);
  const isAnimatingRef = useRef(false);
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceRef = useRef<() => void>(() => {});

  const visibleItems = itemList.slice(0, stackDepth);
  const activeItem = visibleItems[0];

  const clearStepTimer = useCallback(() => {
    if (stepTimerRef.current !== null) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  }, []);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearStepTimer();
    clearAutoplayTimer();
    isAnimatingRef.current = false;
    setIsAnimating(false);
    setItemList(items);
  }, [items, clearStepTimer, clearAutoplayTimer]);

  const rotateOne = useCallback(() => {
    setItemList((current) => {
      if (current.length <= 1) return current;
      const next = [...current];
      next.push(next.shift()!);
      onItemsChange?.(next);
      return next;
    });
  }, [onItemsChange]);

  const finishStep = useCallback(() => {
    clearStepTimer();
    if (!isAnimatingRef.current) return false;
    isAnimatingRef.current = false;
    setIsAnimating(false);
    return true;
  }, [clearStepTimer]);

  const scheduleAutoplay = useCallback(() => {
    clearAutoplayTimer();
    if (!autoplay || reducedMotion || itemList.length <= 1) return;
    if (document.hidden) return;

    autoplayTimerRef.current = setTimeout(() => {
      autoplayTimerRef.current = null;
      advanceRef.current();
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, clearAutoplayTimer, itemList.length, reducedMotion]);

  const finishStepAndScheduleAutoplay = useCallback(() => {
    if (finishStep()) {
      scheduleAutoplay();
    }
  }, [finishStep, scheduleAutoplay]);

  const advance = useCallback(() => {
    if (itemList.length <= 1 || isAnimatingRef.current) return;

    clearAutoplayTimer();

    if (reducedMotion) {
      rotateOne();
      scheduleAutoplay();
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);
    setThrowImpulse(createCardStackThrowImpulse());
    clearStepTimer();
    rotateOne();
    stepTimerRef.current = setTimeout(finishStepAndScheduleAutoplay, STEP_COOLDOWN_MS);
  }, [
    clearAutoplayTimer,
    clearStepTimer,
    finishStepAndScheduleAutoplay,
    itemList.length,
    reducedMotion,
    rotateOne,
    scheduleAutoplay,
  ]);

  advanceRef.current = advance;

  const handleExitComplete = useCallback(() => {
    finishStepAndScheduleAutoplay();
  }, [finishStepAndScheduleAutoplay]);

  useEffect(() => {
    scheduleAutoplay();
    return () => {
      clearStepTimer();
      clearAutoplayTimer();
    };
  }, [clearAutoplayTimer, clearStepTimer, scheduleAutoplay]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        clearAutoplayTimer();
        return;
      }
      if (!isAnimatingRef.current) {
        scheduleAutoplay();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [clearAutoplayTimer, scheduleAutoplay]);

  const value = useMemo(
    () => ({
      items: itemList,
      visibleItems,
      activeItem,
      depth: stackDepth,
      isAnimating,
      pressActive,
      setPressActive,
      throwImpulse,
      advance,
      handleExitComplete,
      reducedMotion,
      layers,
    }),
    [
      itemList,
      visibleItems,
      activeItem,
      stackDepth,
      isAnimating,
      pressActive,
      throwImpulse,
      advance,
      handleExitComplete,
      reducedMotion,
      layers,
    ],
  );

  return <CardStackContext value={value}>{children}</CardStackContext>;
}

function CardStackFrame({
  "aria-label": ariaLabel = "Interactive card stack",
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section aria-label={ariaLabel} className={cn("relative", className)} {...props}>
      {children}
    </section>
  );
}

function CardStackPanel({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("relative z-10", className)} {...props}>
      {children}
    </div>
  );
}

function CardStackLiveRegion({ className }: { className?: string }) {
  const { activeItem } = useCardStack();

  return (
    <p className={cn("sr-only", className)} aria-live="polite" aria-atomic="true">
      {activeItem ? `Showing ${activeItem.title}, ${activeItem.tagline}` : "No cards available"}
    </p>
  );
}

function CardStackTrigger({
  "aria-label": ariaLabel = "Show next card",
  className,
  children,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: ComponentProps<"button">) {
  const { advance, isAnimating, setPressActive } = useCardStack();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented && !isAnimating) {
          setPressActive(true);
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        window.setTimeout(() => setPressActive(false), 0);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        setPressActive(false);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        setPressActive(false);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          advance();
        }
      }}
      className={cn(
        "relative block w-full cursor-pointer outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function CardStackViewport({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-visible pt-20 sm:pt-24 min-h-[26rem] sm:min-h-[28rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardStackListProps {
  children: (item: CardStackItem, index: number, layer: CardStackLayerMotion) => ReactNode;
}

function CardStackList({ children }: CardStackListProps) {
  const { visibleItems, layers, handleExitComplete } = useCardStack();

  return (
    <AnimatePresence initial={false} mode="sync" onExitComplete={handleExitComplete}>
      {visibleItems.map((item, index) => {
        const layer = layers[index]!;
        const node = children(item, index, layer);

        if (isValidElement<CardStackCardProps>(node) && node.type === CardStackCard) {
          return cloneElement<CardStackCardProps>(node, {
            key: item.id,
            stackIndex: index,
            layer,
          });
        }

        return node;
      })}
    </AnimatePresence>
  );
}

interface CardStackCardProps extends HTMLMotionProps<"article"> {
  layer: CardStackLayerMotion;
  stackIndex: number;
  stackDepth?: number;
}

function CardStackCard({
  layer,
  stackIndex,
  stackDepth,
  className,
  style,
  ...props
}: CardStackCardProps) {
  const { depth, isAnimating, pressActive, reducedMotion, throwImpulse } = useCardStack();
  const total = stackDepth ?? depth;

  const initial = getCardStackInitial(stackIndex, depth, layer);
  const exit = getCardStackExit(stackIndex, layer, reducedMotion, throwImpulse);
  const baseScale = getLayerScale(layer);
  const isPressed = stackIndex === 0 && pressActive && !reducedMotion && !isAnimating;
  const animateTarget =
    typeof layer.animate === "object" && layer.animate !== null && !Array.isArray(layer.animate)
      ? layer.animate
      : {};
  const animate = isPressed
    ? { ...animateTarget, scale: baseScale * PRESS_SCALE_FACTOR }
    : layer.animate;
  const transition = isPressed ? PRESS_SPRING : layer.transition;

  return (
    <motion.article
      className={cn(
        "absolute inset-x-0 top-0 flex h-fit w-full flex-col gap-3 rounded-4xl p-0",
        "bg-linear-to-br from-pink-100 via-white to-white shadow-xl ring-1 ring-border",
        "will-change-transform motion-reduce:transition-none",
        "dark:from-pink-950 dark:via-card dark:to-card",
        layer.className,
        className,
      )}
      aria-roledescription={`Card ${stackIndex + 1} of ${total}`}
      style={{
        transformOrigin: CARD_STACK_STACK_ORIGIN,
        ...layer.style,
        ...style,
      }}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    />
  );
}

function CardStackHeader({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("flex gap-2 p-4 items-center", className)} {...props} />;
}

interface CardStackAvatarProps extends ComponentProps<"div"> {
  src: string;
}

function CardStackAvatar({ src, className, ...props }: CardStackAvatarProps) {
  return (
    <div
      className={cn(
        "relative size-7 shrink-0 overflow-hidden rounded-full ring-2 ring-border",
        className,
      )}
      {...props}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        width={28}
        height={28}
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  );
}

interface CardStackMetaProps extends ComponentProps<"div"> {
  title: string;
  tagline: string;
}

function CardStackMeta({ title, tagline, className, ...props }: CardStackMetaProps) {
  return (
    <div className={cn("min-w-0 flex flex-col gap-0.5 items-start", className)} {...props}>
      <h3 className="truncate text-xs font-medium leading-none tracking-wide text-foreground">
        {title}
      </h3>
      <p className="truncate text-[10px] leading-none overflow-visible text-muted-foreground">
        {tagline}
      </p>
    </div>
  );
}

interface CardStackMediaProps extends Omit<ComponentProps<"img">, "src" | "alt"> {
  src: string;
  alt: string;
  maskId: CardStackMaskId;
  aspect?: CardStackMediaAspect;
}

function CardStackMedia({
  src,
  alt,
  maskId,
  aspect = "square",
  className,
  style,
  ...props
}: CardStackMediaProps) {
  const maskStyle = {
    ...CARD_STACK_MASK_STYLE,
    maskImage: `url(#${maskId})`,
    WebkitMaskImage: `url(#${maskId})`,
    WebkitMaskSize: CARD_STACK_MASK_STYLE.maskSize,
    WebkitMaskPosition: CARD_STACK_MASK_STYLE.maskPosition,
    WebkitMaskRepeat: CARD_STACK_MASK_STYLE.maskRepeat,
    ...style,
  };

  return (
    <figure
      className={cn(
        "mx-auto shrink-0 overflow-hidden",
        aspect === "square" && "aspect-square size-52",
        aspect === "fill" && "min-h-0 w-full flex-1",
        aspect !== "square" && aspect !== "fill" && MEDIA_ASPECT_CLASS[aspect],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={208}
        height={208}
        decoding="async"
        draggable={false}
        className="size-full object-cover"
        style={maskStyle}
        {...props}
      />
    </figure>
  );
}

function CardStackBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-1 flex-col bg-card", className)} {...props} />;
}

function CardStackFooter({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn("flex items-center gap-3 px-4 pb-4 pt-1 text-sm text-foreground", className)}
      {...props}
    />
  );
}

interface CardStackMetricProps extends ComponentProps<"span"> {
  icon: LucideIcon;
  label: string;
  value: number | string;
}

function CardStackMetric({ icon: Icon, label, value, className, ...props }: CardStackMetricProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      <Icon aria-hidden className="size-6 shrink-0" />
      <span className="sr-only">{label}: </span>
      {value}
    </span>
  );
}

interface CardStackActionProps extends ComponentProps<"span"> {
  icon?: LucideIcon;
}

function CardStackAction({ icon: Icon, className, children, ...props }: CardStackActionProps) {
  return (
    <span
      className={cn(
        "ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {Icon ? <Icon aria-hidden className="size-4 shrink-0" /> : null}
    </span>
  );
}

interface CardStackMasksProps {
  className?: string;
}

function CardStackMasks({ className }: CardStackMasksProps) {
  return <CardStackMaskDefs className={cn("pointer-events-none absolute", className)} />;
}

const CardStack = Object.assign(CardStackRoot, {
  Frame: CardStackFrame,
  Panel: CardStackPanel,
  LiveRegion: CardStackLiveRegion,
  Trigger: CardStackTrigger,
  Viewport: CardStackViewport,
  List: CardStackList,
  Card: CardStackCard,
  Header: CardStackHeader,
  Avatar: CardStackAvatar,
  Meta: CardStackMeta,
  Body: CardStackBody,
  Media: CardStackMedia,
  Footer: CardStackFooter,
  Metric: CardStackMetric,
  Action: CardStackAction,
  Masks: CardStackMasks,
});

export default CardStack;
export {
  CardStack,
  CardStackAction,
  CardStackAvatar,
  CardStackBody,
  CardStackCard,
  CardStackFooter,
  CardStackFrame,
  CardStackHeader,
  CardStackList,
  CardStackLiveRegion,
  CardStackMasks,
  CardStackMedia,
  CardStackMeta,
  CardStackMetric,
  CardStackPanel,
  CardStackRoot,
  CardStackTrigger,
  CardStackViewport,
};
