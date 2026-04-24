"use client";

import { CopyNpmCommandButton } from "@/components/copy-button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const REGISTRY_BASE_URL = (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");

interface RegistryInstallProps {
  category: string;
  name: string;
  className?: string;
}

export function RegistryInstall({ category, name, className }: RegistryInstallProps) {
  const url = `${REGISTRY_BASE_URL}/r/${category}/${name}.json`;
  const commands: Record<PackageManager, string> = {
    pnpm: `pnpm dlx shadcn@latest add ${url}`,
    npm: `npx shadcn@latest add ${url}`,
    yarn: `yarn dlx shadcn@latest add ${url}`,
    bun: `bunx shadcn@latest add ${url}`,
  };

  return (
    <pre
      className={cn(
        "w-full grid grid-cols-[1fr_auto] mt-4 rounded-lg bg-zinc-800 p-4 [&_code]:bg-transparent",
        className,
      )}
    >
      <code
        className={cn(
          "relative rounded max-w-full overflow-x-auto bg-zinc-800 px-2 py-[0.2rem] font-mono text-sm text-white",
          className,
        )}
      >
        {commands.pnpm}
      </code>

      <CopyNpmCommandButton
        commands={{
          __npmCommand__: commands.npm,
          __yarnCommand__: commands.yarn,
          __pnpmCommand__: commands.pnpm,
          __bunCommand__: commands.bun,
        }}
      />
    </pre>
  );
}
