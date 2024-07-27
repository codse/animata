import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Navigation } from "lucide-react";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import GibberishText from "@/animata/text/gibberish-text";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function CallToActionSection() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headerRef);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setKey((prev) => prev + 1);
    }
  }, [isInView]);

  return (
    <section className="flex flex-col gap-4 px-8 py-12">
      <ComponentLinkWrapper link="/docs/text/gibberish-text" className="mx-auto">
        <h1
          ref={headerRef}
          className="w-fit p-4 text-center font-mono text-2xl font-bold md:text-4xl"
        >
          <RemountOnMouseIn>
            <GibberishText key={`in_${key}`} text="Start building today" />
          </RemountOnMouseIn>
        </h1>
      </ComponentLinkWrapper>

      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 md:flex-row">
        <Link
          href="/docs"
          className="relative flex aspect-square min-h-52 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-border bg-gray-100/50 bg-opacity-100 p-12 transition-all duration-100 hover:scale-105 hover:bg-opacity-50 dark:border-zinc-600 dark:bg-zinc-800"
        >
          <Navigation className="size-14" />
          <div className="text-balance text-center text-sm font-bold md:text-base">
            <AnimatedGradientText>Explore Components</AnimatedGradientText>
          </div>
        </Link>
        <Link
          href="https://github.com/codse/animata"
          className="relative flex aspect-square min-h-52 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-border bg-gray-100/50 bg-opacity-100 p-12 transition-all duration-100 hover:scale-105 hover:bg-opacity-50 dark:border-zinc-600 dark:bg-zinc-800"
        >
          <GitHubLogoIcon className="size-14" />
          <div className="text-balance text-center text-sm font-bold md:text-base">
            <AnimatedGradientText>View code on GitHub</AnimatedGradientText>
          </div>
        </Link>
      </div>
    </section>
  );
}
