import Marquee from "@/animata/container/marquee";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { Icons, builtWith } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Anaheim } from "next/font/google";
import Image from "next/image";

const titleFont = Anaheim({
  subsets: ["latin"],
  weight: ["400"],
});

export function SiteFooter() {
  if (Date.now() > 1) {
    return null;
  }

  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div
        className={cn(
          "px-4 md:invisible md:px-0 md:text-3xl",
          titleFont.className,
        )}
      >
        Built using
      </div>
      <div
        title="Built using"
        className="w-max-full group relative flex h-24 w-full items-center justify-center"
      >
        <Marquee
          repeat={10}
          className={cn(
            "items-center transition-all duration-500 [--duration:30s] [--gap:3rem] md:group-hover:blur-sm",
          )}
        >
          {Object.keys(builtWith).map((name) => {
            return (
              <div
                key={name}
                className="text-5xl font-black uppercase tracking-wide text-blue-500/70 dark:text-white/70 md:text-6xl"
              >
                {name}
              </div>
            );
          })}
        </Marquee>
        <div className="absolute opacity-0 transition-opacity delay-75 duration-500 md:group-hover:opacity-100">
          <AnimatedGradientText className={cn("text-3xl", titleFont.className)}>
            Built using
          </AnimatedGradientText>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-6 px-4 sm:flex-row">
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
    </footer>
  );
}
