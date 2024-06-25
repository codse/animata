import { HTMLAttributes, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
}

interface ExpandableProps {
  list?: { image: string; title: string }[];
}

const List = ({ item, className, index, activeItem, ...props }: ImageProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-14 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-500 ease-in-out",
        {
          "flex-grow": index === activeItem,
          "blur-[2px]": index !== activeItem,
        },
        className,
      )}
      {...props}
    >
      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      {index === activeItem && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-3 left-4 text-xl font-semibold text-white"
        >
          {`"${item.title}"`}
        </motion.div>
      )}
    </div>
  );
};

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mountains",
  },
  {
    image:
      "https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Great Wall of China",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584968173934-bc0b588eb806?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Texture & Patterns",
  },
];

export default function Expandable({ list = items }: ExpandableProps) {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div className="flex h-[40rem] w-[50rem] gap-5">
      {list.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          onMouseEnter={() => setActiveItem(index)}
          activeItem={activeItem}
        />
      ))}
    </div>
  );
}
