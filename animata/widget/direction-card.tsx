"use client";
import { ArrowUp, CornerUpLeft, CornerUpRight } from "lucide-react";
import { type ElementType, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Direction {
  distance: number;
  direction: string;
  to: string;
  iconType: ElementType;
}

interface IDirectionCardProps {
  directionValues: Direction[];
  duration?: number;
}

export const testDirectionProps: IDirectionCardProps = {
  directionValues: [
    {
      distance: 350,
      direction: "right",
      to: "Gurkha St.",
      iconType: CornerUpRight,
    },
    {
      distance: 700,
      direction: "left",
      to: "Rounding St.",
      iconType: CornerUpLeft,
    },
    {
      distance: 100,
      direction: "left",
      to: "Fulbari marga",
      iconType: CornerUpLeft,
    },
    {
      distance: 1000,
      direction: "straight",
      to: "hwy 16",
      iconType: ArrowUp,
    },
  ],
};

function DirectionCard({
  directionValues = testDirectionProps.directionValues,
  duration = 5000,
}: IDirectionCardProps) {
  const [directionState, setDirectionState] = useState({ currentIndex: 0, progress: 0 });
  const { currentIndex, progress } = directionState;
  const directionCount = directionValues.length;

  const prevIconType =
    directionValues[(currentIndex - 1 + directionCount) % directionCount].iconType;
  const currentIconType = directionValues[currentIndex].iconType;
  const nextIconType = directionValues[(currentIndex + 1) % directionCount].iconType;

  useEffect(() => {
    const changeDirectionInterval = setInterval(() => {
      setDirectionState((state) => ({
        currentIndex: (state.currentIndex + 1) % directionCount,
        progress: 0,
      }));
    }, duration ?? 5000);

    const progressIncrement = 100 / ((duration ?? 5000) / 100);
    const progressInterval = setInterval(() => {
      setDirectionState((state) => ({
        ...state,
        progress: state.progress >= 100 ? 100 : state.progress + progressIncrement,
      }));
    }, 100);

    return () => {
      clearInterval(changeDirectionInterval);
      clearInterval(progressInterval);
    };
  }, [duration, directionCount]);

  const currentDirection = directionValues[currentIndex];

  const renderIcon = (IconComponent: ElementType, size = 52, color = "text-gray-300") => (
    <IconComponent size={size} className={cn("text-white", color)} />
  );
  return (
    <div className="direction-card flex size-52 items-start justify-between rounded-3xl bg-black p-4">
      <div className="direction-container flex h-full w-[80%] flex-col items-center justify-center gap-3">
        <p className="text-3xl font-bold text-white">
          {currentDirection.distance}
          <span className="text-black/50">m</span>
        </p>
        <p className="animate-pulse">{renderIcon(currentIconType, 52, "text-white")}</p>
        <p className="text-md h-8 w-20 text-ellipsis break-all text-center text-gray-400">
          {currentDirection.to}
        </p>
      </div>
      <div className="progress-icon-container flex h-full w-[100px] flex-row-reverse justify-around">
        <div className="relative flex flex-col justify-evenly">
          <div
            style={{ boxShadow: "inset 0px -30px 20px 0px black" }}
            className="absolute inset-0 shadow"
          />
          {renderIcon(prevIconType, 32)}
          {renderIcon(currentIconType, 32, "text-green-300")}
          {renderIcon(nextIconType, 32)}
        </div>
        <div
          style={{ height: "100%" }}
          className="progress-bar flex h-full w-[6px] items-end rounded-xl bg-gray-400"
        >
          <div
            style={{ height: `${progress}%` }}
            className="progress-bar h-full w-[6px] rounded-xl bg-green-300 shadow-glow2"
          />
        </div>
      </div>
    </div>
  );
}

export default DirectionCard;
