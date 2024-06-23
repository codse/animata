"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
interface SwipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firsttext: string;
  secondtext: string;
  borderColor?: string;
  className?: string;
  firstClass?: string;
  secondClass?: string;
}

export default function SwipeButton({
  firsttext,
  secondtext,
  className,
  borderColor,
  firstClass,
  secondClass,
  ...props
}: SwipeButtonProps) {
  return (
    <button
      style={{ borderColor: borderColor }}
      {...props}
      className={cn(
        "group relative overflow-hidden rounded-md border-2 font-medium transition duration-500 ease-out",
        className,
      )}
    >
      <span
        className={cn(
          "ease absolute flex h-full w-full translate-y-full items-center justify-center px-2 py-3 text-2xl font-bold duration-500 group-hover:translate-y-0",
          secondClass,
        )}
      >
        {secondtext}
      </span>
      <span
        className={cn(
          "ease flex items-center justify-center px-2 py-3 text-2xl font-bold duration-500 group-hover:-translate-y-full",
          firstClass,
        )}
      >
        {firsttext}
      </span>
    </button>
  );
}
