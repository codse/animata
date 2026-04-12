"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "animata-exit-shown";

export default function useExitIntent() {
  const [showModal, setShowModal] = useState(false);
  const shown = useRef(false);

  const show = useCallback(() => {
    if (shown.current) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    shown.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowModal(true);
  }, []);

  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [show]);

  return { showModal, setShowModal };
}
