/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import { absoluteUrl, cn } from "@/lib/utils";

const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return {
    hoursTens: Math.floor(hours / 10),
    hoursOnes: hours % 10,
    minutesTens: Math.floor(minutes / 10),
    minutesOnes: minutes % 10,
  };
};

export default function ClockWithPhoto() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const updateTime = () => {
      const now = new Date();
      const secondsUntilNextMinute = 60 - now.getSeconds();
      setTime(getTime());
      timeout = setTimeout(updateTime, secondsUntilNextMinute * 1000);
    };

    updateTime();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="group relative h-52 w-52 gap-2 overflow-hidden rounded-3xl">
      <div className="relative flex h-full w-full items-center">
        <img
          src="https://images.unsplash.com/photo-1592205644721-2fe5214762ae?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Background"
          className="h-full w-full rounded-3xl object-cover transition-all group-hover:scale-105 group-hover:blur-[1px]"
        />
        <img
          src={absoluteUrl("/jumping-man.png")}
          alt="Your photo"
          className="absolute left-0 top-0 z-20 mt-2 h-48 w-44 p-2 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-0"
        />
      </div>
      <div
        className={cn(
          "absolute right-0 top-0 z-10 flex h-full w-fit flex-col items-center justify-center text-8xl font-black tabular-nums tracking-tighter text-white transition-all duration-500 group-hover:right-1/4",
        )}
      >
        <div className="flex">
          <div>{time.hoursTens}</div>
          <div>{time.hoursOnes}</div>
        </div>
        <div className="flex">
          <div>{time.minutesTens}</div>
          <div>{time.minutesOnes}</div>
        </div>
      </div>
    </div>
  );
}
