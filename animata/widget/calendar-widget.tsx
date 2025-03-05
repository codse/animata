import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, DotIcon } from "lucide-react";

const monthArray = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface EventType {
  date: number;
  title: string;
  time: string;
}

export default function CalendarWidget({
  initialSelectedDate = 1,
  initialShowEvents = true,
  eventsData = [],
  month = 1,
  year = new Date().getFullYear(),
}: {
  initialSelectedDate?: number;
  initialShowEvents?: boolean;
  eventsData?: EventType[];
  month?: number;
  year?: number;
}) {
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [showEvents, setShowEvents] = useState(initialShowEvents);
  const scrollRef = useRef<HTMLDivElement>(null);

  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const daySymbols = ["S", "M", "T", "W", "T", "F", "S"];

  const filteredEvents = eventsData.filter((event: EventType) => event.date === selectedDate);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(`[data-date="${selectedDate}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedDate]);

  return (
    <motion.div
      className="mx-auto max-w-sm rounded-3xl bg-slate-200 shadow-lg"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-sm rounded-3xl px-6 py-2">
        <h2 className="mb-4 text-2xl font-bold">{`${monthArray[month]} ${year}`}</h2>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex items-start space-x-2 overflow-x-auto py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dates.map((date, index) => (
            <motion.button
              key={date}
              data-date={date}
              className="flex w-10 flex-shrink-0 flex-col items-center justify-center gap-y-2 rounded-lg"
              onClick={() => {
                setSelectedDate(date);
                setShowEvents(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mb-1 text-xs">{daySymbols[(index + 4) % 7]}</span>
              <AnimatePresence>
                {selectedDate === date ? (
                  <motion.span
                    layoutId="highlighted-date"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-black shadow-lg"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {date}
                  </motion.span>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center">{date}</span>
                )}
              </AnimatePresence>
              <span>
                {eventsData.find((alldates: EventType) => alldates.date === date) ? (
                  <DotIcon />
                ) : (
                  ""
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full rounded-3xl bg-[#fefefe] px-6 shadow-lg">
        <AnimatePresence mode="wait">
          {showEvents && (
            <motion.div
              key="events"
              className="scrollbar-hide mt-2 h-[150px] overflow-scroll border-t pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event: EventType, index: number) => (
                  <motion.div
                    key={index}
                    className="mb-2 border-b-2 border-slate-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="flex flex-col items-center text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CalendarIcon className="mb-2 h-8 w-8" />
                  <p>No Events</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
