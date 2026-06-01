"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type ReminderWidgetItem = {
  id: string;
  label: string;
  done?: boolean;
};

export type ReminderWidgetProps = {
  className?: string;
  title?: string;
  items?: ReminderWidgetItem[];
};

const DEFAULT_ITEMS: ReminderWidgetItem[] = [
  { id: "passport", label: "Passport" },
  { id: "citizenship", label: "Citizenship" },
  { id: "birth-cert", label: "Birth certificate" },
  { id: "license", label: "License" },
  { id: "keys", label: "Keys" },
  { id: "phone", label: "Phone" },
  { id: "laptop", label: "Laptop" },
  { id: "wallet", label: "Wallet" },
];

export default function ReminderWidget({
  className,
  title = "Packing",
  items = DEFAULT_ITEMS,
}: ReminderWidgetProps) {
  const [rows, setRows] = useState(items);

  const remaining = rows.filter((item) => !item.done).length;

  const toggle = (id: string) => {
    setRows((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  return (
    <div
      className={cn(
        "flex h-80 w-52 overflow-hidden relative flex-col rounded-3xl border border-border bg-card font-sans shadow-md",
        className,
      )}
    >
      <div className="flex p-4 pb-2 shrink-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Bell className="size-[15px] shrink-0 text-sky-500" strokeWidth={2} aria-hidden />
          <p className="truncate text-[15px] font-semibold leading-snug text-foreground">{title}</p>
        </div>
        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-muted px-1.5 text-[13px] font-medium tabular-nums leading-none text-muted-foreground">
          {remaining}
        </span>
      </div>

      <ul className="px-4 pb-4 flex min-h-0 flex-1 flex-col overflow-y-auto">
        {rows.map((item) => (
          <li key={item.id} className="border-b border-border last:border-b-0">
            <button
              type="button"
              role="checkbox"
              aria-checked={item.done ?? false}
              onClick={() => toggle(item.id)}
              className="touch-manipulation flex min-h-11 w-full items-center gap-3 py-2 text-left"
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  item.done
                    ? "border-sky-500 bg-sky-500"
                    : "border-muted-foreground/40 bg-transparent",
                )}
                aria-hidden
              >
                {item.done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M8.2 2.5L4.1 7.5 1.8 5.2"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 text-[15px] leading-snug capitalize",
                  item.done ? "text-muted-foreground line-through" : "font-medium text-foreground",
                )}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
