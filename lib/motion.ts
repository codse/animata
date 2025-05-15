// This file provides compatibility between framer-motion and motion.dev
import { animate, inView, scroll, stagger, timeline } from "@motionone/dom";
import React, { createRef, useEffect, useRef, useState } from "react";

// Replacement for framer-motion's useInView hook
export function useInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    return inView(ref.current, () => {
      setIsInView(true);
      return () => setIsInView(false);
    });
  }, [ref]);

  return isInView;
}

// Replacement for framer-motion's motion components
export function createMotionComponent(element: keyof HTMLElementTagNameMap) {
  return function MotionComponent({
    children,
    whileHover,
    whileTap,
    initial,
    animate: animateProp,
    transition,
    ...props
  }: {
    children: React.ReactNode;
    whileHover?: Record<string, any>;
    whileTap?: Record<string, any>;
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    transition?: Record<string, any>;
    [key: string]: any;
  }) {
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!elementRef.current) return;

      // Apply initial animation if provided
      if (initial && animateProp) {
        animate(elementRef.current, [initial, animateProp], transition);
      } else if (animateProp) {
        animate(elementRef.current, animateProp, transition);
      }

      // Setup hover animations
      if (whileHover) {
        const element = elementRef.current;
        const originalStyles: Record<string, string> = {};
        
        // Store original styles to revert later
        Object.keys(whileHover).forEach((key) => {
          if (element.style[key as any]) {
            originalStyles[key] = element.style[key as any];
          }
        });

        const handleMouseEnter = () => {
          animate(element, whileHover, transition);
        };

        const handleMouseLeave = () => {
          animate(element, originalStyles, transition);
        };

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, [whileHover, whileTap, initial, animateProp, transition]);

    const Element = element as any;
    return React.createElement(
      Element,
      { ref: elementRef, ...props },
      children
    );
  };
}

// Create motion components
export const motion = {
  div: createMotionComponent("div"),
  span: createMotionComponent("span"),
  button: createMotionComponent("button"),
  a: createMotionComponent("a"),
  ul: createMotionComponent("ul"),
  li: createMotionComponent("li"),
  section: createMotionComponent("section"),
  article: createMotionComponent("article"),
  header: createMotionComponent("header"),
  footer: createMotionComponent("footer"),
  nav: createMotionComponent("nav"),
  main: createMotionComponent("main"),
  aside: createMotionComponent("aside"),
  h1: createMotionComponent("h1"),
  h2: createMotionComponent("h2"),
  h3: createMotionComponent("h3"),
  h4: createMotionComponent("h4"),
  h5: createMotionComponent("h5"),
  h6: createMotionComponent("h6"),
  p: createMotionComponent("p"),
  img: createMotionComponent("img"),
};

// Export other motion.dev functions
export { animate, inView, scroll, stagger, timeline };