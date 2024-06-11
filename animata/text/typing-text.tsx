import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TypingTextProps {
  /**
   * Text to type
   */
  text: string;

  /**
   * Delay between typing each character in milliseconds
   * @default 32
   */
  delay?: number;

  /**
   * If true, the text will be erased after typing and then typed again.
   */
  erase?: boolean;

  /**
   * If true, a blinking cursor will be shown at the end of the text
   */
  cursor?: boolean;

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
}

const Blinker = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span>{show ? "|" : ""}</span>;
};

const Type = ({
  text,
  erase,
  cursor,
  delay,
  grow,
  className,
  alwaysVisibleCount,
}: TypingTextProps) => {
  const [index, setIndex] = useState(0);

  // 1 for typing, -1 for erasing
  const [value, setValue] = useState<1 | -1>(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTyping = () => {
      setIndex((prev) => {
        if (value === -1 && prev === 1) {
          clearInterval(interval);
        } else if (value === 1 && prev === text.length - 1) {
          clearInterval(interval);
        }
        return prev + value;
      });
    };

    interval = setInterval(startTyping, delay);
    return () => clearInterval(interval);
  }, [text.length, value, delay]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (index >= text.length && erase) {
      timeout = setTimeout(() => {
        setValue(-1);
      }, 1000);
    }

    if (index <= 0) {
      timeout = setTimeout(() => {
        setValue(1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [index, text.length, erase]);

  const waitingNextCycle = index === text.length || index === 0;

  return (
    <div className={cn("relative font-mono", className)}>
      {!grow && <div className="invisible">{text}</div>}
      <div
        className={cn({
          "absolute inset-0 h-full w-full": !grow,
        })}
      >
        {text.slice(
          0,
          Math.max(index, Math.min(text.length, alwaysVisibleCount ?? 1)),
        )}
        {(index % 4 || waitingNextCycle) && cursor ? <Blinker /> : ""}
      </div>
    </div>
  );
};

export default function TypingText({
  text,
  erase = true,
  cursor = true,
  delay = 32,
  className,
  grow = false,
  alwaysVisibleCount = 1,
}: TypingTextProps) {
  return (
    <Type
      key={text}
      delay={delay ?? 32}
      grow={grow}
      erase={erase}
      text={text}
      cursor={cursor}
      className={className}
      alwaysVisibleCount={alwaysVisibleCount}
    />
  );
}
