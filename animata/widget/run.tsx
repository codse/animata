"use client";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import PropTypes from "prop-types";

const AnimatedScroll: React.FC<{ setDistance: React.Dispatch<React.SetStateAction<number>> }> = ({
  setDistance,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => {
    let val = Math.ceil(Math.floor(latest) / 10);
    val = -val + 10;
    setDistance(val);
  });

  return (
    <div className="relative flex h-full w-full items-center justify-center px-1">
      <div ref={sliderRef} className="h-[25px] w-full overflow-hidden px-2 tracking-tighter">
        <motion.div
          className="flex gap-x-1 whitespace-nowrap text-3xl font-extralight text-[rgb(222,221,221)]"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -890, right: 90 }}
          dragElastic={false}
        >
          {Array.from({ length: 88 }, (_, index) => (
            <div key={index} className="mt-1 text-sm leading-6 md:mt-0 md:text-3xl">
              |
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute top-0 z-[2] mx-auto h-fit w-8 md:top-[6px]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Interface / Line_Xl">
              {" "}
              <path
                id="Vector"
                d="M12 21V3"
                stroke="rgb(88, 84, 84)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
};

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

const Counter: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div
      style={{ fontSize }}
      className="flex w-[75px] overflow-hidden rounded bg-white leading-none text-gray-900 md:justify-between"
    >
      <Digit place={10} value={value} />
      <span className="mt-[2px] text-4xl md:text-5xl">.</span>
      <Digit place={1} value={value} />
    </div>
  );
};

const Digit: React.FC<{ place: number; value: number }> = ({ place, value }) => {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 45,
    damping: 7,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[20px] overflow-hidden tabular-nums md:w-[28px]">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
};

const Number: React.FC<{ mv: MotionValue; number: number }> = ({ mv, number }) => {
  const shouldReduceMotion = useReducedMotion();

  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = -offset * height;

    if (offset > 5) {
      memo += 10 * height;
    }

    return memo;
  });

  const opacity = useTransform(y, [-height, 0, height], [0.2, 1, 0.2]);
  const scale = useTransform(y, [-height, 0, height], [0.2, 1, 0.2]);
  const filter = useTransform(y, [-height, 0, height], ["blur(5px)", "blur(0px)", "blur(5px)"]);

  if (shouldReduceMotion) {
    scale.set(1);
    filter.set("blur(0px)");
  }

  return (
    <motion.span
      style={{
        y,
        filter,
        scale,
        opacity,
      }}
      className="absolute flex items-center justify-center font-sans text-4xl md:text-5xl"
    >
      {number}
    </motion.span>
  );
};

AnimatedScroll.propTypes = {
  setDistance: PropTypes.func.isRequired,
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
};

Digit.propTypes = {
  place: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

Number.propTypes = {
  mv: PropTypes.instanceOf(MotionValue).isRequired,
  number: PropTypes.number.isRequired,
};

export default function Run({
  unit = "miles",
  buttonText = "Begin Run",
}: {
  unit?: string;
  buttonText?: string;
}) {
  const [distance, setDistance] = useState(10);

  return (
    <div className="box-border flex h-36 w-36 flex-col justify-between overflow-hidden rounded-[24px] bg-[rgb(255,253,255)] p-[3px] text-black md:h-48 md:w-48">
      <div className="flex items-center justify-between px-[8px] py-1">
        <div className="relative flex h-[50px] w-fit items-center justify-evenly overflow-hidden text-5xl font-extrabold">
          <AnimatePresence mode="sync">
            <Counter value={distance} />
          </AnimatePresence>
        </div>
        <button className="mr-1 flex items-center justify-center rounded-lg bg-[rgb(142,139,134)] p-2">
          <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-lg">
            <svg
              width="1000px"
              height="1000px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="rgb(255, 253, 255)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4.343 15.657L15.657 4.343m0 0v9.9m0-9.9h-9.9"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="-mt-2 px-[10px] font-[500] text-gray-500">{unit}</div>
      <div className="h-[40px] w-full overflow-hidden">
        <AnimatedScroll setDistance={setDistance} />
      </div>
      <button className="mx-auto mt-5 flex h-12 w-[99%] items-center justify-center rounded-lg rounded-bl-[18px] rounded-br-[18px] bg-[rgb(242,237,233)] hover:bg-gray-400">
        <svg
          fill="#000000"
          height="20px"
          width="20px"
          version="1.2"
          baseProfile="tiny"
          id="_x31_"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-63 65 128 128"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M38.7,87.6c-3.6,5.1-10.6,6.3-15.7,2.8s-6.3-10.6-2.8-15.7c3.6-5.1,10.6-6.3,15.7-2.8S42.3,82.5,38.7,87.6z M64.1,100.1 l-13.2,19c-1.5,2.3-4.6,2.8-6.9,1.3l-19-13.2L4.7,137.3L22,149.4c1.5,1,2.7,2.7,3,4.5l4.9,27.7c0.6,3.8-2,7.5-5.8,8.2 c-3.8,0.6-7.5-2-8.2-5.8l-4.4-24.9l-21.8-15.5c0,0-11.5,16.6-12.3,17.6s-1.5,2.4-2.8,3.1c-1.7,1-3.7,1.1-5.4,0.7l-27.2-7.3 c-3.7-1-5.9-4.8-4.9-8.6c1-3.7,4.8-5.9,8.6-4.9l22.3,5.9L3.6,98.4h-13.7l-11.7,16.8c-1.5,2.3-4.6,2.8-6.9,1.3 c-2.3-1.5-2.8-4.6-1.3-6.9l13.2-18.9c1-1.5,2.7-2.3,4.4-2.1h22.8c3.4,0,6.8,1,9.7,3.1l7.3,5.2l18,12.7L56,94.6 c1.5-2.3,4.6-2.8,6.9-1.3S65.7,98,64.1,100.1z"></path>{" "}
          </g>
        </svg>
        <span className="ml-2">{buttonText}</span>
      </button>
    </div>
  );
}
