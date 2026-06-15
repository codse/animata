"use client";

import { type ComponentProps, createContext, use, useMemo } from "react";

import { cn } from "@/lib/utils";

export type FlipCardRotate = "x" | "y";

type FlipCardContextValue = {
  rotate: FlipCardRotate;
};

const FlipCardContext = createContext<FlipCardContextValue | null>(null);

const ROTATION_CLASS = {
  x: {
    hover: "group-hover/card:rotate-x-180",
    back: "rotate-x-180",
  },
  y: {
    hover: "group-hover/card:rotate-y-180",
    back: "rotate-y-180",
  },
} as const;

function useFlipCard() {
  const context = use(FlipCardContext);
  if (!context) {
    throw new Error("FlipCard.Front and FlipCard.Back must be used within <FlipCard>.");
  }
  return context;
}

type FlipCardRootProps = ComponentProps<"div"> & {
  rotate?: FlipCardRotate;
};

function FlipCardRoot({ rotate = "y", className, children, ...props }: FlipCardRootProps) {
  const value = useMemo(() => ({ rotate }), [rotate]);

  return (
    <FlipCardContext.Provider value={value}>
      <div className={cn("group/card h-72 w-56 perspective-[1000px]", className)} {...props}>
        <div
          className={cn(
            "relative h-full rounded-2xl transition-transform duration-500 ease-out transform-3d will-change-transform motion-reduce:transition-none",
            ROTATION_CLASS[rotate].hover,
          )}
        >
          {children}
        </div>
      </div>
    </FlipCardContext.Provider>
  );
}

type FlipCardFaceProps = ComponentProps<"div">;

function FlipCardFront({ className, ...props }: FlipCardFaceProps) {
  useFlipCard();

  return <div className={cn("absolute inset-0 backface-hidden", className)} {...props} />;
}

function FlipCardBack({ className, ...props }: FlipCardFaceProps) {
  const { rotate } = useFlipCard();

  return (
    <div
      className={cn("absolute inset-0 backface-hidden", ROTATION_CLASS[rotate].back, className)}
      {...props}
    />
  );
}

const FlipCard = Object.assign(FlipCardRoot, {
  Front: FlipCardFront,
  Back: FlipCardBack,
}) as typeof FlipCardRoot & {
  Front: typeof FlipCardFront;
  Back: typeof FlipCardBack;
};

export default FlipCard;
export { FlipCard, FlipCardBack, FlipCardFront, FlipCardRoot };
