"use client";

import { PlayIcon } from "lucide-react";
import { IBM_Plex_Sans } from "next/font/google";
import { useEffect, useState } from "react";

import Marquee from "@/animata/container/marquee";
import { cn } from "@/lib/utils";

import { CinemaRowNotes } from "./cinema-row-notes";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const FEATURED = {
  eyebrow: "Original film",
  title: "Infinite Horizon",
  tagline: "When the signal returns, nothing on Earth is where they left it.",
  runtime: "2h 14m · Sci‑Fi · Dolby Vision",
};

const PREMIERES = [
  {
    title: "Glass Orchard",
    genre: "Drama",
    gradient: "linear-gradient(160deg, oklch(0.42 0.12 250) 0%, oklch(0.22 0.06 280) 100%)",
  },
  {
    title: "Midnight Relay",
    genre: "Thriller",
    gradient: "linear-gradient(160deg, oklch(0.35 0.08 25) 0%, oklch(0.18 0.04 15) 100%)",
  },
  {
    title: "North Archive",
    genre: "Documentary",
    gradient: "linear-gradient(160deg, oklch(0.55 0.06 210) 0%, oklch(0.28 0.04 230) 100%)",
  },
  {
    title: "Soft Circuit",
    genre: "Romance",
    gradient: "linear-gradient(160deg, oklch(0.62 0.14 340) 0%, oklch(0.32 0.08 320) 100%)",
  },
  {
    title: "Harbor Line",
    genre: "Crime",
    gradient: "linear-gradient(160deg, oklch(0.38 0.05 160) 0%, oklch(0.16 0.03 190) 100%)",
  },
  {
    title: "Second Sun",
    genre: "Sci‑Fi",
    gradient: "linear-gradient(160deg, oklch(0.48 0.16 55) 0%, oklch(0.24 0.08 40) 100%)",
  },
  {
    title: "Quiet Union",
    genre: "Indie",
    gradient: "linear-gradient(160deg, oklch(0.52 0.04 280) 0%, oklch(0.24 0.03 260) 100%)",
  },
] as const;

const QUOTES = [
  { text: "A widescreen poem.", source: "The Frame" },
  { text: "Refuses to blink.", source: "Celluloid" },
  { text: "Sound you feel in your chest.", source: "Playback" },
  { text: "The rare blockbuster with a pulse.", source: "Premiere" },
  { text: "Every frame is a poster.", source: "Lens Culture" },
  { text: "Turn the volume up.", source: "Signal" },
  { text: "IMAX without leaving the couch.", source: "Home Screen" },
  { text: "Cast chemistry for the ages.", source: "Rolling Reel" },
] as const;

function QuoteChip({ text, source }: { text: string; source: string }) {
  return (
    <figure className="w-40 shrink-0 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 sm:w-44">
      <blockquote className="text-[13px] leading-snug text-white/82">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-[11px] font-medium tracking-wide text-white/38 uppercase">
        {source}
      </figcaption>
    </figure>
  );
}

function PosterCard({
  title,
  genre,
  gradient,
}: {
  title: string;
  genre: string;
  gradient: string;
}) {
  return (
    <article className="w-[9.75rem] shrink-0 snap-start sm:w-[11.25rem]">
      <div
        className="aspect-[2/3] overflow-hidden rounded-xl ring-1 ring-white/10"
        style={{ backgroundImage: gradient }}
      />
      <h3 className="mt-2.5 truncate text-[15px] font-medium text-white/92">{title}</h3>
      <p className="text-[13px] text-white/42">{genre}</p>
    </article>
  );
}

export default function CinemaRow() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <div
        className={cn(
          sans.variable,
          sans.className,
          "min-h-svh bg-black text-white selection:bg-white/20",
        )}
      >
        {/* Hero — overscale premiere typography */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,oklch(0.28_0.08_280_/_0.55)_0%,transparent_58%),linear-gradient(to_bottom,oklch(0.12_0.02_280)_0%,black_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent"
          />

          <div className="relative z-10 flex min-h-[min(88svh,920px)] flex-col justify-end px-5 pb-[calc(var(--demo-chrome-reserve,5rem)+2.5rem)] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
            <p className="text-[13px] font-medium tracking-[0.08em] text-white/45 uppercase">
              {FEATURED.eyebrow}
            </p>
            <h1 className="mt-3 max-w-[11ch] text-balance text-[clamp(3.25rem,14vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              {FEATURED.title}
            </h1>
            <p className="mt-5 max-w-[34ch] text-[17px] leading-snug text-white/58 sm:text-[19px]">
              {FEATURED.tagline}
            </p>
            <p className="mt-3 text-[13px] text-white/38">{FEATURED.runtime}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 touch-manipulation items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black transition-transform active:scale-[0.98]"
              >
                <PlayIcon aria-hidden="true" className="size-4 fill-current" />
                Play
              </button>
              <button
                type="button"
                className="inline-flex h-11 touch-manipulation items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-6 text-[14px] font-medium text-white/78 transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
              >
                Add to Up Next
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal poster row */}
        <section className="pb-6 pt-2" aria-labelledby="premieres-heading">
          <div className="mb-4 flex items-end justify-between gap-4 px-5 sm:px-8">
            <h2 id="premieres-heading" className="text-[22px] font-semibold tracking-[-0.02em]">
              Premieres
            </h2>
            <span className="text-[13px] text-white/38">Swipe to browse</span>
          </div>

          <div className="overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max snap-x snap-mandatory gap-4 px-5 sm:gap-5 sm:px-8">
              {PREMIERES.map((film) => (
                <PosterCard key={film.title} {...film} />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial copy + opposing vertical marquees */}
        <section
          className="border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28"
          aria-labelledby="editorial-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
            <div className="max-w-md">
              <p className="text-[13px] font-medium tracking-[0.08em] text-white/42 uppercase">
                The craft
              </p>
              <h2
                id="editorial-heading"
                className="mt-3 text-balance text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
              >
                Built for the big screen. Tuned for your living room.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/52">
                This browse layout pairs overscale premiere type with a snap-scrolling poster rail,
                then lets critic lines drift in opposite directions beside long-form copy — the
                rhythm streaming homepages use to feel cinematic without hiding the catalog.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/52">
                The dual marquees are the same <span className="text-white/72">Marquee</span>{" "}
                primitive twice: one column runs upward, the other reverses downward so motion never
                feels like a single conveyor belt.
              </p>
            </div>

            <div className="grid h-[min(32rem,68vh)] min-h-[22rem] grid-cols-2 gap-3 sm:gap-4">
              {reducedMotion ? (
                <>
                  <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
                    {QUOTES.slice(0, 4).map((quote) => (
                      <QuoteChip key={quote.source} {...quote} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
                    {QUOTES.slice(4).map((quote) => (
                      <QuoteChip key={quote.source} {...quote} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Marquee
                    vertical
                    pauseOnHover
                    applyMask={false}
                    className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 [--duration:26s] [--gap:14px]"
                  >
                    {QUOTES.map((quote) => (
                      <QuoteChip key={`up-${quote.source}`} {...quote} />
                    ))}
                  </Marquee>
                  <Marquee
                    vertical
                    reverse
                    pauseOnHover
                    applyMask={false}
                    className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 [--duration:31s] [--gap:14px]"
                  >
                    {QUOTES.map((quote) => (
                      <QuoteChip key={`down-${quote.source}`} {...quote} />
                    ))}
                  </Marquee>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <CinemaRowNotes />
    </>
  );
}
