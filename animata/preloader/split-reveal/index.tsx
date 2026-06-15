"use client";

import "../split-reveal.css";

import { SplitRevealImages } from "./images";
import { SplitRevealOverlay } from "./overlay";
import { SplitRevealProgress } from "./progress";
import { SplitRevealProgressCount } from "./progress-count";
import { SplitRevealProgressSlot } from "./progress-slot";
import { SplitRevealProgressTrack } from "./progress-track";
import { SplitRevealRoot } from "./root";
import { SplitRevealShutter } from "./shutter";
import { SplitRevealTask } from "./task";

const SplitReveal = Object.assign(SplitRevealRoot, {
  Overlay: SplitRevealOverlay,
  Shutter: SplitRevealShutter,
  Progress: SplitRevealProgress,
  ProgressTrack: SplitRevealProgressTrack,
  ProgressCount: SplitRevealProgressCount,
  ProgressSlot: SplitRevealProgressSlot,
  Task: SplitRevealTask,
  Images: SplitRevealImages,
});

export default SplitReveal;

export { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
export { useSplitReveal, useSplitRevealInternal } from "./context";
export { executeTask } from "./execute-task";
export { SplitRevealImages } from "./images";
export { SplitRevealOverlay, SplitRevealOverlay as SplitRevealOverlayFrame } from "./overlay";
export { preloadImages } from "./preload-images";
export { SplitRevealProgress } from "./progress";
export { SplitRevealProgressCount } from "./progress-count";
export { SplitRevealProgressSlot } from "./progress-slot";
export { SplitRevealProgressTrack } from "./progress-track";
export { SplitRevealRoot } from "./root";
export { SplitRevealShutter } from "./shutter";
export { SplitRevealTask } from "./task";
export type {
  PreloaderPhase,
  SplitRevealContextValue,
  SplitRevealInternalContextValue,
  SplitRevealProgressReporter,
  SplitRevealProgressState,
  SplitRevealRootProps,
  SplitRevealTaskContext,
  SplitRevealTaskDefinition,
  SplitRevealTaskGenerator,
  SplitRevealTaskRun,
} from "./types";
