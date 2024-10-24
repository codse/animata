import React from "react";
import { ArrowRight } from "lucide-react";

interface SlideArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  primaryColor?: string;
}

export default function SlideArrowButton({
  text = "Get Started",
  primaryColor = "#6f3cff",
  className = "",
  ...props
}: SlideArrowButtonProps) {
  return (
    <button
      className={`group relative rounded-full border border-white bg-white p-2 text-xl font-semibold ${className}`}
      {...props}
    >
      <div
        className="absolute left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="mr-3 text-white transition-all duration-200 ease-in-out">
          <ArrowRight size={20} />
        </span>
      </div>
      <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}
