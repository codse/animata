import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WaveRevealProps {
  /**
   * The text to animate
   */
  text: string;

  /**
   * Additional classes for the container
   */
  className?: string;

  /**
   * The direction of the animation
   * @default "down"
   */
  direction?: "up" | "down";

  /**
   * The mode of the animation
   * @default "letter"
   */
  mode?: "letter" | "word";

  /**
   * Speed of the animation in ms
   */
  speed?: number;

  /**
   * If true, the text will apply a blur effect as seen in WWDC.
   */
  blur?: boolean;
}

interface ReducedValue extends Pick<WaveRevealProps, "direction" | "mode"> {
  nodes: ReactNode[];
  offset: number;
  length: number;
  speed: number;
  blur?: boolean;
}

const Word = ({
  isWordMode,
  word,
  index,
  offset,
  speed,
  className,
}: {
  index: number;
  offset: number;
  speed: number;
  className: string;
  isWordMode: boolean;
  word: string;
}) => {
  if (isWordMode) {
    return word;
  }

  return (
    <>
      {word.split("").map((letter, letterIndex) => {
        return (
          <span
            key={`${letter}_${letterIndex}_${index}`}
            className={cn({
              [className]: !isWordMode,
            })}
            style={{
              animationDuration: createDuration({
                index: letterIndex,
                offset,
                speed,
              }),
            }}
          >
            {letter}
          </span>
        );
      })}
    </>
  );
};

const createDuration = ({
  offset,
  index,
  speed,
}: Pick<ReducedValue, "offset" | "speed"> & { index: number }) => {
  return `calc(sin((${offset + index + 1} / 12) * 45deg) * ${speed}ms)`;
};

const createAnimatedNodes = (
  args: ReducedValue & { speed: number },
  word: string,
  index: number,
): ReducedValue => {
  const { nodes, offset, length, mode, direction, speed, blur } = args;
  const isLast = index === length - 1;

  const isWordMode = mode === "word";
  const isUp = direction === "up";

  const className = cn(
    `inline-block opacity-0 transition-all ease-in-out fill-mode-forwards`,
    {
      // Determine the animation direction
      [`animate-[reveal-down]`]: !isUp && !blur,
      [`animate-[reveal-up]`]: isUp && !blur,
      [`animate-[reveal-down,content-blur]`]: !isUp && blur,
      [`animate-[reveal-up,content-blur]`]: isUp && blur,
    },
  );

  const node = (
    <span
      key={`word_${index}`}
      className={cn({
        [className]: isWordMode,
      })}
      style={{
        animationDuration: createDuration({ index, offset, speed }),
      }}
    >
      <Word
        isWordMode={isWordMode}
        word={word}
        index={index}
        offset={offset}
        speed={speed}
        className={className}
      />
      {!isLast && " "}
    </span>
  );

  return {
    ...args,
    nodes: [...nodes, node],
    offset: offset + (isWordMode ? index + 1 : word.length),
  };
};

export default function WaveReveal({
  text,
  direction = "down",
  mode = "letter",
  className,
  speed = 2000,
  blur = true,
}: WaveRevealProps) {
  if (!text) {
    return null;
  }

  const words = text.trim().split(/\s/);

  const { nodes } = words.reduce<ReducedValue>(createAnimatedNodes, {
    nodes: [],
    offset: 0,
    length: words.length,
    direction,
    mode,
    speed: speed ?? 60,
    blur,
  });

  return (
    <div
      className={cn(
        "relative flex flex-wrap justify-center whitespace-pre px-2 text-4xl font-black md:px-6 md:text-7xl",
        className,
      )}
    >
      {nodes}
    </div>
  );
}
