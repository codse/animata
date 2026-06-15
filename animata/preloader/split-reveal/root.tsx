"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { useLockBody } from "@/hooks/use-lock-body";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { SplitRevealContext, SplitRevealInternalContext } from "./context";
import { executeTask } from "./execute-task";
import type {
  PreloaderPhase,
  SplitRevealInternalContextValue,
  SplitRevealProgressReporter,
  SplitRevealRootProps,
  SplitRevealTaskDefinition,
} from "./types";

export function SplitRevealRoot({
  children,
  progress: controlledProgress,
  ready: controlledReady,
  backgroundColor = "hsl(var(--background))",
  foregroundColor = "hsl(var(--foreground))",
  revealDuration = 0.85,
  progressFadeMs = 280,
  holdMs = 240,
  zIndex = 100,
  lockScroll = true,
  onComplete,
}: SplitRevealRootProps) {
  const reduceMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const phaseRef = useRef<PreloaderPhase>("loading");
  const tasksRef = useRef<Map<string, SplitRevealTaskDefinition>>(new Map());
  const bootstrappedRef = useRef(false);
  const controlledProgressRef = useRef(controlledProgress);
  const controlledReadyRef = useRef(controlledReady);
  controlledProgressRef.current = controlledProgress;
  controlledReadyRef.current = controlledReady;
  const maybeRevealRef = useRef<(() => void) | null>(null);
  const [bootstrapEpoch, setBootstrapEpoch] = useState(0);

  const requestBootstrap = useCallback(() => {
    if (phaseRef.current === "done") {
      return;
    }
    setBootstrapEpoch((epoch) => epoch + 1);
  }, []);

  type PreloadSnapshot = { phase: PreloaderPhase; loaded: number; total: number };

  const preloadReducer = (
    state: PreloadSnapshot,
    action:
      | { type: "reset"; total: number }
      | { type: "progress"; loaded: number; total: number }
      | { type: "phase"; phase: PreloaderPhase },
  ): PreloadSnapshot => {
    switch (action.type) {
      case "reset":
        if (state.phase === "done") {
          return state;
        }
        return { phase: "loading", loaded: 0, total: action.total };
      case "progress":
        if (state.phase === "done") {
          return state;
        }
        return { ...state, loaded: action.loaded, total: action.total };
      case "phase":
        return { ...state, phase: action.phase };
      default:
        return state;
    }
  };

  const [preload, dispatchPreload] = useReducer(preloadReducer, {
    phase: "loading",
    loaded: 0,
    total: 0,
  });
  const { phase, loaded, total } = preload;

  phaseRef.current = phase;

  const progressPercent = total === 0 ? 100 : Math.round((loaded / total) * 100);
  const isActive = phase !== "done";
  const readyControlled = controlledReady !== undefined;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (controlledProgress === undefined) {
      return;
    }

    if (phaseRef.current === "done") {
      return;
    }

    dispatchPreload({
      type: "progress",
      loaded: controlledProgress.loaded,
      total: controlledProgress.total,
    });
  }, [controlledProgress]);

  const registerTask = useCallback(
    (id: string, task: SplitRevealTaskDefinition) => {
      const isNew = !tasksRef.current.has(id);
      tasksRef.current.set(id, task);

      if (isNew && phaseRef.current === "loading" && bootstrappedRef.current) {
        requestBootstrap();
      }

      return () => {
        tasksRef.current.delete(id);
      };
    },
    [requestBootstrap],
  );

  const bootstrapRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (phaseRef.current === "done") {
      return;
    }

    let runId = 0;
    let fadeTimer: number | undefined;
    let revealTimer: number | undefined;
    let doneTimer: number | undefined;
    let abortController: AbortController | undefined;
    let tasksDone = false;

    const clearTimers = () => {
      if (fadeTimer !== undefined) {
        window.clearTimeout(fadeTimer);
        fadeTimer = undefined;
      }
      if (revealTimer !== undefined) {
        window.clearTimeout(revealTimer);
        revealTimer = undefined;
      }
      if (doneTimer !== undefined) {
        window.clearTimeout(doneTimer);
        doneTimer = undefined;
      }
    };

    const finish = (currentRun: number) => {
      if (currentRun !== runId) {
        return;
      }
      onCompleteRef.current?.();
      dispatchPreload({ type: "phase", phase: "done" });
    };

    const startReveal = (currentRun: number) => {
      if (phaseRef.current !== "loading") {
        return;
      }

      if (reduceMotion) {
        finish(currentRun);
        return;
      }

      dispatchPreload({ type: "phase", phase: "fade-ui" });

      revealTimer = window.setTimeout(() => {
        if (currentRun !== runId) {
          return;
        }

        dispatchPreload({ type: "phase", phase: "reveal" });
        doneTimer = window.setTimeout(() => finish(currentRun), revealDuration * 1000);
      }, progressFadeMs);
    };

    const scheduleReveal = (currentRun: number) => {
      if (fadeTimer !== undefined) {
        return;
      }
      fadeTimer = window.setTimeout(() => startReveal(currentRun), holdMs);
    };

    const maybeReveal = (currentRun: number) => {
      const hasTasks = tasksRef.current.size > 0;
      const tasksReady = !hasTasks || tasksDone;
      const readyOk = !readyControlled || controlledReadyRef.current === true;

      if (!tasksReady || !readyOk) {
        return;
      }

      if (!hasTasks && !readyControlled) {
        return;
      }

      scheduleReveal(currentRun);
    };

    const bootstrap = () => {
      runId += 1;
      const currentRun = runId;
      maybeRevealRef.current = () => maybeReveal(currentRun);
      clearTimers();
      abortController?.abort();
      abortController = new AbortController();
      const signal = abortController.signal;
      tasksDone = false;

      const tasks = [...tasksRef.current.values()];
      const hasTasks = tasks.length > 0;

      if (!hasTasks) {
        const progress = controlledProgressRef.current;
        const nextTotal = progress?.total ?? 0;
        const nextLoaded = progress?.loaded ?? 0;
        dispatchPreload({ type: "reset", total: nextTotal });
        if (progress !== undefined) {
          dispatchPreload({
            type: "progress",
            loaded: nextLoaded,
            total: nextTotal,
          });
        }

        maybeReveal(currentRun);
        return;
      }

      dispatchPreload({ type: "reset", total: 0 });

      const report: SplitRevealProgressReporter = (next) => {
        if (currentRun !== runId || abortController?.signal.aborted) {
          return;
        }
        dispatchPreload({ type: "progress", loaded: next.loaded, total: next.total });
      };

      Promise.allSettled(tasks.map((task) => executeTask(task, report, signal))).then(() => {
        if (currentRun !== runId || signal.aborted) {
          return;
        }

        tasksDone = true;
        maybeReveal(currentRun);
      });
    };

    bootstrapRef.current = bootstrap;
    bootstrappedRef.current = true;
    bootstrap();

    return () => {
      runId += 1;
      bootstrappedRef.current = false;
      maybeRevealRef.current = null;
      clearTimers();
      abortController?.abort();
      bootstrapRef.current = null;
    };
  }, [holdMs, progressFadeMs, readyControlled, reduceMotion, revealDuration]);

  useEffect(() => {
    if (!readyControlled || controlledReady !== true) {
      return;
    }

    maybeRevealRef.current?.();
  }, [controlledReady, readyControlled]);

  useEffect(() => {
    if (bootstrapEpoch === 0) {
      return;
    }

    bootstrapRef.current?.();
  }, [bootstrapEpoch]);

  useEffect(() => {
    const restartFromCache = () => {
      if (phaseRef.current === "done") {
        return;
      }

      dispatchPreload({ type: "reset", total: 0 });
      requestBootstrap();
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        restartFromCache();
      }
    };

    const onResume = () => {
      restartFromCache();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("resume", onResume);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("resume", onResume);
    };
  }, [requestBootstrap]);

  useLockBody(lockScroll && isActive);

  const contextValue = useMemo(
    () => ({
      phase,
      progress: progressPercent,
      loaded,
      total,
      backgroundColor,
      foregroundColor,
      revealDuration,
      progressFadeMs,
      zIndex,
      isActive,
    }),
    [
      backgroundColor,
      foregroundColor,
      isActive,
      loaded,
      phase,
      progressPercent,
      progressFadeMs,
      revealDuration,
      total,
      zIndex,
    ],
  );

  const internalValue = useMemo<SplitRevealInternalContextValue>(
    () => ({ registerTask }),
    [registerTask],
  );

  if (!isActive) {
    return null;
  }

  return (
    <SplitRevealContext value={contextValue}>
      <SplitRevealInternalContext value={internalValue}>{children}</SplitRevealInternalContext>
    </SplitRevealContext>
  );
}
