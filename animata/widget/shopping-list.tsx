"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type ShoppingListItem = {
  id: string;
  title: string;
  checked?: boolean;
};

export type ShoppingListProps = {
  className?: string;
  title?: string;
  items?: ShoppingListItem[];
};

const DEFAULT_ITEMS: ShoppingListItem[] = [
  { id: "milk", title: "Milk" },
  { id: "eggs", title: "Eggs", checked: true },
  { id: "pepper", title: "Ground pepper", checked: true },
  { id: "spaghetti", title: "Spaghetti" },
  { id: "butter", title: "Butter" },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ShoppingList({
  className,
  title = "Shopping list",
  items = DEFAULT_ITEMS,
}: ShoppingListProps) {
  const [rows, setRows] = useState(items);

  const toggle = (id: string) => {
    setRows((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  return (
    <div
      className={cn(
        "flex h-64 w-48 flex-col relative overflow-hidden rounded-3xl border border-border bg-background font-sans shadow-md",
        className,
      )}
    >
      <p className="shrink-0 p-4 pb-2 text-[15px] font-semibold leading-snug text-foreground">
        {title}
      </p>

      <ul className="px-4 pb-4 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
        {rows.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={item.checked ?? false}
              onClick={() => toggle(item.id)}
              className="touch-manipulation flex min-h-11 w-full items-center gap-2.5 rounded-md py-0.5 text-left"
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                  item.checked
                    ? "border-foreground bg-foreground text-background"
                    : "border-muted-foreground/35 bg-transparent text-transparent",
                )}
                aria-hidden
              >
                <CheckIcon />
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 text-[15px] leading-snug",
                  item.checked ? "text-muted-foreground line-through" : "text-foreground",
                )}
              >
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
