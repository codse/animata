"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

function TabsList({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.List>> }) {
  return (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
)
}

function TabsTrigger({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>> }) {
  return (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
)
}

function TabsContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Content>> }) {
  return (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
)
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
