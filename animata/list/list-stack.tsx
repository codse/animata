import React, { ReactElement, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CardProps {
  id: number;
  icon: ReactElement | string;
  title: string;
  location: string;
  date: string;
}

interface ListStackProps {
  cards: CardProps[];
  offset?: number;
  scaleFactor?: number;
}

export const CardStack = ({ icon, title, location, date }: CardProps) => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 5,
      }}
      className="flex w-80 flex-row items-center gap-4 rounded-2xl border-x border-y border-gray-100 bg-white p-4 shadow-md"
    >
      <div className="rounded-lg bg-zinc-800 p-3 text-2xl text-white">{icon}</div>
      <div className="flex-1">
        <h3 className="text-base font-bold">{title}</h3>
        <div className="flex flex-row items-center justify-between">
          <div className="text-base text-gray-500">{location}</div>
          <div className="text-base text-gray-600">{date}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const ListStack = ({ cards, offset, scaleFactor }: ListStackProps) => {
  const CARD_OFFSET = offset || 9;
  const SCALE_FACTOR = scaleFactor || 0.03;
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => setShowAll(!showAll);
  const middleIndex = Math.floor(cards.length / 2);

  const revealAnimation = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      },
    },
  };

  const stackAnimation = {
    hidden: { opacity: 0, scale: 1 },
    visible: (i: number) => ({
      opacity: 1,
      y: (i - middleIndex) * CARD_OFFSET,
      scale: 1 - i * SCALE_FACTOR,
      zIndex: cards.length - i,
    }),
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="relative flex w-full justify-center">
        <div className="relative min-h-24">
          <div className="flex flex-col items-center">
            <AnimatePresence>
              {showAll
                ? cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      custom={index}
                      variants={revealAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="mb-3"
                    >
                      <CardStack
                        id={card.id}
                        icon={card.icon}
                        title={card.title}
                        location={card.location}
                        date={card.date}
                      />
                    </motion.div>
                  ))
                : cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      custom={index}
                      variants={stackAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      style={{
                        position: "absolute",
                        transformOrigin: "top center",
                        zIndex: cards.length - index,
                      }}
                    >
                      <CardStack
                        id={card.id}
                        icon={card.icon}
                        title={card.title}
                        location={card.location}
                        date={card.date}
                      />
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <motion.button
        className="min-w-1/2 mt-2 rounded-full border-x border-y border-gray-100 bg-white px-6 py-1.5 text-sm font-semibold text-zinc-800 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleShow}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {showAll ? (
          <>
            <div className="flex flex-row items-center gap-1.5">
              <p>Hide</p>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <ChevronDown />
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row items-center gap-1.5">
              <p>Show All</p>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ChevronDown />
              </motion.div>
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
};
