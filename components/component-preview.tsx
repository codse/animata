"use client";

import React from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
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

function storyIdToPath(name: string): string {
  const [idPart] = name.split("--");
  for (const cat of CATEGORIES) {
    if (idPart.startsWith(`${cat}-`)) {
      return `${cat}/${idPart.slice(cat.length + 1)}`;
    }
  }
  const first = idPart.indexOf("-");
  if (first === -1) return idPart;
  return `${idPart.slice(0, first)}/${idPart.slice(first + 1)}`;
}

// Props that shouldn't appear in the editor
const HIDDEN_PROPS = new Set(["children", "className", "style", "key", "ref"]);

// Storybook internal exports to skip when collecting other stories
const INTERNAL_EXPORTS = new Set(["default", "__namedExportsOrder"]);

function PropsEditor({
  args,
  initialArgs,
  argTypes,
  onChange,
  onReset,
}: {
  args: Record<string, unknown>;
  initialArgs: Record<string, unknown>;
  argTypes: Record<string, { table?: { disable?: boolean }; control?: unknown }>;
  onChange: (key: string, value: unknown) => void;
  onReset: () => void;
}) {
  const editableArgs = Object.entries(args).filter(([key]) => {
    if (HIDDEN_PROPS.has(key)) return false;
    if (argTypes[key]?.table?.disable) return false;
    const val = args[key];
    return typeof val === "boolean" || typeof val === "number" || typeof val === "string";
  });

  if (editableArgs.length === 0) return null;

  const hasChanges = editableArgs.some(([key]) => args[key] !== initialArgs[key]);

  return (
    <div className="border-t bg-muted/30 px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Props
        </div>
        {hasChanges && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      <div className="grid gap-2">
        {editableArgs.map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <label
              htmlFor={`prop-${key}`}
              className="min-w-[120px] text-right font-mono text-xs text-muted-foreground"
            >
              {key}
            </label>
            {typeof value === "boolean" ? (
              <button
                id={`prop-${key}`}
                type="button"
                onClick={() => onChange(key, !value)}
                className={cn(
                  "h-5 w-9 rounded-full transition-colors",
                  value ? "bg-primary" : "bg-muted-foreground/30",
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    value ? "translate-x-4.5" : "translate-x-0.5",
                  )}
                />
              </button>
            ) : typeof value === "number" ? (
              <input
                id={`prop-${key}`}
                type="number"
                value={value}
                onChange={(e) => onChange(key, Number(e.target.value))}
                className="h-7 w-24 rounded border bg-background px-2 font-mono text-xs"
              />
            ) : (
              <input
                id={`prop-${key}`}
                type="text"
                value={String(value)}
                onChange={(e) => onChange(key, e.target.value)}
                className="h-7 flex-1 rounded border bg-background px-2 font-mono text-xs"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface OtherStory {
  name: string;
  render: (args: Record<string, unknown>) => React.ReactNode;
  args: Record<string, unknown>;
}

interface StoryData {
  render: ((args: Record<string, unknown>) => React.ReactNode) | null;
  Component: React.ComponentType<Record<string, unknown>> | null;
  initialArgs: Record<string, unknown>;
  argTypes: Record<string, { table?: { disable?: boolean }; control?: unknown }>;
  otherStories: OtherStory[];
}

function formatStoryName(exportName: string): string {
  return exportName.replace(/([A-Z])/g, " $1").trim();
}

type StoryExport = {
  render?: (args: Record<string, unknown>) => React.ReactNode;
  args?: Record<string, unknown>;
  argTypes?: Record<string, { table?: { disable?: boolean }; control?: unknown }>;
};

type StoryMeta = {
  component?: React.ComponentType<Record<string, unknown>>;
  args?: Record<string, unknown>;
  argTypes?: Record<string, { table?: { disable?: boolean }; control?: unknown }>;
};

function loadStoryModule(mod: Record<string, unknown>, exportName: string): StoryData | string {
  const meta = mod.default as StoryMeta | undefined;
  const storyExport = (mod[exportName] ?? mod.Primary) as StoryExport | undefined;

  if (!storyExport) {
    return `Story "${exportName}" not found`;
  }

  const mergedArgs = { ...meta?.args, ...storyExport.args };
  const argTypes = { ...meta?.argTypes, ...storyExport.argTypes };

  // Collect other story exports
  const primaryKey = mod[exportName] ? exportName : "Primary";
  const otherStories: OtherStory[] = [];

  for (const [key, value] of Object.entries(mod)) {
    if (INTERNAL_EXPORTS.has(key) || key === primaryKey) continue;
    const story = value as StoryExport;
    if (!story || typeof story !== "object") continue;

    const storyArgs = { ...meta?.args, ...story.args };
    const renderFn =
      story.render ??
      (meta?.component
        ? (args: Record<string, unknown>) => React.createElement(meta.component!, args)
        : null);

    if (renderFn) {
      otherStories.push({
        name: formatStoryName(key),
        render: renderFn,
        args: storyArgs,
      });
    }
  }

  return {
    render: storyExport.render ?? null,
    Component: meta?.component ?? null,
    initialArgs: mergedArgs,
    argTypes,
    otherStories,
  };
}

function StoryRenderer({ name }: { name: string }) {
  const [storyData, setStoryData] = React.useState<StoryData | null>(null);
  const [args, setArgs] = React.useState<Record<string, unknown>>({});
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const path = storyIdToPath(name);
    const [, storyName = "primary"] = name.split("--");
    const exportName = storyName.charAt(0).toUpperCase() + storyName.slice(1);

    import(`@/animata/${path}.stories`)
      .then((mod) => {
        const result = loadStoryModule(mod, exportName);
        if (typeof result === "string") {
          setError(result);
          return;
        }
        setArgs(result.initialArgs);
        setStoryData(result);
      })
      .catch((err) => {
        console.error(`Failed to load story ${path}:`, err);
        setError(`Failed to load: ${path}`);
      });
  }, [name]);

  const handleChange = React.useCallback((key: string, value: unknown) => {
    setArgs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = React.useCallback(() => {
    if (storyData) {
      setArgs(storyData.initialArgs);
    }
  }, [storyData]);

  if (error) {
    return (
      <div className="preview relative flex min-h-[200px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border">
        <div className="text-sm text-muted-foreground">{error}</div>
      </div>
    );
  }

  if (!storyData) {
    return (
      <div className="preview relative flex min-h-[200px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  const preview = storyData.render
    ? storyData.render(args)
    : storyData.Component
      ? React.createElement(storyData.Component, args)
      : null;

  return (
    <>
      <div className="preview relative flex min-h-[200px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border py-4">
        {preview}
      </div>
      <PropsEditor
        args={args}
        initialArgs={storyData.initialArgs}
        argTypes={storyData.argTypes}
        onChange={handleChange}
        onReset={handleReset}
      />
      {storyData.otherStories.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="text-sm font-medium text-muted-foreground">Other examples</div>
          {storyData.otherStories.map((story) => (
            <div key={story.name}>
              <div className="mb-2 font-mono text-xs text-muted-foreground">{story.name}</div>
              <div className="preview relative flex min-h-[150px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border py-4">
                {story.render(story.args)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function ComponentPreview({ name, className, ...props }: ComponentPreviewProps) {
  return (
    <div className={cn("group relative my-4", className)} {...props}>
      <React.Suspense
        fallback={
          <div className="preview relative flex min-h-[200px] w-full max-w-full items-center justify-center py-4 overflow-hidden rounded-lg border">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          </div>
        }
      >
        <StoryRenderer name={name} />
      </React.Suspense>
    </div>
  );
}
