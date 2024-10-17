import React, { useState } from "react";

// Renaming the interface to PolarisButtonProps
interface PolarisButtonProps {
  text?: string; // Made text optional and set default in destructuring
}

export default function PolarisButton({ text = "Get started" }: PolarisButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <button
        className={`h-12 w-40 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-black transition-all duration-200 ease-in-out ${isClicked ? "border-t-4 border-gray-300" : "border-b-2 border-gray-300"}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}
