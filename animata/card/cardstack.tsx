"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface CardStackProps {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  
}

const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className,
}: {
  items: CardStackProps[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}) => {
  const [cards, setCards] = useState<CardStackProps[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards: CardStackProps[]) => {
        const newArray = [...prevCards.slice(1), prevCards[0]];
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative h-60 w-60 md:h-60 md:w-96", className)}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={cn(
            "absolute flex h-60 w-60 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] transition-transform dark:border-white/[0.1] dark:bg-black dark:shadow-white/[0.05] md:h-60 md:w-96",
          )}
          style={{
            transform: `translateY(${index * -offset}px) scale(${
              1 - index * scaleFactor
            })`,
            zIndex: cards.length - index,
          }}
        >
          <div className="font-normal text-gray-700 dark:text-neutral-200">
            {card.content}
          </div>
          <div>
            <p className="font-medium text-gray-500 dark:text-white">
              {card.name}
            </p>
            <p className="font-normal text-gray-400 dark:text-neutral-200">
              {card.designation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStack;
