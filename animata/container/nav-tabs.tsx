"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavTabs({ tabs }: { tabs: string[] }) {
  const [selected, setSelected] = useState<string>(tabs[0]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-md bg-violet-950 p-6">
      {tabs.map((tab) => (
        <Tab text={tab} selected={selected === tab} setSelected={setSelected} key={tab} />
      ))}
    </div>
  );
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-slate-300 hover:font-black",
      )}
    >
      <p className="relative z-50 min-w-20">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-indigo-600 to-pink-600"
        />
      )}
    </button>
  );
};
