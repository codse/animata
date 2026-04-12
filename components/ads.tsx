"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CarbonAds() {
  const _pathname = usePathname();

  useEffect(() => {
    // Skip loading ads in development environment
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("100."))
    ) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CW7ITK77&placement=animatadesign&format=cover";
    script.id = "_carbonads_js";
    script.async = true;

    const container = document.getElementById("carbon-container");
    if (container && !document.getElementById("_carbonads_js")) {
      container.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById("_carbonads_js");
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return <div id="carbon-container" />;
}
