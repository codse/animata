"use client";

import { BikeIcon } from "lucide-react";

import Progress from "@/animata/graphs/progress";
import SwapText from "@/animata/text/swap-text";
import { cn } from "@/lib/utils";

function CardStack() {
  const backgroundCards = [
    "bg-blue-500/20",
    "bg-yellow-500/30 ",
    "bg-green-500/40",
    "bg-red-500/50",
  ];

  const goal = 15;
  const progress = 30;

  return (
    <div className="relative w-full flex-1 place-content-end self-center">
      {backgroundCards.map((card, index) => (
        <div
          key={card}
          className={cn("mx-auto mb-[1px] h-[6px] rounded", card)}
          style={{
            width: `calc(100% - ${(backgroundCards.length - index) * 16}px)`,
          }}
        />
      ))}
      <div className="rounded-md bg-pink-500 px-4 py-2">
        <h3 className="text-md flex justify-between font-bold">
          <span>Goal</span>

          <SwapText
            initialText={`${goal}km`}
            finalText={`${(goal * progress) / 100}km`}
            textClassName="text-md text-gray-300"
          />
        </h3>
        <Progress progress={progress} />
      </div>
    </div>
  );
}

export default function Cycling({
  className,
  title = "Cycling",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("group flex h-52 w-52 flex-col rounded-3xl bg-zinc-900 p-4", className)}>
      <div className="flex justify-between gap-2">
        <div>
          <div className="rounded-full bg-yellow-400/10 p-2">
            <BikeIcon size={24} className="text-yellow-400" />
          </div>
        </div>

        <div className="flex-1 text-right">
          <span className="block text-xl font-bold uppercase text-gray-400">{title}</span>
          <span className="-mt-1 block text-sm text-gray-300">2h 30m</span>
        </div>
      </div>

      <CardStack />

      <div className="mt-1 flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
          width={16}
          height={16}
          className="group-hover:animate-pulse group-active:animate-pulse"
        >
          <defs>
            <clipPath id="a">
              <path d="M0 38h38V0H0v38Z"></path>
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="#be1931"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            />
          </g>
        </svg>
        <p className="mr-2 text-sm text-white">
          <strong>188</strong> BPM
        </p>
        <p className="text-sm text-white">
          <strong>130</strong> AVG
        </p>
      </div>
    </div>
  );
}
