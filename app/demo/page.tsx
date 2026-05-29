import Link from "next/link";
import { redirect } from "next/navigation";

import { DEFAULT_GROUP, DEFAULT_ITEM, itemHref } from "@/app/demo/demos";

export default function DemoIndexPage() {
  if (DEFAULT_GROUP && DEFAULT_ITEM) {
    redirect(itemHref(DEFAULT_GROUP, DEFAULT_ITEM));
  }

  return (
    <main className="grid min-h-svh place-items-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          Live demos
        </p>
        <h1 className="mt-2 font-(family-name:--font-display) text-3xl leading-tight">
          No demos yet
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Register a demo in <code className="font-mono text-[0.9em]">app/demo/demos.ts</code> to
          get started.
        </p>
        <Link
          href="/docs/contributing/demos"
          className="mt-6 inline-flex h-10 items-center rounded-full bg-[hsl(var(--accent))] px-5 text-sm font-semibold text-white"
        >
          Contributing demos
        </Link>
      </div>
    </main>
  );
}
