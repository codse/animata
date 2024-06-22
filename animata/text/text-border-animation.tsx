"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TextProps {
  /**
   * Text to display
   */
  text: string;
}
export default function TextButtomBorder({ text = "Programming" }: TextProps) {
  const [isHoveredIn, setIsHoveredIn] = useState(false);
  const [isHoveredout, setIsHoveredOut] = useState(false);

  const handleHover = () => {
    setIsHoveredIn(true);
  };

  const handleHoverExit = () => {
    setIsHoveredIn(false);
    setIsHoveredOut(true);
  };

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
      <span className="text-5xl font-bold text-black">{text}</span>
      <svg width="100%" viewBox="0 0 100 2" preserveAspectRatio="none">
        <motion.rect
          width="100"
          height="2"
          fill="#FFD700"
          variants={{
            hovered: { x: "0%", opacity: 1 },
            unhovered: { x: "-100%", opacity: 0 },
          }}
          initial="unhovered"
          animate={isHoveredIn ? "hovered" : "unhovered"}
          transition={{ duration: 0.3 }}
        />
        {isHoveredout && (
          <motion.rect
            width="100"
            height="2"
            fill="#FFD700"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setIsHoveredOut(false)}
          />
        )}
      </svg>
    </div>
  );
}
