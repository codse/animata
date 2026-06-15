import type { ComponentProps } from "react";

import FlipCard, { FlipCardBack, FlipCardFront } from "@/animata/card/flip-card";
import { cn } from "@/lib/utils";

type FlippingCardsRootProps = ComponentProps<"div">;

function FlippingCardsRoot({ className, ...props }: FlippingCardsRootProps) {
  return <div className={cn("grid grid-cols-3 gap-5 max-sm:grid-cols-2", className)} {...props} />;
}

type FlippingCardsItemProps = ComponentProps<typeof FlipCard>;

function FlippingCardsItem({ className, ...props }: FlippingCardsItemProps) {
  return (
    <FlipCard className={cn("h-60 w-48 [&>div]:rounded-none", className)} rotate="y" {...props} />
  );
}

const FlippingCardsItemWithFaces = Object.assign(FlippingCardsItem, {
  Front: FlipCardFront,
  Back: FlipCardBack,
});

const FlippingCards = Object.assign(FlippingCardsRoot, {
  Item: FlippingCardsItemWithFaces,
}) as typeof FlippingCardsRoot & {
  Item: typeof FlippingCardsItemWithFaces;
};

export function getFlippingCardsAccent(_index: number) {
  return "hsl(var(--accent))";
}

export default FlippingCards;
export { FlippingCards, FlippingCardsItemWithFaces as FlippingCardsItem };
