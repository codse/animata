"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface RowProps {
  color: string;
  title: string;
  value: string;
}

const initialCards = [
  {
    id: 11,
    title: "Colors",
    color: "bg-slate-200",
  },
  {
    id: 22,
    title: "System Design",
    color: "bg-blue-100",
  },
  {
    id: 33,
    title: "Theming",
    color: "bg-indigo-100",
  },
];

const Row = ({ color, title, value }: RowProps) => {
  return (
    <div className="flex h-14 w-full items-center justify-between rounded-md bg-white/75 p-2">
      <div className="text-lg">
        <span className={cn("mx-2 size-8 rounded px-3", color)} />
        {title}
      </div>
      <span className="mx-2 text-slate-500">{value}</span>
    </div>
  );
};
export default function BlueStackCards() {
  const [cards, setCards] = useState(initialCards);

  const handleCardClick = (index: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [clickedCard] = updatedCards.splice(index, 1);
      updatedCards.push(clickedCard);
      return updatedCards;
    });
  };
  return (
    <div className="h-[40rem]">
      <div className="relative flex h-full w-full items-center justify-center">
        {cards.map((card, index) => (
          <div
            key={`blur_card_${card.id}`}
            className={cn("absolute mx-auto", {
              "blur-[2px]": index !== 0,
            })}
            style={{
              transform: `translateY(${index}px) translateX(-${index * 50}px)`,
              zIndex: cards.length - index,
              height: 380 - index * 50,
              width: 400 - index * 50,
            }}
            onClick={() => {
              handleCardClick(index);
            }}
          >
            <motion.div
              whileTap={{
                y: -550,
                transition: {
                  duration: 0.6,
                },
              }}
              className={cn(
                "h-full w-full cursor-pointer overflow-y-scroll rounded-md p-4",
                card.color,
              )}
            >
              <div className="group h-full backdrop-blur-sm">
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-base font-light">System of colors built out of brand.</p>
                <div className="my-3 flex flex-col gap-4">
                  <Row color="bg-red-600" title="Red" value="Value: #C80036" />
                  <Row color="bg-pink-600" title="Pink" value="Value: #FF0080" />
                  <Row color="bg-green-600" title="Green" value="Value: #o01212" />

                  <Row color="bg-green-600" title="Orange" value="Value: #FF7F3E" />
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
