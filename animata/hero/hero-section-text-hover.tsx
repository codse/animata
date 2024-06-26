import React from "react";
import Image, { StaticImageData } from "next/image";
import { Map } from "lucide-react";

import img1 from "@/public/bg-hills.jpg";

interface DestinationProps {
  img: StaticImageData;
  position: string;
}

interface TreasureProps {
  emoji: string;
  position: string;
}

interface HeroCardProps {
  destinations?: DestinationProps[];
  treasures?: TreasureProps[];
}
const HeroSectionTextHover: React.FC<HeroCardProps> = () => {
  const destinations: DestinationProps[] = [
    {
      img: img1, //first image
      position: "-left-20 top-0 group-hover:-rotate-[10deg]  group-hover:-translate-y-16",
    },
    {
      img: img1, //second image
      position: " -left-24 top-0 group-hover:-rotate-[20deg]  group-hover:-translate-x-12",
    },
    {
      img: img1, //third image
      position:
        " left-[240px]  top-0 group-hover:rotate-[10deg] -top-3  group-hover:-translate-y-16",
    },
    {
      img: img1, //fourth image
      position: "left-[220px] -top-1 group-hover:rotate-[20deg] group-hover:translate-x-16",
    },
  ];

  const treasures: TreasureProps[] = [
    {
      emoji: "🦝",
      position: " -left-32 -top-16 -rotate-[30deg]  group-hover:-translate-y-8 ",
    },
    {
      emoji: "🍜",
      position: " -left-40 -top-2 group-hover:-rotate-45",
    },
    {
      emoji: "🏝️",
      position: " left-[200px] -top-20 rotate-[30deg] ",
    },
    {
      emoji: "💎",
      position: " left-[200px] -top-1  group-hover:rotate-[45deg]",
    },
  ];

  return (
    <div className="relative min-h-[100px] w-screen rounded-2xl border-2 border-gray-300">
      <div className="mb-2 flex cursor-pointer flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center p-5 text-2xl font-bold">
          <div className="mt-5">
            <Map size={40} className="fill-zinc-900 text-white" />
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">Explore</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-sky-400">Uncharted Destinations</span>

              <div className="absolute inset-0 opacity-0 transition-opacity [transition-duration:400ms] group-hover:opacity-100">
                {destinations.map((dest, index) => (
                  <Image
                    key={index}
                    src={dest.img}
                    alt={`destination ${index}`}
                    className={`absolute h-[40px] w-[40px] transform rounded-md transition-transform duration-500 group-hover:scale-110 ${dest.position}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">and</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-orange-500">Local Gems</span>

              <div className="absolute inset-0 opacity-0 transition-opacity [transition-duration:400ms] group-hover:opacity-100">
                {treasures.map((gem, index) => (
                  <span
                    key={index}
                    className={`absolute transform text-4xl transition-transform duration-500 group-hover:scale-110 ${gem.position} `}
                    role="img"
                  >
                    {gem.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="rounded-3xl bg-orange-400 px-4 py-2 font-mono tracking-tighter hover:bg-orange-500">
          start your journey
        </button>
      </div>
    </div>
  );
};

export default HeroSectionTextHover;
