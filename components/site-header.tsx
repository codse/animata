"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { CodeIcon } from "lucide-react";

import AnimatedBorderTrail from "@/animata/container/animated-border-trail";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { resolvedTheme } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const top = useSpring(8, { damping: 15 });
  const width = useSpring(40, { damping: 15 });
  const height = useSpring(40, { damping: 15 });
  const isInView = useInView(headerRef);
  const opacity = useTransform(top, (value) => (value > 40 ? 0 : 0.75));

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const timeout = setTimeout(() => {
      const offset = 40;
      top.set(window.innerHeight - (headerRef.current?.clientHeight ?? 0) - offset);
      width.set(headerRef.current?.clientWidth ?? 0);
      height.set(headerRef.current?.clientHeight ?? 0);
    }, 750);
    return () => clearTimeout(timeout);
  }, [top, isInView, width, height]);

  return (
    <>
      <div className="border-b border-border bg-background py-2">
        <div className="container flex justify-between gap-4">
          <Link href="/">
            <Icons.logo className="h-10 w-10" />
          </Link>
          <AnimatedBorderTrail
            trailColor={resolvedTheme === "dark" ? "white" : "gray"}
            className="rounded-full border-2 border-border bg-foreground/30 p-0.5"
            contentClassName="rounded-full bg-transparent "
          >
            <Link
              href="/"
              target="_blank"
              className="inline-block rounded-full bg-gradient-to-br from-gray-50/75 from-10% via-slate-100/75 via-60% to-zinc-50/75 px-4 py-2 text-xs font-medium text-foreground/75 backdrop-blur-sm dark:from-gray-900/60 dark:via-zinc-500/60 dark:to-slate-700/60"
            >
              Star us on GitHub
            </Link>
          </AnimatedBorderTrail>
        </div>
      </div>
      <motion.header
        style={{ translateX: "-50%", top, width, height }}
        className="fixed left-1/2 z-50 mx-auto overflow-hidden rounded-full border border-foreground/5 bg-foreground/70 text-background shadow-xl shadow-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-foreground/40 dark:bg-foreground/40"
      >
        <div ref={headerRef} className="container flex h-14 w-fit items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <Link href={siteConfig.links.github} rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <CodeIcon className="h-4 w-4" />
                <span className="sr-only">Components</span>
              </div>
            </Link>
            <nav className="flex items-center">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-9 px-0",
                  )}
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-9 px-0",
                  )}
                >
                  <Icons.twitter className="h-3 w-3 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ModeToggle />
            </nav>
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute inset-0 h-full w-full animate-pulse bg-foreground duration-mid repeat-1"
          style={{ opacity }}
        />
      </motion.header>
    </>
  );
}
