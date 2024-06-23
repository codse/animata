import { cn } from "@/lib/utils";

interface CalendarEvent {
  title: string;
  time: string;
  color: string;
  bgcolor: string;
  barColor: string;
  dateColor: string;
}

interface CalendarEventProps {
  dates: CalendarEvent[];
}

export const testCalendarEventProps: CalendarEventProps = {
  dates: [
    {
      title: "Backlog Updates",
      time: "10:30 - 10:45",
      color: "text-purple-900",
      bgcolor: "bg-purple-200",
      barColor: "bg-purple-700",
      dateColor: "text-purple-600",
    },
    {
      title: "Review Jade A",
      time: "12:00 - 12:45",
      color: "text-cyan-900",
      bgcolor: "bg-cyan-200",
      barColor: "bg-cyan-700",
      dateColor: "text-cyan-600",
    },
    {
      title: "Design Meeting",
      time: "14:00 - 15:00",
      color: "text-green-900",
      bgcolor: "bg-green-200",
      barColor: "bg-green-700",
      dateColor: "text-green-600",
    },
    {
      title: "Development",
      time: "16:00 - 17:00",
      color: "text-yellow-900",
      bgcolor: "bg-yellow-200",
      barColor: "bg-yellow-700",
      dateColor: "text-yellow-600",
    },
    {
      title: "QA Testing",
      time: "18:00 - 19:00",
      color: "text-red-900",
      bgcolor: "bg-red-200",
      barColor: "bg-red-700",
      dateColor: "text-red-600",
    },
  ],
};

const maxEvents = 2;

function EventCard({ date }: { date: CalendarEvent; hides: boolean }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-md pl-1 transition-all",
        date.bgcolor,
      )}
    >
      <div className={cn("h-8 w-1 rounded-sm", date.barColor)}></div>
      <div className="flex-col items-center justify-center">
        <h4 className={cn("text-sm font-bold", date.color)}>{date.title}</h4>
        <p className={cn("whitespace-pre text-xs", date.dateColor)}>{date.time}</p>
      </div>
    </div>
  );
}

export default function CalendarEvent({
  dates = testCalendarEventProps.dates,
}: CalendarEventProps) {
  const extraCount = dates.length - maxEvents;
  return (
    <div
      className={cn(
        "group relative flex size-52 flex-col overflow-hidden rounded-3xl border-2 bg-white p-4",
      )}
    >
      <div className="flex gap-1">
        <p className="text-xl font-bold text-red-400">
          {new Date().toLocaleString("default", { weekday: "short" })}
        </p>
        <p className="text-xl font-bold text-black">{new Date().getDate()}</p>
      </div>
      <div className="my-2 flex flex-1 flex-col gap-2">
        {dates.slice(0, maxEvents).map((date, index) => (
          <EventCard hides key={index} date={date} />
        ))}
      </div>
      {extraCount ? (
        <>
          <div className="flex h-8 w-full items-center justify-between rounded-md border-2 border-slate-200 bg-slate-50 p-1">
            <p className="text-xs font-bold text-neutral-800">
              +{dates.length - maxEvents} event{extraCount > 1 && "s"}
            </p>
            <p className="text-[10px] text-gray-500">16:15 - 20:00</p>
          </div>
          {dates.slice(maxEvents, maxEvents + 3).map((date, index) => (
            <div
              key={index}
              style={{
                paddingInline: `${(index + 1) * 6}px`,
              }}
            >
              <div className="mt-[1px] h-[2px] w-full rounded-full bg-gray-100" />
            </div>
          ))}
        </>
      ) : (
        <div className="w-full text-center text-xs font-bold text-gray-500">No more events</div>
      )}
    </div>
  );
}
