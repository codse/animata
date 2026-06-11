import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const linkClassName =
  "rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60";

export function CategoryIndexGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>
  );
}

export function CategoryIndexLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(linkClassName, className)}>
      {children}
    </Link>
  );
}
