"use client";
import type React from "react";

import { cn } from "@/lib/utils";

interface SwipeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firstText: string;
  secondText: string;
  className?: string;
  firstClass?: string;
  secondClass?: string;
}

export default function SwipeButton({
  className = "",
  secondText = "Get access",
  firstText = "Get access",
  firstClass = "bg-orange-500 text-white",
  secondClass = "bg-black text-white",
  ...props
}: SwipeButtonProps) {
  const common = "block px-4 py-2 text-2xl font-bold duration-300 ease-in-out";
  return (
    <button
      {...props}
      className={cn("group/button relative min-w-fit overflow-hidden rounded-md", className)}
    >
      <span
        className={cn(
          "absolute inset-0 translate-y-full group-hover/button:translate-y-0",
          common,
          secondClass,
        )}
      >
        {secondText}
      </span>
      <span className={cn("group-hover/button:-translate-y-full", common, firstClass)}>
        {firstText}
      </span>
    </button>
  );
}
