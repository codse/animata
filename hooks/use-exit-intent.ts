"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "animata-exit-shown";
const DESKTOP_DELAY_MS = 5_000;
const MOBILE_TIME_MS = 25_000;
const MOBILE_SCROLL_RATIO = 0.45;
const MOBILE_MQ = "(max-width: 767px)";

export default function useExitIntent() {
  const [showModal, setShowModal] = useState(false);
  const shown = useRef(false);

  const show = useCallback(() => {
    if (shown.current) return;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) return;
    shown.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowModal(true);
  }, []);

  useEffect(() => {
    let desktopReady = false;
    const isMobile = () => window.matchMedia(MOBILE_MQ).matches;

    const onMouseLeave = (e: MouseEvent) => {
      if (!desktopReady || isMobile()) return;
      if (e.clientY <= 0) show();
    };

    const onScroll = () => {
      if (!isMobile()) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= MOBILE_SCROLL_RATIO) show();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const desktopTimer = setTimeout(() => {
      desktopReady = true;
    }, DESKTOP_DELAY_MS);

    const mobileTimer = setTimeout(() => {
      if (isMobile()) show();
    }, MOBILE_TIME_MS);

    return () => {
      clearTimeout(desktopTimer);
      clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  return { showModal, setShowModal };
}
