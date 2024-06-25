"use client";

import { useEffect, useState } from "react";
import { Armchair } from "lucide-react";

const getTime = () => {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return now.toLocaleString("en-GB", options);
};

export default function FlightWidget() {
  const [formattedTime, setFormattedTime] = useState(getTime());

  useEffect(() => {
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const timeout = setTimeout(() => {
      setFormattedTime(getTime());
    }, secondsUntilNextMinute * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex h-52 w-52 overflow-hidden rounded-3xl text-black">
      <div className="relative w-16 items-center justify-evenly overflow-hidden bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="full absolute bottom-0 left-full flex h-16 w-52 origin-bottom-left -rotate-90 items-center justify-center gap-3 bg-pink-100">
          <div className="text-lg font-semibold tracking-widest text-red-700">AIR CANADA</div>
          <img
            src="https://seeklogo.com/images/A/air-canada-logo-A0180CCDB8-seeklogo.com.png"
            className="h-6 w-6"
            alt="Air Canada logo"
          />
        </div>
      </div>
      <div className="relative h-full w-36 bg-gradient-to-b from-blue-100 to-teal-100 p-4 text-sm">
        {/* The background should match the container's background */}
        <div className="absolute -left-2 -top-2 z-10 h-4 w-4 rounded-full bg-white dark:bg-zinc-800" />
        <div className="flex justify-around pb-2">
          <div className="flex flex-col text-2xl font-bold">
            <p>TOR</p>
            <p>NYC</p>
          </div>
          <div>
            <div className="mt-1.5 rounded-2xl bg-yellow-400 px-2 font-mono font-bold text-black/75">
              A50
            </div>
          </div>
        </div>
        <div className="mt-2 font-bold tracking-tight text-teal-500">Flight</div>
        <div className="flex items-center justify-between font-bold">
          <p>AC951</p>
          <p className="flex pr-2">
            <Armchair fill="black" /> 1A
          </p>
        </div>
        <div className="mt-2 font-bold tracking-tight text-teal-500">Date & time</div>
        <div className="flex font-bold">
          <p>{formattedTime}</p>
        </div>
        {/* The background should match the container's background */}
        <div className="absolute -bottom-2 -left-2 z-10 h-4 w-4 rounded-full bg-white dark:bg-zinc-800" />
      </div>
    </div>
  );
}
