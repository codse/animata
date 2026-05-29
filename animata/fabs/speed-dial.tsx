"use client";

import { Plus } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  key: string;
  action: () => void;
}

interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  actionButtons: SpeedDialAction[];
  /** Accessible name for the main toggle when closed. */
  triggerLabel?: string;
}

const shellClass =
  "flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]";

const menuAnchorClass: Record<Direction, string> = {
  up: "bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom",
  down: "top-full left-1/2 mt-2 -translate-x-1/2 origin-top",
  left: "right-full top-1/2 mr-2 -translate-y-1/2 origin-right",
  right: "left-full top-1/2 ml-2 -translate-y-1/2 origin-left",
};

const menuLayoutClass: Record<Direction, string> = {
  up: "flex flex-col-reverse items-center gap-2.5",
  down: "flex flex-col items-center gap-2.5",
  left: "flex flex-row-reverse items-center gap-2.5",
  right: "flex flex-row items-center gap-2.5",
};

function arrowKeysForDirection(direction: Direction) {
  if (direction === "up") return { prev: "ArrowDown", next: "ArrowUp" };
  if (direction === "down") return { prev: "ArrowUp", next: "ArrowDown" };
  if (direction === "left") return { prev: "ArrowRight", next: "ArrowLeft" };
  return { prev: "ArrowLeft", next: "ArrowRight" };
}

export default function SpeedDial({
  direction = "right",
  actionButtons,
  triggerLabel = "Open actions menu",
  className,
  ...props
}: SpeedDialProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();
  }, [open]);

  const focusItem = (index: number) => {
    const count = actionButtons.length;
    if (count === 0) return;
    const next = (index + count) % count;
    itemRefs.current[next]?.focus();
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const { prev, next } = arrowKeysForDirection(direction);
    const activeIndex = itemRefs.current.findIndex((node) => node === document.activeElement);

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
      case "Home":
        event.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        itemRefs.current[actionButtons.length - 1]?.focus();
        break;
      default:
        if (event.key === prev) {
          event.preventDefault();
          focusItem(activeIndex <= 0 ? actionButtons.length - 1 : activeIndex - 1);
        } else if (event.key === next) {
          event.preventDefault();
          focusItem(activeIndex < 0 ? 0 : activeIndex + 1);
        }
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      data-direction={direction}
      {...props}
    >
      <style>{`
        @keyframes speed-dial-in-up {
          from { opacity: 0; transform: translateY(10px) scale(0.82); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes speed-dial-in-down {
          from { opacity: 0; transform: translateY(-10px) scale(0.82); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes speed-dial-in-left {
          from { opacity: 0; transform: translateX(10px) scale(0.82); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes speed-dial-in-right {
          from { opacity: 0; transform: translateX(-10px) scale(0.82); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        [data-direction="up"] .speed-dial-item { animation-name: speed-dial-in-up; }
        [data-direction="down"] .speed-dial-item { animation-name: speed-dial-in-down; }
        [data-direction="left"] .speed-dial-item { animation-name: speed-dial-in-left; }
        [data-direction="right"] .speed-dial-item { animation-name: speed-dial-in-right; }
        .speed-dial-item {
          animation-duration: 120ms;
          animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
          animation-fill-mode: both;
          animation-delay: calc(12ms + var(--i) * 22ms);
        }
        @media (prefers-reduced-motion: reduce) {
          .speed-dial-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .speed-dial-trigger-icon {
            transition: none;
          }
        }
      `}</style>

      <button
        ref={triggerRef}
        type="button"
        className={cn(shellClass, "relative z-20")}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={open ? "Close actions menu" : triggerLabel}
        onClick={toggle}
      >
        <span
          aria-hidden="true"
          className={cn(
            "speed-dial-trigger-icon flex items-center justify-center transition-transform duration-150 ease-out",
            open && "rotate-45",
          )}
        >
          <Plus className="size-5" strokeWidth={2.25} />
        </span>
      </button>

      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-orientation={direction === "up" || direction === "down" ? "vertical" : "horizontal"}
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute z-10 m-0 list-none p-0",
            menuAnchorClass[direction],
            menuLayoutClass[direction],
          )}
        >
          {actionButtons.map((action, index) => (
            <li
              key={action.key}
              role="none"
              className="speed-dial-item list-none"
              style={{ "--i": index } as React.CSSProperties}
            >
              <button
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                role="menuitem"
                className={shellClass}
                aria-label={action.label}
                onClick={() => {
                  action.action();
                  close();
                }}
              >
                <span className="sr-only">{action.label}</span>
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center [&>svg]:size-5"
                >
                  {action.icon}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
