"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { config } from "@/config";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY && config.isProduction) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  if (!config.isProduction) {
    // Don't track events in development
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
