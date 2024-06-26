import { useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { ReloadButton } from "@/components/reload-button";
import { cn } from "@/lib/utils";

function Actions({ copyId, onRefresh }: { copyId: string; onRefresh: () => void }) {
  return (
    <div className="inline-flex w-full justify-end p-2">
      <CopyButton
        className="bg-white text-zinc-600 shadow-none dark:bg-zinc-950 dark:text-white"
        proxyId={`source-${copyId}`}
        value=""
      />
      <ReloadButton
        className="bg-white text-zinc-600 shadow-none dark:bg-zinc-950 dark:text-white"
        onClick={onRefresh}
      />
    </div>
  );
}

export default function ComponentListItem({
  children,
  className,
  copyId,
  ...props
}: {
  copyId: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [forceUpdate, setForceUpdate] = useState(0);
  return (
    <div {...props} className={cn("component-list-item relative rounded-xl border", className)}>
      <Actions copyId={copyId} onRefresh={() => setForceUpdate((prev) => prev + 1)} />
      <div
        key={`component-list-item-${copyId}-${forceUpdate}`}
        className="flex min-h-56 flex-col items-center justify-center px-4 pb-4"
      >
        {children}
      </div>
    </div>
  );
}
