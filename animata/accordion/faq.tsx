"use client";

import { useState } from "react";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export interface IFaqItems {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  icon?: ReactNode;
}

interface FaqProps {
  faqItems: IFaqItems[];
  borderShape?: "rounded" | "rectangle";
}

const Faq = ({ faqItems, borderShape = "rounded" }: FaqProps) => {
  const [items, setItems] = useState<IFaqItems[]>(faqItems);

  const toggleActive = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)),
    );
  };

  const getAngle = (id: number) => {
    return id % 2 !== 0;
  };

  const boxClasses = borderShape === "rounded" ? "rounded-full" : "rounded-lg";
  const answerClasses = borderShape === "rounded" ? "rounded-full" : "rounded-lg";

  const questionPadding = borderShape === "rectangle" ? "p-3 px-6" : "p-2 px-6";
  const answerPadding = borderShape === "rectangle" ? "p-3 px-6" : "p-2 px-6";

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-10">
      {items.map((item) => (
        <div key={item.id} className="flex w-[500px] flex-col gap-2">
          <AnimatePresence>
            <motion.div
              className="flex flex-col"
              initial={{ y: 0 }}
              animate={{
                y: item.isActive ? -20 : 0,
                marginTop: item.isActive ? 20 : 0,
              }}
              exit={{ y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={() => toggleActive(item.id)}
                className="questions group flex cursor-pointer items-center gap-2"
              >
                <h2
                  className={`relative w-fit self-start ${boxClasses} bg-gray-100 ${questionPadding} font-semibold text-black transition-all ease-in-out hover:bg-blue-100 hover:text-blue-500 ${
                    item.isActive ? "bg-blue-100 text-blue-500" : ""
                  }`}
                >
                  {item.question}
                  <p
                    className={`absolute top-[-10px] text-xl text-red-500 ${
                      getAngle(item.id)
                        ? "right-[0px] rotate-[30deg]"
                        : "left-[0px] rotate-[330deg]"
                    }`}
                  >
                    {item.icon}
                  </p>
                </h2>

                {item.isActive ? (
                  <Minus className="h-4 w-4 rounded-full border-2 border-blue-500 bg-blue-500 text-white transition-all ease-in-out" />
                ) : (
                  <Plus className="h-4 w-4 rounded-full border-2 transition-all ease-in-out group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white" />
                )}
              </div>
              {item.isActive && (
                <motion.div
                  className={`answer ml-[50px] w-fit self-end bg-blue-600 ${answerPadding} text-white ${answerClasses}`}
                  initial={{ y: 0 }}
                  animate={{ y: 10, marginBottom: item.isActive ? -10 : 0 }}
                  exit={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Faq;
