"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutGridIcon,
  type LucideIcon,
  Maximize2Icon,
  RefreshCwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { animate, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DemoOnboardingModal } from "@/app/demo/demo-onboarding-modal";
import { Icons } from "@/components/icons";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command as CommandRoot,
} from "@/components/ui/command";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  DEMO_GROUPS,
  DEMO_ITEMS,
  type DemoGroup,
  type DemoItem,
  type DemoItemWithGroup,
  demoThemeColor,
  getItemIndex,
  itemHref,
} from "./demos";

interface DemoExperienceProps {
  groupSlug: string;
  itemSlug: string;
}

const CHROME_IDLE_MS = 2200;
const EDGE_SWIPE_PX = 28;
const EDGE_SWIPE_MIN = 72;

const DEMO_PRESS_SPRING = {
  type: "spring" as const,
  stiffness: 250,
  damping: 25,
};

const PILL_CONTROL_CLASS =
  "grid size-9 shrink-0 touch-manipulation place-items-center rounded-full text-white/62 outline-none transition-[color,background-color] duration-150 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

function navigateWithTransition(router: ReturnType<typeof useRouter>, href: string) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    document.startViewTransition(() => {
      router.push(href);
    });
    return;
  }

  router.push(href);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

function useThemeColor(color: string) {
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }

    const previous = meta.getAttribute("content");
    meta.setAttribute("content", color);

    return () => {
      if (previous) meta?.setAttribute("content", previous);
    };
  }, [color]);
}

function useIdleChrome(options: { enabled: boolean; suspended: boolean }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearTimer();
    if (!options.enabled || options.suspended || reducedMotion) return;
    timerRef.current = window.setTimeout(() => setVisible(false), CHROME_IDLE_MS);
  }, [clearTimer, options.enabled, options.suspended, reducedMotion]);

  const wake = useCallback(() => {
    if (!options.enabled) return;
    setVisible(true);
    scheduleHide();
  }, [options.enabled, scheduleHide]);

  useEffect(() => {
    if (!options.enabled || reducedMotion) {
      setVisible(true);
      clearTimer();
      return;
    }

    wake();
    return clearTimer;
  }, [options.enabled, reducedMotion, wake, clearTimer]);

  useEffect(() => {
    if (!options.enabled || reducedMotion) return;

    const onActivity = () => wake();
    window.addEventListener("pointermove", onActivity);
    window.addEventListener("touchstart", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);

    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, [options.enabled, reducedMotion, wake]);

  const alwaysVisible = !options.enabled || reducedMotion;
  return { visible: alwaysVisible || visible, wake };
}

export function DemoExperience({ groupSlug, itemSlug }: DemoExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFullscreen =
    searchParams.get("fullscreen") === "1" || searchParams.get("fullscreen") === "true";
  const [refreshKey, setRefreshKey] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const activeItemIndex = Math.max(getItemIndex(groupSlug, itemSlug), 0);
  const activeItem = DEMO_ITEMS[activeItemIndex] ?? DEMO_ITEMS[0];
  const activeGroup = activeItem.group;
  const themeColor = demoThemeColor(activeItem, activeGroup);
  const totalDemos = DEMO_ITEMS.length;
  const canCycle = totalDemos > 1;
  const fullscreenHref = `${itemHref(activeGroup, activeItem)}?fullscreen=1`;

  const chromeEnabled = !isFullscreen;
  const { visible: chromeVisible, wake: wakeChrome } = useIdleChrome({
    enabled: chromeEnabled,
    suspended: isPickerOpen,
  });

  useThemeColor(themeColor);

  const hrefFor = useCallback((group: DemoGroup, item: DemoItem) => itemHref(group, item), []);

  const refreshDemo = useCallback(() => {
    setRefreshKey((current) => current + 1);
  }, []);

  const openFullscreenDemo = useCallback(() => {
    window.open(fullscreenHref, "_blank", "noopener,noreferrer");
  }, [fullscreenHref]);

  const goHome = useCallback(() => {
    navigateWithTransition(router, "/");
  }, [router]);

  const navigateToItem = useCallback(
    (target: DemoItemWithGroup) => {
      setIsPickerOpen(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      const href = hrefFor(target.group, target);
      if (target.group.slug !== activeGroup.slug || target.slug !== activeItem.slug) {
        navigateWithTransition(router, href);
      }
    },
    [activeGroup.slug, activeItem.slug, hrefFor, router],
  );

  const cycleDemo = useCallback(
    (direction: 1 | -1) => {
      const next =
        DEMO_ITEMS[(activeItemIndex + direction + DEMO_ITEMS.length) % DEMO_ITEMS.length];
      navigateToItem(next);
    },
    [activeItemIndex, navigateToItem],
  );

  useEffect(() => {
    DEMO_ITEMS[activeItemIndex - 1]?.load();
    DEMO_ITEMS[activeItemIndex + 1]?.load();
  }, [activeItemIndex]);

  useEffect(() => {
    if (isFullscreen) return;

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();

      if (key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsPickerOpen((open) => !open);
        wakeChrome();
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (key === "." || key === "/") {
        event.preventDefault();
        setIsPickerOpen(true);
        wakeChrome();
        return;
      }

      if (event.key === "Escape") {
        setIsPickerOpen(false);
        return;
      }

      if (event.repeat && (key === "r" || key === "f")) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        cycleDemo(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        cycleDemo(-1);
      } else if (key === "r") {
        event.preventDefault();
        refreshDemo();
      } else if (key === "f") {
        event.preventDefault();
        openFullscreenDemo();
      } else if (key === "h") {
        event.preventDefault();
        goHome();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen, cycleDemo, refreshDemo, openFullscreenDemo, goHome, wakeChrome]);

  useEffect(() => {
    if (isFullscreen) return;

    let startX = 0;
    let startY = 0;
    let edge: "left" | "right" | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      if (touch.clientX <= EDGE_SWIPE_PX) edge = "left";
      else if (touch.clientX >= window.innerWidth - EDGE_SWIPE_PX) edge = "right";
      else edge = null;

      startX = touch.clientX;
      startY = touch.clientY;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!edge) return;
      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dy) > Math.abs(dx)) {
        edge = null;
        return;
      }

      if (edge === "left" && dx > EDGE_SWIPE_MIN) cycleDemo(-1);
      if (edge === "right" && dx < -EDGE_SWIPE_MIN) cycleDemo(1);
      edge = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isFullscreen, cycleDemo]);

  const ActiveDemo = activeItem.Component;

  return (
    <main className="demo-shell relative min-h-svh bg-transparent">
      <DemoShellStyles />

      <div
        key={`${activeItem.group.slug}-${activeItem.slug}-${refreshKey}`}
        className="demo-canvas"
      >
        <ActiveDemo />
      </div>

      {!isFullscreen ? (
        <>
          <DemoOnboardingModal />
          <DemoWakeStrip visible={!chromeVisible} onWake={wakeChrome} />
          <DemoChromeBar
            visible={chromeVisible}
            canCycle={canCycle}
            activeIndex={activeItemIndex}
            totalDemos={totalDemos}
            fullscreenHref={fullscreenHref}
            refreshKey={refreshKey}
            onHome={goHome}
            onPrev={() => cycleDemo(-1)}
            onNext={() => cycleDemo(1)}
            onOpenPicker={() => {
              setIsPickerOpen(true);
              wakeChrome();
            }}
            onRefresh={refreshDemo}
          />
          <DemoPicker
            open={isPickerOpen}
            activeItem={activeItem}
            activeGroup={activeGroup}
            accentColor={themeColor}
            onOpenChange={setIsPickerOpen}
            onSelect={navigateToItem}
            onPrefetch={(entry) => entry.load()}
          />
        </>
      ) : null}
    </main>
  );
}

function DemoWakeStrip({ visible, onWake }: { visible: boolean; onWake: () => void }) {
  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Show demo controls"
      onPointerEnter={onWake}
      onFocus={onWake}
      onClick={onWake}
      className="fixed inset-x-0 bottom-0 z-40 flex h-20 touch-manipulation flex-col items-center justify-end gap-2 bg-transparent pb-[max(0.65rem,env(safe-area-inset-bottom))] outline-none md:h-16"
    >
      <span
        aria-hidden="true"
        className="h-1 w-7 rounded-full bg-white/30 opacity-70 shadow-[0_0_12px_rgb(255_255_255_/_0.25)]"
      />
      <span className="font-mono text-[10px] tracking-[0.04em] text-white/35 md:hidden">
        tap for controls
      </span>
    </button>
  );
}

interface DemoChromeBarProps {
  visible: boolean;
  canCycle: boolean;
  activeIndex: number;
  totalDemos: number;
  fullscreenHref: string;
  refreshKey: number;
  onHome: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenPicker: () => void;
  onRefresh: () => void;
}

function DemoChromeBar({
  visible,
  canCycle,
  activeIndex,
  totalDemos,
  fullscreenHref,
  refreshKey,
  onHome,
  onPrev,
  onNext,
  onOpenPicker,
  onRefresh,
}: DemoChromeBarProps) {
  const [chromeTip, setChromeTip] = useState<{ label: string; anchor: HTMLElement } | null>(null);

  const showChromeTip = useCallback((label: string, anchor: HTMLElement) => {
    setChromeTip({ label, anchor });
  }, []);

  const hideChromeTip = useCallback(() => {
    setChromeTip(null);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
      className={cn(
        "demo-chrome-bar pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-4",
        !visible && "pointer-events-none",
      )}
    >
      <div
        role="group"
        aria-label="Demo controls"
        className={cn(
          "demo-chrome-pill pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/14 bg-[#121212]/72 p-1 text-white/88 shadow-[0_8px_32px_-8px_rgb(0_0_0_/_0.55)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          visible && "pointer-events-auto",
        )}
        onMouseLeave={hideChromeTip}
      >
        <PillHomeButton onClick={onHome} onShowTip={showChromeTip} />
        <ChromeDivider />
        {canCycle ? (
          <>
            <PillIconButton
              label="Previous demo"
              icon={ChevronLeftIcon}
              onClick={onPrev}
              onShowTip={showChromeTip}
              className="md:hidden"
            />
            <span
              aria-hidden="true"
              className="min-w-9 px-0.5 text-center font-mono text-[11px] tabular-nums text-white/50 md:hidden"
            >
              {activeIndex + 1}/{totalDemos}
            </span>
            <PillIconButton
              label="Next demo"
              icon={ChevronRightIcon}
              onClick={onNext}
              onShowTip={showChromeTip}
              className="md:hidden"
            />
            <ChromeDivider className="md:hidden" />
          </>
        ) : null}
        {canCycle ? (
          <>
            <PillIconButton
              label="Previous demo"
              icon={ChevronLeftIcon}
              keyShortcut="←"
              onClick={onPrev}
              onShowTip={showChromeTip}
              className="hidden md:grid"
            />
            <PillIconButton
              label="Next demo"
              icon={ChevronRightIcon}
              keyShortcut="→"
              onClick={onNext}
              onShowTip={showChromeTip}
              className="hidden md:grid"
            />
            <ChromeDivider className="hidden md:block" />
          </>
        ) : null}
        <PillIconButton
          label="Browse demos"
          icon={LayoutGridIcon}
          keyShortcut="."
          onClick={onOpenPicker}
          onShowTip={showChromeTip}
        />
        <ChromeDivider />
        <PillRefreshButton refreshKey={refreshKey} onClick={onRefresh} onShowTip={showChromeTip} />
        <PillIconLink
          label="Open fullscreen"
          icon={Maximize2Icon}
          keyShortcut="F"
          href={fullscreenHref}
          target="_blank"
          rel="noreferrer"
          onShowTip={showChromeTip}
          className="hidden sm:grid"
        />
      </div>
      <DemoChromeTooltip tip={chromeTip} />
    </motion.div>
  );
}

function ChromeDivider({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("mx-0.5 h-4 w-px shrink-0 bg-white/12", className)} />
  );
}

interface DemoPickerProps {
  open: boolean;
  activeItem: DemoItemWithGroup;
  activeGroup: DemoGroup;
  accentColor: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: DemoItemWithGroup) => void;
  onPrefetch: (item: DemoItemWithGroup) => void;
}

function DemoPicker({
  open,
  activeItem,
  activeGroup,
  accentColor,
  onOpenChange,
  onSelect,
  onPrefetch,
}: DemoPickerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-[2px] sm:bg-black/40" />
        <DialogPrimitive.Content
          style={{ "--demo-accent": accentColor } as CSSProperties}
          aria-describedby={undefined}
          className={cn(
            "demo-picker-shell fixed z-50 flex w-full flex-col overflow-hidden border border-white/10 bg-[#141414] text-white shadow-[0_24px_80px_-32px_rgb(0_0_0_/_0.9)] outline-none",
            "inset-x-0 bottom-0 top-auto max-h-[min(88svh,640px)] translate-x-0 translate-y-0 rounded-t-[20px] border-b-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4",
            "sm:inset-x-auto sm:bottom-auto sm:top-[50%] sm:left-[50%] sm:max-w-[min(92vw,24rem)] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-[18px] sm:border-b",
            "sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95",
          )}
        >
          <div className="sm:hidden">
            <div aria-hidden="true" className="mx-auto mt-2 h-1 w-9 rounded-full bg-white/15" />
          </div>

          <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-3.5 sm:pt-4">
            <DialogPrimitive.Title className="text-[15px] font-medium tracking-[-0.01em] text-white">
              Browse demos
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search and switch between live demo pages.
            </DialogPrimitive.Description>
            <button
              type="button"
              aria-label="Close demo picker"
              onClick={() => onOpenChange(false)}
              className="-mr-1 grid size-8 shrink-0 touch-manipulation place-items-center rounded-full text-white/45 transition-colors hover:bg-white/8 hover:text-white/75"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>

          <CommandRoot className="flex min-h-0 w-full flex-col bg-transparent">
            <div
              cmdk-input-wrapper=""
              className="flex h-11 w-full shrink-0 items-center gap-2.5 border-y border-white/8 px-4"
            >
              <SearchIcon aria-hidden="true" className="size-4 shrink-0 text-white/30" />
              <CommandPrimitive.Input
                placeholder="Search demos…"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
              />
            </div>

            <CommandList className="demo-picker-list max-h-[min(52svh,400px)] px-1.5 py-1 pb-3">
              <CommandEmpty className="px-4 py-10 text-[14px] text-white/45">
                Nothing matched that search.
              </CommandEmpty>
              {DEMO_GROUPS.map((group, groupIndex) => (
                <CommandGroup
                  key={group.slug}
                  heading={group.label}
                  className="demo-picker-group p-0 [&:not(:last-child)]:pb-4 [&_[cmdk-group-heading]]:sr-only [&_[cmdk-item]:not(:last-child)]:mb-1"
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "px-3 pb-1.5 text-[12px] font-medium text-white/38",
                      groupIndex === 0 ? "pt-2.5" : "pt-3",
                    )}
                  >
                    {group.label}
                  </div>
                  {group.items.map((rawItem) => {
                    const flatIndex = getItemIndex(group.slug, rawItem.slug);
                    const entry = DEMO_ITEMS[flatIndex];
                    const isActive =
                      entry.slug === activeItem.slug && entry.group.slug === activeGroup.slug;

                    return (
                      <CommandItem
                        key={entry.slug}
                        value={`${group.label} ${entry.label} ${group.phrase}`}
                        onMouseEnter={() => onPrefetch(entry)}
                        onFocus={() => onPrefetch(entry)}
                        onSelect={() => onSelect(entry)}
                        className={cn(
                          "demo-picker-item mx-0.5 cursor-pointer rounded-lg px-3 py-2.5 aria-selected:bg-white/[0.07] data-[selected=true]:bg-white/[0.07]",
                          isActive && "demo-picker-item-live bg-white/[0.04]",
                        )}
                      >
                        <span className="min-w-0 flex-1 truncate text-[14px] text-white/88">
                          {entry.label}
                        </span>
                        {isActive ? (
                          <CheckIcon
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-white/45"
                          />
                        ) : null}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </CommandRoot>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function formatDemoTooltipLabel(label: string, keyShortcut?: string) {
  if (!keyShortcut) return label;

  if (/^[a-z]$/i.test(keyShortcut)) {
    const key = keyShortcut.toUpperCase();
    const words = label.split(" ");

    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      if (word?.[0]?.toUpperCase() === key) {
        words[index] = `(${key})${word.slice(1)}`;
        return words.join(" ");
      }
    }

    if (label[0]?.toUpperCase() === key) {
      return `(${key})${label.slice(1)}`;
    }
  }

  return `${label} (${keyShortcut})`;
}

function DemoChromeTooltip({ tip }: { tip: { label: string; anchor: HTMLElement } | null }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!tip) return;

    const updatePosition = () => {
      const rect = tip.anchor.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 6,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [tip]);

  if (!tip || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="tooltip"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%)",
        zIndex: 60,
      }}
      className="pointer-events-none whitespace-nowrap rounded-[5px] border border-white/12 bg-[#121212] px-3 py-1.5 text-[0.7rem] leading-none text-white"
    >
      {tip.label}
    </div>,
    document.body,
  );
}

interface PillIconButtonProps {
  label: string;
  icon: LucideIcon;
  keyShortcut?: string;
  className?: string;
  onClick: () => void;
  onShowTip: (label: string, anchor: HTMLElement) => void;
}

function PillHomeButton({
  onClick,
  onShowTip,
}: {
  onClick: () => void;
  onShowTip: (label: string, anchor: HTMLElement) => void;
}) {
  const reducedMotion = useReducedMotion();
  const tipLabel = formatDemoTooltipLabel("Home", "H");

  const revealTip = (anchor: HTMLElement) => {
    onShowTip(tipLabel, anchor);
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to animata home"
      aria-keyshortcuts="H"
      onClick={onClick}
      onMouseEnter={(event) => revealTip(event.currentTarget)}
      onFocus={(event) => revealTip(event.currentTarget)}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      transition={DEMO_PRESS_SPRING}
      className={cn(PILL_CONTROL_CLASS, "group")}
    >
      <span
        aria-hidden="true"
        className={cn(
          "demo-home-logo inline-flex size-3.5 items-center justify-center",
          !reducedMotion && "demo-home-logo-swing",
        )}
      >
        <Icons.logo className="size-3.5" />
      </span>
    </motion.button>
  );
}

function PillRefreshButton({
  refreshKey,
  onClick,
  onShowTip,
}: {
  refreshKey: number;
  onClick: () => void;
  onShowTip: (label: string, anchor: HTMLElement) => void;
}) {
  const reducedMotion = useReducedMotion();
  const iconRef = useRef<HTMLSpanElement>(null);
  const rotationRef = useRef(0);
  const tipLabel = formatDemoTooltipLabel("Refresh demo", "R");

  const revealTip = (anchor: HTMLElement) => {
    onShowTip(tipLabel, anchor);
  };

  useEffect(() => {
    if (refreshKey === 0 || reducedMotion || !iconRef.current) return;

    rotationRef.current += 180;
    animate(
      iconRef.current,
      { rotate: rotationRef.current },
      { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    );
  }, [refreshKey, reducedMotion]);

  return (
    <motion.button
      type="button"
      aria-label="Refresh demo"
      aria-keyshortcuts="R"
      onClick={onClick}
      onMouseEnter={(event) => revealTip(event.currentTarget)}
      onFocus={(event) => revealTip(event.currentTarget)}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      transition={DEMO_PRESS_SPRING}
      className={PILL_CONTROL_CLASS}
    >
      <span
        ref={iconRef}
        aria-hidden="true"
        className="inline-flex origin-center will-change-transform"
      >
        <RefreshCwIcon className="size-3.5" />
      </span>
    </motion.button>
  );
}

function PillIconButton({
  label,
  icon: Icon,
  keyShortcut,
  className,
  onClick,
  onShowTip,
}: PillIconButtonProps) {
  const reducedMotion = useReducedMotion();
  const tipLabel = formatDemoTooltipLabel(label, keyShortcut);

  const revealTip = (anchor: HTMLElement) => {
    onShowTip(tipLabel, anchor);
  };

  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-keyshortcuts={keyShortcut}
      onClick={onClick}
      onMouseEnter={(event) => revealTip(event.currentTarget)}
      onFocus={(event) => revealTip(event.currentTarget)}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      transition={DEMO_PRESS_SPRING}
      className={cn(PILL_CONTROL_CLASS, className)}
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </motion.button>
  );
}

interface PillIconLinkProps {
  label: string;
  icon: LucideIcon;
  keyShortcut?: string;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  onShowTip: (label: string, anchor: HTMLElement) => void;
}

function PillIconLink({
  label,
  icon: Icon,
  keyShortcut,
  href,
  target,
  rel,
  className,
  onShowTip,
}: PillIconLinkProps) {
  const reducedMotion = useReducedMotion();
  const tipLabel = formatDemoTooltipLabel(label, keyShortcut);

  const revealTip = (anchor: HTMLElement) => {
    onShowTip(tipLabel, anchor);
  };

  return (
    <motion.a
      aria-label={label}
      aria-keyshortcuts={keyShortcut}
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={(event) => revealTip(event.currentTarget)}
      onFocus={(event) => revealTip(event.currentTarget)}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      transition={DEMO_PRESS_SPRING}
      className={cn(PILL_CONTROL_CLASS, className)}
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </motion.a>
  );
}

function DemoShellStyles() {
  return (
    <style>{`
      .demo-shell {
        --demo-chrome-reserve: calc(4.75rem + env(safe-area-inset-bottom, 0px));
        --demo-chrome-height: 2.75rem;
        --demo-chrome-gap: 1rem;
      }

      .demo-canvas {
        view-transition-name: demo-canvas;
      }

      ::view-transition-old(demo-canvas),
      ::view-transition-new(demo-canvas) {
        animation-duration: 280ms;
        animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      }

      ::view-transition-old(demo-canvas) {
        animation-name: demo-fade-out;
      }

      ::view-transition-new(demo-canvas) {
        animation-name: demo-fade-in;
      }

      @keyframes demo-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes demo-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes demo-logo-swing {
        from {
          transform: rotate(-14deg);
        }
        to {
          transform: rotate(14deg);
        }
      }

      .demo-home-logo {
        transform-origin: 60% 0;
      }

      .group:hover .demo-home-logo-swing,
      .group:focus-visible .demo-home-logo-swing {
        animation: demo-logo-swing 0.95s ease-in-out infinite alternate;
      }

      .demo-picker-shell {
        isolation: isolate;
      }

      .demo-picker-group + .demo-picker-group {
        border-top: 1px solid rgb(255 255 255 / 0.05);
      }

      .demo-picker-list {
        scrollbar-width: thin;
        scrollbar-color: rgb(255 255 255 / 0.14) transparent;
      }

      .demo-picker-list::-webkit-scrollbar {
        width: 6px;
      }

      .demo-picker-list::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgb(255 255 255 / 0.12);
      }

      .demo-picker-item {
        display: flex;
        align-items: center;
        gap: 0.625rem;
      }

      .demo-chrome-pill {
        min-height: 2.75rem;
      }

      @media (prefers-reduced-motion: reduce) {
        ::view-transition-old(demo-canvas),
        ::view-transition-new(demo-canvas),
        .demo-chrome-bar {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
