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

const Egg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 200"
      className="absolute h-auto max-h-[500px] w-full max-w-[500px] opacity-25 dark:opacity-100"
    >
      <g clip-path="url(#cs_clip_1_misc-9)">
        <mask
          id="cs_mask_1_misc-9"
          style={{ maskType: "alpha" }}
          width="200"
          height="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="#fff"
            d="M8.475 78.884C27.008 22.9 70.833 4.108 89.905 1.464c110.239-15.283 132.313 92.87 90.046 148.772-36.448 48.204-100.638 57.186-139.16 44.676C6.86 183.894-11.983 140.686 8.475 78.884z"
          ></path>
        </mask>
        <g mask="url(#cs_mask_1_misc-9)">
          <path fill="#fff" d="M200 0H0v200h200V0z"></path>
          <path
            fill="url(#paint0_linear_748_4999)"
            d="M200 0H0v200h200V0z"
          ></path>
          <g filter="url(#filter0_f_748_4999)">
            <ellipse
              cx="143.777"
              cy="167.536"
              fill="#FF58E4"
              rx="91.994"
              ry="58.126"
              transform="rotate(-33.875 143.777 167.536)"
            ></ellipse>
            <ellipse
              cx="68.482"
              cy="38.587"
              fill="#00F0FF"
              rx="69.531"
              ry="47.75"
              transform="rotate(-26.262 68.482 38.587)"
            ></ellipse>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_748_4999"
          width="384.137"
          height="412.095"
          x="-77.372"
          y="-94.144"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_748_4999"
            stdDeviation="40"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_748_4999"
          x1="158.5"
          x2="29"
          y1="12.5"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0E6FFF"></stop>
          <stop offset="1" stop-color="#00F0FF"></stop>
        </linearGradient>
        <clipPath id="cs_clip_1_misc-9">
          <path fill="#fff" d="M0 0H200V200H0z"></path>
        </clipPath>
      </defs>
      <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_misc-9)">
        <path
          fill="gray"
          stroke="transparent"
          d="M200 0H0v200h200V0z"
          filter="url(#cs_noise_1_misc-9)"
        ></path>
      </g>
      <defs>
        <filter
          id="cs_noise_1_misc-9"
          width="100%"
          height="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            baseFrequency="0.6"
            numOctaves="5"
            result="out1"
            seed="4"
          ></feTurbulence>
          <feComposite
            in="out1"
            in2="SourceGraphic"
            operator="in"
            result="out2"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="out2"
            mode="overlay"
            result="out3"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default function HeroExamples() {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-6">
      <Egg />
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
      <div className="relative flex flex-row flex-wrap gap-4">
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
