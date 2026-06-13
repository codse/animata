import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-(family-name:--font-mono) text-[clamp(4rem,14vw,7rem)] font-bold leading-none tracking-tighter text-foreground">
        404
      </p>
      <h1 className="mt-2 font-(family-name:--font-display) text-2xl tracking-tight text-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-balance text-muted-foreground">
        This route does not exist. Head back to the component library to browse free animated React
        UI.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
        Back to home
      </Link>
    </div>
  );
}
