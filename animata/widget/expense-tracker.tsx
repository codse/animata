"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface SpendingItem {
  day: string;
  amount: number;
}

interface SpendingDetailsProps {
  spending: SpendingItem[];
}
export default function ExpenseTracker({ spending }: SpendingDetailsProps) {
  const totalSpending = spending.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className={cn("group min-h-40 w-52 rounded-3xl bg-gray-800 p-4")}>
      <div className="flex h-full justify-between">
        {spending.map((item) => (
          <div key={item.day} className="flex flex-col items-center">
            <div className="mb-2 text-xs text-white">{item.day}</div>
            <div
              className="h-20 w-3 rounded-full bg-gray-600"
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="fill absolute bottom-0 left-0 bg-blue-500 transition-all"
                style={{
                  height: `${(item.amount / totalSpending) * 100}%`,
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-400">THIS WEEK SPENDING</p>
        <p className="text-sm font-bold text-white">RS {totalSpending}</p>
      </div>
    </div>
  );
}
