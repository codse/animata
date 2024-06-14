import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import React from "react";

function Progress() {
  const days = ["M", "T", "W", "TH", "F", "S", "SU"];
  return (
    <div className={cn("group min-h-40 w-52 rounded-3xl bg-amber-100 p-3")}>
      <div>
        <p className="text-sm font-semibold text-gray-500">Chris Dixon</p>
        <p className="text-lg font-bold text-black">Read Write Own</p>
      </div>
      <div className="mt-1 flex w-20 items-center justify-around rounded-full border-2 border-orange-400 p-1">
        <BookOpen size={20} color="orange" className="top-4" />
        <p className="text-sm font-bold text-black">30%</p>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {days.map((day, index) => (
          <svg
            key={index}
            width="42"
            height="42"
            viewBox="-25 -25 250 250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="16px"
              strokeDasharray="565.48px"
              strokeDashoffset="0"
            ></circle>
            <circle
              r="90"
              cx="100"
              cy="100"
              stroke="#ff8040"
              strokeWidth="16px"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="565.48px"
              strokeDashoffset="565.48px"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="565.48"
                to="118.692"
                dur="2s"
                fill="freeze"
              />
            </circle>
            <text
              className="text-6xl font-bold"
              x="100px"
              y="105px"
              fill="black"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{ transform: "rotate(90deg) translate(0px, -196px)" }}
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="2s"
                fill="freeze"
              />
              {day}
            </text>
          </svg>
        ))}
      </div>
    </div>
  );
}

export default Progress;
