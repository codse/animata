"use client";

import { RotateCwIcon } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReloadButton({ className, variant = "secondary", ...props }: ButtonProps) {
  return (
    <Button
      size="icon"
      variant={variant}
      className={cn("relative z-10 h-6 w-6 active:bg-zinc-200 [&_svg]:size-3", className)}
      {...props}
    >
      <span className="sr-only">Reload</span>
      <RotateCwIcon />
    </Button>
  );
}
