"use client";
import { createContext, useState, useContext, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  hoverEffect,
  tiltEffect = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  hoverEffect?: boolean;
  tiltEffect?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const mousePosition = { x: e.clientX - left, y: e.clientY - top };
    setMousePosition(mousePosition);
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    tiltEffect && (containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`);
  };
  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center py-20", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className,
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
          {hoverEffect && isMouseEntered && (
            <div
              className="absolute h-32 w-32 rounded-full bg-gray-300 opacity-20 shadow-lg blur-xl dark:bg-gray-800"
              style={{
                position: "absolute",
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0,0,0,0.75)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  };

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
