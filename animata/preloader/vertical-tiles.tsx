import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

interface Tile {
  id: number;
  width: number;
  order: number;
}

interface VerticalTilesProps {
  tileClassName?: string;
  minTileWidth?: number;
  animationDuration?: number;
  animationDelay?: number;
  stagger?: number;
  children?: React.ReactNode;
}

export default function VerticalTiles({
  tileClassName,
  minTileWidth = 32,
  animationDuration = 0.5,
  animationDelay = 1,
  stagger = 0.05,
  children,
}: VerticalTilesProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const calculateTiles = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: width, offsetHeight: _ } = containerRef.current;
      const tileCount = Math.max(3, Math.floor(width / minTileWidth));
      const tileWidth = width / tileCount + 1;

      const newTiles = Array.from({ length: tileCount }, (_, index) => ({
        id: index,
        width: tileWidth,
        order: Math.abs(index - Math.floor((tileCount - 1) / 2)),
      }));

      setTiles(newTiles);
    }
  }, [minTileWidth]);

  useEffect(() => {
    calculateTiles();
    const resizeObserver = new ResizeObserver(calculateTiles);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [calculateTiles]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {children}

      <div className="absolute inset-0 flex">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            className={cn("bg-gray-800", tileClassName)}
            style={{
              width: tile.width,
              position: "absolute",
              left: `${(tile.id * 100) / tiles.length}%`,
              top: 0,
              height: "100%",
            }}
            initial={{ y: 0 }}
            animate={isInView ? { y: "100%" } : { y: 0 }}
            transition={{
              duration: animationDuration,
              delay: animationDelay + tile.order * stagger,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
