"use client";

import { ArrowRight, Heart, MessageCircle } from "lucide-react";

import CardStack, {
  type CardStackItem,
  type CardStackLayerMotion,
} from "@/animata/card/card-stack";
import { cn } from "@/lib/utils";

interface ProfileStackCardProps {
  item: CardStackItem;
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
    <CardStack.Card
      key={item.id}
      layer={layer}
      stackIndex={index}
      className={cn(
        "bg-linear-to-br from-[#f5efe6] via-[#faf8f5] to-white ring-white/20",
        "dark:from-pink-950 dark:via-card dark:to-card dark:ring-border/60",
        cardClassName,
      )}
    >
      <CardStack.Header>
        <CardStack.Avatar src={item.image} />
        <CardStack.Meta title={item.title} tagline={item.tagline} />
      </CardStack.Header>

      <CardStack.Media src={item.image} alt={`Portrait of ${item.title}`} maskId={item.maskId} />

      {showMetrics ? (
        <CardStack.Footer>
          <CardStack.Metric icon={Heart} label="Likes" value={item.counts?.like ?? 0} />
          <CardStack.Metric
            icon={MessageCircle}
            label="Comments"
            value={item.counts?.comment ?? 0}
            className="ms-1"
          />
          <ArrowRight aria-hidden className="ml-auto size-6 shrink-0 text-black/40" />
        </CardStack.Footer>
      ) : null}
    </CardStack.Card>
  );
}
