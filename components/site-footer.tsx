"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NewsletterSection from "@/app/_landing/newsletter";
import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

function LinkSection() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
      {docsConfig.sidebarNav.map((nav) => {
        return (
          <Link
            key={nav.title}
            href={nav.href ?? nav.items?.[0].href ?? "/docs"}
            className={cn("text-muted-foreground")}
          >
            <span className="text-sm font-medium underline-offset-4 hover:underline hover:decoration-wavy">
              {nav.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer
      className={cn("container flex flex-col justify-between py-4 sm:flex-row md:py-6", {
        "border-t": pathname === "/",
      })}
    >
      <div className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="group flex flex-row gap-1 sm:flex-col sm:gap-0">
            <p className="text-muted-foreground">Open source</p>
            <div className="flex gap-1">
              <Icons.logo className="h-6 w-6 origin-[top_center] animate-[swing] transition-all duration-1000 ease-in-out direction-alternate repeat-infinite" />
              <span>animata</span>
            </div>
          </div>
          <div className="flex flex-row gap-1 sm:flex-col sm:gap-0">
            <p className="text-muted-foreground">Maintained by</p>
            <div className="flex gap-1">
              <Image src="/codse.webp" width={24} height={24} alt="codse" />
              <span>codse</span>
            </div>
          </div>
          <div className="flex flex-row gap-1 sm:flex-col sm:gap-0">
            <p className="text-muted-foreground">With love from</p>
            <span>🇳🇵Nepal</span>
          </div>
        </div>
        <NewsletterSection />
      </div>

      <LinkSection />
    </footer>
  );
}
