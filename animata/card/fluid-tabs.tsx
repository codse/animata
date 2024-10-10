"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Landmark, PieChart } from "lucide-react";

const tabs = [
  {
    id: "accounts",
    label: "Accounts",
    icon: <Landmark size={18} />,
  },
  {
    id: "deposits",
    label: "Deposits",
    icon: <Inbox size={18} />,
  },
  {
    id: "funds",
    label: "Funds",
    icon: <PieChart size={18} />,
  },
];

export default function FluidTabs() {
  const [activeTab, setActiveTab] = useState("funds");
  const [touchedTab, setTouchedTab] = useState<string | null>(null);
  const [prevActiveTab, setPrevActiveTab] = useState("funds");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setPrevActiveTab(activeTab);
    setActiveTab(tabId);
    setTouchedTab(tabId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  };

  const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative flex w-full max-w-md space-x-2 overflow-hidden rounded-full bg-[#f5f1eb] p-1 shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 my-1 rounded-full bg-white"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-bold transition-colors duration-300 ${
              activeTab === tab.id ? "font-bold text-black" : "text-gray-500"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
