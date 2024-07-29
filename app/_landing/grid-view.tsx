import React from "react";

import { cn } from "@/lib/utils";

export default function GridView({
  children,
  adjustWidth,
  className,
}: {
  children: React.ReactNode;
  adjustWidth?: boolean;
  className?: string;
}) {
  const items = React.Children.toArray(children);
  return (
    <div className="container my-4 flex flex-col gap-4 md:flex-row">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn("flex-1", className, {
            "md:max-w-fit": adjustWidth,
          })}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
