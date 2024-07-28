"use client";
import { useEffect, useRef, useState } from "react";
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
import { docsConfig } from "@/config/docs";
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
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    function setSize() {
      const offset = 40;
      top.set(window.innerHeight - (headerRef.current?.clientHeight ?? 0) - offset);
      width.set(headerRef.current?.clientWidth ?? 0);
      height.set(headerRef.current?.clientHeight ?? 0);
    }

    const timeout = setTimeout(setSize, 750);
    return () => {
      clearTimeout(timeout);
    };
  }, [top, isInView, width, height]);

  return (
    <>
      <div className="absolute left-0 top-2 z-10 h-fit w-full">
        <div className="container flex justify-between gap-4 rounded-full border-b border-foreground/10 bg-background/15 py-2 shadow-sm backdrop-blur">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Icons.logo className="h-10 w-10" />
            </Link>
            {docsConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href as string}
                className="text-sm font-medium text-muted-foreground hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <AnimatedBorderTrail
            trailColor={resolvedTheme === "dark" ? "white" : "black"}
            className="rounded-full bg-foreground/30 p-0.5 transition-all duration-100 hover:scale-105 hover:opacity-95 active:scale-90 active:opacity-100"
            contentClassName="rounded-full bg-transparent "
          >
            <Link
              href={siteConfig.links.github}
              target="_blank"
              className="inline-block rounded-full bg-opacity-75 bg-gradient-to-br from-gray-100 from-5% via-zinc-50 via-60% to-slate-200 px-4 py-2 text-xs font-medium text-foreground dark:from-gray-900 dark:via-zinc-700 dark:to-slate-700"
            >
              Star us on GitHub
            </Link>
          </AnimatedBorderTrail>
        </div>
      </div>
      <motion.header
        style={{
          translateX: "-50%",
          top: animationEnded ? "calc(100% - 96px)" : top,
          width: animationEnded ? "fit-content" : width,
          height: height,
        }}
        onAnimationEnd={() => {
          function clear() {
            if (String(height.get()) === String(headerRef.current?.clientHeight)) {
              setAnimationEnded(true);
            } else {
              requestAnimationFrame(clear);
            }
          }

          if (!animationEnded && width.get() > 40 && isInView) {
            requestAnimationFrame(clear);
          }
        }}
        className="fixed left-1/2 z-50 mx-auto overflow-hidden rounded-full border border-foreground/5 bg-foreground/70 text-background shadow-xl shadow-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-foreground/40 dark:bg-foreground/40"
      >
        <div ref={headerRef} className="container flex h-14 w-fit max-w-fit items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <Link href={docsConfig.mainNav[1].href ?? ""} rel="noreferrer">
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
