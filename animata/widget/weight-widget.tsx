import React, { useEffect, useRef, useState } from "react";

export default function WeightWidget() {
  const [weight, setWeight] = useState(24);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastXRef.current;
      lastXRef.current = event.clientX;

      setWeight((prevWeight) => {
        const newWeight = Math.max(0, Math.min(50, prevWeight + deltaX / 10));
        return Math.round(newWeight);
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastXRef.current = event.clientX;
  };

  const getArcPosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return { x, y };
  };

  const angleRange = 180;
  const startAngle = -90 - angleRange / 2;
  const endAngle = -90 + angleRange / 2;
  const radius = 70;

  const displayWeights = [weight > 0 ? weight - 1 : null, weight, weight < 50 ? weight + 1 : null];

  return (
    <div
      ref={widgetRef}
      className="flex select-none flex-col items-center justify-center rounded-3xl bg-white shadow-lg"
      style={{ width: "200px", height: "200px" }}
      onMouseDown={handleMouseDown}
    >
      <p className="mb-2 mt-10 text-sm text-gray-400">Weight</p>
      <div className="relative flex items-center justify-center">
        <div className="absolute mt-6 text-center">
          <div className="flex items-center justify-center">
            {displayWeights.map((displayWeight, i) => {
              if (displayWeight === null) return null;
              const angle = startAngle + (i * (angleRange / 2)) / 2 + angleRange / 4;
              const { x, y } = getArcPosition(angle, radius - 15);
              return (
                <span
                  key={i}
                  className={`text-4xl font-bold ${i === 1 ? "text-gray-800" : "text-gray-300"}`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    position: "absolute",
                  }}
                >
                  {displayWeight}
                </span>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <svg width="480" height="140" viewBox="0 0 360 100">
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = startAngle + (i * (endAngle - startAngle)) / 8;
              const { x: x1, y: y1 } = getArcPosition(angle, radius + 5);
              const { x: x2, y: y2 } = getArcPosition(angle, radius - 5);

              if (angle < startAngle + 30 || angle > endAngle - 30) {
                return null;
              }

              return (
                <line
                  key={i}
                  x1={180 + x1}
                  y1={120 + y1}
                  x2={180 + x2}
                  y2={120 + y2}
                  stroke={i === Math.floor(9 / 2) ? "#000" : "#999"}
                  strokeWidth={i === Math.floor(9 / 2) ? "3" : "2"}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
