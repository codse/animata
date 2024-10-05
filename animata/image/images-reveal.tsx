import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    src: "https://images.unsplash.com/photo-1727717768632-f4241a128f50?q=80&w=2889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    angle: "8deg",
  },
  {
    src: "https://images.unsplash.com/photo-1727400068319-565c56633dc3?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    angle: "-15deg",
  },
  {
    src: "https://images.unsplash.com/photo-1726551195764-f98a8e8a57c3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    angle: "-5deg",
  },
  {
    src: "https://images.unsplash.com/photo-1727775805114-a87c6bcaf9db?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    angle: "10deg",
  },
  {
    src: "https://images.unsplash.com/photo-1614680108604-c23b65f7e7dc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    angle: "-5deg",
  },
];

interface CustomProps {
  index: number;
  angle: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (custom: CustomProps) => ({
    opacity: 1,
    scale: 1,
    rotate: custom.angle,
    transition: {
      delay: custom.index * 0.1,
      duration: 0.3,
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    },
  }),
};

export default function ImagesReveal() {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold dark:text-white">Airbnb Image Reveal</h1>
      <div className="relative my-10 ml-10 flex flex-row justify-center md:ml-20">
        {cards.map((card, i) => (
          <motion.img
            key={i}
            className="relative -ml-10 size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:-ml-20 md:size-36"
            src={card.src}
            custom={{ index: i, angle: card.angle }}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1,
              rotate: "0deg",
              zIndex: 10,
              transition: { duration: 0.3, type: "spring", stiffness: 150, damping: 20 },
            }}
          />
        ))}
      </div>
    </div>
  );
}
