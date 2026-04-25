"use client";

import { ArrowUpRight } from "lucide-react";
import { useInView } from "motion/react";
import Link from "next/link";
import type React from "react";
import { lazy, Suspense, useRef, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { ReloadButton } from "@/components/reload-button";
import { cn } from "@/lib/utils";

const extractName = (nameLike?: string) => {
  if (!nameLike) {
    return "";
  }

  const part = nameLike.includes("/") ? nameLike.split("/").pop() : nameLike;
  if (!part) {
    return "";
  }

  return part.replaceAll("-", " ");
};

function Name({ name, href }: { name: string; href?: string }) {
  return (
    <div className="w-full p-2 text-muted-foreground text-xs flex justify-between">
      <span className=" transition-all md:opacity-0 md:translate-y-full capitalize md:group-hover/component:opacity-100 md:group-hover/component:translate-y-0">
        {name}
      </span>
      {href ? (
        <Link
          href={href}
          className={cn(
            "text-zinc-600 pe-2 origin-bottom-left transition-all hover:scale-125 hover:text-zinc-900 dark:text-white",
          )}
          aria-label="Open component page"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

function Actions({
  copyId,
  href,
  onRefresh,
}: {
  href?: string;
  copyId: string;
  onRefresh: () => void;
}) {
  return (
    <div className="inline-flex w-full justify-end p-2">
      {!href?.length && (
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

function DisplayInView({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // not setting to once: true, so that it unmounts the component this triggering re-render
  const isInView = useInView(ref);
  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      {isInView && children}
    </div>
  );
}

export default function ComponentListItem({
  children,
  className,
  copyId,
  href,
  lazy,
  alwaysVisible,
  ...props
}: {
  copyId: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
  lazy?: boolean;
  alwaysVisible?: boolean;
}) {
  const [forceUpdate, setForceUpdate] = useState(0);
  const Component = lazy && Reflect.has(lazyList, copyId) ? lazyList[copyId] : null;
  return (
    <div {...props} className={cn("group/component component-list-item relative", className)}>
      <Actions copyId={copyId} href={href} onRefresh={() => setForceUpdate((prev) => prev + 1)} />
      <div
        key={`component-list-item-${copyId}-${forceUpdate}`}
        className="flex min-h-56 flex-col items-center justify-center"
      >
        {!alwaysVisible ? <DisplayInView>{children}</DisplayInView> : children}
        {Component && (
          <Suspense fallback={<div className="h-full w-full" />}>
            <Component />
          </Suspense>
        )}
      </div>
      <Name name={extractName(href || copyId)} href={href} />
    </div>
  );
}
