"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedFollowButtonProps {
  initialText: React.ReactElement | string; // Text or element displayed initially
  changeText: React.ReactElement | string;  // Text or element displayed after the button is clicked
  className?: string; // ClassName prop for custom button styling
  changeTextClassName?: string; // ClassName prop for custom styling of changeText
  animationType?: "up-to-down" | "down-to-up" | "left-to-right" | "right-to-left" | "zoom-in" | "zoom-out"; // Prop to define animation type
}

const AnimatedFollowButton: React.FC<AnimatedFollowButtonProps> = ({
  initialText,
  changeText,
  className,
  changeTextClassName,
  animationType = "up-to-down", // Set default animation to "up-to-down"
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false); // Track button click state

  // Determine animation settings based on animationType prop
  const getAnimation = () => {
    switch (animationType) {
      case "down-to-up":
        return { initial: { y: 20 }, animate: { y: 0 }, exit: { y: 20 } }; // Down to up animation
      case "left-to-right":
        return { initial: { x: -20 }, animate: { x: 0 }, exit: { x: -20 } }; // Left to right animation
      case "right-to-left":
        return { initial: { x: 20 }, animate: { x: 0 }, exit: { x: 20 } }; // Right to left animation
      case "zoom-in":
        return { initial: { scale: 0.8 }, animate: { scale: 1 }, exit: { scale: 0.8 } }; // Zoom in animation
      case "zoom-out":
        return { initial: { scale: 1.2 }, animate: { scale: 1 }, exit: { scale: 1.2 } }; // Zoom out animation
      case "up-to-down":
      default:
        return { initial: { y: -20 }, animate: { y: 0 }, exit: { y: -20 } }; // Default: Up to down animation
    }
  };

  const animation = getAnimation(); // Get animation settings based on the selected type

  return (
    <AnimatePresence mode="wait">
      {isClicked ? (
        // Button after being clicked
        <motion.button
          className={`relative flex items-center justify-center w-[200px] h-16 overflow-hidden ${className}`} // Apply custom styling
          onClick={() => setIsClicked(false)} // On click, toggle button state
          initial={{ opacity: 0 }} // Initial animation for opacity
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Exit animation for opacity
        >
          {/* Change text with defined animation */}
          <motion.span
            key="clicked"
            className={`relative h-full w-full font-semibold flex items-center justify-center ${changeTextClassName}`} // Apply changeText className
            {...animation} // Apply selected animation
          >
            {changeText} {/* Display the changeText */}
          </motion.span>
        </motion.button>
      ) : (
        // Button before being clicked
        <motion.button
          className={`relative flex items-center justify-center w-[200px] h-16 cursor-pointer ${className}`} // Apply custom styling
          onClick={() => setIsClicked(true)} // On click, toggle button state
          initial={{ opacity: 0 }} // Initial animation for opacity
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Exit animation for opacity
        >
          {/* Initial text with defined animation */}
          <motion.span
            key="not-clicked"
            className="relative font-semibold flex items-center justify-center" // Flexbox for centering text
            {...animation} // Apply selected animation
          >
            {initialText} {/* Display the initialText */}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AnimatedFollowButton;
