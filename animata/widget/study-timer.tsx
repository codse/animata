import React from "react";
import { GraduationCap, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StudyTimerProps {
  segments: Segment[];
}

interface Segment {
  value: number;
  color: string;
}

export const testStudyTimerProps: StudyTimerProps = {
  segments: [
    { value: 57, color: "orange" },
    { value: 24, color: "pink" },
    { value: 26, color: "yellow" },
  ],
};

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = (totalMinutes * 60) % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const StudyTimer: React.FC<StudyTimerProps> = ({ segments = testStudyTimerProps.segments }) => {
  const totalMinutes = segments.reduce((acc, segment) => acc + segment.value, 0);
  const time = formatTime(totalMinutes);

  return (
    <div className="relative flex size-52 flex-col gap-1 rounded-3xl bg-zinc-900 p-4 text-white shadow-lg">
      <div className="flex items-center justify-between p-2">
        <button
          className={cn(
            "relative flex items-center justify-center px-4 py-2",
            "duration-1000 before:absolute before:inset-0 before:animate-pulse before:rounded-3xl before:border-2 before:border-sky-600",
          )}
        >
          <GraduationCap size={18} className="text-white" />
        </button>
        <div className="flex cursor-pointer items-center justify-center space-x-0.5 rounded-full bg-yellow-600 px-2 py-1 font-bold text-black">
          <XCircle size={10} className="fill-black text-yellow-600" />
          <span className="text-xs font-bold">21</span>
        </div>
      </div>
      <div className="mt-2 p-2">
        <div className="text-xl font-bold tracking-wider">{time}</div>
        <div className="flex justify-start space-x-2 overflow-x-auto text-sm">
          {segments.map((segment, index) => (
            <span
              key={index}
              className="flex items-center justify-center gap-2"
              style={{ color: segment.color }}
            >
              {segment.value}m
              {index !== segments.length - 1 && (
                <div className="h-1 w-1 rounded-full border-2 border-gray-600 bg-gray-600" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 space-x-0.5">
        {segments.map((segment, index) => (
          <SegmentBar key={index} segment={segment} totalSum={totalMinutes} />
        ))}
      </div>
    </div>
  );
};

const SegmentBar: React.FC<{ segment: Segment; totalSum: number }> = ({ segment, totalSum }) => {
  const widthPercent = (segment.value / totalSum) * 100;

  return (
    <div
      className="h-full rounded-b-sm rounded-t-sm"
      style={{
        width: `${widthPercent}%`,
        backgroundColor: segment.color,
      }}
    />
  );
};

export default StudyTimer;
