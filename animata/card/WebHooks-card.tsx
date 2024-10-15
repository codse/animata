import React, { useState } from "react";
interface webHooksCardCommentProps {
  leftBoxElem: string;
  rightBoxElem: string;
}

export const WebHooks = ({ leftBoxElem, rightBoxElem }: webHooksCardCommentProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Left Box */}
          <div
            className={`z-10 flex h-24 w-48 items-center justify-center rounded-lg border-4 bg-white text-xl font-bold transition-colors duration-500 ${
              isHovered ? "border-lime-500" : "border-gray-300"
            } bg-white`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>{leftBoxElem}</span>
          </div>

          {/* Connecting Line */}
          <div
            className={`absolute left-[192px] top-1/2 w-[105px] -translate-y-1/2 transform border-t-4 ${
              isHovered
                ? "border-solid border-lime-500 bg-lime-500"
                : "border-dotted border-gray-300 hover:border-solid"
            } transition-all duration-500`}
          />

          {/* Animated Ball */}
          <div
            className={`absolute left-[180px] top-1/2 -z-10 h-6 w-6 -translate-y-1/2 transform rounded-full bg-gray-300 transition-transform duration-500 ${
              isHovered ? "translate-x-[106px] bg-lime-500" : ""
            }`}
          />

          {/* Right Box */}
          <div
            className={`absolute left-[295px] top-0 z-10 flex h-24 w-48 items-center justify-center rounded-lg border-4 bg-white text-xl font-bold transition-colors duration-500 ${
              isHovered ? "border-lime-500" : "border-gray-300"
            } bg-white`}
          >
            <span>{rightBoxElem}</span>
          </div>
        </div>
      </div>
    </>
  );
};
