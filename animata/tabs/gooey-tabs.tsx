"use client";

import { motion } from "motion/react";
import {
  Children,
  type ComponentProps,
  createContext,
  type FocusEvent,
  isValidElement,
  type KeyboardEvent,
  type ReactNode,
  use,
  useId,
} from "react";
import { cn } from "@/lib/utils";
import {
  handleTabListFocusCapture,
  handleTabListKeyDown,
  tabFocusClass,
  useTabSelection,
} from "./shared";

type GooeyTabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
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

function textFromNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textFromNode).join("");
  }
  if (isValidElement(node)) {
    return textFromNode((node.props as { children?: ReactNode }).children);
  }
  return "";
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
    <div
      style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
      className={cn("relative flex flex-wrap rounded-sm", className)}
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
    </div>
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
  const { activeIndex, setActiveIndex, focusedIndex, setFocusedIndex } = useTabSelection({
    defaultActiveIndex,
    activeIndex: activeIndexProp,
    onActiveIndexChange,
  });
  const filterId = `gooey-tabs-${useId().replace(/:/g, "")}`;

  return (
    <GooeyTabsContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        focusedIndex,
        setFocusedIndex,
        filterId,
        intensity,
        contrast,
        lightness,
      }}
    >
      <div className={className}>{children}</div>
    </GooeyTabsContext.Provider>
  );
}

type GooeyTabsListProps = ComponentProps<"nav"> & {
  "aria-label"?: string;
};

function GooeyTabsList({
  className,
  children,
  "aria-label": ariaLabel = "Tabs",
  onKeyDown,
  onFocusCapture,
  ...props
}: GooeyTabsListProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex, filterId, intensity, contrast, lightness } =
    useGooeyTabs();
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
      <nav aria-label={ariaLabel} className="overflow-visible" {...props}>
        <div
          role="tablist"
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
          className="flex flex-wrap"
        >
          {tabs.map((tab, index) => (
            <GooeyTabSlotContext.Provider key={tab.key ?? index} value={{ index, count }}>
              {tab}
            </GooeyTabSlotContext.Provider>
          ))}
        </div>
      </nav>
    </GooeyFilter>
  );
}

function GooeyTabsIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 empty:hidden [&_svg]:size-6", className)}
      {...props}
    />
  );
}

function GooeyTabsLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("min-w-0 overflow-hidden select-none whitespace-nowrap text-sm", className)}
      {...props}
    />
  );
}

type GooeyTabsTabProps = ComponentProps<"button"> & {
  color: string;
  label?: string;
};

function getGooeyTabParts(
  children: ReactNode,
  Icon: typeof GooeyTabsIcon,
  Label: typeof GooeyTabsLabel,
) {
  let hasIcon = false;
  let visibleLabel = "";

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === Icon) {
      hasIcon = true;
    }
    if (child.type === Label) {
      visibleLabel += textFromNode((child.props as { children?: ReactNode }).children);
    }
  });

  return { hasIcon, visibleLabel: visibleLabel.trim() };
}

function gooeyTabGridClass(isSelected: boolean, hasIcon: boolean, hasLabel: boolean) {
  if (hasIcon && hasLabel) {
    return isSelected ? "grid-cols-[auto_1fr] gap-2 px-4" : "grid-cols-[auto_0fr] gap-0 px-2";
  }
  if (hasIcon) {
    return isSelected ? "grid-cols-[auto] px-4" : "grid-cols-[auto] px-2";
  }
  if (hasLabel) {
    return isSelected ? "grid-cols-[1fr] gap-0 px-4" : "grid-cols-[0fr] gap-0 px-2";
  }
  return isSelected ? "px-4" : "px-2";
}

function GooeyTabsTab({
  color,
  label,
  className,
  children,
  onClick,
  onFocus,
  ...props
}: GooeyTabsTabProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex } = useGooeyTabs();
  const { index, count } = useGooeyTabSlot();
  const isSelected = activeIndex === index;

  const { hasIcon, visibleLabel } = getGooeyTabParts(children, GooeyTabsIcon, GooeyTabsLabel);
  const hasVisibleLabel = Boolean(visibleLabel);
  const ariaLabel = label ?? (hasVisibleLabel ? undefined : `Tab ${index + 1}`);

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isSelected}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
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
        tabFocusClass(isSelected ? "rounded" : "rounded-sm"),
        "relative grid h-10 cursor-pointer items-center overflow-visible text-white",
        "transition-[grid-template-columns,gap,padding,margin,border-radius] duration-200 ease-in-out motion-reduce:transition-none",
        gooeyTabGridClass(isSelected, hasIcon, hasVisibleLabel),
        color,
        {
          "mx-4": isSelected && activeIndex !== 0 && activeIndex !== count - 1,
          "mr-4": isSelected && activeIndex === 0,
          "ml-4": isSelected && activeIndex === count - 1,
        },
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
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
