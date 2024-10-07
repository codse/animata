"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Landmark, PieChart } from "lucide-react";

const tabs = [
  {
    id: "accounts",
    label: "Accounts",
    icon: <Landmark size={15} className="mt-1" />,
  },
  { id: "deposits", label: "Deposits", icon: <Inbox size={15} className="mt-1" /> },
  { id: "funds", label: "Funds", icon: <PieChart className="mt-1" size={15} /> },
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
    }, 300); // Blur effect duration
  };

  const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative mx-4 flex space-x-1 rounded-full bg-[#f5f1eb] p-1 shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-1 rounded-full bg-white"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === tab.id ? "text-black" : "text-gray-500"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>{tab.icon}</span>
              <span className="font-bold">{tab.label}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
