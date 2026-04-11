"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface GalleryCard {
  name: string;
  href: string;
  children: React.ReactNode;
}

function GalleryItem({ card }: { card: GalleryCard }) {
  return (
    <div
      className={cn(
        "w-[340px] flex-shrink-0 snap-start sm:w-[380px]",
        "overflow-hidden rounded-[18px] bg-[hsl(var(--surface-card))] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300",
        "hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)]",
      )}
    >
      <div className="flex h-[240px] items-center justify-center overflow-hidden border-b border-border bg-foreground/[0.02] p-4">
        {card.children}
      </div>
      <div className="p-4">
        <Link
          href={card.href}
          className="text-sm font-semibold text-foreground hover:text-[hsl(var(--link))]"
        >
          {card.name}
        </Link>
      </div>
    </div>
  );
}

export default function ComponentGallery({
  eyebrow,
  title,
  seeAllHref,
  cards,
  className,
}: {
  eyebrow: string;
  title: string;
  seeAllHref: string;
  cards: GalleryCard[];
  className?: string;
}) {
  return (
    <div className={cn("container mx-auto px-4", className)}>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-[clamp(28px,5vw,44px)] font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <Link
          href={seeAllHref}
          className="text-sm font-medium text-[hsl(var(--link))] transition-colors hover:text-[hsl(var(--link-hover))]"
        >
          See all →
        </Link>
      </div>

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <GalleryItem key={card.name} card={card} />
        ))}
      </div>
    </div>
  );
}
