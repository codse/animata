import RingChart from "@/animata/graphs/ring-chart";
import TypingText from "@/animata/text/typing-text";
import WaveReveal from "@/animata/text/wave-reveal";
import Cycling from "@/animata/widget/cycling";
import { Icons } from "@/components/icons";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import { cn } from "@/lib/utils";
import { Cabin as Font } from "next/font/google";

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
        "relative h-full w-full rounded-2xl p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

const textFont = Font({
  subsets: ["latin"],
});

function Feather(props: { className?: string }) {
  return (
    <svg
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#cs_clip_1_moon-12)">
        <mask
          height="202"
          id="cs_mask_1_moon-12"
          style={{ maskType: "alpha" }}
          width="201"
          x="-1"
          y="-1"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M100.503 101.907C107.74 125.692 129.849 143 156 143c15.184 0 29.006-5.835 39.345-15.385 1.138-1.051 3.017-.565 3.342.95A59.235 59.235 0 01200 141c0 32.585-26.415 59-59 59s-59-26.415-59-59c0-15.679 6.116-29.93 16.093-40.497C74.308 107.74 57 129.849 57 156c0 15.185 5.835 29.006 15.385 39.345 1.051 1.138.565 3.018-.95 3.343A59.236 59.236 0 0159 200c-32.585 0-59-26.415-59-59 0-32.584 26.415-59 59-59 15.68 0 29.93 6.117 40.497 16.093C92.26 74.308 70.15 57 43.999 57c-15.184 0-29.005 5.835-39.344 15.385-1.138 1.051-3.018.565-3.343-.95A59.234 59.234 0 010 59C0 26.415 26.415 0 59 0c32.584 0 59 26.415 59 59 0 15.68-6.117 29.93-16.093 40.497C125.692 92.26 143 70.151 143 44c0-15.185-5.835-29.006-15.385-39.345-1.051-1.138-.565-3.017.95-3.342A59.23 59.23 0 01141 0c32.585 0 59 26.415 59 59s-26.415 59-59 59c-15.68 0-29.93-6.116-40.497-16.093z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </mask>
        <g mask="url(#cs_mask_1_moon-12)">
          <path d="M200 0H0v200h200V0z" fill="currentColor" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint0_radial_748_4454)" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint1_radial_748_4454)" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint2_radial_748_4454)" />
        </g>
      </g>
      <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_moon-12)">
        <path
          d="M200 0H0v200h200V0z"
          fill="gray"
          stroke="transparent"
          filter="url(#cs_noise_1_moon-12)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_748_4454"
          cx="0"
          cy="0"
          gradientTransform="rotate(-135.99 120.877 57.303) scale(143.21)"
          gradientUnits="userSpaceOnUse"
          r="1"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.423" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_748_4454"
          cx="0"
          cy="0"
          gradientTransform="rotate(-45.616 231.53 74.976) scale(263.059)"
          gradientUnits="userSpaceOnUse"
          r="1"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_748_4454"
          cx="0"
          cy="0"
          gradientTransform="rotate(46.063 -3.673 22.392) scale(209.693)"
          gradientUnits="userSpaceOnUse"
          r="1"
        >
          <stop offset="0.276" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cs_clip_1_moon-12">
          <path d="M0 0H200V200H0z" fill="currentColor" />
        </clipPath>
      </defs>
      <defs>
        <filter
          height="100%"
          id="cs_noise_1_moon-12"
          width="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feBlend result="out3" in="SourceGraphic" in2="out2" />
        </filter>
      </defs>
    </svg>
  );
}

export default function FeatureSection() {
  const titleClassName = cn(
    "mb-3 text-2xl font-semibold text-foreground",
    textFont.className,
  );

  const descriptionClassName = "text-muted-foreground font-medium";
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 md:mb-16 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-3">
      <BentoCard className="flex flex-col bg-blue-100 dark:bg-zinc-900">
        <h4 className={titleClassName}>Built with</h4>
        <div className="flex flex-1 flex-wrap items-center justify-evenly gap-3">
          <div
            title="Github"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.gitHub className="h-8 w-8" />
          </div>

          <div
            title="Storybook"
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.storybook className="absolute left-2.5 h-8 w-8" />
          </div>

          <div
            title="NextJS"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.nextJS className="h-8 w-8" />
          </div>

          <div
            title="ReactJS"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.react className="h-8 w-8" />
          </div>

          <div
            title="Tailwind"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.tailwind className="h-8 w-8" />
          </div>

          <div
            title="Yarn"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.yarn className="h-8 w-8" />
          </div>
          <div
            title="Framer motion"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.framerMotion className="h-8 w-8" />
          </div>

          <div
            title="Content layer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-100 animate-in zoom-in-75 slide-in-from-top-4"
          >
            <Icons.contentLayer className="h-8 w-8" />
          </div>
        </div>
      </BentoCard>
      <BentoCard className="flex flex-col items-center justify-center bg-zinc-800 dark:bg-zinc-900">
        <RemountOnMouseIn>
          <RingChart
            size={36}
            className="bg-transparent"
            width={16}
            rings={[
              {
                progress: 10,
                trackClassName: "text-rose-600/30",
                progressClassName: "text-rose-600",
              },
              {
                progress: 60,
                trackClassName: "text-lime-500/20",
                progressClassName: "text-lime-500",
              },
              {
                progress: 40,
                trackClassName: "text-teal-400/30",
                progressClassName: "text-teal-400",
              },
            ]}
          />
        </RemountOnMouseIn>
      </BentoCard>
      <BentoCard className="group flex flex-col bg-gray-100 dark:bg-zinc-900 lg:col-span-2">
        {/** Window */}
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        {/** Code */}
        <div className="mt-3 font-mono text-sm">
          <div className="mt-2 line-clamp-1">
            <span className="font-medium text-yellow-600 dark:text-yellow-500">
              import
            </span>{" "}
            <span className="transition-all group-hover:animate-pulse group-hover:text-blue-600 dark:group-hover:text-blue-400">
              BoldCopy
            </span>{" "}
            <span className="font-medium text-yellow-600 dark:text-yellow-500">
              from
            </span>{" "}
            &quot;@/animata/components/text/bold-copy&quot;
          </div>

          <div className="mt-3 transition-all group-hover:animate-pulse">
            <TypingText text='<BoldCopy text="Animata" />' />
          </div>
        </div>

        <RemountOnMouseIn className="flex flex-1 flex-col justify-end">
          <WaveReveal
            className="justify-start self-end px-0 pt-4 text-sm font-bold text-blue-500 md:px-0 md:pt-0 md:text-sm"
            text="Copy. Paste. Animate."
            blur={false}
          />
        </RemountOnMouseIn>
      </BentoCard>
      <BentoCard className="group flex flex-col bg-green-100 dark:bg-zinc-900">
        <h4 className={titleClassName}>Regular updates</h4>
        <div>
          We are constantly adding new animations and effects to the library.
          You can subscribe to our newsletter to get notified.
        </div>
      </BentoCard>

      <BentoCard className="flex flex-col items-center justify-center bg-white text-center text-4xl font-black uppercase text-yellow-500 shadow-sm dark:bg-zinc-900 dark:text-yellow-400 md:col-span-2 md:text-5xl lg:col-span-2">
        <span>
          Free <span className="inline-block rotate-6 text-lg">&amp;</span>
        </span>
        <span>Open source</span>
      </BentoCard>
      <BentoCard className="group relative flex flex-col bg-yellow-100 dark:bg-zinc-900">
        <h4 className={titleClassName}>Light weight</h4>

        <div className={cn(descriptionClassName, "flex gap-2")}>
          <span>
            Most of the effects are lightweight, single file, and built with
            TailwindCSS.
          </span>
          <Feather className="h-20 w-20 text-yellow-500 transition-all duration-1000 ease-slow repeat-infinite group-hover:rotate-[720deg] md:absolute md:bottom-4 md:right-4" />
        </div>
      </BentoCard>
      <BentoCard className="flex flex-col bg-gray-100 p-3 dark:bg-zinc-900 lg:col-span-2 lg:col-start-2">
        <div className="flex-1 p-3">
          No longer wasting hours 🕕 looking for the inspiration or trying to
          write everything from scratch 📝.
        </div>
        <div className="rounded-sm bg-gray-50 px-3 py-2 font-mono text-sm text-black dark:bg-zinc-800 dark:text-white">
          <div>
            <span className="font-semibold text-blue-400 dark:text-blue-200">
              time.
            </span>
            saved = <span className="font-bold text-blue-400">true</span>;
          </div>
          <span className="block">
            <span className="font-semibold text-blue-400 dark:text-blue-200">
              frustration
            </span>
            --;
          </span>
          <span className="block">
            <span className="font-semibold text-blue-400 dark:text-blue-200">
              happiness
            </span>
            ++;
          </span>

          <span className="block">
            <span className="font-semibold text-blue-400 dark:text-blue-200">
              productivity
            </span>
            ++;
          </span>
        </div>
      </BentoCard>
      <BentoCard className="bg-zinc-900">
        <Cycling className="w-full" title="Widgets" />
      </BentoCard>
    </div>
  );
}
