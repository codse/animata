import { useEffect, useMemo } from "react";
import { animate, motion, useMotionValue, type ValueAnimationTransition } from "framer-motion";

import { cn } from "@/lib/utils";

const createRotation = (duration: number): ValueAnimationTransition => ({
  duration,
  ease: "linear",
  repeat: Infinity,
  type: "tween",
});

export default function CircularText({
  text,
  spinDuration = 30,
  radius = 5,
  className = "",
}: {
  text: string;
  spinDuration?: number;
  radius?: number;
  className?: string;
}) {
  const rotation = useMotionValue(0);
  const characters = useMemo(() => [...text], [text]);

  useEffect(() => {
    const start = rotation.get();
    const keyframes: number[] = [start, start + 360];
    const animation = animate(rotation, keyframes, createRotation(spinDuration));
    return () => animation.stop();
  }, [spinDuration, rotation]);
  return (
    <motion.div
      className={cn(
        "relative mx-auto flex h-[200px] w-[200px] origin-center cursor-pointer items-center justify-center rounded-full text-center font-bold text-white",
        className,
      )}
      style={{ rotate: rotation }}
    >
      {characters.map((char, index) => {
        const angle = (360 / characters.length) * index;
        const transform = `rotate(${angle}deg) translateY(-${radius}px)`;
        return (
          <span
            key={`${char}-${index}`}
            style={{ transform, WebkitTransform: transform }}
            className="absolute inset-0 inline-block font-medium"
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}
