import { cn } from "@/lib/utils";

export default function Calender() {
  const dates = [
    {
      title: "Backlog Updates",
      time: "10:30-10:45",
      color: "text-purple-900",
      bgcolor: "bg-purple-200",
      barcolor: "bg-purple-900",
      datecolor: "text-purple-400",
    },
    {
      title: "Review Jade A",
      time: "12:00-12:45",
      color: "text-cyan-900",
      bgcolor: "bg-cyan-200",
      barcolor: "bg-cyan-900",
      datecolor: "text-cyan-400",
    },
  ];
  return (
    <div
      className={cn("group min-h-40 w-52 rounded-3xl border-2 bg-white p-3")}
    >
      <div className="flex justify-center">
        <div className="relative flex h-3 w-20 justify-center rounded-full bg-gray-200 dark:bg-black">
          <div className="absolute top-[-5px] h-4 w-4 rounded-full bg-gray-200 dark:bg-black"></div>
        </div>
      </div>
      <div className="flex gap-1">
        <p className="text-xl font-bold text-red-400">Mon</p>
        <p className="text-xl font-bold text-black">23</p>
      </div>
      <div>
        {dates.map((date, index) => (
          <div
            key={index}
            className={cn(
              "mt-2 flex h-10 w-full items-center gap-2 rounded-md p-1",
              `${date.bgcolor}`,
            )}
          >
            <div className={cn("h-8 w-1 rounded-sm", `${date.barcolor}`)}></div>
            <div className="mb-1">
              <p className={cn("text-sm font-bold", `${date.color}`)}>
                {date.title}
              </p>
              <p className={cn("text-xs text-purple-500", `${date.datecolor}`)}>
                {date.time}
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <div className="relative z-40 mt-3 flex h-8 w-full items-center justify-between rounded-md border-2 border-slate-200 bg-slate-50 p-1">
            <p className="text-xs font-bold text-neutral-800">+4 events</p>
            <p className="text-[10px] text-gray-300">16:15-20:00</p>
          </div>
          <div className="absolute bottom-5 z-30 mt-3 flex h-6 w-40 items-center justify-between rounded-md border-2 border-slate-300 bg-slate-100 p-1"></div>
          <div className="absolute bottom-4 mt-3 flex h-6 w-36 items-center justify-between rounded-md border-2 border-slate-300 bg-slate-200 p-1"></div>
        </div>
      </div>
    </div>
  );
}
