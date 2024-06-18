"use client";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import BoldCopy from "@/animata/text/bold-copy";
import { cn } from "@/lib/utils";
import Curtain from "./_landing/curtain";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";
import NewsletterSection from "./_landing/newsletter";

const Thunder = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 200"
      className="h-40 w-40 animate-bounce"
    >
      <g clipPath="url(#cs_clip_1_misc-4)">
        <mask
          id="cs_mask_1_misc-4"
          style={{ maskType: "alpha" }}
          width="137"
          height="200"
          x="31"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="#fff"
            d="M82 124H44.017c-9.288 0-15.054-10.119-10.334-18.135l58.26-98.942C99.186-5.377 118-.23 118 14.053V76h37.982c9.288 0 15.054 10.12 10.334 18.135l-58.26 98.942C100.813 205.377 82 200.23 82 185.948V124z"
          ></path>
        </mask>
        <g mask="url(#cs_mask_1_misc-4)">
          <path fill="#fff" d="M200 0H0v200h200V0z"></path>
          <path
            fill="url(#paint0_linear_748_5038)"
            d="M200 0H0v200h200V0z"
          ></path>
          <g filter="url(#filter0_f_748_5038)">
            <path fill="#18A0FB" d="M216 79H96v135h120V79z"></path>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_748_5038"
          width="245"
          height="260"
          x="33.5"
          y="16.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_748_5038"
            stdDeviation="31.25"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_748_5038"
          x1="38"
          x2="119"
          y1="14.5"
          y2="181.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE500"></stop>
          <stop offset="1" stopColor="#07FFE1"></stop>
        </linearGradient>
        <clipPath id="cs_clip_1_misc-4">
          <path fill="#fff" d="M0 0H200V200H0z"></path>
        </clipPath>
      </defs>
      <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_misc-4)">
        <path
          fill="gray"
          stroke="transparent"
          d="M200 0H0v200h200V0z"
          filter="url(#cs_noise_1_misc-4)"
        ></path>
      </g>
      <defs>
        <filter
          id="cs_noise_1_misc-4"
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

const HighlightExpand = () => {
  return (
    <span className="absolute -bottom-[1px] z-0 h-0.5 w-full bg-blue-300 transition-all ease-slow group-hover:h-full dark:bg-lime-300" />
  );
};

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="group relative inline-block">
      <HighlightExpand />
      <span className="relative px-0.5 transition-colors group-hover:text-blue-900 dark:group-hover:text-lime-900">
        {children}
      </span>
    </span>
  );
};

const faq = [
  {
    question: "What is Animata?",
    answer:
      "Animata is a curated collection of hand-crafted animations, effects, and interactions that you can seamlessly integrate into your project with a simple copy and paste.",
  },
  {
    question: "Who is this for?",
    answer:
      "Animata is designed for developers of all skill levels, from beginners to professionals, who want to enhance their websites with animations without spending extensive time on development.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Animata is completely free and open-source. You can use it in both personal and commercial projects.",
  },
  {
    question: "Why should I care?",
    answer: (
      <span>
        Small animations can significantly enhance the user experience by making
        websites more engaging and enjoyable. Animata offers a diverse
        collection of <Highlight>animations</Highlight>,{" "}
        <Highlight>effects</Highlight>, and <Highlight>interactions</Highlight>{" "}
        to elevate your projects effortlessly.
      </span>
    ),
  },
  {
    question: "I can make these myself. Why should I use this?",
    answer:
      "While you certainly can create animations yourself, using Animata saves you time and effort. Plus, you can learn from our implementations and even contribute to improving them.",
  },
  {
    question: "Who is behind Animata?",
    answer:
      "Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time.",
  },
  {
    question: "Sounds amazing, how do I use it?",
    answer:
      "Animata will be available by the end of June. Enter your email below to be notified as soon as we go live.",
  },
];

function FaqItem({ index }: { index: number }) {
  const item = faq[index];
  const count = (
    <BoldCopy
      text={String(index + 1)}
      className="w-fit bg-transparent px-0 md:px-0"
      textClassName="text-md md:text-xl"
      backgroundTextClassName="text-2xl md:text-5xl"
    />
  );

  return (
    <div
      key={`question-${index}`}
      className={cn({
        "mb-4": index !== faq.length - 1,
      })}
    >
      <h3 className="relative flex flex-shrink-0 flex-wrap items-center gap-4">
        {count}
        <span className="inline-block w-3/4 text-lg font-medium md:text-xl">
          {item.question}
        </span>
      </h3>
      <div className="flex gap-4">
        <div className="invisible h-0">{count}</div>
        <div className="text-muted-foreground">{item.answer}</div>
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="relative mx-auto max-w-5xl">
      <BoldCopy
        text="FAQ"
        className="mb-4 border border-gray-200 dark:border-zinc-800"
      />
      {faq.map((_, index) => {
        return <FaqItem key={`item-${index}`} index={index} />;
      })}
    </section>
  );
}

export default function IndexPage() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(#444cf715 1px, transparent 1px), linear-gradient(to right, #444cf715 1px, transparent 1px)",
        backgroundSize: "55px 55px",
      }}
      className="bg-background"
    >
      <div className="container relative flex w-full flex-col gap-8 py-12 md:py-24">
        <Hero />
        <FeatureSection />
        <FaqSection />

        <NewsletterSection />
      </div>
      <div className="flex w-full items-center justify-center">
        <AnimatedGradientText className="from-yellow-500 via-lime-500 to-green-500 text-5xl font-black uppercase">
          Copy
        </AnimatedGradientText>
        <Thunder />
        <AnimatedGradientText className="from-blue-500 via-violet-500 to-purple-500 text-5xl font-black uppercase">
          Paste
        </AnimatedGradientText>
      </div>
      <Curtain />
    </div>
  );
}
