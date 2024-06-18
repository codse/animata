"use client";

import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

interface IconRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon we want to have.
   */
  icon: React.ElementType;
  /**
   * Size of Icon
   */
  iconSize?: number;
  /**
   * Colour of the Icon
   */
  iconColor?: string;
  /**
   * Border colour that will have ripple animation
   */
  borderColour?: string;
  /**
   * Padding around the icon
   */
  inset?: string;
}

export default function IconRipple({
  icon: Icon = Mic,
  iconSize = 24,
  iconColor = "#ddd",
  borderColour = "#ddd",
  inset = "10px",
}: IconRippleProps) {
  const customBorderStyle = {
    borderColor: borderColour,
  };
  const insetStyle = {
    top: `-${inset}`,
    bottom: `-${inset}`,
    left: `-${inset}`,
    right: `-${inset}`,
  };

  const [hovering, setHovering] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hovering) {
      setAnimate(true);
    } else {
      timeout = setTimeout(() => setAnimate(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [hovering]);

  return (
    <div
      className={cn("relative flex items-center justify-center")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Icon size={iconSize} color={iconColor} />
      <div
        className={cn(
          "absolute -inset-4 rounded-full border-2 transition-all duration-1000",
          animate ? "animate-ping" : "opacity-100",
          // hovering || animate ? "opacity-90" : "opacity-100",
        )}
        style={{ ...customBorderStyle, ...insetStyle }}
      />
    </div>
  );
}
