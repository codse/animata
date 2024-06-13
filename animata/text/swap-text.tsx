import { cn } from "@/lib/utils";
import { useState } from "react";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The initial text to display.
   */
  initialText: string;

  /**
   * The final text to display.
   */
  finalText: string;

  /**
   * Whether the component should toggle on hover as well as click.
   */
  supportsHover?: boolean;

  /**
   * The class name for the text.
   */
  textClassName?: string;
}

export default function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  // The rest of the props are passed to the container div.
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState(false);
  const common = "block transition-all duration-1000 ease-slow";

  const longWord = finalText.length > initialText.length ? finalText : null;

  return (
    <div {...props} className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "group cursor-pointer select-none text-3xl font-bold",
          textClassName,
        )}
        onClick={() => setActive((current) => !current)}
      >
        <span
          className={cn(common, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {initialText}
          {
            /* Trick to make sure it can always fit all available words after transition as the second word is set to absolute*/
            Boolean(longWord?.length) && (
              <span className="invisible h-0">{longWord}</span>
            )
          }
        </span>
        <span
          className={cn(`${common} absolute top-full`, {
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {finalText}
        </span>
      </div>
    </div>
  );
}
