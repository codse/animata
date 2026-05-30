"use client";

import { Facebook, Instagram, Music, Twitter, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useId, useState } from "react";

import { cn } from "@/lib/utils";

function GooeyEffect({
  children,
  intensity = 8,
  contrast = 18,
  lightness = -7,
  className,
  filterId,
}: {
  children: ReactNode;
  intensity?: number;
  contrast?: number;
  lightness?: number;
  className?: string;
  filterId: string;
}) {
  return (
    <motion.div
      style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
      className={cn("flex flex-wrap rounded-sm", className)}
    >
      <svg aria-hidden className="absolute size-0" xmlns="http://www.w3.org/2000/svg">
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

export interface SocialTabItem {
  title: string;
  icon: ReactNode;
  color: string;
}

const defaultItems: SocialTabItem[] = [
  {
    title: "Twitter",
    icon: <Twitter className="size-6 shrink-0" aria-hidden />,
    color: "bg-sky-400 hover:bg-sky-500 active:bg-sky-700",
  },
  {
    title: "Instagram",
    icon: <Instagram className="size-6 shrink-0" aria-hidden />,
    color: "bg-rose-400 hover:bg-rose-500 active:bg-rose-800",
  },
  {
    title: "Facebook",
    icon: <Facebook className="size-6 shrink-0" aria-hidden />,
    color: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
  },
  {
    title: "Youtube",
    icon: <Youtube className="size-6 shrink-0" aria-hidden />,
    color: "bg-red-400 hover:bg-red-500 active:bg-red-800",
  },
  {
    title: "TikTok",
    icon: <Music className="size-6 shrink-0" aria-hidden />,
    color: "bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950",
  },
];

interface SocialTabProps {
  item: SocialTabItem;
  index: number;
  activeIndex: number;
  itemsLen: number;
  onSelect: (index: number) => void;
}

function SocialTab({ item, index, activeIndex, itemsLen, onSelect }: SocialTabProps) {
  const isActive = activeIndex === index;

  return (
    <motion.button
      type="button"
      layout
      initial={false}
      aria-expanded={isActive}
      aria-label={isActive ? item.title : `${item.title}, collapsed`}
      onClick={() => onSelect(isActive ? -1 : index)}
      animate={{ width: isActive ? "auto" : 48 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className={cn(
        "relative flex h-10 shrink-0 cursor-pointer select-none items-center overflow-hidden py-2 text-white",
        item.color,
        isActive && "rounded-full px-3",
        !isActive && "justify-center rounded-sm px-2",
        isActive && index !== 0 && index !== itemsLen - 1 && "mx-2",
        isActive && index === 0 && "mr-2",
        isActive && index === itemsLen - 1 && "ml-2",
      )}
    >
      <span className="flex h-6 items-center gap-2">
        {item.icon}
        <motion.span
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            width: isActive ? "auto" : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="select-none overflow-hidden whitespace-nowrap text-sm font-medium"
        >
          {item.title}
        </motion.span>
      </span>
    </motion.button>
  );
}

export interface SocialProps {
  items?: SocialTabItem[];
  className?: string;
}

export default function Social({ items = defaultItems, className }: SocialProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const filterId = `gooey-social-${useId().replace(/:/g, "")}`;

  return (
    <GooeyEffect
      filterId={filterId}
      intensity={6}
      className={cn(activeIndex !== -1 && "px-0", className)}
    >
      {items.map((item, index) => (
        <SocialTab
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
