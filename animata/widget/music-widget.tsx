"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Pause, Play, StepBack, StepForward } from "lucide-react";
import Music from "@/public/widget/music.jpg";

export default function MusicWidget() {
  const [play, setPlay] = useState(false);

  const handleClick = () => {
    setPlay((prevValue) => !prevValue);
  };
  return (
    <div className="h-48 w-48 rounded-3xl bg-gradient-to-bl from-indigo-200 to-indigo-600 py-2 text-white">
      <div className="flex justify-around px-2 pb-1 pt-2">
        <div className="flex flex-col">
          <Image
            src={Music}
            alt="Album Pic"
            className="mb-1 h-20 w-20 rounded-2xl"
          />

          <p className="font-bold">Tamagotchi</p>
          <p className="font-semibold text-indigo-300">Young Mito</p>
        </div>
        <div className="mt-2 flex justify-center">
          <div className="z-10 h-6 w-6 rounded-full bg-white" />
          <div
            className={cn(
              "duration-800 absolute h-6 w-6 animate-ping rounded-full border-2 bg-gray-400 ease-in",
              `${!play && "hidden"} `,
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <StepBack size={25} fill="white" />
        <div onClick={handleClick}>
          {!play ? (
            <Play size={30} fill="white" />
          ) : (
            <Pause size={30} fill="white" />
          )}
        </div>
        <StepForward size={25} fill="white" />
      </div>
    </div>
  );
}
