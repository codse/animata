"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

interface SpeedialProps {
  direction: string;
  actionButtons: Array<{
    icon: React.ReactNode;
    label: string;
    key: string;
    action: () => void;
  }>;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  direction: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, direction }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className="relative inline-block">
      {children}
      {visible && (
        <div
          className={` ${
            direction === "up" || direction === "down"
              ? "absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-sm text-white"
              : "absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-sm text-white"
          } `}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default function Speeddial({ direction, actionButtons }: SpeedialProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimation = () => {
    switch (direction) {
      case "up":
        return "origin-bottom flex-col order-0";
      case "down":
        return "origin-top flex-col order-2";
      case "left":
        return "origin-right order-0";
      case "right":
        return "origin-left order-2";
      default:
        return "";
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-xl bg-white border border-white rounded-xl shadow-lg transition-all duration-300";
  };

  //customize your action buttons here

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className={`relative mb-3 flex w-fit items-center gap-3 ${
        direction === "up" || direction === "down" ? "flex-col" : "flex-row"
      }`}
    >
      <button
        onMouseEnter={handleMouseEnter}
        className={`${getGlassyClasses()} order-0 order-1 flex items-center p-3 text-gray-800 transition-all duration-300 hover:bg-slate-100`}
      >
        <Plus size={20} />
      </button>

      {/* Speed Dial Actions */}
      <div
        className={`${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } flex items-center gap-3 transition-all duration-500 ease-in-out ${getAnimation()}`}
      >
        {actionButtons.map((action, index) => (
          <Tooltip text={action.label} key={index} direction={direction}>
            <button
              key={index}
              onClick={action.action}
              className={`${getGlassyClasses()} flex items-center p-3 text-gray-800 transition-all duration-300 hover:bg-slate-100`}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
