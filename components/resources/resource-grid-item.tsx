import { withOutboundRef } from "@/lib/outbound-ref";
import type { Resource } from "@/lib/resources";

export function ResourceGridItem({ resource }: { resource: Resource }) {
  return (
    <li>
      <a
        href={withOutboundRef(resource.href)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="overflow-hidden rounded-md bg-[hsl(var(--surface-alt))] ring-1 ring-foreground/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resource.ogImage}
            alt=""
            loading="lazy"
            className="aspect-[1200/630] w-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
          />
        </div>

        <div className="mt-3 flex min-w-0 flex-row items-baseline justify-between gap-3">
          <span className="min-w-0 max-w-[calc(100%-5.5rem)] truncate text-sm font-medium text-foreground">
            {resource.title}
          </span>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
            {resource.domain}
          </span>
        </div>
      </a>
    </li>
  );
}
