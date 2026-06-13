import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

function subscribeMobile(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function getMobileServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
}
