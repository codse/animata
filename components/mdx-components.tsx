import type { CompileOptions } from "@mdx-js/mdx";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, HTMLAttributes } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type LineElement,
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import type { NpmCommands, TouchCommands, UnistNode, UnistTree } from "types/unist";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

import Modal from "@/animata/overlay/modal";
import { Callout } from "@/components/callout";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { ComponentExample } from "@/components/component-example";
import ComponentListItem from "@/components/component-list-item";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CopyButton, CopyNpmCommandButton, CopyTouchCommandButton } from "@/components/copy-button";
import { CopyProxy } from "@/components/copy-proxy";
import { AnimataRenderer } from "@/components/dynamic-animata";
import { FrameworkDocs } from "@/components/framework-docs";
import { InView } from "@/components/in-view";
import PreviewContainer from "@/components/preview-container";
import { RegistryInstall } from "@/components/registry-install";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Event } from "@/lib/events";
import { cn } from "@/lib/utils";

import { baseComponents } from "./mdx-base-components";

const setupCodeSnippet = () => (tree: UnistTree) => {
  visit(tree, (node: UnistNode) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children ?? [];
      if (codeEl?.tagName !== "code") {
        return;
      }

      const meta = (codeEl as UnistNode & { data?: { meta?: string } }).data?.meta;
      if (meta) {
        const regex = /event="([^"]*)"/;
        const match = meta.match(regex);
        if (match) {
          (node as UnistNode & { __event__?: string }).__event__ = match[1];
          (codeEl as UnistNode & { data?: { meta?: string } }).data!.meta = meta.replace(regex, "");
        }

        const copyId = meta.match(/copyId="([^"]*)"/);
        if (copyId) {
          (node as UnistNode & { __copyId__?: string }).__copyId__ = copyId[1];
        }
      }

      (node as UnistNode & { __rawString__?: string }).__rawString__ = codeEl.children?.[0]?.value;
    }
  });
};

const postProcess = () => (tree: UnistTree) => {
  visit(tree, "element", (node: UnistNode) => {
    const rawNode = node as UnistNode & { __rawString__?: string; __copyId__?: string };
    if (rawNode.__rawString__) {
      if (node.tagName !== "pre") {
        const [pre] = node.children ?? [];
        if (pre?.tagName !== "pre") {
          return;
        }
        if (!pre.properties) pre.properties = {};
        pre.properties.__copyId__ = rawNode.__copyId__;
        pre.properties.__rawString__ = rawNode.__rawString__;
        Reflect.deleteProperty(rawNode, "__rawString__");
        Reflect.deleteProperty(rawNode, "__copyId__");

        const rawString = pre.properties.__rawString__ as string | undefined;

        if (rawString?.startsWith("mkdir")) {
          const path = rawString.split(" ").pop();
          if (!path) {
            return;
          }

          const filename = path.split("/").pop() ?? "";
          const dir = path.replace(`/${filename}`, "");
          pre.properties.__windows__ = `mkdir "${dir}" && type null > ${path}`;
          pre.properties.__unix__ = `mkdir -p ${dir} && touch ${path}`;
        }

        if (rawString?.startsWith("npm install")) {
          pre.properties.__npmCommand__ = rawString;
          pre.properties.__yarnCommand__ = rawString.replace("npm install", "yarn add");
          pre.properties.__pnpmCommand__ = rawString.replace("npm install", "pnpm add");
          pre.properties.__bunCommand__ = rawString.replace("npm install", "bun add");
        }
      }
    }
  });
};

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  InView,
  PreviewContainer,
  ...baseComponents,
  pre: ({
    className,
    __rawString__,
    __withMeta__,
    __src__,
    __event__,
    __copyId__,
    __windows__,
    __unix__,
    __bunCommand__,
    __npmCommand__,
    __pnpmCommand__,
    __yarnCommand__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __copyId__?: string;
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
  } & NpmCommands &
    TouchCommands) => {
    if (__copyId__ && __rawString__) {
      return <CopyProxy id={`source-${__copyId__}`} value={__rawString__} />;
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

        {__rawString__ && !__windows__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}

        {__windows__ && __unix__ && (
          <CopyTouchCommandButton
            commands={{ __windows__, __unix__ }}
            className="absolute right-4 top-4"
          />
        )}

        {__npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__ && (
          <CopyNpmCommandButton
            commands={{
              __npmCommand__,
              __yarnCommand__,
              __pnpmCommand__,
              __bunCommand__,
            }}
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
  Image: ({ alt, ...props }: ComponentProps<"img">) => <img alt={alt} {...props} />,
  Modal,
  Callout,
  ComponentPreview,
  ComponentExample,
  ComponentSource,
  RegistryInstall,
  AspectRatio,
  CodeBlockWrapper: ({ ...props }) => <CodeBlockWrapper className="rounded-md border" {...props} />,
  Step: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading relative mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l border-border pl-8 [counter-reset:step]"
      {...props}
    />
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
        className={cn("relative grid max-w-full gap-4 sm:grid-cols-2 lg:grid-cols-2", className)}
      >
        {children}
      </div>
    );
  },
  ComponentListItem,
};

interface MdxProps {
  code: string;
  filePath?: string;
}

function stripImports(code: string) {
  const animataRegex = /^import\s+(\w+)\s+from\s+["']@\/animata\/([^"']+)["'];?\s*$/gm;
  const imports: Array<{ name: string; subpath: string }> = [];
  let strippedCode = code.replace(animataRegex, (_, name, subpath) => {
    imports.push({ name, subpath });
    return "";
  });
  // Also strip imports from @/components/ — these components are registered
  // directly in the `components` map above (e.g. InView), so the import line
  // in the MDX source would otherwise leave MDXRemote unable to resolve them.
  strippedCode = strippedCode.replace(
    /^import\s+\{?\s*\w+(?:\s*,\s*\w+)*\s*\}?\s+from\s+["']@\/components\/[^"']+["'];?\s*$/gm,
    "",
  );
  return { strippedCode, imports };
}

function resolveImports(imports: Array<{ name: string; subpath: string }>) {
  const resolved: Record<string, React.ComponentType<Record<string, unknown>>> = {};
  for (const { name, subpath } of imports) {
    resolved[name] = (props: Record<string, unknown>) => (
      <AnimataRenderer subpath={subpath} {...props} />
    );
  }
  return resolved;
}

const mdxOptions: Omit<CompileOptions, "outputFormat" | "providerImportSource"> & {
  useDynamicImport?: boolean;
} = {
  remarkPlugins: [remarkGfm, codeImport],
  rehypePlugins: [
    setupCodeSnippet,
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
        onVisitLine(node: LineElement) {
          if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }];
          }
          if (!node.properties.className) {
            node.properties.className = ["line"];
          }
        },
        onVisitHighlightedLine(node: LineElement) {
          (node.properties.className as string[]).push("line--highlighted");
        },
        onVisitHighlightedChars(node: LineElement) {
          node.properties.className = ["word--highlighted"];
        },
      } satisfies PrettyCodeOptions,
    ],
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"],
          ariaLabel: "Link to section",
        },
      },
    ],
    postProcess,
  ],
};

export async function Mdx({ code, filePath }: MdxProps) {
  const { strippedCode, imports } = stripImports(code);
  const dynamicComponents = imports.length > 0 ? resolveImports(imports) : {};

  const source = filePath ? new VFile({ value: strippedCode, path: filePath }) : strippedCode;

  return (
    <div className="mdx">
      <MDXRemote
        source={source}
        components={{ ...components, ...dynamicComponents }}
        options={{ mdxOptions: mdxOptions }}
      />
    </div>
  );
}
