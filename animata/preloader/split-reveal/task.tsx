"use client";

import { useEffect, useId } from "react";

import { useSplitRevealInternal } from "./context";
import type {
  SplitRevealTaskDefinition,
  SplitRevealTaskGenerator,
  SplitRevealTaskRun,
} from "./types";

export type SplitRevealTaskProps = {
  run?: SplitRevealTaskRun;
  generator?: SplitRevealTaskGenerator;
};

export function SplitRevealTask({ run, generator }: SplitRevealTaskProps) {
  const id = useId();
  const { registerTask } = useSplitRevealInternal();

  useEffect(() => {
    const task: SplitRevealTaskDefinition = {
      run,
      generator,
    };

    if (!task.run && !task.generator) {
      return;
    }

    return registerTask(id, task);
  }, [id, registerTask, run, generator]);

  return null;
}
