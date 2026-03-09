"use client";

import { useTheme } from "next-themes";
import React from "react";

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
  const [mounted, setMounted] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
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

  // Send theme to iframe via postMessage when it changes
  React.useEffect(() => {
    if (!mounted) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "animata-set-theme", theme: resolvedTheme ?? "light" },
      "*",
    );
  }, [resolvedTheme, mounted]);

  // Only render iframe after mount so resolvedTheme is accurate
  const themeParam = mounted && resolvedTheme === "dark" ? "theme:dark" : "theme:light";

  return (
    <div className={cn("group relative", className)} {...props}>
      <div
        className={cn("preview relative w-full max-w-full overflow-hidden!")}
        style={{
          height: `${minHeight}px`,
        }}
      >
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
          key={`${name}-${themeParam}`}
        >
          <iframe
            ref={iframeRef}
            src={`${process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "/preview"}/iframe.html?globals=backgrounds.grid:!false;${themeParam};backgrounds.value:!transparent&viewMode=docs&id=${name.replace(/--[^-]+$/, "--docs")}&r=docs-view`}
            className="w-full"
            title="preview"
            style={{
              height: `${minHeight}px`,
            }}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
