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
  {
    component: Notes,
    rotationClass: "",
    revealClass: "-rotate-[2deg]",
  },
  {
    component: ShoppingList,
    rotationClass: "group-hover:rotate-[15deg]",
    revealClass: "rotate-[3deg] translate-y-2",
  },

  {
    component: RemodelNotes,
    rotationClass: "group-hover:rotate-[30deg]",
    revealClass: "-rotate-[2deg] translate-x-1",
  },

  {
    component: Reminders,
    rotationClass: "group-hover:rotate-[45deg]",
    revealClass: "rotate-[2deg]",
  },
];

export default function CardSpread() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex min-h-80 min-w-52 items-center transition-all duration-500 ease-in-out",
        {
          "origin-bottom transition-all duration-500 ease-in-out hover:-rotate-[15deg]":
            !isExpanded,
          "gap-3": isExpanded,
        },
      )}
    >
      {cards.map((item, index) => {
        return (
          <div
            key={index}
            onClick={(e) => {
              setExpanded(!isExpanded);
              e.preventDefault();
            }}
            className={cn(
              "transition-all duration-500 ease-in-out",
              {
                absolute: !isExpanded,
                "origin-bottom": !isExpanded,
              },
              !isExpanded && item.rotationClass,
              isExpanded && item.revealClass,
            )}
          >
            <item.component />
          </div>
        );
      })}
    </div>
  );
}
