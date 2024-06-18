"use client";

import BoldCopy from "@/animata/text/bold-copy";
import { useState } from "react";
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
      <g clip-path="url(#cs_clip_1_misc-4)">
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
          <stop stop-color="#FFE500"></stop>
          <stop offset="1" stop-color="#07FFE1"></stop>
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
    <span className="absolute z-0 h-full w-1 bg-blue-300 transition-all group-hover:w-full dark:bg-lime-300" />
  );
};

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="group relative inline-block">
      <HighlightExpand />
      <span className="relative px-0.5 font-mono transition-colors group-hover:text-blue-900 dark:group-hover:text-lime-900">
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
    question: "Why does it matter?",
    answer:
      "Small animations can significantly enhance the user experience by making websites more engaging and enjoyable. Animata offers a diverse collection of animations, effects, and interactions to elevate your projects effortlessly.",
  },
  {
    question: "I can create these animations myself. Why should I use Animata?",
    answer:
      "While you certainly can create animations yourself, using Animata saves you time and effort. Plus, you can learn from our implementations and even contribute to improving them.",
  },
  {
    question: "Who is behind Animata?",
    answer:
      "Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time.",
  },
  {
    question: "Sounds amazing, where do I sign up?",
    answer:
      "Animata will be available by the end of June. Enter your email below to be notified as soon as we go live.",
  },
];

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-5xl">
      <BoldCopy text="FAQ" />
      {faq.map((item, index) => {
        return (
          <div className="flex flex-row" key={`question-${index}`}>
            <h3
              className="flex flex-1 flex-shrink-0 flex-wrap"
              onClick={() => setActiveIndex(index)}
            >
              <BoldCopy
                text={String(index + 1)}
                className="w-fit bg-transparent"
              />
              {item.question}
            </h3>
            <div className="flex-1">{item.answer}</div>
          </div>
        );
      })}
    </section>
  );
}

export default function IndexPage() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(#444cf722 1px, transparent 1px), linear-gradient(to right, #444cf722 1px, transparent 1px)",
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
        <span className="text-4xl font-black uppercase text-yellow-500">
          Copy
        </span>
        <Thunder />
        <span className="text-4xl font-black uppercase text-blue-500">
          Paste
        </span>
      </div>
      <Curtain />
    </div>
  );
}
