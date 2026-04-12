import { useState } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  item: string;
  index?: number;
  activeIndex: number;
  onTabClick: () => void;
}

const Button = ({ item, index, activeIndex, onTabClick }: ButtonProps) => {
  return (
    <button
      className={cn("rounded-lg bg-black", {
        "border-b-2 border-b-indigo-500": index === activeIndex,
      })}
      onClick={onTabClick}
    >
      <span
        className={cn(
          "flex h-10 cursor-pointer items-center justify-center rounded-md border-2 bg-white p-3 transition",
          {
            "border-2 border-indigo-500 text-indigo-600": index === activeIndex,
            "origin-top-right ease-in hover:rotate-6 text-black": index !== activeIndex,
          },
        )}
      >
        <span className="p-2 text-center font-mono">{item}</span>
      </span>
    </button>
  );
};

export default function ShiftTabs({ items }: { items: string[] }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {items.map((item, index) => (
        <Button
          onTabClick={() => {
            setActiveTab(index);
          }}
          item={item}
          activeIndex={activeTab}
          index={index}
          key={`shift_tab_${item}`}
        />
      ))}
    </div>
  );
}
