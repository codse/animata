"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NewsletterSection from "@/app/_landing/newsletter";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer
      className={cn("container flex flex-col justify-between py-4 md:py-6", {
        "border-t border-t-border": pathname === "/",
      })}
    >
      <NewsletterSection />
      <div className="group mx-auto my-36 w-fit">
        <div className="flex gap-1">
          <div className="flex gap-1">
            <Icons.logo className="h-6 w-6 origin-[top_center] animate-[swing] transition-all duration-1000 ease-in-out direction-alternate repeat-infinite" />
            <span>animata</span>
          </div>
          <p className="text-muted-foreground">by</p>
          <div className="flex gap-1">
            <Image src="/codse.webp" width={24} height={24} alt="codse" />
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
    </footer>
  );
}
