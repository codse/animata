import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { demoHref, getDemosUsingComponent } from "@/app/demo/demo-registry";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DocDemoLinks({ docSlug }: { docSlug: string }) {
  const demos = getDemosUsingComponent(docSlug);
  if (!demos.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      <span className="text-sm text-muted-foreground">Used in demos</span>
      {demos.map((demo) => (
        <Link
          key={demo.key}
          href={demoHref(demo)}
          className={cn(badgeVariants({ variant: "secondary" }), "gap-1 hover:bg-secondary/80")}
        >
          {demo.label}
          <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
