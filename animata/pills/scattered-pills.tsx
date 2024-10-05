"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pills = [
  { id: 1, text: "poor analytics", color: "bg-purple-400" },
  { id: 2, text: "no strategy", color: "bg-orange-300" },
  { id: 3, text: "running out of ideas", color: "bg-green-300" },
  { id: 4, text: "engaging content", color: "bg-blue-300" },
  { id: 5, text: "replying to mentions", color: "bg-red-300" },
];

export default function InteractivePillsPyramid() {
  const [hoveredPills, setHoveredPills] = useState<number[]>([]);
  const [pyramidFormed, setPyramidFormed] = useState(false);

  useEffect(() => {
    if (hoveredPills.length === pills.length && !pyramidFormed) {
      setPyramidFormed(true);
    }
  }, [hoveredPills, pyramidFormed]); // Added pyramidFormed to the dependency array

  const handleHover = (id: number) => {
    // Use functional update to ensure the latest state is used
    setHoveredPills((prev) => [...prev, id]);
  };

  const getPyramidPosition = (index: number) => {
    switch (index) {
      case 0:
        return { x: 30, y: 60 };
      case 1:
        return { x: -40, y: 40 };
      case 2:
        return { x: 40, y: 30 };
      case 3:
        return { x: -20, y: 10 };
      case 4:
        return { x: 20, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-start space-y-3 bg-transparent pt-24">
      {pills.map((pill, index) => (
        <motion.div
          key={pill.id}
          className={`${pill.color} cursor-pointer rounded-full px-8 py-2 font-semibold text-gray-800`}
          initial={{ x: 0, y: 0, rotate: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: -5,
            transition: { duration: 0.2 },
          }}
          animate={
            pyramidFormed
              ? {
                  ...getPyramidPosition(index),
                  transition: { duration: 0.5 },
                }
              : hoveredPills.includes(pill.id)
                ? { x: -10, transition: { duration: 0.2 } }
                : {}
          }
          onHoverStart={() => handleHover(pill.id)}
        >
          {pill.text}
        </motion.div>
      ))}
    </div>
  );
}
