import React, { useEffect, useState } from "react";
import { Share } from "lucide-react";

interface ShareSheetProps {
  platforms: Array<{
    image: React.ReactNode;
    label: string;
    key: string;
    action: () => void;
  }>;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative inline-block"
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white">
          {text}
        </div>
      )}
    </div>
  );
};

export default function ShareSheet({ platforms }: ShareSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<null | (typeof platforms)[0]>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isExitAnimationActive, setIsExitAnimationActive] = useState(false);

  const toggleShareSheet = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    let animationFrame: number;
    if (selectedPlatform && !isExitAnimationActive) {
      const animate = () => {
        setAnimationProgress((prev) => {
          if (prev < 100) {
            animationFrame = requestAnimationFrame(animate);
            return prev + 0.5; // Slower animation
          }
          return 100;
        });
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [selectedPlatform, isExitAnimationActive]);

  useEffect(() => {
    if (animationProgress === 100) {
      setIsExitAnimationActive(true);
      const timer = setTimeout(() => {
        setSelectedPlatform(null);
        setAnimationProgress(0);
        setIsExitAnimationActive(false);
      }, 800); // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [animationProgress]);

  return (
    <div className="relative">
      <div className="relative h-12 w-12">
        <button
          onClick={toggleShareSheet}
          className={`absolute inset-0 flex transform items-center justify-center rounded-full border border-white bg-gray-800 text-white shadow-lg backdrop-blur-xl transition-all duration-500 ease-in-out ${
            isOpen || selectedPlatform ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          } ${isExitAnimationActive ? "animate-rise" : ""}`}
        >
          <Share size={20} />
        </button>
        {selectedPlatform && (
          <div
            className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-white transition-all duration-300 ${
              isExitAnimationActive ? "animate-fall" : ""
            }`}
            style={{
              background: `conic-gradient(blue ${animationProgress}%, transparent ${animationProgress}%)`,
            }}
          >
            {React.cloneElement(selectedPlatform.image as React.ReactElement, {
              className: "w-10 h-10 rounded-full",
            })}
          </div>
        )}
      </div>

      <div
        className={`absolute left-0 top-0 transform rounded-xl bg-gray-300 p-4 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ minWidth: "max-content" }}
      >
        <div className="flex flex-col gap-4">
          {platforms.map((platform, index) => (
            <Tooltip text={platform.label} key={index}>
              <button
                onClick={() => {
                  platform.action();
                  setIsOpen(false);
                  setSelectedPlatform(platform);
                }}
                className="flex w-full items-center gap-3 rounded-lg border p-2 text-gray-800 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-slate-100 hover:shadow-xl"
              >
                {React.cloneElement(platform.image as React.ReactElement, {
                  className: "w-12 h-12 rounded-full",
                })}
                <span className="text- font-bold">{platform.label}</span>
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
