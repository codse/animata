"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassName?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
}

export function ComponentPreview({ name, className, ...props }: ComponentPreviewProps) {
  const [minHeight, setMinHeight] = React.useState<number>(350);

  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      if (event.data.type === "animata-set-height") {
        setMinHeight(event.data.height);
      }
    };
    window.addEventListener("message", eventListener);
    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);

  const theme =
    resolvedTheme ??
    (typeof localStorage !== "undefined" ? localStorage?.getItem?.("theme") : "") ??
    "";
  const themeParam = theme === "dark" ? "theme:dark" : "theme:light";

  return (
    <div className={cn("group relative", className)} {...props}>
      <div
        className={cn("preview relative w-full max-w-full !overflow-hidden")}
        style={{
          minHeight: "200px",
          height: `${Math.max(200, minHeight)}px`,
        }}
      >
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          <iframe
            src={`${process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "/preview"}/iframe.html?globals=${themeParam}&id=${name}&viewMode=story`}
            className="w-full"
            style={{
              minHeight: "200px",
              height: `${Math.max(200, minHeight)}px`,
            }}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
