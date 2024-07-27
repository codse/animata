"use client";
import { ElementType, useEffect, useState } from "react";
import { ArrowUp, CornerUpLeft, CornerUpRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconState, setIconState] = useState({
    prevIconType: directionValues[directionValues.length - 1].iconType,
    currentIconType: directionValues[0].iconType,
    nextIconType: directionValues[1].iconType,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    //this would change the states based on direction change. Currently set to setInterval.
    const changeDirectionInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % directionValues.length;
        const prev =
          newIndex === 0
            ? directionValues[directionValues.length - 1].iconType
            : directionValues[newIndex - 1].iconType;
        const next =
          newIndex === directionValues.length - 1
            ? directionValues[0].iconType
            : directionValues[newIndex + 1].iconType;
        setIconState({
          prevIconType: prev,
          currentIconType: directionValues[newIndex].iconType,
          nextIconType: next,
        });
        return newIndex;
      });
      setProgress(0);
    }, duration ?? 5000);

    const progressIncrement = 100 / ((duration ?? 5000) / 100);
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        return prevProgress + progressIncrement;
      });
    }, 100);

    return () => {
      clearInterval(changeDirectionInterval);
      clearInterval(progressInterval);
    };
  }, [directionValues, duration]);

  const currentDirection = directionValues[currentIndex];

  const renderIcon = (IconComponent: ElementType, size = 52, color = "text-gray-300") => (
    <IconComponent size={size} className={cn("text-white", color)} />
  );
  return (
    <div className="direction-card flex size-52 items-start justify-between rounded-3xl bg-black p-4">
      <div className="direction-container flex h-full w-[80%] flex-col items-center justify-center gap-3">
        <p className="text-3xl font-bold text-white">
          {currentDirection.distance}
          <span className="text-opacity-50">m</span>
        </p>
        <p className="animate-pulse">{renderIcon(iconState.currentIconType, 52, "text-white")}</p>
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
          {renderIcon(iconState.prevIconType, 32)}
          {renderIcon(iconState.currentIconType, 32, "text-green-300")}
          {renderIcon(iconState.nextIconType, 32)}
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
