"use client";
import React from "react";

import { cn } from "@/lib/utils";

export interface UnderlineHoverTextProps {
  text: string;
  textColor?: string;
  hoverTextColor?: string;
  hoverColor?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}

const UnderlineHoverText: React.FC<UnderlineHoverTextProps> = ({
  text,
  textColor = "text-yellow-600",
  hoverTextColor = "hover:text-white",
  hoverColor = "hover:after:bg-indigo-500",
  fontSize = "text-2xl",
  fontWeight = "font-medium",
  className,
}) => {
  return (
    <span
      className={cn(
        "relative inline-block cursor-pointer p-2",
        fontSize,
        textColor,
        fontWeight,
        "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gray-400",
        "after:transition-all after:duration-150",
        hoverTextColor,
        "hover:after:h-full",
        hoverColor,
        className,
      )}
    >
      <span className="relative z-10">{text}</span>
    </span>
  );
};

export default UnderlineHoverText;
