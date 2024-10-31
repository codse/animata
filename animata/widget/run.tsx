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
import { MoveUpRight } from "lucide-react";
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
          className="flex gap-x-1 whitespace-nowrap text-3xl text-gray-500"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -890, right: 90 }}
          dragElastic={false}
        >
          {Array.from({ length: 88 }, (_, index) => (
            <div key={index}>|</div>
          ))}
        </motion.div>
      </div>
      <div className="absolute left-[49%] top-0 z-[2] h-fit text-5xl text-black">|</div>
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
      className="flex w-[70px] justify-between overflow-hidden rounded bg-white leading-none text-gray-900"
    >
      <Digit place={10} value={value} />
      <span className="mt-[2px] text-5xl">.</span>
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
    <div style={{ height }} className="relative w-[28px] tabular-nums">
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
      className="absolute flex items-center justify-center font-sans text-5xl"
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
  buttonText = "🏃 Begin Run",
}: {
  unit?: string;
  buttonText?: string;
}) {
  const [distance, setDistance] = useState(10);

  return (
    <div className="flex h-48 w-48 flex-col justify-between overflow-hidden rounded-[18px] bg-white p-[2px] text-black">
      <div className="flex items-center justify-between px-2">
        <div className="relative flex h-[50px] w-fit items-center justify-evenly overflow-hidden text-5xl font-extrabold">
          <AnimatePresence mode="sync">
            <Counter value={distance} />
          </AnimatePresence>
        </div>
        <button className="flex items-center justify-center rounded-md bg-[rgb(142,139,134)] p-2">
          <div className="flex h-4 w-4 items-center justify-center overflow-hidden">
            <MoveUpRight strokeWidth={4} className="text-white" />
          </div>
        </button>
      </div>
      <div className="px-2 font-bold text-gray-500">{unit}</div>
      <div className="h-[40px] w-full overflow-hidden">
        <AnimatedScroll setDistance={setDistance} />
      </div>
      <button className="mx-auto mt-5 h-12 w-[99%] rounded-lg rounded-bl-[18px] rounded-br-[18px] bg-[rgb(213,203,215)] hover:bg-gray-400">
        {buttonText}
      </button>{" "}
      {/*https://emojipedia.org/man-running*/}
    </div>
  );
}
