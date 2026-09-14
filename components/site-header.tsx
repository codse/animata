"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import RollText from "@/animata/text/roll-text";
import { CommandMenu } from "@/components/command-menu";
import { GitHubStarLink } from "@/components/github-star-link";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { siteStats } from "@/config/site-stats";
import { brandLabelClassName } from "@/lib/brand-label";
import { cn } from "@/lib/utils";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > 20;
}

function getScrollServerSnapshot() {
  return false;
}

/** Home is the logo — don't duplicate as an "Index" nav item. */
const headerNavItems = docsConfig.mainNav.filter((item) => item.href !== "/");

export function SiteHeader() {
  const pathname = usePathname();
  const isIndexPage = pathname === "/";
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  );

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
          "sticky top-0 z-50 h-(--site-header-height) w-full overflow-visible border-b bg-background/80 py-2 backdrop-blur-lg backdrop-saturate-150 transition-[background-color,border-color] duration-300",
          scrolled ? "border-border/50" : "border-transparent",
          isIndexPage && !scrolled && "bg-transparent",
        )}
      >
        <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-between gap-3 overflow-visible px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-visible sm:gap-5">
            <MobileNav />

            <Link
              href="/"
              className={cn(
                "inline-flex h-8 items-center gap-1 text-[1.05rem] text-foreground transition-opacity hover:opacity-80",
                brandLabelClassName,
              )}
              aria-label={`${siteConfig.name} home`}
            >
              {/* Logo art is optically high in the viewBox — nudge down to match cap height */}
              <Icons.logo className="size-[1.05em] shrink-0 translate-y-[0.06em] [&_*]:fill-[#ffcc00]" />
              <span className="leading-none">{siteConfig.name}</span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-0 overflow-visible md:flex"
            >
              {headerNavItems.map((item) => {
                const href = item.href as string;
                // Match main: prefix-active so nested routes light up; RollText disables while active.
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    data-roll-group
                    className="group/roll relative inline-flex items-center overflow-visible px-2 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <RollText
                      groupHover
                      disabled={isActive}
                      text={item.title}
                      stagger="character"
                      staggerMs={32}
                      durationMs={200}
                      className={cn(
                        "pointer-events-none text-xs font-medium [font-kerning:none]",
                        isActive ? "text-accent" : "text-muted-foreground",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex h-8 max-h-8 shrink-0 items-center gap-1">
            <CommandMenu />
            <GitHubStarLink
              source="header"
              showIcon={false}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 text-[12px] font-medium tabular-nums text-foreground/80 transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icons.gitHub className="size-3.5 opacity-80" />
              <span className="hidden sm:inline">Star</span>
              <span className="text-muted-foreground">{siteStats.githubStarsCompact}</span>
              <span className="sr-only">
                Star on GitHub, {siteStats.githubStarsFormatted} stars
              </span>
            </GitHubStarLink>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
