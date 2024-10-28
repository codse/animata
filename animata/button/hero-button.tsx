import React from "react";

export default function HeroButton() {
  return (
    <div className="flex h-[100px] items-center justify-center">
      <button className="duration-800 group relative flex h-[55.5px] w-[199.46px] items-center justify-between rounded-[5px] bg-gray-900 px-4 py-2 text-white shadow-md transition-all hover:shadow-lg">
        {/* Arrows container on the left with hover effect */}
        <div className="hero-button-arrows duration-350 pointer-events-none absolute left-[2px] top-[2px] z-10 flex h-[calc(100%-4px)] w-[48px] items-center justify-center overflow-hidden rounded-[4px] bg-[#DFFF4B] transition-all ease-in-out group-hover:w-[196px]">
          {/* Always visible arrow in the center */}
          <div className="relative flex h-10 w-10 items-center justify-center transition-opacity duration-300">
            <div className="relative h-4 w-4">
              <div className="absolute left-0 top-0 h-[2px] w-[2px] animate-moving-arrows-item-1 rounded-full bg-black"></div>
              <div className="absolute left-[3px] top-0 h-[2px] w-[2px] animate-moving-arrows-item-2 rounded-full bg-black"></div>
              <div className="absolute left-[3px] top-[3px] h-[2px] w-[2px] animate-moving-arrows-item-3 rounded-full bg-black"></div>
              <div className="absolute left-[6px] top-[3px] h-[2px] w-[2px] animate-moving-arrows-item-4 rounded-full bg-black"></div>
              <div className="absolute left-[6px] top-[6px] h-[2px] w-[2px] animate-moving-arrows-item-5 rounded-full bg-black"></div>
              <div className="absolute left-[9px] top-[6px] h-[2px] w-[2px] animate-moving-arrows-item-6 rounded-full bg-black"></div>
              <div className="absolute left-[3px] top-[9px] h-[2px] w-[2px] animate-moving-arrows-item-7 rounded-full bg-black"></div>
              <div className="absolute left-[6px] top-[9px] h-[2px] w-[2px] animate-moving-arrows-item-8 rounded-full bg-black"></div>
              <div className="absolute left-0 top-[12px] h-[2px] w-[2px] animate-moving-arrows-item-9 rounded-full bg-black"></div>
              <div className="absolute left-[3px] top-[12px] h-[2px] w-[2px] animate-moving-arrows-item-10 rounded-full bg-black"></div>
            </div>
          </div>

          {/* Additional arrows that appear when hovered */}
          <div className="absolute flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative flex h-6 w-6 items-center justify-center transition-opacity duration-300"
                >
                  <div className="relative h-4 w-4">
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 1} left-0 top-0`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 2} left-[3px] top-0`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 3} left-[3px] top-[3px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 4} left-[6px] top-[3px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 5} left-[6px] top-[6px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 6} left-[9px] top-[6px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 7} left-[3px] top-[9px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 8} left-[6px] top-[9px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 9} left-0 top-[12px]`}
                    ></div>
                    <div
                      className={`absolute h-[2px] w-[2px] rounded-full bg-black animate-moving-arrows-item-${index + 10} left-[3px] top-[12px]`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Text section on the extreme right with animation on hover */}
        <div className="flex items-center justify-center pl-[47px]">
          <span className="text-md transform font-medium transition-all duration-500 ease-in-out group-hover:-translate-x-2 group-hover:opacity-0">
            Book Your Demo
          </span>
        </div>
      </button>
    </div>
  );
}

// terminated
