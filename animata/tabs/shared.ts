import { type FocusEvent, type KeyboardEvent, useCallback, useState } from "react";

import { cn } from "@/lib/utils";

/** Visible focus ring — use with a matching border-radius class. */
export function tabFocusClass(radiusClass: string) {
  return cn(
    radiusClass,
    "outline-none focus-visible:z-10",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

export function useTabSelection({
  defaultActiveIndex = 0,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
}: {
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex);
  const [keyboardFocusIndex, setKeyboardFocusIndex] = useState<number | null>(null);
  const activeIndex = activeIndexProp ?? uncontrolledIndex;
  const focusedIndex = keyboardFocusIndex ?? (activeIndex >= 0 ? activeIndex : 0);

  const setActiveIndex = useCallback(
    (index: number) => {
      onActiveIndexChange?.(index);
      if (activeIndexProp === undefined) {
        setUncontrolledIndex(index);
      }
      setKeyboardFocusIndex(null);
    },
    [activeIndexProp, onActiveIndexChange],
  );

  const setFocusedIndex = useCallback((index: number) => {
    setKeyboardFocusIndex(index);
  }, []);

  return { activeIndex, setActiveIndex, focusedIndex, setFocusedIndex };
}

export function focusTabInList(tablist: HTMLElement, index: number) {
  queueMicrotask(() => {
    tablist.querySelectorAll<HTMLElement>('[role="tab"]')[index]?.focus();
  });
}

export function handleTabListFocusCapture(
  event: FocusEvent<HTMLElement>,
  activeIndex: number,
  setFocusedIndex: (index: number) => void,
) {
  const related = event.relatedTarget as Node | null;
  if (related && event.currentTarget.contains(related)) {
    return;
  }
  const index = activeIndex >= 0 ? activeIndex : 0;
  setFocusedIndex(index);
  focusTabInList(event.currentTarget, index);
}

/** Manual activation: arrows move focus; Enter / Space select the focused tab. */
export function handleTabListKeyDown(
  event: KeyboardEvent<HTMLElement>,
  count: number,
  setActiveIndex: (index: number) => void,
  setFocusedIndex: (index: number) => void,
) {
  if (count < 1) {
    return;
  }

  const tablist = event.currentTarget;
  const tabs = tablist.querySelectorAll<HTMLElement>('[role="tab"]');
  const target = event.target as HTMLElement;
  const currentTab = target.closest<HTMLElement>('[role="tab"]');

  if (!currentTab || !tablist.contains(currentTab)) {
    return;
  }

  const currentIndex = Array.from(tabs).indexOf(currentTab);
  if (currentIndex === -1) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setActiveIndex(currentIndex);
    setFocusedIndex(currentIndex);
    return;
  }

  if (count < 2) {
    return;
  }

  let next: number | null = null;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      next = (currentIndex + 1) % count;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      next = (currentIndex - 1 + count) % count;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = count - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  setFocusedIndex(next);
  focusTabInList(tablist, next);
}
