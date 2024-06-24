"use client";
import { useState } from "react";

interface IToggleSwitchProps {
  onChecked?: () => void;
}

const ToggleSwitch = ({ onChecked }: IToggleSwitchProps) => {
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
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-primary" : "bg-gray-400"
            }`}
          />
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          />
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
