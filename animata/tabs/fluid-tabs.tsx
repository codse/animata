"use client";

import { Inbox, Landmark, PieChart } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

const INDICATOR_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 34,
  mass: 0.75,
};

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [0.32, 0.72, 0, 1] as const,
};

export type FluidTabItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

const defaultTabs: FluidTabItem[] = [
  { id: "accounts", label: "Accounts", icon: <Landmark size={18} aria-hidden /> },
  { id: "deposits", label: "Deposits", icon: <Inbox size={18} aria-hidden /> },
  { id: "funds", label: "Funds", icon: <PieChart size={18} aria-hidden /> },
];

type FluidTabButtonProps = {
  tab: FluidTabItem;
  isActive: boolean;
  onSelect: () => void;
};

function FluidTabButton({ tab, isActive, onSelect }: FluidTabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      className={cn(
        "relative z-10 flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
        "motion-reduce:transition-none",
      )}
    >
      {isActive ? (
        <motion.div
          layoutId="fluid-tab-indicator"
          className="absolute inset-0 rounded-full bg-background shadow-sm"
          transition={INDICATOR_SPRING}
        />
      ) : null}
      <motion.span
        className={cn(
          "relative z-10 flex items-center gap-1.5",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
        animate={{ scale: isActive ? 1 : 0.98 }}
        transition={LABEL_TRANSITION}
      >
        {tab.icon}
        {tab.label}
      </motion.span>
    </button>
  );
}

export type FluidTabsProps = {
  tabs?: FluidTabItem[];
  defaultTabId?: string;
  className?: string;
};

export default function FluidTabs({
  tabs = defaultTabs,
  defaultTabId = "funds",
  className,
}: FluidTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  return (
    <div className={cn("flex w-full max-w-md items-center justify-center", className)}>
      <div
        role="tablist"
        aria-label="Fluid tabs"
        className="relative flex w-full gap-1 overflow-hidden rounded-full bg-muted p-1 shadow-sm"
      >
        {tabs.map((tab) => (
          <FluidTabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onSelect={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}
