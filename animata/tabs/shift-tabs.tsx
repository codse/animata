"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const SHELL_TRANSITION = {
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as const,
};

const HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
};

const defaultItems = ["Issues", "Pull Requests", "Actions", "Projects"];

type ShiftTabProps = {
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

function ShiftTab({ label, isActive, onSelect }: ShiftTabProps) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.14, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-lg bg-foreground p-px outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "shadow-sm",
      )}
    >
      <motion.span
        className={cn(
          "flex h-10 items-center justify-center rounded-[calc(var(--radius)-2px)] border-2 bg-background px-4",
          "motion-reduce:transition-none",
          isActive ? "border-accent text-accent" : "border-border text-foreground",
        )}
        whileHover={isActive ? undefined : { rotate: 4 }}
        transition={isActive ? SHELL_TRANSITION : HOVER_SPRING}
      >
        <span className="select-none px-1 text-center font-mono text-sm font-medium">{label}</span>
      </motion.span>
    </motion.button>
  );
}

export type ShiftTabsProps = {
  items?: string[];
  defaultIndex?: number;
  className?: string;
};

export default function ShiftTabs({
  items = defaultItems,
  defaultIndex = 0,
  className,
}: ShiftTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div
      role="tablist"
      aria-label="Shift tabs"
      className={cn("flex flex-wrap items-center justify-center gap-3 sm:gap-4", className)}
    >
      {items.map((item, index) => (
        <ShiftTab
          key={item}
          label={item}
          isActive={activeIndex === index}
          onSelect={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
