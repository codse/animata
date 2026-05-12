import { useState } from "react";

import Notes, { NotesCard } from "@/animata/widget/notes";
import ShoppingList from "@/animata/widget/shopping-list";
import { cn } from "@/lib/utils";

function Reminders() {
  return (
    <ShoppingList
      title="Reminders"
      data={[
        { title: "book museum tickets" },
        { title: "buy groceries", checked: true },
        { title: "call mom" },
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

const cards = [
  { component: Notes },
  { component: ShoppingList },
  { component: RemodelNotes },
];

export default function CardSpread() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      role="group"
      aria-expanded={isExpanded}
      className={cn(
        "group/spread relative flex flex-row items-end justify-center gap-8 py-6 min-h-80",
        {
          "origin-bottom hover:-rotate-[5deg]": !isExpanded,
        },
      )}
    >
      {cards.map((item, index) => {
        const mid = (cards.length - 1) / 2;
        const offset = (index - mid) * 120; // px to spread when expanded
        const rotate = (index - mid) * 5; // small rotation per card
        const delay = Math.abs(index - mid) * 140; // stronger stagger delay in ms
        return (
          <div
            key={index}
            onClick={(e) => {
              setExpanded(!isExpanded);
              e.preventDefault();
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setExpanded(!isExpanded);
                e.preventDefault();
              }
            }}
            className={cn("relative min-w-52 cursor-pointer", {
              "origin-bottom": !isExpanded,
            })}
            style={{
              transform: isExpanded
                ? `translateX(${offset}px) translateY(-22px) rotate(${rotate}deg)`
                : `rotate(${rotate / 2}deg)`,
              boxShadow: isExpanded
                ? "0 22px 56px rgba(2,6,23,0.16)"
                : "0 8px 22px rgba(2,6,23,0.07)",
              transition: `transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 520ms ease ${delay}ms`,
            }}
          >
            <item.component />
          </div>
        );
      })}
    </div>
  );
}
