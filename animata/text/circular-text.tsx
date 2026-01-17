import { useEffect, useMemo } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

const createRotation = (duration: number, start: number) => ({
  rotate: {
    from: start,
    to: start + 360,
    ease: "linear",
    duration,
    repeat: Infinity,
    type: "tween",
  },
});

export default function CircularText({
  text,
  spinDuration = 30,
  className = "",
}: {
  text: string;
  spinDuration?: number;
  className?: string;
}) {
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const characters = useMemo(() => [...text], [text]);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: createRotation(spinDuration, start),
    });
  }, [spinDuration, characters, controls, rotation]);
  return (
    <motion.div
      className={cn(
        "origins-center relative mx-auto flex h-[200px] w-[200px] cursor-pointer items-center justify-center rounded-full text-center font-bold text-white",
        className,
      )}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
    >
      {characters.map((char, index) => {
        const angle = (360 / characters.length) * index;
        const offset = (Math.PI * index) / characters.length;
        const transform = `rotate(${angle}deg)
        translate3d(${offset}px, ${offset}px, 0)`;
        return (
          <span
            key={`${char}-${index}`}
            style={{ transform, WebkitTransform: transform }}
            className="ease-[cubic-bezier(0_0_0_1)] absolute bottom-0 left-0 right-0 top-0 inline-block font-medium transition-all duration-500"
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}
