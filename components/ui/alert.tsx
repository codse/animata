import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({ className, variant, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)
}

function AlertTitle({ className, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
)
}

function AlertDescription({ className, ref, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
)
}

export { Alert, AlertTitle, AlertDescription }
