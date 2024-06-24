import { CarFront, Utensils } from "lucide-react";

import ExpenseTracker, { spendingTrackerProps } from "@/animata/widget/expense-tracker";
import { cn } from "@/lib/utils";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-3xl p-4", className)}>
      {children}
    </div>
  );
}

function FeatureOne() {
  return (
    <BentoCard className="p-0 sm:row-span-2">
      <ExpenseTracker {...spendingTrackerProps} />
    </BentoCard>
  );
}

function FeatureTwo() {
  return (
    <BentoCard className="flex flex-col gap-2 border bg-background dark:border-zinc-700">
      <span className="text-xs font-semibold uppercase text-muted-foreground">Total income</span>
      <div className="text-3xl font-black text-green-600">$7,000</div>
    </BentoCard>
  );
}

function FeatureThree() {
  return (
    <BentoCard className="flex flex-col gap-2 border bg-background dark:border-zinc-700">
      <span className="text-xs font-semibold uppercase text-muted-foreground">Top categories</span>
      <div className="flex w-full gap-2">
        <Utensils size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Food</span>
        <span className="ml-auto text-xs font-black text-red-600 dark:text-red-400">$2,000</span>
      </div>
      <div className="flex w-full gap-2">
        <CarFront size={16} className="text-foreground" />
        <span className="text-xs text-foreground">Transport</span>
        <span className="ml-auto text-xs font-black text-red-600 dark:text-red-400">$1,000</span>
      </div>
    </BentoCard>
  );
}

export default function Three() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
    </div>
  );
}
