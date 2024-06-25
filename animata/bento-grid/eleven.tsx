import { cn } from "@/lib/utils";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl p-4", className)}>
      {children}
    </div>
  );
}

export default function Modern() {
  return (
    <div className="box-border w-full max-w-full p-4">
      <div className="grid grid-cols-1 grid-rows-1 gap-2 sm:grid-cols-5 sm:grid-rows-5">
        <div className="sm:col-span-2 sm:row-span-2">
          <BentoCard className="bg-blue-300">
            <div className="flex flex-col">Grocery List</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-1 sm:row-span-2">
          <BentoCard className="bg-green-300">
            <div className="flex flex-col">Meal Planner</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-1">
          <BentoCard className="bg-red-300">
            <div className="flex flex-col">Hydration Reminder</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-1">
          <BentoCard className="bg-amber-300">
            <div className="flex flex-col">Travel Journal</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-1">
          <BentoCard className="bg-zinc-300">
            <div className="flex flex-col">Fitness Tracker</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-2">
          <BentoCard className="bg-purple-300">
            <div className="flex flex-col">
              <h4 className="sm:text-4xl">healthOS</h4>
            </div>
          </BentoCard>
        </div>
        <div className="sm:col-span-1 sm:row-span-2">
          <BentoCard className="bg-lime-300">
            <div className="flex flex-col">Snack suggestions</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-1 sm:row-span-2">
          <BentoCard className="bg-yellow-300">
            <div className="flex flex-col">Nutrition Tracker</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-1 sm:row-span-1">
          <BentoCard className="bg-orange-300">
            <div className="flex flex-col">Task Manager</div>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-1">
          <BentoCard className="bg-pink-300">
            <div className="flex flex-col">Progress dashboard</div>
            <small>Track goals with charts</small>
          </BentoCard>
        </div>
        <div className="sm:col-span-2 sm:row-span-1">
          <BentoCard className="bg-orange-300">
            <div className="flex flex-col">Find recipes</div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
