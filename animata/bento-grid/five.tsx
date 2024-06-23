import { cn } from "@/lib/utils";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl p-4", className)}>
      {children}
    </div>
  );
}

export default function Five() {
  return (
    <div className="grid w-full min-w-[90cqw] grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-3">
      <BentoCard className="bg-yellow-300 sm:col-span-2">
        <div className="flex flex-col">Grocery List</div>
      </BentoCard>

      <BentoCard className="bg-green-300 sm:row-span-3">
        <div className="flex flex-col">Meal Planner</div>
      </BentoCard>

      <BentoCard className="bg-red-300 sm:col-span-1 sm:row-span-2">
        <div className="flex flex-col">Something</div>
      </BentoCard>

      <BentoCard className="bg-purple-300">
        <div className="flex flex-col">Another Section</div>
      </BentoCard>

      <BentoCard className="bg-zinc-300 sm:col-start-2">
        <div className="flex flex-col">Add Widget</div>
      </BentoCard>
    </div>
  );
}
