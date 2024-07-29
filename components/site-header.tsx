"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useInView, useSpring } from "framer-motion";
import { CodeIcon } from "lucide-react";

import AnimatedBorderTrail from "@/animata/container/animated-border-trail";
import { CommandMenu } from "@/components/command-menu";
import HeaderDockItem from "@/components/header-dock-item";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { resolvedTheme } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const top = useSpring(8, { damping: 15 });
  const width = useSpring(40, { damping: 15 });
  const height = useSpring(10, { damping: 15 });
  const isInView = useInView(headerRef);
  const [animationEnded, setAnimationEnded] = useState(false);
  const pathname = usePathname();
  const isIndexPage = pathname === "/";
  const border = 2;

  useEffect(() => {
    if (!isInView) {
      return;
    }

    function setSize() {
      const offset = 40;
      top.set(window.innerHeight - (headerRef.current?.clientHeight ?? 0) - offset);
      width.set(headerRef.current?.clientWidth ?? 0);
      height.set(border + (headerRef.current?.clientHeight ?? 0));
    }

    const timeout = setTimeout(setSize, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [top, isInView, width, height]);

  const Header = !animationEnded ? motion.header : "header";
  const styles = !animationEnded
    ? {
        top,
        width,
        height,
        transform: "translateX(-50%)",
      }
    : {
        // Once the animation ends, use CSS to properly position the header
        top: "calc(100dvh - 96px)",
        width: "fit-content",
        height: "fit-content",
        transform: "translateX(-50%)",
      };

  return (
    <>
      <div
        className={cn("h-fit w-full", {
          "absolute left-0 top-2 z-10 px-2": isIndexPage,
          "py-2": !isIndexPage,
        })}
      >
        <div
          className={cn(
            "container flex w-full justify-between gap-4 border-b border-foreground/10 bg-background/15 py-2 shadow-sm backdrop-blur transition-all duration-300 ease-minor-spring",
            {
              "rounded-full": isIndexPage,
              "px-4": !isIndexPage,
            },
          )}
        >
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Icons.logo className="h-8 w-8" />
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
              Star us <span className="hidden sm:inline">on GitHub</span>
            </Link>
          </AnimatedBorderTrail>
        </div>
      </div>
      <Header
        // @ts-expect-error - the conditional type is not being inferred correctly
        style={styles}
        onAnimationEnd={() => {
          function clear() {
            if (String(height.get()) === String(border + (headerRef.current?.clientHeight ?? 0))) {
              setAnimationEnded(true);
            } else {
              requestAnimationFrame(clear);
            }
          }

          if (!animationEnded && width.get() > 40 && isInView) {
            requestAnimationFrame(clear);
          }
        }}
        className={cn(
          "fixed left-1/2 z-50 mx-auto rounded-2xl border border-muted-foreground bg-zinc-700 text-background shadow-sm shadow-muted-foreground dark:bg-white",
          {
            "transition-all duration-300": animationEnded,
            "overflow-hidden": !animationEnded,
          },
        )}
      >
        <div ref={headerRef} className="flex h-14 w-fit max-w-fit items-center px-2">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-2">
              <Link href={docsConfig.mainNav[1].href ?? ""} rel="noreferrer">
                <HeaderDockItem>
                  <CodeIcon className="h-4 w-4" />
                  <span className="sr-only">Components</span>
                </HeaderDockItem>
              </Link>
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <HeaderDockItem>
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </HeaderDockItem>
              </Link>
              <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                <HeaderDockItem>
                  <Icons.twitter className="h-3 w-3 fill-current" />
                  <span className="sr-only">Twitter</span>
                </HeaderDockItem>
              </Link>
              <ModeToggle />
            </nav>
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute inset-0 h-full w-full animate-pulse rounded-2xl bg-foreground duration-mid repeat-1"
          style={{ opacity: animationEnded ? 0 : 0.3 }}
        />
      </Header>
    </>
  );
}
