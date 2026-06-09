"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

import SiblingFocusNav from "@/animata/container/sibling-focus-nav";
import NewsletterSection from "@/app/(main)/_landing/newsletter";
import { FooterBottom } from "@/components/footer-bottom";
import { FooterCategoryGrid } from "@/components/footer-category-grid";
import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { brandLabelClassName } from "@/lib/brand-font";
import { getFooterCategories } from "@/lib/docs";
import {
  footerColBrandClassName,
  footerColLinksClassName,
  footerColNewsletterClassName,
  footerEmptyRowClassName,
  footerGridClassName,
  footerOuterGridClassName,
} from "@/lib/footer-grid";
import {
  FOOTER_ACCENT,
  FOOTER_CATEGORY_LINK,
  FOOTER_CATEGORY_TITLE,
  FOOTER_GOLD,
  FOOTER_INK,
  footerSelectionClassName,
  footerSurfaceClassName,
  footerSurfaceStyle,
} from "@/lib/footer-theme";
import { withOutboundRef } from "@/lib/outbound-ref";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  {
    title: "Components",
    href: docsConfig.mainNav.find((item) => item.title === "Components")?.href ?? "/docs",
  },
  {
    title: "Demos",
    href: docsConfig.mainNav.find((item) => item.title === "Demos")?.href ?? "/demo",
  },
  { title: "Changelog", href: "/docs/changelog" },
  { title: "Contributing", href: "/docs/contributing" },
  { title: "Resources we use", href: "/resources" },
] as const;

const footerMainLinkClassName = cn(
  SiblingFocusNav.getLinkClassName("opacity"),
  "min-h-0 touch-manipulation text-[13px] font-medium leading-none tracking-[-0.015em] text-[var(--footer-ink)] hover:text-[var(--footer-accent)]",
  "focus-visible:ring-[var(--footer-accent)]/35 focus-visible:ring-offset-0",
);

export function SiteFooter() {
  const footerCategories = getFooterCategories(docsConfig.sidebarNav, { variant: "compact" });
  const pathname = usePathname();
  const isResources = pathname === "/resources";

  return (
    <footer className="relative mt-auto w-full overflow-hidden">
      <div
        className={cn(footerSelectionClassName, footerSurfaceClassName)}
        style={
          {
            "--footer-ink": FOOTER_INK,
            "--footer-accent": FOOTER_ACCENT,
            "--footer-gold": FOOTER_GOLD,
            "--footer-category-title": FOOTER_CATEGORY_TITLE,
            "--footer-category-link": FOOTER_CATEGORY_LINK,
            ...footerSurfaceStyle,
          } as CSSProperties
        }
      >
        <div
          className={cn(
            "relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10",
            footerOuterGridClassName,
          )}
        >
          {/* Row 1 — brand, links, newsletter */}
          <div className={cn(footerGridClassName, "overflow-visible md:gap-y-0")}>
            <div className={cn(footerColBrandClassName, "min-w-0 pe-3")}>
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center gap-0.5 text-[1.35rem] -translate-x-0.5",
                  brandLabelClassName,
                )}
                style={{ color: FOOTER_ACCENT }}
              >
                <Icons.logo className="h-[1.35em] w-[1.35em] shrink-0 [&_*]:fill-(--footer-accent)" />
                <span className="leading-relaxed" style={{ textBoxTrim: "trim-start" }}>
                  animata
                </span>
              </Link>
              <p
                className="mt-3 max-w-sm text-[13px] text-balance leading-[1.4] tracking-[0.01em]"
                style={{ color: FOOTER_INK }}
              >
                {siteConfig.description}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={withOutboundRef(siteConfig.links.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center text-(--footer-ink) hover:text-(--footer-accent) active:text-(--footer-accent)"
                >
                  <Icons.gitHub className="size-3.5" />
                </a>
                <a
                  href={withOutboundRef(siteConfig.links.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex items-center justify-center text-(--footer-ink) hover:text-(--footer-accent) active:text-(--footer-accent)"
                >
                  <Icons.twitter className="size-3" />
                </a>
              </div>
            </div>

            <SiblingFocusNav
              mode="opacity"
              spacingAxis="y"
              aria-label="Explore"
              className={cn(
                footerColLinksClassName,
                "w-full flex-col items-start sm:[&>a:not(:last-child)]:pb-3",
              )}
            >
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    footerMainLinkClassName,
                    link.href === "/resources" && isResources && "text-(--footer-accent)",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </SiblingFocusNav>

            <div className={cn(footerColNewsletterClassName, "w-full min-w-0 overflow-visible")}>
              <NewsletterSection brand />
            </div>
          </div>

          <FooterCategoryGrid categories={footerCategories} />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
