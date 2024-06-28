import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const Icon = ({ children, className }: { children: string; className?: string }) => (
  <div className={cn("font-mono text-xl font-bold", className)}>{children}</div>
);

interface Item {
  id: string;
  icon: ReactNode;
  name: string;
  type: string;
  amount: number;
}

const itemListDefault: Item[] = [
  {
    id: "Item-001",
    icon: <Icon className="text-red-500">N</Icon>,
    name: "Netflix",
    type: "Entertainment",
    amount: 13.2,
  },
  {
    id: "Item-002",
    icon: <Icon className="text-blue-500">G</Icon>,
    name: "Google",
    type: "Advertising",
    amount: 18.9,
  },
  {
    id: "Item-003",
    icon: <Icon className="text-red-500">Y</Icon>,
    name: "YouTube",
    type: "Entertainment",
    amount: 23.5,
  },
  {
    id: "Item-004",
    icon: <Icon className="text-green-500">S</Icon>,
    name: "Shopify",
    type: "Advertising",
    amount: 162.0,
  },
  {
    id: "Item-005",
    icon: <Icon className="text-white">A</Icon>,
    name: "Apple",
    type: "Devices",
    amount: 14.87,
  },
];

const TransitionList = ({ itemList }: { itemList?: Item[] }) => {
  const [list, setList] = useState<Item[]>(itemList || itemListDefault);

  useEffect(() => {
    if (!list.length) {
      return;
    }

    const timeouts = setTimeout(() => {
      setList((prev) => prev.slice(1));
    }, 2500);

    return () => {
      clearTimeout(timeouts);
    };
  }, [list]);

  return (
    <div className="h-36 w-full min-w-96 overflow-hidden rounded-lg bg-secondary">
      <AnimatePresence>
        {list.map((item) => (
          <motion.div
            key={item.id}
            animate={{ height: "3rem", scale: 1 }}
            exit={{ height: 0, scale: 0, margin: 0 }}
            transition={{ duration: 0.5 }}
            className="m-2 flex h-12 items-center rounded-lg border border-gray-400 bg-primary/5 text-secondary-foreground"
          >
            <div className="ml-4 w-8">{item.icon}</div>
            <div className="flex flex-1 justify-between px-4">
              <div>{item.name}</div>
              <div>{item.type}</div>
              <div>{item.amount}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransitionList;
