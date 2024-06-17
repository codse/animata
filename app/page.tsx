"use client";

import MirrorText from "@/animata/text/mirror-text";
import TypingText from "@/animata/text/typing-text";
import WaveReveal from "@/animata/text/wave-reveal";
import { Icons } from "@/components/icons";
import { PageHeaderDescription } from "@/components/page-header";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Anaheim } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-3">
        <BentoCard className="bg-gray-200 dark:bg-zinc-900 sm:col-span-2">
          <h4 className="text-md font-bold">Free &amp; Open source</h4>
          <div className="font-sm text-gray-500">
            Animata is free and open source. You can use it for personal and
            commercial projects without any restrictions.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900">
          <h4 className="text-md font-bold">Full ownership</h4>
          <div className="font-sm text-gray-500">
            You have the full ownership of the code, you can adjust it as per
            your needs. No need to worry about licensing.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900 sm:col-span-1 sm:row-span-2">
          <h4 className="text-md font-bold">Regular updates</h4>
          <div className="font-sm text-gray-500">
            We are constantly adding new animations and effects to the library.
            You can subscribe to our newsletter to get notified.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900 sm:col-span-2 sm:row-span-2">
          <h4 className="text-md font-bold">Save time</h4>
          <div className="font-sm text-gray-500">
            No longer wasting hours looking for the <i>inspiration</i> or trying
            to write everything from scratch. Just copy, paste, and see it in
            action.
          </div>
        </BentoCard>
      </div>
    </div>
  );
}

let hasLoaded = false;
function Curtain() {
  useEffect(() => {
    hasLoaded = true;
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end justify-center bg-yellow-200 ease-slow animate-out slide-out-to-top-full fill-mode-forwards",
        {
          // Only animate it once per load
          "duration-1000": !hasLoaded,
          "duration-0": hasLoaded,
        },
      )}
    >
      <div className="w-full py-12 text-center">
        <span
          className={cn(
            "block select-none text-6xl uppercase text-blue-700 duration-long animate-in fade-in",
            titleFont.className,
          )}
        >
          animata
        </span>
        <span className="text-blue-700/50 duration-long animate-in fade-in">
          ~ bring your site to life ~
        </span>
      </div>
    </div>
  );
}

const ModeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const rotate = useMotionValue(theme === "dark" ? 180 : 0);
  const spring = useSpring(rotate, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      style={{
        rotate: spring,
      }}
      onClick={() => {
        rotate.set(rotate.get() + 180);
      }}
      className="grid h-48 w-48 cursor-pointer grid-cols-2 grid-rows-2"
    >
      <div
        className="group flex h-24 w-24 items-center justify-center"
        onClick={() => {
          setTheme("dark");
        }}
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all group-hover:scale-125 group-active:scale-100" />
      </div>
      <div
        onClick={() => {
          setTheme("light");
        }}
        className="group col-start-2 row-start-2 flex h-24 w-24 items-center justify-center"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all group-hover:scale-125 group-active:scale-100" />
      </div>
    </motion.div>
  );
};

function Animata() {
  return (
    <div className="group relative inline-block">
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: "2s", delay: 0.5, type: "spring" }}
        className="absolute -left-3 -top-1 inline-block -rotate-12 rounded-full bg-lime-200 px-2 py-1 text-sm font-bold uppercase text-lime-600 transition-all ease-slow group-hover:z-10 group-hover:rotate-0 group-hover:bg-lime-300"
      >
        FREE
      </motion.span>

      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: "2s", delay: 1, type: "spring" }}
        className="absolute -right-9 -top-1 inline-block rotate-12 rounded-full bg-lime-200 px-2 py-1 text-sm font-bold uppercase text-lime-600 transition-all ease-slow group-hover:z-10 group-hover:rotate-0 group-hover:bg-lime-300"
      >
        Open source
      </motion.span>
      <WaveReveal
        text="animata"
        className={cn(
          "select-none px-0 text-6xl uppercase text-blue-700 transition-opacity group-hover:opacity-50 md:px-0",
          titleFont.className,
        )}
        direction="up"
      />
    </div>
  );
}

export default function IndexPage() {
  return (
    <>
      <div className="container relative flex w-full flex-col gap-8">
        <div className="max-w-8xl mx-auto flex h-[90vh] flex-col items-center justify-center gap-4 md:flex-row">
          <div className="flex flex-1 flex-col items-center justify-center py-8 md:items-start md:py-24">
            <Animata />
            <PageHeaderDescription className="mb-4 md:text-left">
              Hand-crafted ✍️ interaction animations and effects from around the
              internet 🛜 to{" "}
              <span className="underline decoration-wavy underline-offset-8">
                copy
              </span>{" "}
              and{" "}
              <span className="underline decoration-wavy underline-offset-8">
                paste
              </span>{" "}
              into your project.
            </PageHeaderDescription>
            <div className="mt-3 flex items-start gap-4">
              <Link href="/docs/setup" className={cn(buttonVariants())}>
                Get started
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex flex-row gap-4">
              <motion.div
                initial={{
                  scale: 0.3,
                  rotate: 0,
                }}
                animate={{
                  scale: [0.3, 1],
                  rotate: [-12, 0],
                }}
                transition={{
                  duration: 0.3,
                }}
                className="flex h-24 flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
              >
                <div className={titleFont.className}>
                  <MirrorText text="Awesomeness" />
                </div>
              </motion.div>

              <motion.div
                initial={{
                  scale: 0.5,
                  rotate: 0,
                }}
                animate={{
                  scale: [0.5, 1],
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                }}
                className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
              >
                <ModeSwitcher />
              </motion.div>
            </div>

            <motion.div
              initial={{
                scale: 0.5,
                rotate: 0,
              }}
              animate={{
                scale: [0.5, 1],
                rotate: [12, 0],
              }}
              transition={{
                delay: 0.2,
                duration: 0.2,
              }}
              className="overflow-hidden"
            >
              <RemountOnMouseIn
                duration={3000}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-50 shadow-xl hover:opacity-100 dark:border-gray-600 dark:bg-gray-900"
              >
                <TypingText
                  smooth
                  alwaysVisibleCount={0}
                  delay={100}
                  repeat={false}
                  text="Bring your site to life with these ready to use animated components & interaction built using React, Framer Motion, and Tailwind CSS."
                />
              </RemountOnMouseIn>
            </motion.div>
          </div>
        </div>

        <FeatureSection />
      </div>

      <Curtain />
    </>
  );
}
