import type { SplitRevealProgressReporter, SplitRevealTaskDefinition } from "./types";

export async function executeTask(
  task: SplitRevealTaskDefinition,
  report: SplitRevealProgressReporter,
  signal: AbortSignal,
) {
  const ctx = { report, signal };

  if (task.run) {
    await task.run(ctx);
    return;
  }

  if (task.generator) {
    if (signal.aborted) {
      return;
    }

    const iterator = task.generator(ctx);
    let result = await iterator.next();

    while (!result.done) {
      if (signal.aborted) {
        await iterator.return?.();
        return;
      }
      if (result.value) {
        report(result.value);
      }
      result = await iterator.next();
    }
  }
}
