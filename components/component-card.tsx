import { HTMLAttributes, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleDashed } from "lucide-react";

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
  const [clicked, setClicked] = useState(false);
  return (
    <section
      className={cn(
        "relative flex h-full flex-col border border-border bg-gray-50 dark:border-zinc-600 dark:bg-zinc-800",
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
          onClick={() => setClicked(true)}
          className="ml-auto flex items-center gap-1 text-xs font-semibold leading-none text-blue-500 hover:underline"
        >
          View{" "}
          {clicked ? (
            <CircleDashed className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Link>
      </header>
      <div {...props} className="mx-4 my-6 flex flex-1 items-center justify-center" />
    </section>
  );
}
