"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { CopyButton } from "@/components/copy-button";
import { Icons } from "@/components/icons";
import { config } from "@/config";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassName?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
}

// eslint-disable-next-line unused-imports/no-unused-vars
function CodeView({ children }: { children: React.ReactNode }) {
  const [codeString, setCodeString] = React.useState<string | null>(null);
  const codeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (codeRef.current?.textContent) {
      setCodeString(codeRef.current?.textContent);
    }
  }, []);

  return (
    <>
      <div
        ref={codeRef}
        className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
      >
        {children}
      </div>
      {Boolean(codeString) && (
        <div className="absolute -right-2 top-8 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <CopyButton
              value={codeString ?? ""}
              variant="outline"
              className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:size-3.5"
            />
          </div>
        </div>
      )}
    </>
  );
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

  let previewBaseUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  if (!previewBaseUrl) {
    // Fallback to local storybook if env var is not set (useful in action deployment)
    previewBaseUrl = config.isProduction ? "/preview" : "http://localhost:6006";
  }

  return (
    <div className={cn("group relative", className)} {...props}>
      <div
        className={cn("preview relative w-full max-w-full !overflow-hidden")}
        style={{
          height: `${Math.max(100, minHeight)}px`,
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
            src={`${previewBaseUrl}/iframe.html?globals=backgrounds.grid:!false;theme:${resolvedTheme ?? (typeof localStorage !== "undefined" ? localStorage?.getItem?.("theme") : "")};backgrounds.value:!transparent&viewMode=docs&id=${name}&site:docs=true`}
            className="w-full"
            style={{
              height: `${Math.max(100, minHeight)}px`,
            }}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
