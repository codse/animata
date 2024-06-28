"use client";
import { useState } from "react";
import { LaptopMinimal, LocateOff } from "lucide-react";

import FlipCard from "@/animata/card/flip-card";
import WaveReveal from "@/animata/text/wave-reveal";
import { cn } from "@/lib/utils";

interface SwapCardProps {
  firstImage?: string;
  secondImage?: string;
  firstImageClass?: string;
  secondImageClass?: string;
  firsttitle?: string;
  secondtitle?: string;
  firstdescription?: string;
  seconddescritpion?: string;
  story?: string;
}

export default function SwapCard({
  firstImage = "",
  secondImage = "",
  firstImageClass,
  secondImageClass,
  firstdescription = "first description",
  seconddescritpion = "second description",
  firsttitle = "first title",
  secondtitle = "second title",
  story = "Story",
}: SwapCardProps) {
  const [isFirstBoxVisible, setIsFirstBoxVisible] = useState(true);

  const handleSwap = () => {
    setIsFirstBoxVisible(!isFirstBoxVisible);
  };

  return (
    <div className="h-[50%] w-96 rounded-md bg-gray-100 p-4">
      <div className="flex h-full w-full gap-4 overflow-hidden">
        <button onClick={handleSwap} className="m-auto h-12 w-14 border-2 p-3">
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
              title={firsttitle}
              description={firstdescription}
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
              title={secondtitle}
              description={seconddescritpion}
              image={secondImage}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 font-bold text-black">
        <WaveReveal text={story} className="md:text-md text-md" />
      </div>
    </div>
  );
}
