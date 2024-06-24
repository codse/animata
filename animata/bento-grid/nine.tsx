import { cn } from "@/lib/utils";

const BentoCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default function Nine() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:grid-rows-3">
        <BentoCard className="bg-amber-300">
          <div className="flex flex-col">Add Widget</div>
        </BentoCard>

        <BentoCard className="bg-purple-300 sm:col-span-2">
          <div className="flex flex-col">Another Section</div>
        </BentoCard>

        <BentoCard className="s bg-rose-300 sm:row-span-2">
          <div className="flex flex-col">Another Section</div>
        </BentoCard>

        <BentoCard className="bg-lime-300">
          <div className="flex flex-col">Add Widget</div>
        </BentoCard>

        <BentoCard className="bg-zinc-300">
          <div className="flex flex-col">Add Widget</div>
        </BentoCard>

        <BentoCard className="bg-green-300">
          <div className="flex flex-col">Meal Planner</div>
        </BentoCard>

        <BentoCard className="bg-red-300">
          <div className="flex flex-col">Something</div>
        </BentoCard>

        <BentoCard className="bg-yellow-300 sm:col-span-2">
          <div className="flex flex-col">Grocery List</div>
        </BentoCard>

        <BentoCard className="bg-zinc-300">
          <div className="flex flex-col">Add Widget</div>
        </BentoCard>
      </div>
    </div>
  );
}
