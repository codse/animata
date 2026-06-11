import Link from "next/link";

import { ResourceGrid } from "@/components/resources/resource-grid";
import { withOutboundRef } from "@/lib/outbound-ref";
import {
  getResources,
  RESOURCES_CLOSING,
  RESOURCES_DISCLAIMER,
  RESOURCES_INTRO,
} from "@/lib/resources";

export function ResourcesShell() {
  const resources = getResources();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <header className="max-w-2xl">
        <h1 className="font-(family-name:--font-display) text-3xl tracking-[-0.02em] text-foreground md:text-4xl lg:text-5xl">
          Resources
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--text-secondary))] md:text-base">
          {RESOURCES_INTRO}
        </p>
      </header>

      <ResourceGrid resources={resources} />

      <footer className="mt-14 max-w-2xl sm:mt-16">
        <p className="text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
          {RESOURCES_CLOSING}
        </p>
        <p className="mt-4">
          <Link
            href={withOutboundRef("https://github.com/codse/animata")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground/50"
          >
            Suggest one
          </Link>
        </p>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{RESOURCES_DISCLAIMER}</p>
      </footer>
    </div>
  );
}
