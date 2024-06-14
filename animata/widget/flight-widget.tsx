"use client";

import { Armchair } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlightWidget() {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formatted = now.toLocaleString("en-GB", options).replace(",", "");

      setFormattedTime(formatted);

      const secondsUntilNextMinute = 60 - now.getSeconds();

      setTimeout(updateTime, secondsUntilNextMinute);
    };

    updateTime();
  }, []);

  return (
    <div className="relative h-48 w-48 text-black">
      <div className="absolute -left-[70px] top-[71px] z-10 flex h-1/4 w-full -rotate-90 items-center justify-evenly rounded-t-3xl bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="text-lg font-semibold tracking-widest text-red-700">
          AIR CANADA
        </div>
        <div>
          <img
            src="https://seeklogo.com/images/A/air-canada-logo-A0180CCDB8-seeklogo.com.png"
            className="h-6 w-6 rotate-90"
          />
        </div>
      </div>
      <div className="absolute right-0 h-full w-3/4 rounded-3xl rounded-l bg-gradient-to-b from-blue-100 to-teal-100 p-2 text-sm">
        <div className="absolute -left-2 -top-2 z-10 h-4 w-4 rounded-full bg-white"></div>
        <div className="flex justify-around pb-2">
          <div className="flex flex-col text-2xl font-medium">
            <p>TOR</p>
            <p>NYC</p>
          </div>
          <div>
            <div className="mt-2 rounded-2xl bg-yellow-400 px-2 font-bold">
              A50
            </div>
          </div>
        </div>
        <div className="mt-2 px-2 font-bold text-teal-500">FLIGHT</div>
        <div className="flex items-center justify-around font-bold">
          <p>AC951</p>
          <p className="flex pr-2">
            <Armchair fill="black" /> 1A
          </p>
        </div>
        <div className="mt-2 px-2 font-bold text-teal-500">Date & time</div>
        <div className="flex pl-2 font-bold">
          <p>{formattedTime}</p>
        </div>
        <div className="absolute -bottom-2 -left-2 z-10 h-4 w-4 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
