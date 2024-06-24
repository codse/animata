import { Anaheim } from "next/font/google";
import { motion } from "framer-motion";

import WaveReveal from "@/animata/text/wave-reveal";
import { cn } from "@/lib/utils";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroTitle() {
  return (
    <div className="group relative inline-block">
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: "2s", delay: 0.5, type: "spring" }}
        className="absolute -left-3 -top-1 inline-block -rotate-12 rounded-full bg-lime-200 px-2 py-1 text-sm font-bold uppercase text-lime-600 transition-all ease-slow group-hover:z-10 group-hover:rotate-0 group-hover:bg-lime-300"
      >
        FREE
      </motion.span>

      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: "2s", delay: 1, type: "spring" }}
        className="absolute -right-9 -top-1 inline-block rotate-12 rounded-full bg-lime-200 px-2 py-1 text-sm font-bold uppercase text-lime-600 transition-all ease-slow group-hover:z-10 group-hover:rotate-0 group-hover:bg-lime-300"
      >
        Open source
      </motion.span>
      <WaveReveal
        text="animata"
        className={cn(
          "select-none px-0 text-7xl uppercase text-blue-700 transition-opacity delay-1000 dark:text-blue-500 md:px-0 md:text-8xl",
          titleFont.className,
        )}
        delay={750}
        direction="up"
        duration="500ms"
      />
    </div>
  );
}
