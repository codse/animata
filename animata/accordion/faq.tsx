"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: string;
}

interface FaqSectionProps {
  data: FAQItem[];
}

export default function FaqSection({ data }: FaqSectionProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div
      className="mx-auto max-w-md rounded-lg bg-white p-4"
      style={{ maxWidth: "700px", minWidth: "700px" }}
    >
      <div className="mb-4 text-sm text-gray-500">Every day, 9:01 AM</div>
      {data.map((item) => (
        <motion.div key={item.id} className="mb-2" initial={false} transition={{ duration: 0.3 }}>
          <div
            className="flex items-center justify-start gap-x-4"
            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
            style={{
              width: "100%",
            }}
          >
            <div
              className="relative flex cursor-pointer items-center space-x-2 rounded-xl bg-gray-100 p-2 hover:bg-[#E0F7FA]"
              style={{
                backgroundColor: openItem === item.id ? "#E0F7FA" : "",
              }}
            >
              {item.icon && (
                <span
                  className={`absolute bottom-6 right-0 ${item.iconPosition === "right" ? "right-0" : "left-0"}`}
                  style={{
                    transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-4deg)",
                  }} // Tilts the icon by 45 degrees
                >
                  {item.icon}
                </span>
              )}
              <span className="font-medium text-gray-700">{item.question}</span>
            </div>

            <motion.span
              transition={{ duration: 0.3 }}
              className="cursor-pointer text-lg font-bold text-gray-400"
            >
              <span>
                {" "}
                {openItem === item.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#7CB9E8"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}{" "}
              </span>
            </motion.span>
          </div>
          <AnimatePresence>
            {openItem === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }} // Consistent width for the answer container
              >
                <div
                  className="ml-7 mt-1 rounded-lg p-3 text-white md:ml-16"
                  style={{
                    borderRadius: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div className="relative max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    {item.answer}
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[10px] border-t-[10px] border-l-transparent border-t-blue-500"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
