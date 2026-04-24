"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface SwipeDeckItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly badge?: string;
}

interface SwipeDeckProps extends HTMLAttributes<HTMLDivElement> {
  readonly items?: ReadonlyArray<SwipeDeckItem>;
  readonly showArrows?: boolean;
  readonly showIndicators?: boolean;
  readonly parallaxStrength?: number;
}

const defaultItems: SwipeDeckItem[] = [
  {
    id: "welcome",
    badge: "Onboarding",
    title: "Get set up in under 2 minutes",
    description: "Guided steps, quick permissions, and smart defaults to get your team moving.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "featured",
    badge: "Featured",
    title: "This week's top product highlights",
    description: "Explore fresh launches and editor picks picked for speed, utility, and polish.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "recommendations",
    badge: "For You",
    title: "Recommendations shaped by your flow",
    description: "Personalized cards adapt as you browse, save, and interact with content.",
    image:
      "https://images.unsplash.com/photo-1551281044-8b4a2f5f6f2d?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function SwipeDeck({
  items = defaultItems,
  showArrows = true,
  showIndicators = true,
  parallaxStrength = 36,
  className,
  ...props
}: Readonly<SwipeDeckProps>) {
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const hasMultipleCards = items.length > 1;

  const nearestIndex = useCallback((container: HTMLDivElement) => {
    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const [index, card] of cardRefs.current.entries()) {
      if (!card) {
        continue;
      }

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }

    return closestIndex;
  }, []);

  const updateParallax = useCallback(() => {
    const container = deckRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const viewportCenter = containerRect.left + containerRect.width / 2;

    for (const card of cardRefs.current) {
      if (!card) {
        continue;
      }

      const media = card.querySelector<HTMLElement>("[data-parallax-layer]");
      if (!media) {
        continue;
      }

      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const offset = (cardCenter - viewportCenter) / containerRect.width;
      media.style.transform = `translateX(${offset * -parallaxStrength}px) scale(1.08)`;
    }
  }, [parallaxStrength]);

  const scrollToIndex = useCallback((index: number) => {
    const container = deckRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) {
      return;
    }

    const targetLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const container = deckRef.current;
    if (!container) {
      return;
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setActiveIndex(nearestIndex(container));
      updateParallax();
      rafRef.current = null;
    });
  }, [nearestIndex, updateParallax]);

  useEffect(() => {
    updateParallax();

    const container = deckRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onScroll, updateParallax]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
    updateParallax();
  }, [items.length, updateParallax]);

  const cards = useMemo(
    () =>
      items.map((item, index) => (
        <article
          key={item.id}
          ref={(node) => {
            cardRefs.current[index] = node;
          }}
          className="relative w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl border border-black/10 bg-stone-100 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.45)] sm:w-[72%] lg:w-[64%]"
        >
          <div className="relative h-56 overflow-hidden sm:h-64">
            <div
              data-parallax-layer
              className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out will-change-transform"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
            {item.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-950">
                {item.badge}
              </span>
            )}
          </div>

          <div className="space-y-2 p-5 sm:p-6">
            <h3 className="text-balance text-xl font-semibold leading-tight text-stone-900 sm:text-2xl">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
              {item.description}
            </p>
          </div>
        </article>
      )),
    [items],
  );

  return (
    <div className={cn("w-full max-w-4xl space-y-4", className)} {...props}>
      <div className="relative">
        <div
          ref={deckRef}
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9%] pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "touch-pan-x cursor-grab active:cursor-grabbing",
            {
              "select-none": isDragging,
            },
          )}
          style={{ touchAction: "auto" }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") {
              return;
            }

            const container = deckRef.current;
            if (!container) {
              return;
            }

            dragState.current.pointerId = event.pointerId;
            dragState.current.startX = event.clientX;
            dragState.current.startScrollLeft = container.scrollLeft;
            dragState.current.moved = false;

            container.setPointerCapture(event.pointerId);
            setIsDragging(true);
          }}
          onPointerMove={(event) => {
            const container = deckRef.current;
            if (!container) {
              return;
            }

            if (!isDragging || dragState.current.pointerId !== event.pointerId) {
              return;
            }

            const deltaX = event.clientX - dragState.current.startX;
            if (Math.abs(deltaX) > 3) {
              dragState.current.moved = true;
            }

            container.scrollLeft = dragState.current.startScrollLeft - deltaX;
          }}
          onPointerUp={(event) => {
            const container = deckRef.current;
            if (!container || dragState.current.pointerId !== event.pointerId) {
              return;
            }

            container.releasePointerCapture(event.pointerId);
            setIsDragging(false);
            scrollToIndex(nearestIndex(container));
          }}
          onPointerCancel={(event) => {
            const container = deckRef.current;
            if (!container || dragState.current.pointerId !== event.pointerId) {
              return;
            }

            container.releasePointerCapture(event.pointerId);
            setIsDragging(false);
            scrollToIndex(nearestIndex(container));
          }}
        >
          {cards}
        </div>

        {showArrows && hasMultipleCards && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-2 text-stone-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous card"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-2 text-stone-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, items.length - 1))}
              disabled={activeIndex === items.length - 1}
              aria-label="Next card"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showIndicators && hasMultipleCards && (
        <div className="flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to card ${index + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                activeIndex === index ? "w-8 bg-teal-600" : "w-2.5 bg-stone-300 hover:bg-stone-400",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
