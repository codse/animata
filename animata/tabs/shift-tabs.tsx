"use client";

import {
  Children,
  type ComponentProps,
  createContext,
  type FocusEvent,
  isValidElement,
  type KeyboardEvent,
  type ReactNode,
  use,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import {
  handleTabListFocusCapture,
  handleTabListKeyDown,
  tabFocusClass,
  useTabSelection,
} from "./shared";

type ShiftTabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
};

const ShiftTabsContext = createContext<ShiftTabsContextValue | null>(null);

type ShiftTabSlotContextValue = {
  index: number;
};

const ShiftTabSlotContext = createContext<ShiftTabSlotContextValue | null>(null);

function useShiftTabs() {
  const context = use(ShiftTabsContext);
  if (!context) {
    throw new Error("ShiftTabs primitives must be used within <ShiftTabs>.");
  }
  return context;
}

function ShiftTabSlot({ index, children }: { index: number; children: ReactNode }) {
  const value = useMemo(() => ({ index }), [index]);
  return <ShiftTabSlotContext.Provider value={value}>{children}</ShiftTabSlotContext.Provider>;
}

function useShiftTabSlot() {
  const context = use(ShiftTabSlotContext);
  if (!context) {
    throw new Error("ShiftTabs.Tab must be a direct child of <ShiftTabs.List>.");
  }
  return context;
}

type ShiftTabsRootProps = {
  children: ReactNode;
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
};

function ShiftTabsRoot({
  children,
  defaultActiveIndex = 0,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  className,
}: ShiftTabsRootProps) {
  const { activeIndex, setActiveIndex, focusedIndex, setFocusedIndex } = useTabSelection({
    defaultActiveIndex,
    activeIndex: activeIndexProp,
    onActiveIndexChange,
  });

  const rootContext = useMemo(
    () => ({ activeIndex, setActiveIndex, focusedIndex, setFocusedIndex }),
    [activeIndex, setActiveIndex, focusedIndex, setFocusedIndex],
  );

  return (
    <ShiftTabsContext.Provider value={rootContext}>
      <div className={className}>{children}</div>
    </ShiftTabsContext.Provider>
  );
}

type ShiftTabsListProps = ComponentProps<"nav"> & {
  "aria-label"?: string;
};

function ShiftTabsList({
  className,
  children,
  "aria-label": ariaLabel = "Tabs",
  onKeyDown,
  onFocusCapture,
  ...props
}: ShiftTabsListProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex } = useShiftTabs();
  const tabs = Children.toArray(children).filter(isValidElement);
  const count = tabs.length;

  return (
    <nav aria-label={ariaLabel} className={cn("overflow-visible", className)} {...props}>
      <div
        role="tablist"
        tabIndex={0}
        onFocusCapture={(event: FocusEvent<HTMLElement>) => {
          onFocusCapture?.(event);
          handleTabListFocusCapture(event, activeIndex, setFocusedIndex);
        }}
        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented) {
            handleTabListKeyDown(event, count, setActiveIndex, setFocusedIndex);
          }
        }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {tabs.map((tab, index) => (
          <ShiftTabSlot key={tab.key ?? index} index={index}>
            {tab}
          </ShiftTabSlot>
        ))}
      </div>
    </nav>
  );
}

function ShiftTabsLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("select-none px-1 text-center font-mono text-sm font-medium", className)}
      {...props}
    />
  );
}

type ShiftTabsTabProps = ComponentProps<"button"> & {
  label?: string;
};

function ShiftTabsTab({
  className,
  children,
  label,
  onClick,
  onFocus,
  ...props
}: ShiftTabsTabProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex } = useShiftTabs();
  const { index } = useShiftTabSlot();
  const isSelected = activeIndex === index;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      {...(label ? { "aria-label": label } : {})}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setActiveIndex(index);
        }
      }}
      onFocus={(event: FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
        if (!event.defaultPrevented) {
          setFocusedIndex(index);
        }
      }}
      className={cn(
        tabFocusClass("rounded-lg"),
        "transition-colors duration-200",
        "active:scale-[0.97] motion-reduce:active:scale-100",
        isSelected
          ? "bg-foreground border-b-2 border-b-accent"
          : "bg-transparent hover:bg-foreground",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex h-10 items-center justify-center rounded-md border-2 bg-background px-4",
          "transition-transform duration-200 ease-out motion-reduce:transition-none motion-reduce:hover:rotate-0",
          isSelected
            ? "rotate-0 border-accent text-accent"
            : "origin-top-right border-border text-foreground hover:rotate-6",
        )}
      >
        {children}
      </span>
    </button>
  );
}

const ShiftTabs = Object.assign(ShiftTabsRoot, {
  List: ShiftTabsList,
  Tab: ShiftTabsTab,
  Label: ShiftTabsLabel,
});

export default ShiftTabs;
export { ShiftTabsLabel, ShiftTabsList, ShiftTabsRoot, ShiftTabsTab, useShiftTabs };
