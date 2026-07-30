import type { ReactNode } from "react";

export type PreloaderPhase = "loading" | "fade-ui" | "reveal" | "done";

export interface SplitRevealProgressState {
  phase: PreloaderPhase;
  progress: number;
  loaded: number;
  total: number;
}

export type SplitRevealProgress = {
  loaded: number;
  total: number;
};

export type SplitRevealProgressReporter = (progress: SplitRevealProgress) => void;

export type SplitRevealTaskContext = {
  report: SplitRevealProgressReporter;
  signal: AbortSignal;
};

export type SplitRevealTaskRun = (ctx: SplitRevealTaskContext) => Promise<void>;

export type SplitRevealTaskGenerator = (
  ctx: SplitRevealTaskContext,
) => AsyncGenerator<SplitRevealProgress | undefined, void, undefined>;

export type SplitRevealTaskDefinition = {
  run?: SplitRevealTaskRun;
  generator?: SplitRevealTaskGenerator;
};

export interface SplitRevealContextValue extends SplitRevealProgressState {
  backgroundColor: string;
  foregroundColor: string;
  revealDuration: number;
  progressFadeMs: number;
  zIndex: number;
  isActive: boolean;
}

export interface SplitRevealInternalContextValue {
  registerTask: (id: string, task: SplitRevealTaskDefinition) => () => void;
}

export interface SplitRevealRootProps {
  children?: ReactNode;
  /** Controlled progress for external loaders, generators, or app boot state */
  progress?: SplitRevealProgress;
  /** When true, starts the reveal sequence. Use without Task/Images for full external control */
  ready?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
  revealDuration?: number;
  /** Progress UI fade duration before shutters move */
  progressFadeMs?: number;
  holdMs?: number;
  zIndex?: number;
  lockScroll?: boolean;
  onComplete?: () => void;
}
