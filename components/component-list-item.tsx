"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { lazy, Suspense, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { ReloadButton } from "@/components/reload-button";
import { cn } from "@/lib/utils";

function Actions({
  copyId,
  href,
  onRefresh,
}: {
  copyId: string;
  href?: string;
  onRefresh: () => void;
}) {
  return (
    <div className="inline-flex w-full justify-end p-2">
      {href ? (
        <Link
          href={href}
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-md text-zinc-600 transition-colors",
            "hover:bg-zinc-100 hover:text-zinc-900 dark:text-white dark:hover:bg-zinc-800",
          )}
          aria-label="Open component page"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      ) : (
        <CopyButton
          className="bg-white text-zinc-600 shadow-none dark:bg-zinc-950 dark:text-white"
          proxyId={`source-${copyId}`}
          value=""
        />
      )}
      <ReloadButton
        className="bg-white text-zinc-600 shadow-none dark:bg-zinc-950 dark:text-white"
        onClick={onRefresh}
      />
    </div>
  );
}

const lazyList: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  "ai-button": lazy(() => import("@/animata/button/ai-button")),
  "status-button": lazy(() => import("@/animata/button/status-button")),
};

export default function ComponentListItem({
  children,
  className,
  copyId,
  href,
  lazy,
  ...props
}: {
  copyId: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
  lazy?: boolean;
}) {
  const [forceUpdate, setForceUpdate] = useState(0);
  const Component = lazy && Reflect.has(lazyList, copyId) ? lazyList[copyId] : null;
  return (
    <div {...props} className={cn("component-list-item relative rounded-xl border", className)}>
      <Actions copyId={copyId} href={href} onRefresh={() => setForceUpdate((prev) => prev + 1)} />
      <div
        key={`component-list-item-${copyId}-${forceUpdate}`}
        className="flex min-h-56 flex-col items-center justify-center px-4 pb-4"
      >
        {children}
        {Component && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <Component />
          </Suspense>
        )}
      </div>
    </div>
  );
}
