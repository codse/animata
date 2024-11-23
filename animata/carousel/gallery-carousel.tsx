"use client";

import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// @ts-expect-error - react-use-keypress lacks TypeScript types but is safe to use
import useKeypress from "react-use-keypress";

interface GalleryCarouselProps {
  images: string[];
}

const collapsedAspectRatio = 1 / 3;
const fullAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);

  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.9, ease: [0.41, 0.71, 0, 1] }}>
      <div className="relative mx-auto h-[500px] w-full md:max-w-5xl">
        <div className="mx-auto flex h-full flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, i) => (
                <motion.img
                  alt="carousel-image"
                  key={image}
                  src={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="aspect-[3/2] object-fill"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 flex h-14 w-full justify-center overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            x: `-${index * 100 * (collapsedAspectRatio / fullAspectRatio) + margin + index * gap}%`,
          }}
          style={{
            aspectRatio: fullAspectRatio,
            gap: `${gap}%`,
          }}
          className="flex"
        >
          {images.map((image, i) => (
            <motion.button
              onClick={() => setIndex(i)}
              initial={false}
              whileHover={{ opacity: 1 }}
              animate={i === index ? "active" : "inactive"}
              variants={{
                active: {
                  aspectRatio: fullAspectRatio,
                  marginLeft: `${margin}%`,
                  marginRight: `${margin}%`,
                  opacity: 1,
                },
                inactive: {
                  aspectRatio: collapsedAspectRatio,
                  marginLeft: 0,
                  marginRight: 0,
                  opacity: 0.5,
                },
              }}
              className="shrink-0"
              key={image}
            >
              <img alt="carousel-navigation-img" src={image} className="h-full object-cover" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
