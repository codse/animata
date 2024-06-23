"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
interface IToggleSwitchProps {
  onChecked?: () => void;
  className: string;
  circleClass: string;
}
const ToggleSwitch = ({
  onChecked,
  className,
  circleClass,
}: IToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (newCheckedState && onChecked) {
      onChecked();
    }
  };
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={cn(
              `box block h-8 w-14 rounded-full ${
                isChecked ? "bg-primary" : "bg-gray-400"
              }`,
              className,
            )}
          ></div>
          <div
            className={cn(
              `absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`,
              circleClass,
            )}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
