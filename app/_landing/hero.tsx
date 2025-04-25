import Link from "next/link";

import CarbonAds from "@/components/ads";
import { Icons } from "@/components/icons";
import { PageHeaderDescription } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import HeroTitle from "./hero-title";

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute hidden origin-center items-center justify-center rounded-full border-2 border-border bg-background/90",
        "px-4 py-2 text-sm font-semibold text-foreground shadow-lg duration-1000 ease-minor-spring animate-in fade-in-0 zoom-in-150 md:flex",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative overflow-visible pt-16">
      <div
        className="absolute inset-0 hidden aspect-square min-h-full w-[1200%] opacity-25 duration-1000 ease-in-out animate-in fade-in-0 dark:opacity-75 dark:mix-blend-soft-light dark:brightness-150 md:block md:w-[120%]"
        style={{
          backgroundImage: `radial-gradient(at 88% 11%, hsla(166,69%,67%,1) 0px, transparent 50%),
          radial-gradient(at 56% 93%, hsla(295,72%,68%,1) 0px, transparent 50%),
          radial-gradient(at 87% 28%, hsla(210,89%,62%,1) 0px, transparent 50%),
          radial-gradient(at 75% 83%, hsla(332,84%,75%,1) 0px, transparent 50%),
          radial-gradient(at 33% 39%, hsla(124,65%,76%,1) 0px, transparent 50%),
          radial-gradient(at 62% 69%, hsla(133,75%,79%,1) 0px, transparent 50%),
          radial-gradient(at 66% 84%, hsla(89,66%,79%,1) 0px, transparent 50%)`,
        }}
      />
      <div className="container relative overflow-hidden py-16 md:py-48">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-2">
            <HeroTitle />

            <PageHeaderDescription className="relative mx-auto mb-4 w-fit duration-1000 ease-minor-spring animate-in fade-in-0 slide-in-from-bottom-3">
              Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to{" "}
              <span className="underline decoration-wavy underline-offset-8">copy</span> and{" "}
              <span className="underline decoration-wavy underline-offset-8">paste</span> into your
              project.
            </PageHeaderDescription>
            <div className="relative mb-6 mt-3 flex items-start gap-4 duration-1000 ease-minor-spring animate-in fade-in-0 slide-in-from-bottom-3">
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
                Star us on GitHub
              </Link>
            </div>
          </div>
        </div>

        <Pill className="left-12 top-20 rotate-3">80+ components</Pill>
        <Pill className="right-12 top-20 -translate-y-1/2 -rotate-6">1000+ stars</Pill>
        <Pill className="bottom-12 left-12 -rotate-6">1033+ hours of development</Pill>
        <Pill className="right-8 top-1/2 -translate-y-1/2">250+ hours of research</Pill>

        <div className="mt-12 sm:absolute sm:left-12 sm:top-1/2 sm:mt-0 sm:w-32 sm:-translate-y-1/2">
          <CarbonAds />
        </div>
        <Pill className="bottom-24 right-12 aspect-square -translate-x-full -translate-y-full p-2">
          <Icons.tailwind className="size-6" />
        </Pill>
        <Pill className="bottom-12 right-12 aspect-square translate-x-1/2 translate-y-1/2 p-1">
          <Icons.framerMotion className="size-6" />
        </Pill>
        <Pill className="right-12 top-32 aspect-square translate-y-full p-1">
          <Icons.reactJS className="size-8" />
        </Pill>
        <svg className="hidden">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".8"
              numOctaves="4"
              stitchTiles="stitch"
            ></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>
      </div>
    </div>
  );
}
