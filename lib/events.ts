import posthog from "posthog-js";
import { z } from "zod";

import { config } from "@/config";

const eventSchema = z.object({
  name: z.enum(["copy_npm_command", "copy_touch_command", "copy_usage_code", "copy_source_code"]),
  properties: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export type Event = z.infer<typeof eventSchema>;

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (config.isProduction) {
    posthog.capture(event.name, event.properties);
  }
}
