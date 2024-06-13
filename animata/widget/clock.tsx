"use client";

import { Circle, Triangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Clock() {
  const [hoursTens, setHoursTens] = useState(0);
  const [hoursOnes, setHoursOnes] = useState(0);
  const [minutesTens, setMinutesTens] = useState(0);
  const [minutesOnes, setMinutesOnes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      setHoursTens(Math.floor(hours / 10));
      setHoursOnes(hours % 10);
      setMinutesTens(Math.floor(minutes / 10));
      setMinutesOnes(minutes % 10);

      const secondsUntilNextMinute = 60 - now.getSeconds();

      setTimeout(updateTime, secondsUntilNextMinute);
    };

    updateTime();
  }, []);
  return (
    <div className="h-48 w-52 rounded-3xl bg-zinc-800 text-white">
      <div className="flex h-[20%] justify-between p-4">
        <div className="flex">
          <img
            src="https://seeklogo.com/images/B/baltimore-orioles-logo-9CE23E31DB-seeklogo.com.png"
            className="mr-1 h-6 w-6"
          />
          <p className="mr-1 font-medium">BAL</p>
        </div>
        <div className="flex">
          <p className="mr-1 font-medium">CHI</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chicago_Cubs_Cap_Insignia.svg/519px-Chicago_Cubs_Cap_Insignia.svg.png"
            className="h-6 w-6 rounded-full border"
          />
        </div>
      </div>
      <div className="flex h-[55%] items-center justify-center">
        <div className="mr-2 flex">
          <div className="relative flex h-20 w-10 items-center justify-center rounded-lg border-4 border-black bg-neutral-800">
            <p className="text-5xl font-semibold">{hoursTens}</p>
            <div className="absolute mt-1 w-full border border-black"></div>
          </div>
          <div className="relative flex h-20 w-10 items-center justify-center rounded-lg border-4 border-l border-black bg-neutral-800">
            <p className="text-5xl font-semibold">{hoursOnes}</p>
            <div className="absolute mt-1 w-full border border-black"></div>
          </div>
        </div>
        <div className="flex">
          <div className="relative flex h-20 w-10 items-center justify-center rounded-lg border-4 border-black bg-neutral-800">
            <p className="text-5xl font-semibold">{minutesTens}</p>
            <div className="absolute mt-1 w-full border border-black"></div>
          </div>
          <div className="relative flex h-20 w-10 items-center justify-center rounded-lg border-4 border-l border-black bg-neutral-800">
            <p className="text-5xl font-semibold">{minutesOnes}</p>
            <div className="absolute mt-1 w-full border border-black"></div>
          </div>
        </div>
      </div>
      <div className="flex h-[25%] items-center justify-around rounded-b-3xl bg-black py-7 font-medium text-white">
        <div className="flex items-center">
          <Triangle fill="white" size={6} className="mr-1" /> 6<sup>th</sup>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-3 w-3">
            <div
              className="absolute h-1.5 w-1.5 rotate-45 transform bg-yellow-500"
              style={{ top: "-25%", left: "25%" }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rotate-45 transform bg-gray-500"
              style={{ top: "25%", left: "-25%" }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rotate-45 transform bg-gray-500"
              style={{ top: "25%", right: "-25%" }}
            ></div>
          </div>
          <div className="flex pt-1">
            <Circle size={8} fill="white" />
            <Circle size={8} color="grey" />
            <Circle size={8} color="grey" />
          </div>
        </div>
        <div className="">2-1</div>
      </div>
    </div>
  );
}
