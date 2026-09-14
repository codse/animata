"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

function Number({
  value,
  index,
  total,
  delay,
  className,
  getHeight,
  isInView,
}: {
  value: string;
  index: number;
  getHeight: () => number;
  className?: string;
  total: number;
  delay?: number;
  isInView: boolean;
}) {
  const numberRef = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 150 - index * 2,
    damping: 15,
  });

  const isRaw = String(+value) !== value;

  useLayoutEffect(() => {
    if (!isInView || isRaw) return;

    const height = getHeight();
    if (!height) return;

    const target = -height * +value;

    // Correct digit on first paint — avoid the "0,000+" trust flash.
    if (!delay) {
      motionValue.jump(target);
      return;
    }

    motionValue.jump(0);
    const timer = setTimeout(
      () => {
        springValue.set(target);
      },
      (total - index) * Math.floor(Math.random() * delay),
    );

    return () => clearTimeout(timer);
  }, [value, isRaw, isInView, springValue, motionValue, getHeight, index, total, delay]);

  if (isRaw) {
    return <span>{value}</span>;
  }

  // Static digit until in view so overflow strip never shows a wall of 0–9.
  if (!isInView) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.div
      ref={numberRef}
      style={{
        translateY: springValue,
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div className={className} key={i}>
          {i}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Ticker({
  value,
  delay,
  className,
  numberClassName,
}: {
  value: string;
  className?: string;
  numberClassName?: string;
  delay?: number;
}) {
  const parts = String(value).trim().split("");
  const divRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(divRef, { once: true });
  const getHeight = useCallback(() => divRef.current?.getBoundingClientRect().height ?? 0, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden whitespace-pre tabular-nums text-foreground",
        className,
      )}
    >
      <div className="absolute inset-0 flex min-w-fit">
        {parts.map((part, index) => (
          <Number
            getHeight={getHeight}
            index={index}
            key={index}
            value={part}
            total={parts.length}
            className={numberClassName}
            delay={delay}
            isInView={isInView}
          />
        ))}
      </div>
      <div ref={divRef} className="invisible min-w-fit">
        {value}
      </div>
    </div>
  );
}
