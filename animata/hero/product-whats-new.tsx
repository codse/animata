import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface CardProps {
  layoutId: string;
  title: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
  onMouseLeave: () => void;
}

const Card: React.FC<CardProps> = ({
  layoutId,
  title,
  image,
  isSelected,
  onClick,
  onMouseLeave,
}) => (
  <motion.div
    layoutId={layoutId}
    className={`cursor-pointer overflow-hidden ${isSelected ? "fixed inset-0 z-50 w-full" : "relative h-auto w-1/3"}`}
    onMouseEnter={onClick}
    onMouseLeave={onMouseLeave}
    whileHover={!isSelected ? { scale: 1.05 } : {}}
    transition={{ type: "spring", duration: 0.5 }}
  >
    <motion.img
      src={image}
      alt={title}
      className={`${isSelected ? "h-full w-full object-cover" : "h-72 w-full object-cover"}`}
      whileHover={!isSelected ? { scale: 1.05 } : {}}
      transition={{ duration: 0.5 }}
    />
    <motion.div className={`bg-gray-300 p-4 ${isSelected ? "absolute bottom-0 w-full" : ""}`}>
      <h2 className="text-center text-xl font-semibold">{title}</h2>
      <p className="text-center">
        The darkness of the falcons heart that rendered the princes at bay.
      </p>
    </motion.div>
  </motion.div>
);

const ProductWhatsNew: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "card1",
      title: "Liongron Bay",
      image:
        "https://assets.lummi.ai/assets/QmSxHGeLuiXMzUSFM9hhVJToRXVeQCBEtno96zgAXB3uVN?auto=format&w=400",
    },
    {
      id: "card2",
      title: "Second Element",
      image:
        "https://assets.lummi.ai/assets/QmSxHGeLuiXMzUSFM9hhVJToRXVeQCBEtno96zgAXB3uVN?auto=format&w=400",
    },
    {
      id: "card3",
      title: "Third Element",
      image:
        "https://assets.lummi.ai/assets/QmSxHGeLuiXMzUSFM9hhVJToRXVeQCBEtno96zgAXB3uVN?auto=format&w=400",
    },
  ];

  return (
    <div className="w-full bg-gray-100 p-8">
      <h1 className="my-8 text-center text-4xl font-bold">What&apos;s New</h1>
      <p className="mb-10 text-center">
        Explore the latest updates and featured content, curated just for you.
      </p>

      <div className="flex gap-2">
        <AnimatePresence>
          {cards.map((card) => (
            <Card
              key={card.id}
              layoutId={card.id}
              title={card.title}
              image={card.image}
              isSelected={selectedCard === card.id}
              onMouseLeave={() => setSelectedCard(null)}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductWhatsNew;
