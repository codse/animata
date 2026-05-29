"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "animata:demo-onboarding-seen";

const SHORTCUTS = [
  { key: "H", label: "Home" },
  { key: ".", label: "Browse demos" },
  { key: "R", label: "Refresh" },
  { key: "F", label: "Fullscreen" },
  { key: "← →", label: "Previous / next demo" },
] as const;

export function DemoOnboardingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
        else setOpen(true);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-black/80" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[70] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface-card))] p-0 shadow-lg sm:max-w-md">
          <div className="border-b border-border bg-foreground/[0.03] px-6 pb-5 pt-6">
            <DialogPrimitive.Title className="font-(family-name:--font-display) text-[22px] leading-tight text-foreground">
              Live demos
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-[15px] leading-relaxed text-[hsl(var(--text-secondary))]">
              Full-page compositions. Scroll down for the recipe. The bar at the bottom hides until
              you move the mouse; shortcuts still work.
            </DialogPrimitive.Description>
          </div>

          <div className="space-y-0 divide-y divide-border">
            <div className="px-6 py-5">
              <p className="text-[15px] font-medium text-foreground">Shortcuts</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Unless you&apos;re typing in a field.
              </p>
              <ul className="mt-4 space-y-2">
                {SHORTCUTS.map((shortcut) => (
                  <li
                    key={shortcut.key}
                    className="flex items-center justify-between gap-4 text-[13px]"
                  >
                    <span className="text-foreground/88">{shortcut.label}</span>
                    <kbd className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {shortcut.key}
                    </kbd>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
                On a phone, swipe either screen edge to change demos.
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="text-[15px] font-medium text-foreground">Want to add one?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Recipe notes, source tabs, and component links are covered in the contributing
                guide.
              </p>
              <Link
                href="/docs/contributing/demos"
                onClick={dismiss}
                className="mt-3 inline-flex touch-manipulation items-center gap-1.5 text-[14px] font-medium text-[hsl(var(--link))] transition-colors hover:text-[hsl(var(--link-hover))]"
              >
                How to add a demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="border-t border-border px-6 py-4">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-10 w-full touch-manipulation items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Got it
            </button>
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
