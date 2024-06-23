"use client";
import { cn } from "@/lib/utils";
import { BellDot } from "lucide-react";
import { useState } from "react";

export default function ReminderWidget() {
  const reminders = [
    "Passport",
    "Citizenship",
    "birth certificate",
    "Linsence",
    "key",
    "mobile",
  ];
  const [reminder, setReminder] = useState<string[]>(reminders);

  const handleCheckboxChange = (data: string) => {
    setReminder((prev) =>
      prev.includes(data)
        ? prev.filter((remind) => remind !== data)
        : [...prev, data],
    );
  };
  return (
    <div
      className={cn("group min-h-40 w-52 rounded-3xl bg-zinc-900 px-4 py-3")}
    >
      <div className="text-md flex items-center justify-between gap-2 font-bold text-blue-400">
        <div className="flex items-center gap-2">
          <p>Reminder</p>
          <BellDot color="#60a5fa" size={15} className="mt-1" />
        </div>
        <div className="">
          <p>{reminder.length}</p>
        </div>
      </div>
      <div className="mt-1 overflow-hidden">
        {reminders.map((data) => (
          <div className="flex items-center gap-3 border-b-[1px] border-gray-700">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(data)}
              checked={!reminder.includes(data)}
              className="h-3 w-3 appearance-none rounded-full border-2 border-gray-700 checked:bg-blue-500"
            />
            <p className="mt-1 bg-transparent pb-2 text-xs font-semibold text-white">
              {data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
