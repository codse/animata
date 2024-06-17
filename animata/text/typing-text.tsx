import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useMemo, useState } from "react";

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
}

function Blinker() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span>{show ? "|" : ""}</span>;
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
  return (
    <>
      {text.slice(
        0,
        Math.max(index, Math.min(text.length, alwaysVisibleCount ?? 1)),
      )}
    </>
  );
}

enum TypingDirection {
  Forward = 1,
  Backward = -1,
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
}: TypingTextProps) {
  const [index, setIndex] = useState(0);

  const [direction, setDirection] = useState<TypingDirection>(
    TypingDirection.Forward,
  );

  const words = useMemo(() => text.split(/\s+/), [text]);
  const total = smooth ? words.length : text.length;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTyping = () => {
      setIndex((prevDir) => {
        if (
          direction === TypingDirection.Backward &&
          prevDir === TypingDirection.Forward
        ) {
          clearInterval(interval);
        } else if (
          direction === TypingDirection.Forward &&
          prevDir === total - 1
        ) {
          clearInterval(interval);
        }
        return prevDir + direction;
      });
    };

    interval = setInterval(startTyping, delay);
    return () => clearInterval(interval);
  }, [total, direction, delay]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const waitTime = 1000;

    if (index >= total && repeat) {
      timeout = setTimeout(() => {
        setDirection(-1);
      }, waitTime);
    }

    if (index <= 0) {
      timeout = setTimeout(() => {
        setDirection(1);
      }, waitTime);
    }
    return () => clearTimeout(timeout);
  }, [index, total, repeat]);

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
          <SmoothEffect
            words={words}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        ) : (
          <NormalEffect
            text={text}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        )}
        {(index % 4 || waitingNextCycle) && cursor && !smooth ? cursor : ""}
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
}: TypingTextProps) {
  return (
    <Type
      key={text}
      delay={delay ?? 32}
      grow={grow}
      repeat={repeat}
      text={text}
      cursor={cursor}
      className={className}
      smooth={smooth}
      alwaysVisibleCount={alwaysVisibleCount}
    />
  );
}
