"use client";
import { cn } from "@/lib/utils";
import React from "react";
interface SwipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firsttext: string;
  secondtext: string;
  borderColor?: string;
  className?: string;
  firstBg: string;
  secondBg: string;
  firstTextColor: string;
  secondTextColor: string;
}

export default function SwipeButton({
  firsttext,
  secondtext,
  className,
  borderColor,
  firstBg,
  secondBg,
  firstTextColor,
  secondTextColor,
  ...props
}: SwipeButtonProps) {
  return (
    <button
      style={{ borderColor: borderColor }}
      {...props}
      className={cn(
        "group relative inline-flex min-h-16 w-48 items-center justify-center overflow-hidden rounded-md border-2 p-3 font-medium shadow-md transition duration-500 ease-out",
        className,
      )}
    >
      <span
        style={{ backgroundColor: secondBg, color: secondTextColor }}
        className={cn(
          "ease absolute inset-0 flex h-full w-full translate-y-full items-center justify-center text-2xl font-bold duration-500 group-hover:translate-y-0",
        )}
      >
        {secondtext}
      </span>
      <span
        style={{ backgroundColor: firstBg, color: firstTextColor }}
        className={cn(
          "ease absolute flex h-full w-full transform items-center justify-center text-2xl font-bold transition-all duration-500 group-hover:-translate-y-full",
        )}
      >
        {firsttext}
      </span>
    </button>
  );
}
