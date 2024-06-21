import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const initialCards = [
  {
    id: 1,
    title: "Card 1",
    content: "Content for card 1",
  },
  {
    id: 2,
    title: "Card 2",
    content: "Content for card 2",
  },
  {
    id: 3,
    title: "Card 3",
    content: "Content for card 3",
  },
];
const Card = () => {
  return (
    <div className="relative gap-2">
      <div className="bg-white">
        <div className="flex min-h-[50rem] min-w-full items-center justify-center">
          <div className="relative flex">
            <div
              className="absolute h-40 w-72 transform rounded-lg bg-green-400 transition-all"
              onClick={() => {}}
            ></div>
            <div className="absolute -left-4 -top-4 h-40 w-72 transform rounded-lg bg-yellow-400 transition-all" />
            <div className="absolute -left-8 -top-8 h-40 w-72 transform rounded-lg bg-red-400 transition-all" />
            <div className="absolute -left-12 -top-12 h-40 w-72 transform rounded-lg bg-black transition-all" />
            <div className="absolute -left-16 -top-16 h-40 w-72 transform rounded-lg bg-purple-400 transition-all" />
            <div className="absolute -left-20 -top-20 flex h-40 w-72 transform items-center justify-center rounded-lg border-2 border-black bg-white transition-all">
              hello
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function BlurStackCard() {
  const [cards, setCards] = useState(initialCards);
  return <StackedCards cards={cards} setCards={setCards} />;
}

const StackedCards = ({
  cards,
  setCards,
}: {
  cards: typeof initialCards;
  setCards: React.Dispatch<React.SetStateAction<typeof initialCards>>;
}) => {
  const [initialSelected, setInitialSelected] = useState(0);

  const handleCardClick = (index: number) => {
    const updatedCards = [...cards];
    const [clickedCard] = updatedCards.splice(index, 1);
    updatedCards.push(clickedCard);
    setCards(updatedCards);
  };

  console.log(cards);
  return (
    <div className="flex min-h-screen w-screen flex-col items-center py-10">
      <div className="relative">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={cn("absolute inset-0")}
            style={{
              transform: `translateY(${index * 20}px) translateX(-${index * 30}px)`,
              zIndex: (cards.length - index) * initialSelected,
            }}
            onClick={() => {
              handleCardClick(index);
              setInitialSelected(index);
            }}
          >
            <div
              className={cn(
                "relative cursor-pointer rounded-lg bg-white p-4 shadow-md",
              )}
              style={{
                height: 500 - index * 50,
                width: 400 - index * 50,
              }}
            >
              <div className="relative z-10 grid h-full place-content-center">
                <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
                <p>{card.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex h-full w-full gap-5">
        {cards.map((_, index) => (
          <motion.div
            key={index}
            initial={{ color: index === initialSelected ? "green" : "black" }}
            animate={{ color: index === initialSelected ? "green" : "black" }}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-black"
            onTap={() => {
              setInitialSelected(index);
            }}
          >
            <div
              className={cn("size-9 rounded-full", {
                "bg-green-500": index === initialSelected,
              })}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
