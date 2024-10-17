"use client";

import React, { ElementType, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// default imports
import {
  FigmaLogoIcon,
  FramerLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  SquareIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

type IconSize = "1" | "2" | "3" | "4"; // source: https://www.radix-ui.com/themes/docs/components/icon-button

interface IconHoverProps {
  title: string; // default is Square
  size?: IconSize; // default is 4
}

const sizeClasses: Record<IconSize, string> = {
  "1": "w-6 h-6",
  "2": "w-7 h-7",
  "3": "w-8 h-8",
  "4": "w-10 h-10",
};

const textSizeClasses: Record<IconSize, string> = {
  "1": "text-sm",
  "2": "text-base",
  "3": "text-lg",
  "4": "text-xl",
};

const getIconForTitle = (title: string) => {
  const lowercaseTitle = title.toLowerCase().trim();
  const iconMap: { [key: string]: ElementType } = {
    framer: FramerLogoIcon,
    "twitter/x": TwitterLogoIcon,
    instagram: InstagramLogoIcon,
    linkedin: LinkedInLogoIcon,
    github: GitHubLogoIcon,
    figma: FigmaLogoIcon
  };

  // SquareIcon as default
  return (iconMap[lowercaseTitle] as ElementType) || SquareIcon;
};

// twitter -> Twitter, Twitter -> Twitter, twitter/x -> Twitter/X, Twitter/x -> Twitter/X
const capitalizeWithSlash = (str: string) => {
  return str
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("/");
};

export default function HoverInteraction({
  // default values
  title = "Square",
  size = "4",
}: IconHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const DynamicIcon = getIconForTitle(title);

  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];

  const formattedTitle = capitalizeWithSlash(title);

  const logoVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      scale: 0.5,
      rotate: 100,
    },
    visible: {
      opacity: 1,
      y: 13,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 13,
      scale: 0.5,
      rotate: 100,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="storybook-fix group relative flex min-h-[120px] w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`relative text-center font-medium text-muted-foreground transition-colors duration-200 group-hover:text-black ${textSizeClass}`}
      >
        {formattedTitle}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-full left-1/2"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              x: "-50%",
              originX: 0.5,
              originY: 1,
            }}
          >
            <DynamicIcon className={sizeClass} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
