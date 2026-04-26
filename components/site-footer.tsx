"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import NewsletterSection from "@/app/(main)/_landing/newsletter";
import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { getFooterCategories } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const footerCategories: { title: string; href: string }[] = getFooterCategories(
    docsConfig.sidebarNav,
  );
  const pathname = usePathname();

  return (
    <footer
      className={cn("container flex flex-col justify-between pb-12 pt-4 md:pb-16 md:pt-6", {
        "border-t border-t-border": pathname === "/",
      })}
    >
      <NewsletterSection />

      <nav aria-label="Footer Navigation" className="mx-auto mt-16 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4 lg:grid-cols-5">
          {footerCategories.map(({ href, title }) => (
            <Link
              href={href}
              key={title}
              className={cn(
                "text-sm text-muted-foreground",
                "hover:text-foreground focus:text-foreground px-4 py-2",
              )}
            >
              {title}
            </Link>
          ))}
        </div>
      </nav>

      <div className="group mx-auto mt-16 w-fit">
        <div className="flex gap-1">
          <div className="flex gap-1">
            <Icons.logo className="h-6 w-6 origin-[top_center] animate-[swing] transition-all duration-1000 ease-in-out direction-alternate repeat-infinite" />
            <span>animata</span>
          </div>
          <p className="text-muted-foreground">by</p>
          <div className="flex gap-1">
            <img src="/codse.webp" width={24} height={24} alt="codse" />
            <span>codse</span>
          </div>
          <p className="text-muted-foreground"> from</p>
          <span>🇳🇵Nepal</span>
        </div>

        <small className="mt-1 block text-center text-muted-foreground">
          many thanks to all these{" "}
          <Link
            target="_blank"
            className="underline"
            href="https://github.com/codse/animata/contributors"
          >
            awesome contributors
          </Link>
        </small>
      </div>

      <small className="container mt-12 block max-w-6xl text-balance text-center text-muted-foreground">
        <strong>Disclaimer</strong>: All trademarks, logos and brand names are the property of their
        respective owners. All company, product and service names used in this website are for
        identification purposes only. Use of these names,trademarks and brands does not imply
        endorsement.
      </small>
    </footer>
  );
}
