import { motion } from "framer-motion";
import { Anaheim } from "next/font/google";

import MirrorText from "@/animata/text/mirror-text";
import TypingText from "@/animata/text/typing-text";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import ModeSwitcher from "./mode-switcher";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

function HeroExamples() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-4">
        <motion.div
          initial={{
            scale: 0.3,
            rotate: 0,
          }}
          animate={{
            scale: [0.3, 1],
            rotate: [-12, 0],
          }}
          transition={{
            duration: 0.3,
          }}
          className="flex h-24 flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
        >
          <div className={titleFont.className}>
            <MirrorText text="Awesomeness" />
          </div>
        </motion.div>

        <motion.div
          initial={{
            scale: 0.5,
            rotate: 0,
          }}
          animate={{
            scale: [0.5, 1],
          }}
          transition={{
            delay: 0.1,
            duration: 0.3,
          }}
          className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
        >
          <ModeSwitcher />
        </motion.div>
      </div>

      <motion.div
        initial={{
          scale: 0.5,
          rotate: 0,
        }}
        animate={{
          scale: [0.5, 1],
          rotate: [12, 0],
        }}
        transition={{
          delay: 0.2,
          duration: 0.2,
        }}
        className="overflow-hidden"
      >
        <RemountOnMouseIn
          duration={3000}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
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

export default HeroExamples;
