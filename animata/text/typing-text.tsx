import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingTextProps {
  /**
   * Text to type
   */
  text: string;

  /**
   * Delay between typing each character or word (smooth mode) in milliseconds
   * @default 32
   */
  delay?: number;

  /**
   * If true, the text will be erased after typing and then typed again.
   */
  repeat?: boolean;

  /**
   * Custom cursor to show at the end of the text.
   * Applies only when `smooth` is false.
   */
  cursor?: ReactNode;

  /**
   * Additional classes to apply to the container
   */
  className?: string;

  /**
   * If true, the container will grow to fit the text as it types
   */
  grow?: boolean;

  /**
   * Number of characters to keep always visible
   */
  alwaysVisibleCount?: number;

  /**
   * If true, the typing effect will be smooth instead of typing one character at a time.
   * Looks better for multiple words.
   */
  smooth?: boolean;

  /**
   * Time to wait before starting the next cycle of typing
   * Applies only when `repeat` is true.
   *
   * @default 1000
   *
   */
  waitTime?: number;

  /**
   * Callback function to be called when the typing is complete
   */
  onComplete?: () => void;

  /**
   * If true, the cursor will be hidden after typing is complete
   * @default false
   */
  hideCursorOnComplete?: boolean;
}

function Blinker() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span className={show ? "" : "opacity-0"}>|</span>;
}

function SmoothEffect({
  words,
  index,
  alwaysVisibleCount,
}: {
  words: string[];
  index: number;
  alwaysVisibleCount: number;
}) {
  return (
    <div className="flex flex-wrap whitespace-pre">
      {words.map((word, wordIndex) => {
        return (
          <span
            key={wordIndex}
            className={cn("transition-opacity duration-300 ease-in-out", {
              "opacity-100": wordIndex < index,
              "opacity-0": wordIndex >= index + alwaysVisibleCount,
            })}
          >
            {word}
            {wordIndex < words.length && <span>&nbsp;</span>}
          </span>
        );
      })}
    </div>
  );
}

function NormalEffect({
  text,
  index,
  alwaysVisibleCount,
}: {
  text: string;
  index: number;
  alwaysVisibleCount: number;
}) {
  return <>{text.slice(0, Math.max(index, Math.min(text.length, alwaysVisibleCount ?? 1)))}</>;
}

enum TypingDirection {
  Forward = 1,
  Backward = -1,
}

function CursorWrapper({
  visible,
  children,
  waiting,
}: {
  visible?: boolean;
  waiting?: boolean;
  children: ReactNode;
}) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setOn((prev) => !prev);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!visible || (!on && !waiting)) {
    return null;
  }

  return children;
}

function Type({
  text,
  repeat,
  cursor,
  delay,
  grow,
  className,
  alwaysVisibleCount,
  smooth,
  waitTime = 1000,
  onComplete,
  hideCursorOnComplete,
}: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const directionRef = useRef(TypingDirection.Forward);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);
  onCompleteRef.current = onComplete;

  const words = useMemo(() => text.split(/\s+/), [text]);
  const total = smooth ? words.length : text.length;
  const isComplete = index === total && !repeat;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const startInterval = () => {
      interval = setInterval(() => {
        setIndex((current) => {
          const direction = directionRef.current;
          const next = current + direction;

          if (direction === TypingDirection.Forward && next >= total) {
            if (!repeat) {
              if (!completedRef.current) {
                completedRef.current = true;
                onCompleteRef.current?.();
              }
              if (interval) clearInterval(interval);
              return total;
            }
            if (interval) clearInterval(interval);
            timeout = setTimeout(() => {
              directionRef.current = TypingDirection.Backward;
              startInterval();
            }, waitTime);
            return total;
          }

          if (direction === TypingDirection.Backward && next <= 0) {
            if (interval) clearInterval(interval);
            timeout = setTimeout(() => {
              directionRef.current = TypingDirection.Forward;
              startInterval();
            }, waitTime);
            return 0;
          }

          return next;
        });
      }, delay);
    };

    startInterval();

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [total, delay, repeat, waitTime]);

  const waitingNextCycle = index === total || index === 0;

  return (
    <div className={cn("relative font-mono", className)}>
      {!grow && <div className="invisible">{text}</div>}
      <div
        className={cn({
          "absolute inset-0 h-full w-full": !grow,
        })}
      >
        {smooth ? (
          <SmoothEffect words={words} index={index} alwaysVisibleCount={alwaysVisibleCount ?? 1} />
        ) : (
          <NormalEffect text={text} index={index} alwaysVisibleCount={alwaysVisibleCount ?? 1} />
        )}
        <CursorWrapper
          waiting={waitingNextCycle}
          visible={Boolean(!smooth && cursor && (!hideCursorOnComplete || !isComplete))}
        >
          {cursor}
        </CursorWrapper>
      </div>
    </div>
  );
}

export default function TypingText({
  text,
  repeat = true,
  cursor = <Blinker />,
  delay = 32,
  className,
  grow = false,
  alwaysVisibleCount = 1,
  smooth = false,
  waitTime,
  onComplete,
  hideCursorOnComplete = false,
}: TypingTextProps) {
  return (
    <Type
      key={text}
      delay={delay ?? 32}
      waitTime={waitTime ?? 1000}
      grow={grow}
      repeat={repeat}
      text={text}
      cursor={cursor}
      className={className}
      smooth={smooth}
      alwaysVisibleCount={alwaysVisibleCount}
      onComplete={onComplete}
      hideCursorOnComplete={hideCursorOnComplete}
    />
  );
}
