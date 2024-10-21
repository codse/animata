import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, LayoutGrid } from "lucide-react";

import { cn } from "@/lib/utils";

const carouselStyles = {
  perspective: "1000px",
  overflow: "hidden",
};

const carouselInnerStyles: React.CSSProperties = {
  display: "flex",
  transformStyle: "preserve-3d",
  transition: "transform 2s",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const carouselItemStyles: React.CSSProperties = {
  minWidth: "200px",
  marginLeft: "-180px",
  transform: "rotateY(15deg) translateZ(300px) translateX(-50px)",
  backfaceVisibility: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 2s, box-shadow 2s",
};

const carouselItemFirstChildStyles: React.CSSProperties = {
  minWidth: "200px",
  marginLeft: "20px",
  transform: "rotateY(5deg) translateZ(300px) translateX(0)",
  backfaceVisibility: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 2s, box-shadow 2s",
};

interface albumsProps {
  /*
   * Array of album objects
   */
  albums: {
    id: number;
    title: string;
    artist: string;
    cover: string;
  }[];
}

export default function MusicStackInteraction({ albums }: albumsProps) {
  const [isGridView, setIsGridView] = useState(true);

  const handleToggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="relative mx-auto h-[33rem] w-80 rounded bg-gray-900 p-2 text-white">
      <motion.div
        className={cn("h-96 w-full", { "mt-24": !isGridView })}
        style={isGridView ? undefined : carouselStyles}
        layout
      >
        <motion.div
          className={cn("", { "mb-4 grid grid-cols-2 gap-6": isGridView })}
          style={isGridView ? undefined : carouselInnerStyles}
          layout
        >
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={cn("relative w-full shadow-lg")}
              style={
                isGridView
                  ? undefined
                  : index === 0
                    ? carouselItemFirstChildStyles
                    : carouselItemStyles
              }
            >
              <motion.img
                layout
                src={album.cover + "?w=200&h=200"}
                alt={album.title}
                className="h-auto rounded-xl shadow-md"
              />
              <motion.div
                layout
                className="absolute bottom-0 left-0 w-full bg-opacity-50 bg-gradient-to-b from-transparent to-gray-800 px-4 py-2 text-white"
              >
                <motion.h3 layout className="font-semibold leading-tight">
                  {album.title}
                </motion.h3>
                <motion.p layout className="text-sm leading-snug">
                  {album.artist}
                </motion.p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="duration-2000 absolute bottom-4 left-0 right-0 -mb-4 flex w-auto items-center justify-center rounded-xl bg-gray-800 p-4 text-white shadow-2xl transition-all">
        <div className="flex w-32 items-center space-x-2 rounded-full bg-gray-900 p-2">
          <div
            className={cn("flex h-8 w-16 cursor-pointer items-center justify-center rounded-full", {
              "bg-gray-700": isGridView,
            })}
            onClick={handleToggleView}
          >
            <LayoutGrid />
          </div>
          <div
            className={cn("flex h-8 w-16 cursor-pointer items-center justify-center rounded-full", {
              "bg-gray-700": !isGridView,
            })}
            onClick={handleToggleView}
          >
            <Layers />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
