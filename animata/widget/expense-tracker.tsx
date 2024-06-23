"use client";
import { cn } from "@/lib/utils";

interface SpendingItem {
  day: string;
  amount: number;
}

interface SpendingDetailsProps {
  spending: SpendingItem[];
}
export const spendingTrackerProps: SpendingDetailsProps = {
  spending: [
    { day: "M", amount: 12000 },
    { day: "T", amount: 16000 },
    { day: "W", amount: 42000 },
    { day: "T", amount: 4000 },
    { day: "F", amount: 28000 },
    { day: "Sa", amount: 20000 },
    { day: "Su", amount: 50000 },
  ],
};

export default function ExpenseTracker({
  spending = spendingTrackerProps.spending,
}: SpendingDetailsProps) {
  const totalSpending = spending.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div
      className={cn(
        "flex h-52 w-52 flex-col rounded-3xl border bg-background p-4 dark:border-zinc-700",
      )}
    >
      <h4 className="mb-1 font-semibold text-muted-foreground">
        {new Date().toLocaleString("default", { month: "long" }).toUpperCase()}{" "}
        {new Date().getFullYear()}
      </h4>
      <div className="group flex flex-1 items-end justify-between">
        {spending.map((item) => (
          <div
            key={item.day}
            className="flex cursor-pointer flex-col items-center transition-opacity hover:!opacity-100 group-hover:opacity-50"
          >
            <div className="mb-1 text-xs text-foreground">{item.day}</div>
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
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xs tracking-wide text-muted-foreground">
          THIS WEEK SPENDING
        </p>
        <p className="text-sm font-bold text-foreground">
          RS {Intl.NumberFormat().format(totalSpending)}
        </p>
      </div>
    </div>
  );
}
