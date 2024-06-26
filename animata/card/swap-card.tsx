"use client";
import { useState } from "react";
import { LaptopMinimal, LocateOff } from "lucide-react";

import { cn } from "@/lib/utils";

interface SwapCardProps {
  firstImage?: string;
  secondImage?: string;
  firstImageClass?: string;
  secondImageClass?: string;
}

export default function SwapCard({
  firstImage,
  secondImage,
  firstImageClass,
  secondImageClass,
}: SwapCardProps) {
  const [isFirstBoxVisible, setIsFirstBoxVisible] = useState(true);

  const handleSwap = () => {
    setIsFirstBoxVisible(!isFirstBoxVisible);
  };

  return (
    <div className="flex h-96 w-96 gap-4 overflow-hidden rounded-md bg-gray-100 p-4">
      <button onClick={handleSwap} className="m-auto h-12 w-14 rounded-md border-2 p-3">
        {isFirstBoxVisible ? <LaptopMinimal color="black" /> : <LocateOff color="black" />}
      </button>
      <div className="relative h-full w-full transition-transform duration-700 ease-in-out">
        <div
          className={cn(
            "absolute flex h-full w-full items-center justify-center p-4 transition-transform duration-700 ease-in-out",
            isFirstBoxVisible ? "translate-y-0 transform" : "-translate-y-full transform",
            firstImageClass,
          )}
        >
          <img src={firstImage} alt="first" className="h-full w-full rounded-lg" />
        </div>
        <div
          className={cn(
            "absolute flex h-full w-full items-center justify-center p-4 transition-transform duration-700 ease-in-out",
            isFirstBoxVisible ? "translate-y-full transform" : "translate-y-0 transform",
            secondImageClass,
          )}
        >
          <img src={secondImage} alt="second" className="h-full w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
