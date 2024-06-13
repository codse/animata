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
  textColor = "text-white",
  hoverTextColor = "hover:text-black",
  hoverColor = "hover:after:bg-green-300",
  fontSize = "text-4xl",
  fontWeight = "font-bold",
  className,
}) => {
  return (
    <span
      className={cn(
        "relative inline-block cursor-pointer p-2",
        fontSize,
        textColor,
        fontWeight,
        "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:rounded-2xl after:bg-blue-500",
        "after:transition-all after:duration-300",
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
