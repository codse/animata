"use client";

import type { LucideIcon } from "lucide-react";
import { AnimatePresence, type HTMLMotionProps, motion, type Transition } from "motion/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { CardStackMaskDefs } from "@/components/shapes/card-stack-mask-defs";
import { cn } from "@/lib/utils";

export const CARD_STACK_MASK_IDS = [
  "cs_mask_1_ellipse-1",
  "cs_mask_1_flower-14",
  "cs_mask_1_flower-1",
  "cs_mask_1_misc-5",
] as const;

export type CardStackMaskId = (typeof CARD_STACK_MASK_IDS)[number];

export type CardStackMediaAspect = "fill" | "square" | "4/5" | "3/4" | "16/10";

export interface CardStackItem {
  id: string;
  image: string;
  title: string;
  tagline: string;
  counts: {
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

const easeOut: Transition["ease"] = [0, 0, 0.2, 1];

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
  const stackTransition: Transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: easeOut };

  const layers: CardStackLayerMotion[] = [
    {
      className: "",
      initial: { y: 90, rotate: 0, scale: 1, opacity: 1, zIndex: 20 },
      animate: { y: 90, rotate: 0, scale: 1, opacity: 1, zIndex: 20 },
      exit: reducedMotion
        ? { y: 90, scale: 1, opacity: 1, zIndex: 20 }
        : {
            y: 420,
            rotate: 0,
            scale: 0.96,
            opacity: 1,
            zIndex: 30,
            transition: stackTransition,
          },
      transition: stackTransition,
    },
    {
      className: "",
      initial: { y: 0, rotate: 0, scale: 0.75, opacity: 1, zIndex: 5 },
      animate: { y: 40, rotate: -1, scale: 0.85, opacity: 1, zIndex: 5 },
      transition: stackTransition,
    },
    {
      className: "",
      initial: { y: -40, rotate: 0, scale: 0.5, opacity: 1, zIndex: 0 },
      animate: { y: 0, rotate: 1, scale: 0.7, opacity: 1, zIndex: 0 },
      transition: stackTransition,
    },
  ];

  return layers.slice(0, depth);
}

interface CardStackContextValue {
  items: CardStackItem[];
  visibleItems: CardStackItem[];
  activeItem: CardStackItem | undefined;
  depth: number;
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
  onItemsChange?: (items: CardStackItem[]) => void;
  children: ReactNode;
}

function CardStackRoot({
  items,
  depth = DEFAULT_STACK_DEPTH,
  onItemsChange,
  children,
}: CardStackRootProps) {
  const reducedMotion = usePrefersReducedMotion();
  const layers = useMemo(() => getCardStackLayers(reducedMotion, depth), [reducedMotion, depth]);
  const [itemList, setItemList] = useState(items);
  const isAnimatingRef = useRef(false);

  const visibleItems = itemList.slice(0, depth);
  const activeItem = visibleItems[0];

  const rotateOne = useCallback(() => {
    setItemList((current) => {
      if (current.length <= 1) return current;
      const next = [...current];
      next.push(next.shift()!);
      onItemsChange?.(next);
      return next;
    });
  }, [onItemsChange]);

  const advance = useCallback(() => {
    if (itemList.length <= 1) return;
    if (isAnimatingRef.current) return;

    if (reducedMotion) {
      rotateOne();
      return;
    }

    isAnimatingRef.current = true;
    rotateOne();
  }, [itemList.length, reducedMotion, rotateOne]);

  const handleExitComplete = useCallback(() => {
    isAnimatingRef.current = false;
  }, []);

  const value = useMemo(
    () => ({
      items: itemList,
      visibleItems,
      activeItem,
      depth,
      advance,
      handleExitComplete,
      reducedMotion,
      layers,
    }),
    [itemList, visibleItems, activeItem, depth, advance, handleExitComplete, reducedMotion, layers],
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
  ...props
}: ComponentProps<"button">) {
  const { advance } = useCardStack();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          advance();
        }
      }}
      className={cn(
        "relative block w-full cursor-pointer outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.995] motion-reduce:active:scale-100",
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
      className={cn("relative mx-auto w-full min-h-[26rem] sm:min-h-[28rem]", className)}
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
      {visibleItems.map((item, index) => children(item, index, layers[index]!))}
    </AnimatePresence>
  );
}

interface CardStackCardProps extends HTMLMotionProps<"article"> {
  layer: CardStackLayerMotion;
  stackIndex: number;
  stackDepth?: number;
}

function CardStackCard({ layer, stackIndex, stackDepth, className, ...props }: CardStackCardProps) {
  const { depth } = useCardStack();
  const total = stackDepth ?? depth;

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
      initial={stackIndex === 0 || stackIndex === depth - 1 ? layer.initial : false}
      animate={layer.animate}
      exit={layer.exit}
      transition={layer.transition}
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
