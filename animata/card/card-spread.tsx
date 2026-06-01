"use client";

import { useState } from "react";

import Notes, { NotesCard } from "@/animata/widget/notes";
import ShoppingList from "@/animata/widget/shopping-list";
import { cn } from "@/lib/utils";

/** w-48 + gap-3 — horizontal step between spread slots */
const CARD_STEP = "12.75rem";

/** 4× w-48 + 3× gap-3 */
const SPREAD_WIDTH = "calc(4 * 12rem + 3 * 0.75rem)";

const DECK_TRANSFORM = "translateX(0) rotate(0deg)";

function Reminders() {
  return (
    <ShoppingList
      title="Reminders"
      items={[
        { id: "museum", title: "Book museum tickets" },
        { id: "groceries", title: "Buy groceries", checked: true },
        { id: "mom", title: "Call mom" },
      ]}
    />
  );
}

function RemodelNotes() {
  return (
    <NotesCard title="Kitchen Remodel Ideas">
      <div>Install a farmhouse sink for a rustic touch</div>
      <div>Use classic subway tiles</div>
      <div>Add an island for extra counter space</div>
      <div>Opt for open shelving</div>
    </NotesCard>
  );
}

/** Outer layer: hover peek only (ease-out, not ease-cc). */
const hoverPeekClasses = [
  "group-hover/stack:-translate-y-1 group-hover/stack:-rotate-[1deg]",
  "group-hover/stack:-translate-y-2 group-hover/stack:rotate-[2deg]",
  "group-hover/stack:-translate-y-3 group-hover/stack:rotate-[3deg]",
  "group-hover/stack:-translate-y-4 group-hover/stack:rotate-[4deg]",
] as const;

const cards = [
  {
    component: Notes,
    spreadTransform: `translateX(0) rotate(-2deg)`,
  },
  {
    component: ShoppingList,
    spreadTransform: `translateX(${CARD_STEP}) translateY(0.5rem) rotate(3deg)`,
  },
  {
    component: RemodelNotes,
    spreadTransform: `translateX(calc(2 * ${CARD_STEP})) rotate(-2deg) translateX(0.25rem)`,
  },
  {
    component: Reminders,
    spreadTransform: `translateX(calc(3 * ${CARD_STEP})) rotate(2deg)`,
  },
] as const;

const zIndex = ["z-10", "z-20", "z-30", "z-40"] as const;

export default function CardSpread() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="inline-flex min-h-80 items-end justify-center overflow-visible p-8">
      <style>{`
        .card-spread-stage {
          /* Quick throw, soft settle — expand on click only */
          --ease-throw: cubic-bezier(0.22, 1.18, 0.36, 1);
        }

        .card-spread-motion--expand {
          transition: transform 480ms var(--ease-throw);
        }

        .card-spread-motion--collapse {
          transition: transform 520ms cubic-bezier(0.33, 1, 0.68, 1);
        }

        .card-spread-stage--expand {
          transition: width 480ms var(--ease-throw);
        }

        .card-spread-stage--collapse {
          transition: width 520ms cubic-bezier(0.33, 1, 0.68, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .card-spread-motion--expand,
          .card-spread-motion--collapse,
          .card-spread-stage--expand,
          .card-spread-stage--collapse {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse card spread" : "Expand card spread"}
        onClick={() => setExpanded((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setExpanded((open) => !open);
          }
        }}
        className={cn(
          "card-spread-stage group/stack relative h-64 outline-none focus-visible:ring-2 focus-visible:ring-[#ffcc00] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isExpanded
            ? "card-spread-stage--expand cursor-default"
            : "card-spread-stage--collapse w-48 cursor-pointer",
        )}
        style={isExpanded ? { width: SPREAD_WIDTH } : undefined}
      >
        {cards.map((item, index) => {
          const Card = item.component;
          return (
            <div
              key={index}
              className={cn(
                "absolute bottom-0 left-0 origin-bottom",
                zIndex[index],
                !isExpanded && [
                  "transition-transform duration-300 ease-out motion-reduce:transition-none",
                  hoverPeekClasses[index],
                ],
              )}
            >
              <div
                className={cn(
                  "origin-bottom motion-reduce:transition-none motion-reduce:transform-none",
                  isExpanded ? "card-spread-motion--expand" : "card-spread-motion--collapse",
                )}
                style={{
                  transform: isExpanded ? item.spreadTransform : DECK_TRANSFORM,
                }}
              >
                <Card />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
