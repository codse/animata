import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Fund = {
  value: string;
  change: number;
  label: string;
};

interface FundWidgetProps {
  /**
   * the array which contians all the funds with their value, changes and label.
   */
  funds: Fund[];

  /**
   * Class name for the background element.
   */
  backgroundClassName?: string;

  /**
   * Class name for the container element.
   */
  containerClassName?: string;
}

export default function FundWidget({
  funds = [
    { value: "2.7Cr", change: 12, label: "Stocks" },
    { value: "3.5Cr", change: -8, label: "Funds" },
    { value: "1.2Cr", change: 6, label: "Deposits" },
  ],
  backgroundClassName,
  containerClassName,
}: FundWidgetProps) {
  const len = funds.length;

  // UseState type for state [activeDiv: number, direction: number]
  const [[activeDiv, direction], setDirection] = useState([0, 0]);

  // Type for the slider variants function
  const sliderVariants = {
    incoming: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      scale: 1.0,
      opacity: 0,
    }),
    active: { y: 0, scale: 1, opacity: 1 },
    exit: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      scale: 1,
      opacity: 0.2,
    }),
  };

  const sliderTransition = {
    duration: 0.5,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  const swipeToAction = (direction: number) => {
    let newDiv = activeDiv + direction;
    if (newDiv < 0) newDiv = (newDiv + len) % len;
    else if (newDiv >= funds.length) newDiv = newDiv % len;
    setDirection([newDiv, direction]);
  };

  // Type for draghandler: dragInfo contains offset: {x: number, y: number}
  const draghandler = (dragInfo: { offset: { y: number } }) => {
    const dragDistance = dragInfo.offset.y;
    const swipeThreshold = 20;
    if (dragDistance > swipeThreshold) {
      swipeToAction(-1);
    } else if (dragDistance < -swipeThreshold) {
      swipeToAction(1);
    }
  };

  const skipToDiv = (divId: number) => {
    let changeDirection = 1;
    if (divId > activeDiv) {
      changeDirection = 1;
    } else if (divId < activeDiv) {
      changeDirection = -1;
    }
    setDirection([divId, changeDirection]);
  };

  return (
    <>
      <div
        className={cn(
          "storybook-fix group flex items-center justify-center py-32",
          containerClassName,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 h-full w-full items-center bg-gradient-to-r from-violet-200 to-pink-200",
            backgroundClassName,
          )}
        />
        <AnimatePresence initial={false}>
          <div className="flex h-72 w-64 flex-col items-center">
            <div className="z-20 flex h-64 w-72 overflow-clip rounded-3xl bg-white px-6 pt-6 shadow-[0px_0px_10px_1px_#bec2bf]">
              <motion.div
                key={activeDiv}
                custom={direction}
                className="block h-full w-full"
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                transition={sliderTransition}
                drag="y"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, dragInfo) => draghandler(dragInfo)}
              >
                <div className="h-56 w-56 bg-white">
                  <h1 className="mb-3 text-6xl font-bold">{funds[activeDiv].value}</h1>
                  {funds[activeDiv].change < 0 ? (
                    <h2 className="text-2xl font-bold text-red-500">
                      {funds[activeDiv].change}% &#8595;
                    </h2>
                  ) : (
                    <h2 className="text-2xl font-bold text-green-500">
                      {funds[activeDiv].change}% &#8593;
                    </h2>
                  )}
                  <h1 className="mb-2 mt-14 text-4xl font-bold text-gray-500">
                    {funds[activeDiv].label}
                  </h1>
                </div>
              </motion.div>
              <div className="-my-2 flex h-full w-10 flex-col items-center justify-center">
                {funds.map((_, index) => {
                  return (
                    <motion.span
                      key={index}
                      className="my-1 h-2 w-2 rounded-full bg-black"
                      style={{ backgroundColor: index === activeDiv ? "black" : "gray" }}
                      initial={{ height: 8 }}
                      animate={{ height: index === activeDiv ? 20 : 8 }}
                      onClick={() => skipToDiv(index)}
                    ></motion.span>
                  );
                })}
              </div>
            </div>
            <div className="z-10 -mt-8 h-10 w-[270px] rounded-b-3xl bg-white shadow-[0px_0px_5px_1px_#bec2bf]"></div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}
