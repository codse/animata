"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TextButtomBorder({
  text = "Programming",
}: {
  text: string;
}) {
  const [isHoveredIn, setIsHoveredIn] = useState(false);
  const [isHoveredout, setIsHoveredOut] = useState(false);

  const handleHover = () => {
    setIsHoveredIn(true);
  };

  const handleHoverExit = () => {
    setIsHoveredIn(false);
    setIsHoveredOut(true);
  };

  useEffect(() => {
    if (!isHoveredIn) {
      const timeoutId = setTimeout(() => setIsHoveredOut(false), 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isHoveredout]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
    >
      <span className="relative z-10 text-5xl font-bold text-black">
        {text}
      </span>
      <svg
        className="absolute bottom-0 left-0 h-1"
        width="100%"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
      >
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
          />
        )}
      </svg>
    </div>
  );
}
