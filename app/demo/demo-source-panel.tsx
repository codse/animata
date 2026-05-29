"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";

import type { DemoSourceFile } from "@/app/demo/generated/demo-sources";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const GITHUB_SOURCE_BRANCH = "main";

function githubSourceUrl(path: string) {
  return `${siteConfig.links.github}/blob/${GITHUB_SOURCE_BRANCH}/${path}`;
}

interface DemoSourcePanelProps {
  files: readonly DemoSourceFile[];
  className?: string;
}

export function DemoSourcePanel({ files, className }: DemoSourcePanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  if (!files.length) return null;

  const activeFile = files[activeIndex] ?? files[0];

  const copy = async (file: DemoSourceFile) => {
    await navigator.clipboard.writeText(file.code);
    setCopiedPath(file.path);
    window.setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className={cn("demo-source-panel min-w-0", className)}>
      <DemoSourcePanelStyles />

      <figure className="overflow-hidden border border-border/60 bg-background">
        <figcaption className="flex items-stretch border-b border-border/60 bg-[oklch(0.965_0.004_260)] dark:bg-[oklch(0.17_0.012_260)]">
          <div
            className="flex min-w-0 flex-1 items-stretch overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            {...(files.length > 1
              ? { role: "tablist" as const, "aria-label": "Source files" }
              : {})}
          >
            {files.map((file, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={file.path}
                  type="button"
                  {...(files.length > 1 ? { role: "tab" as const, "aria-selected": active } : {})}
                  onClick={() => files.length > 1 && setActiveIndex(index)}
                  className={cn(
                    "inline-flex max-w-[14rem] shrink-0 touch-manipulation items-center gap-1.5 border-r border-border/50 px-3 font-mono text-[12px] leading-none",
                    active
                      ? "relative z-10 -mb-px border-t-2 border-t-foreground/75 bg-background py-2.5 text-foreground dark:border-t-foreground/55 dark:bg-[oklch(0.13_0.012_260)]"
                      : "border-t-2 border-t-transparent py-2.5 text-foreground/42 hover:bg-foreground/[0.03] hover:text-foreground/65",
                    files.length === 1 && "cursor-default",
                  )}
                >
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => copy(activeFile)}
            className="flex min-h-9 shrink-0 touch-manipulation items-center border-l border-border/50 px-3 font-mono text-[11px] text-foreground/45 underline-offset-[0.2em] transition-colors hover:text-foreground hover:underline"
          >
            {copiedPath === activeFile.path ? "Copied" : "Copy"}
          </button>
        </figcaption>

        <div className="demo-source-scroll max-h-[min(72vh,760px)] overflow-x-auto overflow-y-auto bg-background dark:bg-[oklch(0.13_0.012_260)]">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output from trusted repo sources */}
          <div
            className="dark:hidden [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0! [&_pre]:text-[13px]"
            dangerouslySetInnerHTML={{ __html: activeFile.htmlLight }}
          />
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output from trusted repo sources */}
          <div
            className="hidden dark:block [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0! [&_pre]:text-[13px]"
            dangerouslySetInnerHTML={{ __html: activeFile.htmlDark }}
          />
        </div>
      </figure>

      <a
        href={githubSourceUrl(activeFile.path)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-2 inline-flex max-w-full touch-manipulation items-center gap-1 truncate px-1 font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground/95"
      >
        <span className="truncate">{activeFile.path}</span>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-3 shrink-0 opacity-70 transition-opacity duration-150 group-hover:opacity-100"
        />
      </a>
    </div>
  );
}

function DemoSourcePanelStyles() {
  return (
    <style>{`
      .demo-source-panel {
        --demo-source-surface: hsl(var(--background));
        --demo-source-gutter-border: oklch(0.9 0.006 260 / 0.9);
      }

      .dark .demo-source-panel {
        --demo-source-surface: oklch(0.13 0.012 260);
        --demo-source-gutter-border: oklch(0.22 0.012 260);
      }

      /* Reset global mdx.css .line rules that leak into Shiki output */
      .demo-source-panel .shiki pre {
        margin: 0;
        padding: 0;
        background: transparent;
        overflow: visible;
      }

      .demo-source-panel .shiki {
        font-size: 13px;
        line-height: 20px;
      }

      .demo-source-panel .shiki code {
        counter-reset: demo-source-line;
        display: block;
        min-width: 100%;
        width: max-content;
        padding: 0;
        margin: 0;
        font-size: 0;
        line-height: 0;
      }

      .demo-source-panel .shiki .line {
        display: block;
        box-sizing: border-box;
        width: max-content;
        min-width: 100%;
        min-height: 0;
        height: 20px;
        font-size: 13px;
        line-height: 20px;
        margin: 0;
        padding: 0 1.25rem 0 5rem;
        white-space: pre;
      }

      .demo-source-panel .shiki .line::before {
        counter-increment: demo-source-line;
        content: counter(demo-source-line);
        position: sticky;
        left: 0;
        z-index: 2;
        display: inline-block;
        width: 3rem;
        height: 20px;
        line-height: 20px;
        margin: 0 1rem 0 -5rem;
        padding: 0 0.75rem 0 0.75rem;
        vertical-align: top;
        text-align: right;
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 12px;
        color: oklch(0.68 0.02 260);
        background: var(--demo-source-surface);
        border-right: 1px solid var(--demo-source-gutter-border);
        box-shadow: 8px 0 14px -10px oklch(0 0 0 / 0.1);
        user-select: none;
        pointer-events: none;
      }

      .dark .demo-source-panel .shiki .line::before {
        color: oklch(0.46 0.02 260);
        box-shadow: 8px 0 14px -10px oklch(0 0 0 / 0.4);
      }

      .demo-source-scroll {
        scrollbar-width: thin;
        scrollbar-color: oklch(0.62 0.02 260 / 0.45) transparent;
      }

      .demo-source-scroll::-webkit-scrollbar {
        width: 9px;
        height: 9px;
      }

      .demo-source-scroll::-webkit-scrollbar-track {
        background: transparent;
      }

      .demo-source-scroll::-webkit-scrollbar-thumb {
        background-color: oklch(0.62 0.02 260 / 0.35);
        border: 2px solid transparent;
        border-radius: 999px;
        background-clip: padding-box;
      }

      .demo-source-scroll::-webkit-scrollbar-thumb:hover {
        background-color: oklch(0.5 0.02 260 / 0.55);
      }

      .demo-source-scroll::-webkit-scrollbar-corner {
        background: transparent;
      }

      .dark .demo-source-scroll {
        scrollbar-color: oklch(0.48 0.02 260 / 0.55) transparent;
      }

      .dark .demo-source-scroll::-webkit-scrollbar-thumb {
        background-color: oklch(0.48 0.02 260 / 0.45);
      }

      .dark .demo-source-scroll::-webkit-scrollbar-thumb:hover {
        background-color: oklch(0.58 0.02 260 / 0.65);
      }
    `}</style>
  );
}
