import Marquee from "@/animata/container/marquee";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { builtWith } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="px-4 md:invisible md:px-0 md:text-3xl">Built using</div>
      <div
        title="Built using"
        className="w-max-full group relative flex h-24 w-full items-center justify-center"
      >
        <Marquee
          repeat={10}
          className="items-center transition-all duration-500 [--duration:30s] [--gap:3rem] md:group-hover:blur-sm"
        >
          {Object.keys(builtWith).map((name) => {
            return (
              <div
                key={name}
                className="tracking-bold text-5xl font-light uppercase text-black/70 dark:text-white/70 md:text-6xl"
              >
                {name}
              </div>
            );
          })}
        </Marquee>
        <div className="absolute opacity-0 transition-opacity delay-75 duration-500 md:group-hover:opacity-100">
          <AnimatedGradientText className="text-3xl font-black">
            Built using
          </AnimatedGradientText>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:h-24 md:w-1/2 md:flex-row">
        <div>
          <p className="text-muted-foreground">Open source</p>
          <div>animata</div>
        </div>
        <div>
          <p className="text-muted-foreground">Maintained by</p>
          <div>codse</div>
        </div>
        <div>
          <p className="text-muted-foreground">With love from</p>
          <div>🇳🇵Nepal</div>
        </div>
      </div>
    </footer>
  );
}
