import AnimatedBeam from "@/animata/background/animated-beam";
import InteractiveGrid from "@/animata/background/interactive-grid";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import SplitText from "@/animata/text/split-text";
import GridView from "@/app/_landing/grid-view";
import { ComponentCard } from "@/components/component-card";
import ComponentLinkWrapper from "@/components/component-link-wrapper";

export default function SectionTwo() {
  return (
    <>
      <GridView>
        <ComponentCard name="Gradient text" href="/docs/text/animated-gradient-text">
          <AnimatedGradientText className="text-4xl font-black uppercase md:text-5xl lg:text-9xl">
            HELLO
          </AnimatedGradientText>
        </ComponentCard>

        <ComponentCard name="Split text" href="/docs/text/split-text">
          <SplitText text="HOVER" />
        </ComponentCard>
      </GridView>

      <GridView>
        <ComponentCard name="Animated beam" href="/docs/background/animated-beam">
          <AnimatedBeam className="rounded-3xl">
            <ComponentLinkWrapper
              link="/docs/background/animated-beam"
              className="flex min-h-96 w-full flex-col items-center justify-center text-xl font-bold text-white md:text-3xl"
            >
              <span>
                Free <span className="inline-block rotate-6 text-lg">&amp;</span>
              </span>
              <span>Open source</span>
            </ComponentLinkWrapper>
          </AnimatedBeam>
        </ComponentCard>

        <ComponentCard name="Interactive grid" href="/docs/background/interactive-grid">
          <InteractiveGrid
            className="flex min-h-96 items-center"
            contentClassName="pointer-events-none"
          >
            <div className="pointer-events-none flex h-full max-w-sm items-center text-balance p-3 text-center text-base text-zinc-800 md:text-xl">
              Hover the small squares to see the background effect.
            </div>
          </InteractiveGrid>
        </ComponentCard>
      </GridView>
    </>
  );
}
