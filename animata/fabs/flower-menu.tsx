"use client";

import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  /** Accessible name for the petal link. */
  label: string;
  key?: string;
};

interface FlowerMenuProps extends React.HTMLAttributes<HTMLElement> {
  menuItems: MenuItem[];
  iconColor?: string;
  backgroundColor?: string;
  /** Petal bloom duration in ms. @default 220 */
  animationDuration?: number;
  /** Center button diameter in px — use at least 44 for touch. @default 44 */
  togglerSize?: number;
  /** Gap between petal orbit and center, in px. @default 28 */
  petalGap?: number;
  /** Accessible name for the closed toggle. */
  triggerLabel?: string;
  /** Accessible name for the menu landmark. @default "Menu" */
  menuLabel?: string;
}

function MenuToggler({
  isOpen,
  onToggle,
  backgroundColor,
  iconColor,
  animationDuration,
  togglerSize,
  iconSize,
  controlsId,
  triggerLabel,
  buttonRef,
}: {
  isOpen: boolean;
  onToggle: () => void;
  backgroundColor: string;
  iconColor: string;
  animationDuration: number;
  togglerSize: number;
  iconSize: number;
  controlsId: string;
  triggerLabel: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const lineHeight = Math.max(2, iconSize * 0.1);
  const lineWidth = iconSize * 0.8;
  const lineSpacing = iconSize * 0.25;

  return (
    <button
      ref={buttonRef}
      type="button"
      className="absolute inset-0 z-20 m-auto flex touch-manipulation cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        backgroundColor,
        color: iconColor,
        width: togglerSize,
        height: togglerSize,
      }}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={controlsId}
      aria-label={isOpen ? "Close menu" : triggerLabel}
      onClick={onToggle}
    >
      <span
        aria-hidden="true"
        className="relative flex flex-col items-center justify-center"
        style={{ width: iconSize, height: iconSize }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "absolute bg-current transition-[transform,opacity] ease-out",
              isOpen && i === 0 && "opacity-0",
              isOpen && i === 1 && "rotate-45",
              isOpen && i === 2 && "-rotate-45",
            )}
            style={{
              transitionDuration: `${Math.min(animationDuration, 180)}ms`,
              width: lineWidth,
              height: lineHeight,
              top: isOpen
                ? `calc(50% - ${lineHeight / 2}px)`
                : `calc(50% + ${(i - 1) * lineSpacing}px - ${lineHeight / 2}px)`,
            }}
          />
        ))}
      </span>
    </button>
  );
}

export default function FlowerMenu({
  menuItems,
  iconColor = "hsl(var(--primary-foreground))",
  backgroundColor = "hsl(var(--foreground))",
  animationDuration = 220,
  togglerSize = 44,
  petalGap = 28,
  triggerLabel = "Open links menu",
  menuLabel = "Menu",
  className,
  ...props
}: FlowerMenuProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = menuItems.length;
  const safeTogglerSize = Math.max(44, togglerSize);
  const itemSize = safeTogglerSize;
  const iconSize = Math.max(20, Math.floor(safeTogglerSize * 0.45));
  const orbitRadius = itemSize + petalGap;
  const containerSize = (orbitRadius + itemSize / 2) * 2 + 8;

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    itemRefs.current[0]?.focus();
  }, [isOpen]);

  const focusItem = (index: number) => {
    if (itemCount === 0) return;
    const next = (index + itemCount) % itemCount;
    itemRefs.current[next]?.focus();
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const activeIndex = itemRefs.current.findIndex((node) => node === document.activeElement);

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      case "Home":
        event.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        itemRefs.current[itemCount - 1]?.focus();
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusItem(activeIndex < 0 ? 0 : activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusItem(activeIndex <= 0 ? itemCount - 1 : activeIndex - 1);
        break;
    }
  };

  return (
    <nav
      ref={rootRef}
      aria-label={menuLabel}
      className={cn("relative mx-auto", className)}
      style={{ width: containerSize, height: containerSize, minHeight: containerSize }}
      {...props}
    >
      <style>{`
        .flower-petal {
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .flower-petal {
            transition: none !important;
          }
        }
      `}</style>

      <MenuToggler
        isOpen={isOpen}
        onToggle={toggle}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        animationDuration={animationDuration}
        togglerSize={safeTogglerSize}
        iconSize={iconSize}
        controlsId={menuId}
        triggerLabel={triggerLabel}
        buttonRef={triggerRef}
      />

      <ul
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        inert={!isOpen ? true : undefined}
        onKeyDown={onMenuKeyDown}
        className="absolute inset-0 m-0 list-none p-0"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const angle = (360 / itemCount) * index;
          const openDelay = 10 + index * 20;
          const closeDelay = (itemCount - 1 - index) * 14;

          return (
            <li
              key={item.key ?? item.href}
              role="none"
              className={cn(
                "flower-petal pointer-events-none absolute inset-0 m-auto opacity-0",
                isOpen && "pointer-events-auto opacity-100",
              )}
              style={{
                width: itemSize,
                height: itemSize,
                transitionDuration: `${animationDuration}ms`,
                transitionDelay: isOpen ? `${openDelay}ms` : `${closeDelay}ms`,
                transform: isOpen
                  ? `rotate(${angle}deg) translateX(-${orbitRadius}px) scale(1)`
                  : "rotate(0deg) translateX(0) scale(0.72)",
              }}
            >
              <Link
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label={item.label}
                tabIndex={isOpen ? 0 : -1}
                className={cn(
                  "flex size-full touch-manipulation items-center justify-center rounded-full transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95",
                  isOpen ? "opacity-100" : "opacity-0",
                  "hover:scale-110 focus-visible:scale-110",
                )}
                style={{
                  backgroundColor,
                  color: iconColor,
                  transform: `rotate(-${angle}deg)`,
                }}
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">{item.label}</span>
                <Icon aria-hidden="true" style={{ width: iconSize, height: iconSize }} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
