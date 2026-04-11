"use client";

import Link from "next/link";

import AnimatedBeam from "@/animata/background/animated-beam";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function BeamCta() {
  return (
    <section>
      <AnimatedBeam className="rounded-none">
        <div className="flex min-h-[360px] items-center justify-center px-4 py-16">
          <div className="flex max-w-xl flex-col items-center text-center">
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight text-white">
              Free &amp; Open Source
            </h2>
            <p className="mt-4 text-[17px] leading-[1.47] text-white/70">
              194+ components, MIT licensed. Copy, paste, ship.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[17px] font-medium text-zinc-950 transition-opacity hover:opacity-90"
              >
                Browse Components
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[17px] font-medium text-white/80 transition-colors hover:text-white"
              >
                <Icons.gitHub className="size-4" />
                View on GitHub →
              </Link>
            </div>
          </div>
        </div>
      </AnimatedBeam>
    </section>
  );
}
