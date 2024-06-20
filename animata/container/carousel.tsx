import React, { useState } from 'react';
import { StepBack, StepForward } from "lucide-react";
interface ICarouselItem {
  id: number;
  title: string;
  image: string;
}
interface ICarouselProps {
  items: ICarouselItem[];
}

export default function Carousel({ items: initialItems }: ICarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + initialItems.length) % initialItems.length);
  };
  const visibleIndices = [
    (currentIndex - 1 + initialItems.length) % initialItems.length,
    currentIndex,
    (currentIndex + 1) % initialItems.length,
  ];

  const visibleItems = visibleIndices.map(index => initialItems[index]);

  return (
    <div className="carousel-container w-[600px] h-[500px] bg-white border-2 border-gray-200 rounded-2xl p-2 relative overflow-hidden">
      <div onClick={handlePrev} className="navigation-item-left bg-gray-400 h-10 w-10 absolute left-0 top-[50%] translate-y-[-50%] flex justify-center items-center cursor-pointer z-20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 rounded-lg
">
        <StepBack className="text-gray-800" />
      </div>
      <div onClick={handleNext} className="navigation-item-right bg-gray-300 h-10 w-10 absolute right-0 top-[50%] translate-y-[-50%] flex justify-center items-center cursor-pointer z-20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 rounded-lg">
        <StepForward className="text-gray-800" />
      </div>{visibleItems.map((item, index) => (
        <div key={item.id}
          className={`absolute z-10 top-[20%] left-[50%] w-[200px] h-[250px] rounded-xl bg-gray-500 animate-fadeIn`}
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            transform: index === 1 ? 'translateX(-50%) scale(1.1)' : index === 0 ? 'translateX(-150%) rotate(-20deg)' : 'translateX(50%) rotate(20deg)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
            filter: index === 1 ? 'none' : 'blur(4px)',
            zIndex: index === 1 ? 3 : 1
          }}>
        </div>
      ))}
    </div>
  );
}
