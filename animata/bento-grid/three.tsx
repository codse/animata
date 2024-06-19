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

export default function Three() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
        <BentoCard className="bg-blue-300 sm:row-span-2">
          <div className="flex flex-col">Grocery List</div>
        </BentoCard>

        <BentoCard className="bg-green-300">
          <div className="flex flex-col">Meal Planner</div>
        </BentoCard>

        <BentoCard className="bg-red-300">
          <div className="flex flex-col">Hydration Reminder</div>
        </BentoCard>
      </div>
    </div>
  );
}
