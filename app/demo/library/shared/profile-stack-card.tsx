"use client";

import { ArrowRight } from "lucide-react";

import CardStack, { type CardStackLayerMotion } from "@/animata/card/card-stack";
import { CardStackProfileCard, type CardStackProfileItem } from "@/animata/card/card-stack-profile";

interface ProfileStackCardProps {
  item: CardStackProfileItem;
  index: number;
  layer: CardStackLayerMotion;
  cardClassName?: string;
  showMetrics?: boolean;
}

export function ProfileStackCard({
  item,
  index,
  layer,
  cardClassName,
  showMetrics = true,
}: ProfileStackCardProps) {
  return (
    <CardStackProfileCard
      item={item}
      index={index}
      layer={layer}
      showMetrics={showMetrics}
      className={cardClassName}
      footerTrailing={<ArrowRight aria-hidden className="ml-auto size-6 shrink-0 text-black/40" />}
    />
  );
}
