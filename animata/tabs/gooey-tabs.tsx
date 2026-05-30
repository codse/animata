"use client";

import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { type ReactNode, useId, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = 40;

function GooeyEffect({
  children,
  filterId,
  intensity = 8,
  contrast = 18,
  lightness = -7,
  className,
}: {
  children: ReactNode;
  filterId: string;
  intensity?: number;
  contrast?: number;
  lightness?: number;
  className?: string;
}) {
  return (
    <motion.div
      style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
      className={cn("flex flex-wrap rounded-sm", className)}
    >
      <svg aria-hidden className="absolute size-0" xmlns="http://www.w3.org/2000/svg">
        <title>Gooey filter</title>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={intensity} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${lightness}`}
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {children}
    </motion.div>
  );
}

export interface GooeyTabItem {
  title: string;
  icon: ReactNode;
  color: string;
}

const defaultItems: GooeyTabItem[] = [
  {
    title: "Twitter",
    icon: <TwitterLogo className="size-6 shrink-0" weight="regular" aria-hidden />,
    color: "bg-blue-400 hover:bg-blue-500 active:bg-blue-800",
  },
  {
    title: "Instagram",
    icon: <InstagramLogo className="size-6 shrink-0" weight="regular" aria-hidden />,
    color: "bg-rose-400 hover:bg-rose-500 active:bg-rose-800",
  },
  {
    title: "Facebook",
    icon: <FacebookLogo className="size-6 shrink-0" weight="regular" aria-hidden />,
    color: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
  },
  {
    title: "Youtube",
    icon: <YoutubeLogo className="size-6 shrink-0" weight="regular" aria-hidden />,
    color: "bg-red-400 hover:bg-red-500 active:bg-red-800",
  },
  {
    title: "TikTok",
    icon: <TiktokLogo className="size-6 shrink-0" weight="regular" aria-hidden />,
    color: "bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-800",
  },
];

interface GooeyTabButtonProps {
  item: GooeyTabItem;
  index: number;
  activeIndex: number;
  itemsLen: number;
  onSelect: (index: number) => void;
}

function GooeyTabButton({ item, index, activeIndex, itemsLen, onSelect }: GooeyTabButtonProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const isActive = activeIndex === index;
  const [width, setWidth] = useState(COLLAPSED_WIDTH);

  useLayoutEffect(() => {
    if (!isActive || !labelRef.current) {
      setWidth(COLLAPSED_WIDTH);
      return;
    }
    setWidth(labelRef.current.getBoundingClientRect().width + 32);
  }, [isActive]);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={item.title}
      onClick={() => onSelect(isActive ? -1 : index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(isActive ? -1 : index);
        }
      }}
      className={cn(
        "relative flex w-12 cursor-pointer gap-2 overflow-hidden px-4 py-2 text-white transition-all duration-200 ease-in-out",
        item.color,
        {
          rounded: isActive,
          "mx-4": isActive && activeIndex !== 0 && activeIndex !== itemsLen - 1,
          "mr-4": isActive && activeIndex === 0,
          "ml-4": isActive && activeIndex === itemsLen - 1,
          "pl-2": !isActive,
        },
      )}
      style={{ width }}
    >
      <div
        ref={labelRef}
        className="flex h-6 min-w-fit shrink-0 items-center gap-2 overflow-hidden transition-all duration-200 ease-in-out"
      >
        {item.icon}
        <span className="inline-block select-none whitespace-nowrap">{item.title}</span>
      </div>
    </motion.div>
  );
}

export interface GooeyTabsProps {
  items?: GooeyTabItem[];
  defaultActiveIndex?: number;
  className?: string;
}

export default function GooeyTabs({
  items = defaultItems,
  defaultActiveIndex = 0,
  className,
}: GooeyTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const filterId = `gooey-tabs-${useId().replace(/:/g, "")}`;

  return (
    <GooeyEffect
      filterId={filterId}
      intensity={6}
      className={cn({ "px-0": activeIndex !== -1 }, className)}
    >
      {items.map((item, index) => (
        <GooeyTabButton
          key={item.title}
          item={item}
          index={index}
          activeIndex={activeIndex}
          itemsLen={items.length}
          onSelect={setActiveIndex}
        />
      ))}
    </GooeyEffect>
  );
}
