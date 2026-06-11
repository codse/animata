import { CategoryGlyph } from "@/animata/skeleton/category-glyphs";
import { cn } from "@/lib/utils";

export type CategorySkeletonVariant = string;

type CategorySkeletonProps = {
  variant: CategorySkeletonVariant;
  className?: string;
};

const CARD_W = 358;
const CARD_H = 201;
/** Glyph viewBox is 64×64; scale so art fills ~78% of card height */
const GLYPH_SCALE = 2.35;

export default function CategorySkeleton({ variant, className }: CategorySkeletonProps) {
  return (
    <svg
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      className={cn(
        "cg-card w-full overflow-visible rounded-2xl text-foreground transition-transform duration-300 ease-out group-hover:scale-[1.02]",
        className,
      )}
      aria-hidden="true"
    >
      <rect
        width={CARD_W}
        height={CARD_H}
        rx="16"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1"
      />

      <g
        transform={`translate(${CARD_W / 2} ${CARD_H / 2}) scale(${GLYPH_SCALE}) translate(-32 -32)`}
      >
        <CategoryGlyph variant={variant} />
      </g>
    </svg>
  );
}
