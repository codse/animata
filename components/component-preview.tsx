"use client";

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

// Categories with hyphens must come first so they match before single-word prefixes
const CATEGORIES = [
  "bento-grid",
  "feature-cards",
  "accordion",
  "background",
  "button",
  "card",
  "carousel",
  "container",
  "fabs",
  "graphs",
  "hero",
  "icon",
  "image",
  "list",
  "overlay",
  "preloader",
  "progress",
  "section",
  "skeleton",
  "text",
  "widget",
];

/**
 * Convert a storybook ID like "bento-grid-eight--primary"
 * to the file path "bento-grid/eight"
 */
function storyIdToPath(name: string): string {
  const [idPart] = name.split("--");
  for (const cat of CATEGORIES) {
    if (idPart.startsWith(`${cat}-`)) {
      return `${cat}/${idPart.slice(cat.length + 1)}`;
    }
  }
  // Fallback: first segment is category
  const first = idPart.indexOf("-");
  if (first === -1) return idPart;
  return `${idPart.slice(0, first)}/${idPart.slice(first + 1)}`;
}

function StoryRenderer({ name }: { name: string }) {
  const [Preview, setPreview] = React.useState<React.ReactNode>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const path = storyIdToPath(name);
    const [, storyName = "primary"] = name.split("--");
    const exportName = storyName.charAt(0).toUpperCase() + storyName.slice(1);

    import(`@/animata/${path}.stories`)
      .then((mod) => {
        const storyExport = mod[exportName] ?? mod.Primary;
        const meta = mod.default;

        if (!storyExport) {
          setError(`Story "${exportName}" not found`);
          return;
        }

        const args = { ...meta?.args, ...storyExport.args };
        const Component = meta?.component;

        if (storyExport.render) {
          setPreview(React.createElement(() => storyExport.render(args)));
        } else if (Component) {
          setPreview(React.createElement(Component, args));
        } else {
          setError(`No render function or component for ${path}`);
        }
      })
      .catch((err) => {
        console.error(`Failed to load story ${path}:`, err);
        setError(`Failed to load: ${path}`);
      });
  }, [name]);

  if (error) {
    return <div className="text-sm text-muted-foreground">{error}</div>;
  }

  if (!Preview) {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return <>{Preview}</>;
}

export function ComponentPreview({ name, className, ...props }: ComponentPreviewProps) {
  return (
    <div className={cn("group relative my-4", className)} {...props}>
      <div className="preview relative flex min-h-[200px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border p-4">
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          <StoryRenderer name={name} />
        </React.Suspense>
      </div>
    </div>
  );
}
