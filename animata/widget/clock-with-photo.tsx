"use client";

import Image from "next/image";
import JumpingMan from "public/jumping-man.png";
import { useEffect, useState } from "react";
import HillBackground from "public/bg-hills.jpg";

export default function ClockWithPhoto() {
  const [time, setTime] = useState({
    hoursTens: 0,
    hoursOnes: 0,
    minutesTens: 0,
    minutesOnes: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      setTime({
        hoursTens: Math.floor(hours / 10),
        hoursOnes: hours % 10,
        minutesTens: Math.floor(minutes / 10),
        minutesOnes: minutes % 10,
      });

      const secondsUntilNextMinute = 60 - now.getSeconds();
      setTimeout(updateTime, secondsUntilNextMinute);
    };

    updateTime();
  }, []);

  return (
    <div className="relative h-52 w-52 gap-2 rounded-3xl">
      <div className="relative flex h-full w-full items-center">
        <Image
          src={HillBackground}
          alt="Background"
          className="h-full w-full rounded-3xl object-cover"
        />
        <Image
          src={JumpingMan}
          alt="Your photo"
          className="absolute left-0 top-0 z-20 mt-2 h-48 w-44 p-2"
        />
      </div>
      <div className="absolute right-0 top-0 z-10 flex h-full w-2/4 items-center justify-center pr-4 text-8xl font-semibold tracking-tighter text-white">
        <div>
          <div>{time.hoursTens}</div>
          <div>{time.hoursOnes}</div>
        </div>
        <div>
          <div>{time.minutesTens}</div>
          <div>{time.minutesOnes}</div>
        </div>
      </div>
    </div>
  );
}
