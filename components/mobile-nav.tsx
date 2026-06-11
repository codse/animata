"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { CategoryNavAccordion } from "@/components/category-nav-accordion";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { brandLabelClassName } from "@/lib/brand-font";
import { getFooterCategories } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const categories = React.useMemo(
    () => getFooterCategories(docsConfig.sidebarNav, { variant: "full" }),
    [],
  );

  const closeSheet = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base text-foreground hover:bg-transparent hover:text-foreground focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-sm">
        <div className="px-5 pt-6 pr-12">
          <MobileLink
            href="/"
            onOpenChange={setOpen}
            className={cn(
              "inline-flex items-center gap-0.5 text-[1.35rem] -translate-x-0.5 text-(--footer-accent)",
              brandLabelClassName,
            )}
          >
            <Icons.logo className="h-[1.35em] w-[1.35em] shrink-0 [&_*]:fill-(--footer-accent)" />
            <span className="leading-relaxed" style={{ textBoxTrim: "trim-start" }}>
              {siteConfig.name}
            </span>
          </MobileLink>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-5 pb-6 pt-4">
            <div className="flex flex-col">
              {docsConfig.mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      className="block px-2 py-[6px] touch-manipulation text-sm font-medium [-webkit-tap-highlight-color:transparent]"
                    >
                      {item.title}
                    </MobileLink>
                  ),
              )}
            </div>

            <CategoryNavAccordion
              categories={categories}
              variant="sheet"
              className="mt-6"
              onLinkClick={closeSheet}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
