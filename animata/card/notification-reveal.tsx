import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Notification {
  title: string;
  description: string | JSX.Element;
  img: string;
}

interface NotificationRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications: Notification[];
}

const NotificationReveal = ({ notifications, className }: NotificationRevealProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <div
      className={cn(
        "relative flex h-[12rem] w-[30rem] flex-col items-center gap-2 overflow-hidden rounded-sm border bg-slate-50 p-[7rem] pb-[10rem]",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute z-10 flex h-[5rem] w-[90%] items-center justify-start rounded-lg bg-white p-4 shadow-2xl"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: -60 }}
          exit={{ opacity: 0, y: -120 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <img
            className="mr-4 h-10 w-10 rounded-full"
            src={notifications[currentIndex].img}
            alt="profile"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{notifications[currentIndex].title}</h2>
            <p className="text-sm">{notifications[currentIndex].description}</p>
            <hr className="h-3 w-32 rounded-sm bg-slate-200" />
          </div>
        </motion.div>

        <motion.div
          key={(currentIndex + 1) % notifications.length}
          className="absolute mt-6 flex h-[5rem] w-[77%] items-center justify-start rounded-lg bg-gray-100 p-3 shadow-xl"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <img
            className="mr-4 h-8 w-8 rounded-full"
            src={notifications[(currentIndex + 1) % notifications.length].img}
            alt="profile"
          />
          <div className="flex flex-col">
            <h2 className="text-md font-semibold">
              {notifications[(currentIndex + 1) % notifications.length].title}
            </h2>
            <p className="text-sm">
              {notifications[(currentIndex + 1) % notifications.length].description}
            </p>
            <hr className="h-3 w-32 rounded-sm bg-slate-200" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotificationReveal;
