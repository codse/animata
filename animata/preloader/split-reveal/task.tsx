"use client";

import { useEffect, useId, useRef } from "react";

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
  const runRef = useRef(run);
  const generatorRef = useRef(generator);
  runRef.current = run;
  generatorRef.current = generator;

  useEffect(() => {
    const task: SplitRevealTaskDefinition = {
      run: runRef.current ? (ctx) => runRef.current?.(ctx) ?? Promise.resolve() : undefined,
      generator: generatorRef.current,
    };

    if (!task.run && !task.generator) {
      return;
    }

    return registerTask(id, task);
  }, [id, registerTask]);

  return null;
}
