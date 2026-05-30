"use client";

import { motion } from "motion/react";
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  use,
  useId,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type GooeyTabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  filterId: string;
  intensity: number;
  contrast: number;
  lightness: number;
};

const GooeyTabsContext = createContext<GooeyTabsContextValue | null>(null);

type GooeyTabSlotContextValue = {
  index: number;
  count: number;
};

const GooeyTabSlotContext = createContext<GooeyTabSlotContextValue | null>(null);

function useGooeyTabs() {
  const context = use(GooeyTabsContext);
  if (!context) {
    throw new Error("GooeyTabs primitives must be used within <GooeyTabs>.");
  }
  return context;
}

function useGooeyTabSlot() {
  const context = use(GooeyTabSlotContext);
  if (!context) {
    throw new Error("GooeyTabs.Tab must be a direct child of <GooeyTabs.List>.");
  }
  return context;
}

function GooeyFilter({
  filterId,
  intensity,
  contrast,
  lightness,
  className,
  children,
}: {
  filterId: string;
  intensity: number;
  contrast: number;
  lightness: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
      className={cn("flex flex-wrap rounded-sm", className)}
    >
      <svg aria-hidden className="absolute size-0" xmlns="http://www.w3.org/2000/svg">
        <title>Gooey filter</title>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={intensity} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${lightness}`}
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {children}
    </motion.div>
  );
}

type GooeyTabsRootProps = {
  children: ReactNode;
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  intensity?: number;
  contrast?: number;
  lightness?: number;
  className?: string;
};

function GooeyTabsRoot({
  children,
  defaultActiveIndex = 0,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  intensity = 6,
  contrast = 18,
  lightness = -7,
  className,
}: GooeyTabsRootProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex);
  const activeIndex = activeIndexProp ?? uncontrolledIndex;
  const setActiveIndex = (index: number) => {
    onActiveIndexChange?.(index);
    if (activeIndexProp === undefined) {
      setUncontrolledIndex(index);
    }
  };
  const filterId = `gooey-tabs-${useId().replace(/:/g, "")}`;

  return (
    <GooeyTabsContext.Provider
      value={{ activeIndex, setActiveIndex, filterId, intensity, contrast, lightness }}
    >
      <div className={className}>{children}</div>
    </GooeyTabsContext.Provider>
  );
}

type GooeyTabsListProps = ComponentProps<"div">;

function GooeyTabsList({ className, children }: GooeyTabsListProps) {
  const { activeIndex, filterId, intensity, contrast, lightness } = useGooeyTabs();
  const tabs = Children.toArray(children).filter(isValidElement);
  const count = tabs.length;

  return (
    <GooeyFilter
      filterId={filterId}
      intensity={intensity}
      contrast={contrast}
      lightness={lightness}
      className={cn({ "px-0": activeIndex !== -1 }, className)}
    >
      {tabs.map((tab, index) => (
        <GooeyTabSlotContext.Provider key={tab.key ?? index} value={{ index, count }}>
          {tab}
        </GooeyTabSlotContext.Provider>
      ))}
    </GooeyFilter>
  );
}

type GooeyTabsTabProps = ComponentProps<"div"> & {
  /** Tailwind classes for this tab’s fill (e.g. `bg-blue-400 hover:bg-blue-500`). */
  color: string;
  /** Accessible name when the label is not plain text. */
  label?: string;
};

/**
 * Tab shell uses CSS grid `auto 0fr` → `auto 1fr` so the label column sizes
 * intrinsically — no getBoundingClientRect. Place `GooeyTabs.Icon` then `GooeyTabs.Label` as children.
 */
function GooeyTabsTab({ color, label, className, children, ...props }: GooeyTabsTabProps) {
  const { activeIndex, setActiveIndex } = useGooeyTabs();
  const { index, count } = useGooeyTabSlot();
  const isActive = activeIndex === index;

  const ariaLabel =
    label ??
    (typeof children === "string"
      ? children
      : `Tab ${index + 1}${isActive ? ", expanded" : ", collapsed"}`);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={ariaLabel}
      onClick={() => setActiveIndex(isActive ? -1 : index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveIndex(isActive ? -1 : index);
        }
      }}
      className={cn(
        "relative grid h-10 cursor-pointer items-center overflow-hidden text-white",
        "transition-[grid-template-columns,gap,padding,margin,border-radius] duration-200 ease-in-out motion-reduce:transition-none",
        isActive ? "grid-cols-[auto_1fr] gap-2 px-4" : "grid-cols-[auto_0fr] gap-0 px-2",
        color,
        {
          rounded: isActive,
          "mx-4": isActive && activeIndex !== 0 && activeIndex !== count - 1,
          "mr-4": isActive && activeIndex === 0,
          "ml-4": isActive && activeIndex === count - 1,
        },
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function GooeyTabsIcon({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("inline-flex shrink-0 [&_svg]:size-6", className)} {...props} />;
}

function GooeyTabsLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("min-w-0 overflow-hidden select-none whitespace-nowrap text-sm", className)}
      {...props}
    />
  );
}

const GooeyTabs = Object.assign(GooeyTabsRoot, {
  List: GooeyTabsList,
  Tab: GooeyTabsTab,
  Icon: GooeyTabsIcon,
  Label: GooeyTabsLabel,
});

export default GooeyTabs;
export { GooeyTabsIcon, GooeyTabsLabel, GooeyTabsList, GooeyTabsRoot, GooeyTabsTab, useGooeyTabs };
