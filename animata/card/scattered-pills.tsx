import React, { useEffect, useState } from "react";

interface Pill {
  id: number;
  text: string;
  color: string;
}

const pills: Pill[] = [
  { id: 1, text: "poor analytics", color: "bg-purple-400" },
  { id: 2, text: "no strategy", color: "bg-orange-300" },
  { id: 3, text: "running out of ideas", color: "bg-green-300" },
  { id: 4, text: "engaging content", color: "bg-blue-300" },
  { id: 5, text: "replying to mentions", color: "bg-red-300" },
];

export default function InteractivePillsPyramid() {
  const [hoveredPills, setHoveredPills] = useState<Set<number>>(new Set());
  const [pyramidFormed, setPyramidFormed] = useState<boolean>(false);
  const [currentHover, setCurrentHover] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredPills.size === pills.length && !pyramidFormed) {
      setPyramidFormed(true);
    }
  }, [hoveredPills, pyramidFormed]);

  const handleHover = (id: number) => {
    setHoveredPills((prev) => new Set(prev).add(id));
    setCurrentHover(id);
  };

  const handleHoverEnd = () => {
    setCurrentHover(null);
  };

  const getPyramidPosition = (index: number): { x: number; y: number } => {
    const positions = [
      { x: 30, y: 60 },
      { x: -40, y: 40 },
      { x: 40, y: 30 },
      { x: -20, y: 10 },
      { x: 20, y: 0 },
    ];
    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <div className="flex h-screen flex-col items-center justify-start space-y-3 bg-transparent pt-24">
      {pills.map((pill, index) => (
        <div
          key={pill.id}
          className={`${pill.color} cursor-pointer rounded-full px-8 py-2 font-semibold text-gray-800 transition-all duration-300 ease-in-out`}
          style={{
            transform: pyramidFormed
              ? `translate(${getPyramidPosition(index).x}px, ${getPyramidPosition(index).y}px)`
              : currentHover === pill.id
                ? "translateX(-10px) scale(1.1) rotate(-5deg)"
                : "none",
          }}
          onMouseEnter={() => handleHover(pill.id)}
          onMouseLeave={handleHoverEnd}
        >
          {pill.text}
        </div>
      ))}
    </div>
  );
}
