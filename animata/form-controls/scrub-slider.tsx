"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ScrubSliderProps {
  min?: number;
  max?: number;
  initialValue?: number;
  tickStep?: number;
}

const ScrubSlider: React.FC<ScrubSliderProps> = ({
  min = 0,
  max = 100,
  initialValue = 40,
  tickStep = 5,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = Math.round((x / rect.width) * (max - min) + min);
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const renderTicks = () => {
    const ticks = [];
    for (let i = min; i <= max; i += tickStep) {
      ticks.push(
        <div
          key={i}
          className="absolute h-8 w-0.5 bg-gray-300"
          style={{
            left: `${((i - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        />,
      );
    }
    return ticks;
  };

  return (
    <div
      className="slider-container relative w-72 rounded-2xl bg-white p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-8 w-full">{renderTicks()}</div>

      <motion.div
        className="indicator absolute -top-6 rounded-md bg-black px-2 py-1 text-white"
        style={{
          left: hoverValue
            ? `${((hoverValue - min) / (max - min)) * 100}%`
            : `${(value / max) * 100}%`,
          transform: "translateX(-50%)",
        }}
        animate={{
          left: hoverValue
            ? `${((hoverValue - min) / (max - min)) * 100}%`
            : `${(value / max) * 100}%`,
        }}
        transition={{ duration: 0.1 }}
      >
        {hoverValue ?? value}°C
      </motion.div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range-slider pointer-events-auto absolute top-0 h-2 w-full opacity-0"
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};

export default ScrubSlider;
