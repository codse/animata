"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import RollText from "@/animata/text/roll-text";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { withOutboundRef } from "@/lib/outbound-ref";
import { cn } from "@/lib/utils";

const headerIconLinkClassName =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  const pathname = usePathname();
  const isIndexPage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/80 py-2 backdrop-blur-lg backdrop-saturate-150 transition-[background-color,border-color] duration-300",
          scrolled ? "border-border/50" : "border-transparent",
          isIndexPage && !scrolled && "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-8 max-h-8 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
            <MobileNav />
            <nav
              aria-label="Main navigation"
              className="hidden h-8 max-h-8 items-center gap-0 md:flex"
            >
              {docsConfig.mainNav.map((item, index) => {
                const href = item.href as string;
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={index}
                    href={href}
                    className={cn(
                      "group/roll relative inline-flex h-8 max-h-8 items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <RollText
                      groupHover
                      text={item.title}
                      className="text-xs font-medium leading-none"
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex h-8 max-h-8 shrink-0 items-center gap-0.5">
            <CommandMenu />
            <nav aria-label="External links" className="hidden h-8 items-center sm:flex ps-1">
              <Link
                href={withOutboundRef(siteConfig.links.github)}
                target="_blank"
                rel="noopener noreferrer"
                className={headerIconLinkClassName}
              >
                <Icons.gitHub className="size-3.5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href={withOutboundRef(siteConfig.links.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                className={headerIconLinkClassName}
              >
                <Icons.twitter className="size-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </Link>
            </nav>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
