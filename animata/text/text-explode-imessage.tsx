import { useCallback, useEffect, useRef } from "react";
import { motion, useAnimationControls, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  initial: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
    },
    letterSpacing: "0px",
  },
  shrink: {
    // Scale might need to be adjust according to font size for better effect
    scale: 0.8,
    letterSpacing: "-10%",
  },
  jitter: {
    x: [0, -3, 3, -3, 3, 0],
    y: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: "easeInOut",
    },
  },
  explode: {
    scale: [0.7, 0.9, 1],
    opacity: [1, 0.7, 0],
    letterSpacing: "0px",
    transition: {
      times: [0, 0.9, 1],
    },
  },
  end: {
    scale: 1,
    letterSpacing: "0px",
    translateY: 50,
  },
};

const createExplosion = ({ index, total }: { index: number; total: number }) => {
  const direction = Math.random() > Math.random() ? -1 : 1;

  const x = Math.random() * 10 * total * direction;

  const radius = total * 4;
  const angleRange = Math.PI;
  const angle = (index / (total - 1)) * angleRange;
  const y = radius * -Math.sin(angle) * Math.random();

  const rotation = Math.random() * 360 * direction;

  return {
    translateX: [0, x * 0.5, x * 0.7, x],
    translateY: [0, y, -y / 5, 0, 5],
    rotate: [0, rotation * 0.4, rotation * 0.8, rotation],
    scale: [0.9, 1.2, 1 + Math.random() + 0.2, 1 + Math.random() * 2],
    opacity: [1, 0.8, 0.5, 0],
  };
};

const characterVariants: Variants = {
  jitter: () => ({
    x: [0, -3 + Math.random() * 6, 3 - Math.random() * 6, 0],
    y: [0, -2 + Math.random() * 4, 2 - Math.random() * 4, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.33, 0.66, 1],
      ease: "easeInOut",
    },
  }),
  shrink: {
    scale: 1.1,
  },
  explode: createExplosion,
  end: {
    translateY: 0,
    translateX: 0,
    rotate: 0,
    scale: 1,
  },
  initial: {
    opacity: 1,
  },
};

const splitText = (text: string) => String(text).split(/(?:)/u);

export default function TextExplodeIMessage({
  text,
  mode = "loop",
  className,
}: {
  text: string;
  className?: string;
  mode?: "loop" | "hover";
}) {
  const characters = splitText(text);
  const controls = useAnimationControls();
  const isPlaying = useRef(false);

  const animateSequence = useCallback(async () => {
    await Promise.all([
      controls.start("shrink", {
        duration: 1,
        ease: "easeOut",
      }),
      controls.start("jitter", {
        delay: 0.1,
      }),
    ]);
    await controls.start("explode", {});
    await controls.start("end");
    await controls.start("initial", {
      delay: 0.5,
      duration: 1,
      type: "spring",
    });

    if (mode === "loop") {
      requestAnimationFrame(() => animateSequence());
    } else {
      isPlaying.current = false;
    }
  }, [mode, controls]);

  useEffect(() => {
    if (!characters.length || mode === "hover") {
      return;
    }

    animateSequence();
  }, [characters.length, mode, animateSequence]);

  return (
    <motion.div
      variants={containerVariants}
      animate={controls}
      onPointerDown={() => {
        if (mode === "hover" && !isPlaying.current) {
          isPlaying.current = true;
          animateSequence();
        }
      }}
      onMouseEnter={() => {
        if (mode === "hover" && !isPlaying.current) {
          isPlaying.current = true;
          animateSequence();
        }
      }}
      className={cn(
        "flex items-center justify-center text-3xl tracking-normal text-foreground",
        className,
      )}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          custom={{ index, total: characters.length }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.div>
  );
}
