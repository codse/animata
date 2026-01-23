import { useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

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
  const characters = useMemo(() => [...text], [text]);
  return (
    <motion.div
      key={spinDuration}
      className={cn(
        "relative mx-auto flex h-[200px] w-[200px] origin-center cursor-pointer items-center justify-center rounded-full text-center font-bold text-foreground",
        className,
      )}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        ease: "linear",
        duration: spinDuration,
        repeat: Infinity,
      }}
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
