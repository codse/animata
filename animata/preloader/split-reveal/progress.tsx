"use client";

import type { ComponentProps, ReactNode } from "react";

import { useSplitReveal } from "./context";
import { SplitRevealProgressCount } from "./progress-count";
import { SplitRevealProgressSlot } from "./progress-slot";
import { SplitRevealProgressTrack } from "./progress-track";
import type { SplitRevealProgressState } from "./types";

export function SplitRevealProgress({
  className,
  children,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  children?: ReactNode | ((state: SplitRevealProgressState) => ReactNode);
}) {
  const { phase, progress, loaded, total, foregroundColor } = useSplitReveal();

  const content =
    typeof children === "function"
      ? children({ progress, loaded, total, phase })
      : (children ?? (
          <>
            <SplitRevealProgressTrack progress={progress} foregroundColor={foregroundColor} />
            <SplitRevealProgressCount
              loaded={loaded}
              total={total}
              foregroundColor={foregroundColor}
            />
          </>
        ));

  return (
    <SplitRevealProgressSlot className={className} {...props}>
      {content}
    </SplitRevealProgressSlot>
  );
}
