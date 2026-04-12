"use client";
import { LaptopMinimal, LocateOff } from "lucide-react";
import { useState } from "react";

import FlipCard from "@/animata/card/flip-card";
import WaveReveal from "@/animata/text/wave-reveal";
import { cn } from "@/lib/utils";

interface SwapCardProps {
  firstImage?: string;
  secondImage?: string;
  firstImageClass?: string;
  secondImageClass?: string;
  firstTitle?: string;
  secondTitle?: string;
  firstDescription?: string;
  secondDescription?: string;
  story?: string;
}

export default function SwapCard({
  firstImage = "",
  secondImage = "",
  firstImageClass,
  secondImageClass,
  firstDescription = "first description",
  secondDescription = "second description",
  firstTitle = "first title",
  secondTitle = "second title",
  story = "Story",
}: SwapCardProps) {
  const [isFirstBoxVisible, setIsFirstBoxVisible] = useState(true);

  const handleSwap = () => {
    setIsFirstBoxVisible(!isFirstBoxVisible);
  };

  return (
    <div className="h-[50%] w-96 rounded-md bg-gray-100 p-4">
      <div className="flex h-full w-full gap-4 overflow-hidden">
        <button onClick={handleSwap} type="button" className="m-auto h-12 w-14 border-2 p-3">
          {isFirstBoxVisible ? <LaptopMinimal color="black" /> : <LocateOff color="black" />}
        </button>
        <div className="relative h-80 w-80 overflow-hidden bg-none transition-transform duration-700 ease-in-out">
          <div
            className={cn(
              "absolute flex h-full w-full items-center justify-center transition-transform duration-700 ease-in-out",
              isFirstBoxVisible ? "translate-y-0 transform" : "-translate-y-full transform",
              firstImageClass,
            )}
          >
            <FlipCard
              className="h-72"
              title={firstTitle}
              description={firstDescription}
              image={firstImage}
            />
          </div>
          <div
            className={cn(
              "bg-unset absolute flex h-full w-full items-center justify-center transition-transform duration-700 ease-in-out",
              isFirstBoxVisible ? "translate-y-full transform" : "translate-y-0 transform",
              secondImageClass,
            )}
          >
            <FlipCard
              className="h-72"
              title={secondTitle}
              description={secondDescription}
              image={secondImage}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 font-bold text-black">
        <WaveReveal
          mode="word"
          duration="300ms"
          text={story}
          className="md:text-md text-md font-medium"
        />
      </div>
    </div>
  );
}
