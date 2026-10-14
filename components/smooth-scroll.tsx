"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import { useEffect } from "react";

import "lenis/dist/lenis.css";

/**
 * Site-wide smooth wheel scrolling.
 *
 * Wheel input is interpolated so scroll-linked animations move continuously instead of in
 * ~100px wheel steps. Touch and keyboard keep native scrolling. Lenis advances on Motion's
 * frame loop, so scroll position and Motion animations share one clock per frame.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Fraction of the remaining distance covered each frame. Higher feels tighter.
      lerp: 0.14,
      wheelMultiplier: 1.1,
      // Sidebars, code blocks, menus, and contained previews keep their own scrolling.
      allowNestedScroll: true,
      prevent: (node) => node.closest("[data-lenis-prevent], [role='dialog']") !== null,
      // Same-page hash links scroll through Lenis, so an in-flight wheel glide can't pull
      // the page back from the heading. Targets honor scroll-margin like a native jump.
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    if (process.env.NODE_ENV !== "production") {
      // Handy for inspecting scroll state from the console during development.
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    // Lenis must not keep scrolling the page under a scroll lock. Radix dialogs and menus
    // set `data-scroll-locked`; useLockBody (SplitReveal) sets inline overflow and position.
    const html = document.documentElement;
    const body = document.body;
    const isLocked = () =>
      body.hasAttribute("data-scroll-locked") ||
      body.style.position === "fixed" ||
      body.style.overflow === "hidden" ||
      html.style.overflow === "hidden";
    const syncLock = () => {
      const locked = isLocked();
      if (locked && !lenis.isStopped) lenis.stop();
      else if (!locked && lenis.isStopped) lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(body, { attributes: true, attributeFilter: ["data-scroll-locked", "style"] });
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });
    syncLock();

    return () => {
      observer.disconnect();
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
