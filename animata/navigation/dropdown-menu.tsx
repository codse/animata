"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  items?: MenuItem[];
  triggerLabel?: string;
  align?: "left" | "right";
}

const defaultItems: MenuItem[] = [
  { label: "Profile" },
  { label: "Settings" },
  { label: "Help" },
  { label: "Sign Out" },
];

export default function DropdownMenu({
  items = defaultItems,
  triggerLabel = "Options",
  align = "left",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(0);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        items[selectedIndex]?.onClick?.();
        setIsOpen(false);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, items]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const animationProps = prefersReducedMotion.current
    ? {}
    : {
        initial: { opacity: 0, translateY: -8 },
        animate: { opacity: 1, translateY: 0 },
        exit: { opacity: 0, translateY: -8 },
      };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(
          "min-h-11 min-w-11 inline-flex items-center justify-center gap-2 rounded-lg",
          "bg-background border border-border px-3 py-2 text-sm font-medium",
          "text-foreground transition-colors duration-200",
          "hover:bg-muted hover:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "dark:focus:ring-offset-background",
          "active:scale-95",
        )}
      >
        {triggerLabel}
        <svg
          className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            role="menu"
            className={cn(
              "absolute z-50 mt-2 min-w-48 overflow-hidden rounded-lg",
              "border border-border bg-background shadow-lg",
              "dark:border-border dark:bg-background",
              align === "right" ? "right-0" : "left-0",
            )}
            {...animationProps}
          >
            {items.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full min-h-11 inline-flex items-center gap-3 px-4 py-3",
                  "text-sm font-medium transition-colors duration-150",
                  "text-foreground hover:bg-muted hover:text-muted-foreground",
                  "focus:outline-none focus:bg-muted focus:text-muted-foreground",
                  "dark:text-foreground dark:hover:bg-muted dark:focus:bg-muted",
                  selectedIndex === index && "bg-muted text-muted-foreground",
                )}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
