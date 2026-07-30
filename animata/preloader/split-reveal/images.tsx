"use client";

import { useCallback, useMemo } from "react";

import { preloadImages } from "./preload-images";
import { SplitRevealTask } from "./task";
import type { SplitRevealTaskContext } from "./types";

export type SplitRevealImagesProps = {
  urls: string[];
};

export function SplitRevealImages({ urls }: SplitRevealImagesProps) {
  const uniqueUrls = useMemo(() => [...new Set(urls.filter(Boolean))], [urls]);

  const run = useCallback(
    ({ report, signal }: SplitRevealTaskContext) => {
      if (signal.aborted) {
        return Promise.resolve();
      }

      return preloadImages(uniqueUrls, (next) => {
        if (!signal.aborted) {
          report(next);
        }
      });
    },
    [uniqueUrls],
  );

  return <SplitRevealTask run={run} />;
}
