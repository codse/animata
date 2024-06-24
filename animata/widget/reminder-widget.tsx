"use client";
import { useState } from "react";
import { BellDot } from "lucide-react";

import { cn } from "@/lib/utils";

const reminders = [
  "Passport",
  "Citizenship",
  "birth certificate",
  "License",
  "key",
  "mobile",
  "laptop",
  "wallet",
  "watch",
];

export default function ReminderWidget() {
  const [reminder, setReminder] = useState<string[]>(reminders);

  const handleCheckboxChange = (data: string) => {
    setReminder((prev) =>
      prev.includes(data) ? prev.filter((remind) => remind !== data) : [...prev, data],
    );
  };

  return (
    <div className={cn("group h-80 w-52 rounded-3xl bg-zinc-900 p-4")}>
      <div className="text-md flex items-center justify-between gap-2 font-bold text-blue-400">
        <div className="flex items-center gap-2">
          <BellDot color="#60a5fa" size={15} />
          <p className="text-xl">Reminder</p>
        </div>
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-700 text-xs text-blue-400">
          {reminder.length}
        </div>
      </div>
      <div className="mt-1 overflow-hidden">
        {reminders.map((data) => (
          <div
            key={`item-${data}`}
            onClick={() => handleCheckboxChange(data)}
            className="flex cursor-pointer items-center gap-3 border-b border-gray-700 py-1"
          >
            <input
              type="checkbox"
              checked={!reminder.includes(data)}
              className="h-3 w-3 appearance-none rounded-full border-2 border-gray-700 checked:bg-blue-500"
            />
            <p className="bg-transparent text-xs font-semibold capitalize text-white">{data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
