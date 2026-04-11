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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        mounted && "transition-all duration-700",
        mounted && (isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
        className,
      )}
    >
      {children}
    </div>
  );
}
