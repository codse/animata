'use client'
import { cn } from '@/lib/utils';
import { CornerUpLeft, CornerUpRight, ArrowUp } from 'lucide-react';
import React, { useState, useEffect, ReactNode, ElementType } from 'react';

interface Direction {
  distance: number;
  direction: string;
  to: string;
  iconType: ElementType;
}
interface IDirectionCardProps {
  directionValues: Direction[];
}
function DirectionCard({ directionValues }: IDirectionCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconState, setIconState] = useState({
    prevIconType: directionValues[directionValues.length - 1].iconType,
    currentIconType: directionValues[0].iconType,
    nextIconType: directionValues[1].iconType
  });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(5000);

  useEffect(() => {
    //this would change the states based on direction change. Currently set to setInterval.
    const changeDirectionInterval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % directionValues.length;
        const prev = newIndex === 0 ? directionValues[directionValues.length - 1].iconType : directionValues[newIndex - 1].iconType;
        const next = newIndex === directionValues.length - 1 ? directionValues[0].iconType : directionValues[newIndex + 1].iconType;
        setIconState({
          prevIconType: prev,
          currentIconType: directionValues[newIndex].iconType,
          nextIconType: next
        });
        return newIndex;
      });
      setProgress(0);
    }, duration);

    const progressIncrement = 100 / (duration / 100);
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
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
  }, [duration]);

  const currentDirection = directionValues[currentIndex];

  const renderIcon = (IconComponent: ElementType, size = 52, color = "text-gray-300") => (
    <IconComponent size={size} className={cn('text-white animate-pulse', color)} />
  );
  return (
    <div className="direction-card w-52 h-52 rounded-2xl bg-black p-2 py-6 flex justify-between items-start">
      <div className="direction-container flex justify-center gap-3 flex-col h-full w-[80%] items-center">
        <p className='text-white text-3xl animate-in'>{currentDirection.distance}m</p>
        {renderIcon(iconState.currentIconType, 52, "text-white")}
        <p className='text-md text-gray-400 w-20 h-8 break-all text-ellipsis text-center'>{currentDirection.to}</p>
      </div>
      <div className="progress-icon-container flex flex-row-reverse justify-around h-full w-[100px]">
        <div className='flex flex-col justify-evenly relative'>
          <div style={{ boxShadow: "inset 0px -30px 20px 0px black" }} className="shadow inset-0 absolute "></div>
          {renderIcon(iconState.prevIconType, 32)}
          {renderIcon(iconState.currentIconType, 32, "text-green-300")}
          {renderIcon(iconState.nextIconType, 32)}
        </div>
        <div style={{ height: '100%' }} className='progress-bar h-full w-[6px] rounded-xl flex items-end bg-gray-400'>
          <div style={{ height: `${progress}%` }} className="progress-bar h-full w-[6px] rounded-xl bg-green-300 shadow-glow2"></div>
        </div>
      </div>
    </div>
  );
}

export default DirectionCard;
