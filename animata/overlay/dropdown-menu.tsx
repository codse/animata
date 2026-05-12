"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type DropdownMenuItem = {
  label: string;
  description?: string;
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
};

type DropdownMenuProps = {
  items?: DropdownMenuItem[];
  label?: string;
  ariaLabel?: string;
  triggerMode?: "click" | "hover";
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
};

const defaultItems: DropdownMenuItem[] = [
  {
    label: "Profile",
    description: "View your account details",
    onSelect: () => {},
  },
  {
    label: "Settings",
    description: "Adjust preferences and permissions",
    onSelect: () => {},
  },
  {
    label: "Documentation",
    description: "Open the docs in a new tab",
    href: "https://nextjs.org/docs",
  },
  { label: "Danger zone", description: "Disabled action example", disabled: true },
];

const getNextEnabledIndex = (items: DropdownMenuItem[], startIndex: number, direction: 1 | -1) => {
  if (!items.length) {
    return -1;
  }

  let index = startIndex;

  for (const _ of items) {
    index = (index + direction + items.length) % items.length;

    if (!items[index]?.disabled) {
      return index;
    }
  }

  return -1;
};

export default function DropdownMenu({
  items,
  label = "Menu",
  ariaLabel = "Dropdown menu",
  triggerMode = "click",
  placement = "bottom-start",
  defaultOpen = false,
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
}: Readonly<DropdownMenuProps>) {
  const menuItems = items ?? defaultItems;
  const [open, setOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const triggerId = `${menuId}-trigger`;
  const menuAboveTrigger = placement.startsWith("top");
  const menuSpacingClass = menuAboveTrigger ? "mb-2" : "mt-2";

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const openMenu = useCallback(
    (nextIndex?: number) => {
      setOpen(true);
      setActiveIndex((currentIndex) => {
        if (typeof nextIndex === "number") {
          return nextIndex;
        }

        if (
          currentIndex >= 0 &&
          currentIndex < menuItems.length &&
          !menuItems[currentIndex]?.disabled
        ) {
          return currentIndex;
        }

        return getNextEnabledIndex(menuItems, -1, 1);
      });
    },
    [menuItems],
  );

  const selectItem = useCallback(
    (item: DropdownMenuItem) => {
      if (item.disabled) {
        return;
      }

      item.onSelect?.();
      closeMenu();
      triggerRef.current?.focus();
    },
    [closeMenu],
  );

  const handleTriggerClick = useCallback(() => {
    if (triggerMode === "hover") {
      return;
    }

    if (open) {
      closeMenu();
      return;
    }

    openMenu();
  }, [closeMenu, open, openMenu, triggerMode]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenu(getNextEnabledIndex(menuItems, -1, 1));
        requestAnimationFrame(() => {
          menuRef.current?.focus();
        });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        openMenu(getNextEnabledIndex(menuItems, menuItems.length, -1));
        requestAnimationFrame(() => {
          menuRef.current?.focus();
        });
      }
    },
    [closeMenu, menuItems, openMenu],
  );

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((currentIndex) => getNextEnabledIndex(menuItems, currentIndex, 1));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((currentIndex) => getNextEnabledIndex(menuItems, currentIndex, -1));
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(getNextEnabledIndex(menuItems, -1, 1));
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(getNextEnabledIndex(menuItems, menuItems.length, -1));
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        if (activeIndex < 0) {
          return;
        }

        const item = menuItems[activeIndex];

        if (item) {
          selectItem(item);
        }
      }

      if (event.key === "Tab") {
        closeMenu();
      }
    },
    [activeIndex, closeMenu, menuItems, selectItem],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    if (activeIndex === -1) {
      setActiveIndex(getNextEnabledIndex(menuItems, -1, 1));
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [activeIndex, closeMenu, menuItems, open]);


  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      menuRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (activeIndex >= menuItems.length) {
      setActiveIndex(getNextEnabledIndex(menuItems, -1, 1));
    }
  }, [activeIndex, menuItems]);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-flex flex-col items-start gap-1", className)}
      onPointerEnter={() => {
        if (triggerMode === "hover") {
          openMenu();
        }
      }}
      onPointerLeave={() => {
        if (triggerMode === "hover") {
          closeMenu();
        }
      }}
    >
      {menuAboveTrigger ? (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.7 }}
                className={cn(
                  "relative z-10 w-fit min-w-44 max-w-64 overflow-hidden rounded-2xl border border-border bg-popover p-0.5 text-popover-foreground shadow-xl backdrop-blur-sm",
                  "max-h-72 overflow-y-auto",
                  menuSpacingClass,
                  menuClassName,
                )}
              >
                <div
                  ref={menuRef}
                  id={menuId}
                  role="menu"
                  aria-labelledby={triggerId}
                  aria-activedescendant={activeIndex >= 0 ? `${menuId}-item-${activeIndex}` : undefined}
                  aria-orientation="vertical"
                  tabIndex={-1}
                  onKeyDown={handleMenuKeyDown}
                  className="outline-hidden"
                >
                  {menuItems.map((item, index) => {
                    const isActive = index === activeIndex;
                    const itemId = `${menuId}-item-${index}`;
                    let activeStateClass = "text-foreground/80 hover:bg-muted hover:text-foreground";

                    if (item.disabled) {
                      activeStateClass = "cursor-not-allowed opacity-50";
                    } else if (isActive) {
                      activeStateClass = "bg-primary/10 text-primary";
                    }
                    const sharedClassName = cn(
                      "relative flex w-full items-start gap-1.5 rounded-xl px-2 py-1.5 text-left text-sm outline-hidden transition-colors duration-150",
                      activeStateClass,
                      itemClassName,
                    );

                    const content = (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId={`${menuId}-active-indicator`}
                            className="absolute inset-y-2 left-2 w-1 rounded-full bg-primary"
                          />
                        )}
                        <span className={cn("flex min-w-0 flex-1 flex-col", isActive && "pl-2") }>
                          <span
                            className={cn(
                              "font-medium transition-colors duration-150",
                              isActive && "underline decoration-primary/60 underline-offset-4",
                            )}
                          >
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                      </>
                    );

                    if (item.disabled) {
                      return (
                        <div
                          key={itemId}
                          id={itemId}
                          role="menuitem"
                          aria-disabled="true"
                          tabIndex={-1}
                          data-active={isActive}
                          className={sharedClassName}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          {content}
                        </div>
                      );
                    }

                    if (item.href) {
                      return (
                        <Link
                          key={itemId}
                          id={itemId}
                          href={item.href}
                          role="menuitem"
                          tabIndex={-1}
                          data-active={isActive}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          onClick={() => selectItem(item)}
                          className={sharedClassName}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={itemId}
                        id={itemId}
                        type="button"
                        role="menuitem"
                        tabIndex={-1}
                        data-active={isActive}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => selectItem(item)}
                        className={sharedClassName}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={ariaLabel}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              triggerClassName,
            )}
          >
            {label}
            <ChevronDown
              className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
            />
          </button>
        </>
      ) : (
        <>
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={ariaLabel}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              triggerClassName,
            )}
          >
            {label}
            <ChevronDown
              className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
            />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.7 }}
                className={cn(
                  "relative z-10 w-fit min-w-44 max-w-64 overflow-hidden rounded-2xl border border-border bg-popover p-0.5 text-popover-foreground shadow-xl backdrop-blur-sm",
                  "max-h-72 overflow-y-auto",
                  menuSpacingClass,
                  menuClassName,
                )}
              >
                <div
                  ref={menuRef}
                  id={menuId}
                  role="menu"
                  aria-labelledby={triggerId}
                  aria-activedescendant={activeIndex >= 0 ? `${menuId}-item-${activeIndex}` : undefined}
                  aria-orientation="vertical"
                  tabIndex={-1}
                  onKeyDown={handleMenuKeyDown}
                  className="outline-hidden"
                >
                  {menuItems.map((item, index) => {
                    const isActive = index === activeIndex;
                    const itemId = `${menuId}-item-${index}`;
                    let activeStateClass = "text-foreground/80 hover:bg-muted hover:text-foreground";

                    if (item.disabled) {
                      activeStateClass = "cursor-not-allowed opacity-50";
                    } else if (isActive) {
                      activeStateClass = "bg-primary/10 text-primary";
                    }
                    const sharedClassName = cn(
                      "relative flex w-full items-start gap-1.5 rounded-xl px-2 py-1.5 text-left text-sm outline-hidden transition-colors duration-150",
                      activeStateClass,
                      itemClassName,
                    );

                    const content = (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId={`${menuId}-active-indicator`}
                            className="absolute inset-y-2 left-2 w-1 rounded-full bg-primary"
                          />
                        )}
                        <span className={cn("flex min-w-0 flex-1 flex-col", isActive && "pl-2") }>
                          <span
                            className={cn(
                              "font-medium transition-colors duration-150",
                              isActive && "underline decoration-primary/60 underline-offset-4",
                            )}
                          >
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                      </>
                    );

                    if (item.disabled) {
                      return (
                        <div
                          key={itemId}
                          id={itemId}
                          role="menuitem"
                          aria-disabled="true"
                          tabIndex={-1}
                          data-active={isActive}
                          className={sharedClassName}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          {content}
                        </div>
                      );
                    }

                    if (item.href) {
                      return (
                        <Link
                          key={itemId}
                          id={itemId}
                          href={item.href}
                          role="menuitem"
                          tabIndex={-1}
                          data-active={isActive}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          onClick={() => selectItem(item)}
                          className={sharedClassName}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={itemId}
                        id={itemId}
                        type="button"
                        role="menuitem"
                        tabIndex={-1}
                        data-active={isActive}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => selectItem(item)}
                        className={sharedClassName}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
