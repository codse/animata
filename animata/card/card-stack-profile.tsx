"use client";

import type { LucideIcon } from "lucide-react";
import { Heart, MessageCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import CardStack, {
  type CardStackItem,
  type CardStackLayerMotion,
} from "@/animata/card/card-stack";
import { CardStackMaskDefs } from "@/components/shapes/card-stack-mask-defs";
import { cn } from "@/lib/utils";

export const CARD_STACK_MASK_IDS = [
  "cardstack_mask_ellipse-1",
  "cardstack_mask_flower-14",
  "cardstack_mask_flower-1",
  "cardstack_mask_misc-5",
] as const;

export type CardStackProfileMaskId = (typeof CARD_STACK_MASK_IDS)[number];

export type CardStackProfileMediaAspect = "fill" | "square" | "4/5" | "3/4" | "16/10";

export interface CardStackProfileItem extends CardStackItem {
  image: string;
  title: string;
  tagline: string;
  counts?: {
    like: number;
    comment: number;
  };
  maskId: CardStackProfileMaskId;
}

const CARD_STACK_MASK_STYLE = {
  maskSize: "cover",
  maskPosition: "center",
  maskRepeat: "no-repeat",
} as const;

const MEDIA_ASPECT_CLASS: Record<Exclude<CardStackProfileMediaAspect, "fill">, string> = {
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
};

export function CardStackProfileMasks({ className }: { className?: string }) {
  return <CardStackMaskDefs className={cn("pointer-events-none absolute", className)} />;
}

export function CardStackProfileLiveRegion({
  className,
  item,
}: {
  className?: string;
  item: CardStackProfileItem | undefined;
}) {
  return (
    <p className={cn("sr-only", className)} aria-live="polite" aria-atomic="true">
      {item ? `Showing ${item.title}, ${item.tagline}` : "No cards available"}
    </p>
  );
}

export function CardStackProfileHeader({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("flex items-center gap-2 p-4", className)} {...props} />;
}

export function CardStackProfileAvatar({
  src,
  className,
  ...props
}: ComponentProps<"div"> & { src: string }) {
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

export function CardStackProfileMeta({
  title,
  tagline,
  className,
  ...props
}: ComponentProps<"div"> & { title: string; tagline: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-0.5", className)} {...props}>
      <h3 className="truncate text-xs font-medium leading-none tracking-wide text-foreground">
        {title}
      </h3>
      <p className="truncate overflow-visible text-[10px] leading-none text-muted-foreground">
        {tagline}
      </p>
    </div>
  );
}

export function CardStackProfileMedia({
  src,
  alt,
  maskId,
  aspect = "square",
  className,
  style,
  ...props
}: Omit<ComponentProps<"img">, "src" | "alt"> & {
  src: string;
  alt: string;
  maskId: CardStackProfileMaskId;
  aspect?: CardStackProfileMediaAspect;
}) {
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

export function CardStackProfileFooter({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn("flex items-center gap-3 px-4 pb-4 pt-1 text-sm text-foreground", className)}
      {...props}
    />
  );
}

export function CardStackProfileMetric({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ComponentProps<"span"> & { icon: LucideIcon; label: string; value: number | string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      <Icon aria-hidden className="size-6 shrink-0" />
      <span className="sr-only">{label}: </span>
      {value}
    </span>
  );
}

interface CardStackProfileCardProps {
  item: CardStackProfileItem;
  index: number;
  layer: CardStackLayerMotion;
  className?: string;
  footerTrailing?: ReactNode;
  showMetrics?: boolean;
}

/** Profile-style card for demos and Storybook — not part of the core stack API. */
export function CardStackProfileCard({
  item,
  index,
  layer,
  className,
  footerTrailing,
  showMetrics = true,
}: CardStackProfileCardProps) {
  return (
    <CardStack.Card
      layer={layer}
      stackIndex={index}
      className={cn(
        "flex flex-col gap-3 rounded-4xl bg-linear-to-br from-pink-100 via-white to-white p-0 shadow-xl ring-1 ring-border",
        "dark:from-pink-950 dark:via-card dark:to-card",
        className,
      )}
    >
      <CardStackProfileHeader>
        <CardStackProfileAvatar src={item.image} />
        <CardStackProfileMeta title={item.title} tagline={item.tagline} />
      </CardStackProfileHeader>

      <CardStackProfileMedia
        src={item.image}
        alt={`Portrait of ${item.title}`}
        maskId={item.maskId}
      />

      {showMetrics || footerTrailing ? (
        <CardStackProfileFooter>
          {showMetrics ? (
            <>
              <CardStackProfileMetric icon={Heart} label="Likes" value={item.counts?.like ?? 0} />
              <CardStackProfileMetric
                icon={MessageCircle}
                label="Comments"
                value={item.counts?.comment ?? 0}
                className="ms-1"
              />
            </>
          ) : null}
          {footerTrailing}
        </CardStackProfileFooter>
      ) : null}
    </CardStack.Card>
  );
}
