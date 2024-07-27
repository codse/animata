import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function ComponentCard({
  name,
  href,
  className,
  rounded = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  href: string;
  name: string;
  rounded?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex h-full flex-col border border-border bg-gray-50 dark:bg-zinc-800",
        className,
        {
          "rounded-xl": rounded,
        },
      )}
    >
      <header
        className={cn(
          "flex flex-shrink-0 items-center gap-4 border-b bg-gray-100 p-4 dark:border-b-zinc-700 dark:bg-zinc-700",
          {
            "rounded-tl-xl rounded-tr-xl": rounded,
            "px-6": !rounded,
          },
        )}
      >
        <h2
          title={name}
          className="overflow-ellipsis text-sm font-bold leading-none text-gray-600 dark:text-gray-100"
        >
          {name}
        </h2>
        <Link
          href={href}
          className="ml-auto text-xs font-semibold leading-none text-blue-500 hover:underline"
        >
          View &rarr;
        </Link>
      </header>
      <div {...props} className="mx-4 my-6 flex flex-1 items-center justify-center" />
    </section>
  );
}
