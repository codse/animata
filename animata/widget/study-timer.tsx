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

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = (totalMinutes * 60) % 60;

  return `${hours > 0 ? `0${hours}:` : ""}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const StudyTimer: React.FC<StudyTimerProps> = ({ segments }) => {
  const totalMinutes = segments.reduce(
    (acc, segment) => acc + segment.value,
    0,
  );
  const time = formatTime(totalMinutes);

  return (
    <div className="min-h-52 w-64 rounded-3xl bg-zinc-900 p-4 text-white shadow-lg">
      <div className="flex items-center justify-between p-2">
        <button
          className={cn(
            "relative flex h-12 w-20 items-center justify-center rounded-md p-2",
            "before:animate-glow before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-sky-600",
          )}
        >
          <GraduationCap className="text-white" />
        </button>
        <div className="flex h-6 w-12 cursor-pointer items-center justify-center space-x-0.5 rounded-xl bg-yellow-600 font-bold text-black">
          <XCircle size={15} className="text-xl" />
          <span className="text-base font-bold">21</span>
        </div>
      </div>
      <div className="mt-2 p-2">
        <div className="text-3xl font-bold tracking-wider">{time}</div>
        <div className="mt-2 flex justify-start space-x-2 overflow-x-auto text-xl">
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
      <div className="mt-1 flex space-x-0.5">
        {segments.map((segment, index) => (
          <SegmentBar key={index} segment={segment} totalSum={totalMinutes} />
        ))}
      </div>
      <div className="mt-1 flex gap-1">
        <div className="mb-1 h-2 w-2 rounded-full bg-yellow-700" />
        <div className="h-2 w-2 rounded-full bg-yellow-700" />
      </div>
      <div className="h-2 w-2 rounded-full bg-yellow-700" />
    </div>
  );
};

const SegmentBar: React.FC<{ segment: Segment; totalSum: number }> = ({
  segment,
  totalSum,
}) => {
  const widthPercent = (segment.value / totalSum) * 100;

  return (
    <div
      className="h-20 rounded-b-lg rounded-t-lg"
      style={{
        width: `${widthPercent}%`,
        backgroundColor: segment.color,
      }}
    ></div>
  );
};

export default StudyTimer;
