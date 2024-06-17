"use client";
import { cn } from "@/lib/utils";
import { BellDot } from "lucide-react";

export default function ReminderWidget() {
  const reminders = [
    "Passport",
    "Citizenship",
    "birth certificate",
    "Linsence",
    "key",
    "mobile",
  ];
  return (
    <div
      className={cn("group min-h-40 w-52 rounded-3xl bg-zinc-900 px-4 py-3")}
    >
      <div className="text-md flex items-center justify-start gap-2 font-bold text-blue-400">
        <p>Reminder</p>
        <BellDot color="#60a5fa" size={15} className="mt-px" />
      </div>
      <div className="custom-scrollbar mt-1 h-32 overflow-y-auto">
        {reminders.map((data) => (
          <div className="flex items-center gap-3 border-b-[1px] border-gray-700">
            <input
              type="checkbox"
              className="h-3 w-3 appearance-none rounded-full border-2 border-gray-700 checked:bg-blue-500"
            />
            <p className="mt-1 bg-transparent pb-2 text-xs font-semibold text-white">
              {data}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6b7280;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
      `}</style>
    </div>
  );
}
