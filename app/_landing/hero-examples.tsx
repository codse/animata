"use client";

import { motion } from "framer-motion";
import { Anaheim } from "next/font/google";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import Counter from "@/animata/text/counter";
import MirrorText from "@/animata/text/mirror-text";
import TypingText from "@/animata/text/typing-text";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import ModeSwitcher from "./mode-switcher";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroExamples() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
      <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
          translateY: -100,
        }}
        animate={{
          scale: [0.5, 1],
          opacity: [0, 1],
          translateY: [-100, 0],
        }}
        transition={{
          duration: 0.2,
        }}
        className="relative rounded-full"
      >
        <div className="relative w-full rounded-full border border-gray-200 bg-gray-50 p-4 shadow-xl transition-all dark:border-gray-600 dark:bg-gray-900">
          <AnimatedGradientText className="overflow-hidden rounded-xl tabular-nums">
            <Counter
              targetValue={30}
              className="text-2xl md:text-4xl"
              format={(value) => {
                const val = Math.ceil(value);
                const padded = val.toString().padStart(2, "0");
                return `${padded}+ components`;
              }}
            />
          </AnimatedGradientText>
        </div>
      </motion.div>
      <div className="flex flex-row flex-wrap gap-4">
        <motion.div
          initial={{
            scale: 0.3,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0.3, 1],
            rotate: [-12, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 0.1,
            duration: 0.3,
          }}
          className="flex h-24 flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-xl dark:border-gray-600 dark:bg-gray-900"
        >
          <div className={titleFont.className}>
            <MirrorText className="text-3xl md:text-4xl" text="Awesomeness" />
          </div>
        </motion.div>

        <motion.div
          initial={{
            scale: 0.5,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0.5, 1],
            opacity: [0, 1],
          }}
          transition={{
            delay: 0.15,
            duration: 0.3,
          }}
          className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-xl dark:border-gray-600 dark:bg-gray-900"
        >
          <ModeSwitcher />
        </motion.div>
      </div>

      <motion.div
        initial={{
          scale: 0.5,
          rotate: 0,
          opacity: 0,
        }}
        animate={{
          scale: [0.5, 1],
          rotate: [12, 0],
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.2,
          duration: 0.2,
        }}
        className="relative overflow-hidden"
      >
        <RemountOnMouseIn
          duration={3000}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-xl dark:border-gray-600 dark:bg-gray-900"
        >
          <TypingText
            smooth
            alwaysVisibleCount={0}
            delay={100}
            repeat={false}
            text="Bring your site to life with these ready to use animated components & interaction built using React, Framer Motion, and Tailwind CSS."
          />
        </RemountOnMouseIn>
      </motion.div>
    </div>
  );
}
