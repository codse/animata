"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        !prefersReducedMotion && "transition-all duration-700",
        !prefersReducedMotion &&
          (isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
        className,
      )}
    >
      {children}
    </div>
  );
}
