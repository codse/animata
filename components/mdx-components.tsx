"use client";

import { ComponentProps, HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { NpmCommands } from "types/unist";

import { Callout } from "@/components/callout";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { ComponentExample } from "@/components/component-example";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CopyButton, copyToClipboardWithMeta } from "@/components/copy-button";
import { FrameworkDocs } from "@/components/framework-docs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/lib/events";
import { cn } from "@/lib/utils";

import { baseComponents } from "./mdx-base-components";

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  ...baseComponents,
  pre: ({
    className,
    __rawString__,
    __withMeta__,
    __src__,
    __event__,
    __copyId__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __copyId__?: string;
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
  } & NpmCommands) => {
    if (__copyId__ && __rawString__) {
      return (
        <div
          id={`source-${__copyId__}`}
          onClick={() => {
            copyToClipboardWithMeta(__rawString__);
          }}
        />
      );
    }

    return (
      <>
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg bg-zinc-800 py-4 [&_code]:bg-transparent",
            className,
          )}
          {...props}
        />
        {__rawString__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}
      </>
    );
  },
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-zinc-800 px-2 py-[0.2rem] font-mono text-sm text-white",
        className,
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  ComponentPreview,
  ComponentExample,
  ComponentSource,
  AspectRatio,
  CodeBlockWrapper: ({ ...props }) => <CodeBlockWrapper className="rounded-md border" {...props} />,
  Step: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...props} />
  ),
  Tabs: ({ className, ...props }: ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({ className, ...props }: ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn("w-full justify-start rounded-none border-b bg-transparent p-0", className)}
      {...props}
    />
  ),
  TabsTrigger: ({ className, ...props }: ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({ className, ...props }: ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className,
      )}
      {...props}
    />
  ),
  FrameworkDocs: ({ className, ...props }: ComponentProps<typeof FrameworkDocs>) => (
    <FrameworkDocs className={cn(className)} {...props} />
  ),
  Link: ({ className, ...props }: ComponentProps<typeof Link>) => (
    <Link className={cn("font-medium underline underline-offset-4", className)} {...props} />
  ),
  LinkedCard: ({ className, ...props }: ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
        className,
      )}
      {...props}
    />
  ),
  ComponentList: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <div
        className={cn("relative grid max-w-full gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      >
        {children}
      </div>
    );
  },
  ComponentListItem: ({
    children,
    className,
    copyId,
    ...props
  }: {
    copyId: string;
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div
        {...props}
        className={cn(
          "component-list-item relative flex min-h-72 items-center justify-center rounded-xl border p-4",
          className,
        )}
      >
        {children}
        <CopyButton
          className="visible absolute right-1 top-1 text-zinc-600"
          proxyId={`source-${copyId}`}
          value=""
        />
      </div>
    );
  },
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  // Fix `process` issue: https://github.com/contentlayerdev/contentlayer/issues/288#issuecomment-1384180362
  const Component = useMDXComponent(
    `
if (typeof process === 'undefined') {
  globalThis.process = {
    env: {
      NEXT_PUBLIC_APP_URL: '${process.env.NEXT_PUBLIC_APP_URL}',
    },
  };
}

${code}
    `,
  );

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
