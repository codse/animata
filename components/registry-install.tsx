"use client";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const PM_PREFIXES: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx",
};

const REGISTRY_BASE_URL = (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");

interface RegistryInstallProps {
  category: string;
  name: string;
  className?: string;
}

export function RegistryInstall({ category, name, className }: RegistryInstallProps) {
  const url = `${REGISTRY_BASE_URL}/r/${category}/${name}.json`;

  return (
    <Tabs defaultValue="pnpm" className={cn("relative mt-6 w-full", className)}>
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        {(Object.keys(PM_PREFIXES) as PackageManager[]).map((pm) => (
          <TabsTrigger
            key={pm}
            value={pm}
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {(Object.keys(PM_PREFIXES) as PackageManager[]).map((pm) => {
        const command = `${PM_PREFIXES[pm]} shadcn@latest add ${url}`;
        return (
          <TabsContent key={pm} value={pm} className="relative">
            <pre className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg bg-zinc-800 py-4 [&_code]:bg-transparent">
              <code className="relative rounded bg-transparent px-4 font-mono text-sm text-white">
                {command}
              </code>
            </pre>
            <CopyButton
              value={command}
              event="copy_npm_command"
              className="absolute right-4 top-12"
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
