import { useEffect } from "react";
import { Anaheim } from "next/font/google";

import { cn } from "@/lib/utils";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

let hasLoaded = false;

function Curtain() {
  useEffect(() => {
    hasLoaded = true;
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end justify-center bg-yellow-200 ease-slow animate-out slide-out-to-top-full fill-mode-forwards",
        {
          // Only animate it once per load
          "duration-1000": !hasLoaded,
          "duration-0": hasLoaded,
        },
      )}
    >
      <div className="w-full py-12 text-center">
        <span
          className={cn(
            "block select-none text-6xl uppercase text-blue-700 duration-long animate-in fade-in",
            titleFont.className,
          )}
        >
          animata
        </span>
        <span className="text-blue-700/50 duration-long animate-in fade-in">
          ~ bring your site to life ~
        </span>
      </div>
    </div>
  );
}

export default Curtain;
