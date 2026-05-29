"use client";

import { PlayIcon } from "lucide-react";
import { IBM_Plex_Sans } from "next/font/google";
import { useEffect, useState } from "react";

import Marquee from "@/animata/container/marquee";
import WaveReveal from "@/animata/text/wave-reveal";
import { cn } from "@/lib/utils";

import { CinemaRowNotes } from "./cinema-row-notes";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const TMDB_POSTER = (path: string) => `https://media.themoviedb.org/t/p/w500${path}`;
const TMDB_BACKDROP = (path: string) => `https://media.themoviedb.org/t/p/w780${path}`;

const FEATURED = {
  eyebrow: "Now streaming",
  title: "Dune: Part Two",
  tagline: "Paul goes back to Arrakis. The desert hasn't forgotten him.",
  runtime: "2h 47m · Sci‑Fi",
  backdrop: TMDB_BACKDROP("/eZ239CUp1d6OryZEBPnO2n87gMG.jpg"),
};

const HERO_TITLE_WORDS = FEATURED.title.trim().split(/\s+/).length;
const HERO_TITLE_DELAY_MS = 100;
const HERO_WORD_STAGGER_MS = 50;
const HERO_WORD_DURATION_MS = 700;
const HERO_ITEM_DURATION_MS = 580;

function heroSequenceDelays() {
  const titleEnd =
    HERO_TITLE_DELAY_MS + (HERO_TITLE_WORDS - 1) * HERO_WORD_STAGGER_MS + HERO_WORD_DURATION_MS;

  const ctaPrimary = titleEnd + 120;
  const ctaSecondary = titleEnd + 220;

  return {
    eyebrow: 0,
    title: HERO_TITLE_DELAY_MS,
    tagline: titleEnd - 220,
    runtime: titleEnd - 40,
    ctaPrimary,
    ctaSecondary,
    premieresLabel: ctaSecondary + 140,
    premieresMeta: ctaSecondary + 220,
    premieresRail: ctaSecondary + 260,
  };
}

function CinemaEntranceStyles() {
  return (
    <style>{`
      @keyframes cinema-hero-rise {
        from {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }
      .cinema-hero-rise {
        animation: cinema-hero-rise ${HERO_ITEM_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
    `}</style>
  );
}

const HERO_BACKDROPS = [
  { title: "Dune: Part Two", image: TMDB_BACKDROP("/eZ239CUp1d6OryZEBPnO2n87gMG.jpg") },
  { title: "Sinners", image: TMDB_BACKDROP("/nAxGnGHOsfzufThz20zgmRwKur3.jpg") },
  { title: "Oppenheimer", image: TMDB_BACKDROP("/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg") },
  { title: "Blade Runner 2049", image: TMDB_BACKDROP("/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg") },
  { title: "Interstellar", image: TMDB_BACKDROP("/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg") },
  { title: "Mad Max: Fury Road", image: TMDB_BACKDROP("/uT895WNwm0aIJRtGizcQhrejWUo.jpg") },
  { title: "Parasite", image: TMDB_BACKDROP("/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg") },
  { title: "Spider-Verse", image: TMDB_BACKDROP("/9xfDWXAUbFXQK585JvByT5pEAhe.jpg") },
] as const;

const STILLS_LEFT = [
  { title: "Anora", image: TMDB_BACKDROP("/qvyOfwTC3qdbzkqdXWSSEMHtjBZ.jpg") },
  { title: "Challengers", image: TMDB_BACKDROP("/tq8COKsI99Bivjd4CZIYVGoKcIx.jpg") },
  { title: "The Substance", image: TMDB_BACKDROP("/8ODNt5olCeIqBYTP3GgXEQYTfeX.jpg") },
  { title: "Everything Everywhere", image: TMDB_BACKDROP("/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg") },
  { title: "Poor Things", image: TMDB_BACKDROP("/zh6IdheEYinU4TPtorWsjx6qPQE.jpg") },
  { title: "The Batman", image: TMDB_BACKDROP("/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg") },
] as const;

const STILLS_RIGHT = [
  { title: "Top Gun: Maverick", image: TMDB_BACKDROP("/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg") },
  { title: "Banshees of Inisherin", image: TMDB_BACKDROP("/1vXD5HXqkhvsXFHE7KmCPZGPR1e.jpg") },
  { title: "Sinners", image: TMDB_BACKDROP("/nAxGnGHOsfzufThz20zgmRwKur3.jpg") },
  { title: "Oppenheimer", image: TMDB_BACKDROP("/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg") },
  { title: "Interstellar", image: TMDB_BACKDROP("/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg") },
  { title: "Mad Max: Fury Road", image: TMDB_BACKDROP("/uT895WNwm0aIJRtGizcQhrejWUo.jpg") },
] as const;

const PREMIERES = [
  { title: "Sinners", genre: "Horror", poster: TMDB_POSTER("/fWPgbnt2LSqkQ6cdQc0SZN9CpLm.jpg") },
  { title: "Anora", genre: "Drama", poster: TMDB_POSTER("/oN0o3owobFjePDc5vMdLRAd0jkd.jpg") },
  { title: "Challengers", genre: "Drama", poster: TMDB_POSTER("/H6vke7zGiuLsz4v4RPeReb9rsv.jpg") },
  {
    title: "The Substance",
    genre: "Horror",
    poster: TMDB_POSTER("/lqoMzCcZYEFK729d6qzt349fB4o.jpg"),
  },
  {
    title: "Oppenheimer",
    genre: "Biography",
    poster: TMDB_POSTER("/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"),
  },
  {
    title: "Everything Everywhere All at Once",
    genre: "Sci‑Fi",
    poster: TMDB_POSTER("/u68AjlvlutfEIcpmbYpKcdi09ut.jpg"),
  },
  { title: "Parasite", genre: "Thriller", poster: TMDB_POSTER("/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg") },
  {
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation",
    poster: TMDB_POSTER("/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"),
  },
  {
    title: "Blade Runner 2049",
    genre: "Sci‑Fi",
    poster: TMDB_POSTER("/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"),
  },
  {
    title: "Interstellar",
    genre: "Sci‑Fi",
    poster: TMDB_POSTER("/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg"),
  },
  {
    title: "Poor Things",
    genre: "Comedy",
    poster: TMDB_POSTER("/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg"),
  },
  {
    title: "Mad Max: Fury Road",
    genre: "Action",
    poster: TMDB_POSTER("/hA2ple9q4qnwxp3hKVNhroipsir.jpg"),
  },
] as const;

function CinemaContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

function BackdropSlide({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative h-[min(88svh,920px)] w-[clamp(14rem,42vw,36rem)] shrink-0 overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      <span className="sr-only">{title}</span>
    </div>
  );
}

function LandscapeStill({
  title,
  image,
  variant = "wide",
}: {
  title: string;
  image: string;
  variant?: "wide" | "tall";
}) {
  return (
    <figure
      className={cn(
        "group relative w-full max-w-48 shrink-0 overflow-hidden",
        variant === "tall" ? "aspect-[5/3]" : "aspect-video",
      )}
    >
      <img
        src={image}
        alt={`${title} still`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 truncate px-3 pb-2.5 text-[11px] font-semibold tracking-[0.06em] text-white/88 uppercase">
        {title}
      </figcaption>
    </figure>
  );
}

function PosterCard({ title, genre, poster }: { title: string; genre: string; poster: string }) {
  return (
    <article className="w-[9.75rem] shrink-0 sm:w-[11.25rem]">
      <div className="aspect-[2/3] overflow-hidden rounded-xl ring-1 ring-white/10">
        <img
          src={poster}
          alt={`${title} poster`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-2.5 truncate text-[15px] font-medium text-white/92">{title}</h3>
      <p className="text-[13px] text-white/42">{genre}</p>
    </article>
  );
}

function MarqueeWell({
  children,
  className,
  tone = "violet",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "violet" | "amber";
}) {
  const wellColor = tone === "violet" ? "oklch(0.14 0.03 285)" : "oklch(0.15 0.028 55)";

  return (
    <div
      className={cn("relative min-h-[18rem] overflow-hidden", className)}
      style={{ backgroundColor: wellColor }}
    >
      {children}
    </div>
  );
}

function StillMarqueeColumn({
  stills,
  reverse = false,
  duration,
  variant,
}: {
  stills: readonly { title: string; image: string }[];
  reverse?: boolean;
  duration: string;
  variant: "wide" | "tall";
}) {
  return (
    <Marquee
      vertical
      reverse={reverse}
      pauseOnHover
      applyMask={false}
      className={cn("h-full p-0", duration)}
    >
      {stills.map((still) => (
        <LandscapeStill
          key={`${reverse ? "rev" : "fwd"}-${still.title}`}
          {...still}
          variant={variant}
        />
      ))}
    </Marquee>
  );
}

function VerticalStillGallery({
  reducedMotion,
  className,
}: {
  reducedMotion: boolean;
  className?: string;
}) {
  if (reducedMotion) {
    return (
      <div className={cn("grid h-full min-h-[18rem] grid-cols-2 gap-2 sm:gap-4", className)}>
        <MarqueeWell className="h-full min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-2.5">
            {STILLS_LEFT.slice(0, 3).map((still) => (
              <LandscapeStill key={still.title} {...still} variant="wide" />
            ))}
          </div>
        </MarqueeWell>
        <MarqueeWell tone="amber" className="h-full min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-2.5">
            {STILLS_RIGHT.slice(0, 3).map((still) => (
              <LandscapeStill key={still.title} {...still} variant="tall" />
            ))}
          </div>
        </MarqueeWell>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex justify-evenly md:grid h-full min-h-[18rem] md:grid-cols-2 gap-2 sm:gap-4",
        className,
      )}
    >
      <MarqueeWell className="h-full min-h-0 max-w-fit">
        <StillMarqueeColumn
          stills={STILLS_LEFT}
          duration="[--duration:32s] [--gap:12px]"
          variant="wide"
        />
      </MarqueeWell>
      <MarqueeWell tone="amber" className="h-full min-h-0 max-w-fit">
        <StillMarqueeColumn
          stills={STILLS_RIGHT}
          reverse
          duration="[--duration:38s] [--gap:12px]"
          variant="tall"
        />
      </MarqueeWell>
    </div>
  );
}

function PremieresSection({ reducedMotion }: { reducedMotion: boolean }) {
  const delays = heroSequenceDelays();

  return (
    <section className="pb-6 pt-8" aria-labelledby="premieres-heading">
      <CinemaContent className="mb-4 flex items-end justify-between gap-4">
        <h2
          id="premieres-heading"
          className={cn(
            "text-[22px] font-semibold tracking-[-0.02em]",
            !reducedMotion && "cinema-hero-rise",
          )}
          style={reducedMotion ? undefined : { animationDelay: `${delays.premieresLabel}ms` }}
        >
          Premieres
        </h2>
        <span
          className={cn("text-[13px] text-white/38", !reducedMotion && "cinema-hero-rise")}
          style={reducedMotion ? undefined : { animationDelay: `${delays.premieresMeta}ms` }}
        >
          Now playing
        </span>
      </CinemaContent>

      <div
        className={cn(!reducedMotion && "cinema-hero-rise")}
        style={reducedMotion ? undefined : { animationDelay: `${delays.premieresRail}ms` }}
      >
        {reducedMotion ? (
          <CinemaContent className="overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4 sm:gap-5">
              {PREMIERES.map((film) => (
                <PosterCard key={film.title} {...film} />
              ))}
            </div>
          </CinemaContent>
        ) : (
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <Marquee
              pauseOnHover
              applyMask={false}
              className="py-1 pl-5 [--duration:38s] [--gap:1rem] sm:pl-8 sm:[--gap:1.25rem]"
            >
              {PREMIERES.map((film) => (
                <PosterCard key={film.title} {...film} />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
}
function HeroPremiereCopy({ reducedMotion }: { reducedMotion: boolean }) {
  const delays = heroSequenceDelays();

  if (reducedMotion) {
    return (
      <>
        <p className="text-[13px] font-medium tracking-[0.08em] text-white/45 uppercase">
          {FEATURED.eyebrow}
        </p>
        <h1 className="mt-3 max-w-[11ch] -translate-x-[0.13ex] text-balance text-[clamp(3.25rem,14vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
          {FEATURED.title}
        </h1>
        <p className="mt-5 max-w-[28ch] text-[17px] leading-snug text-white/58 sm:text-[19px]">
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
      </>
    );
  }

  return (
    <>
      <p
        className="cinema-hero-rise text-[13px] font-medium tracking-[0.08em] text-white/45 uppercase"
        style={{ animationDelay: `${delays.eyebrow}ms` }}
      >
        {FEATURED.eyebrow}
      </p>

      <h1 className="mt-3 text-balance leading-[0.9]">
        <WaveReveal
          text={FEATURED.title}
          mode="word"
          direction="up"
          blur
          duration={`${HERO_WORD_DURATION_MS}ms`}
          delay={delays.title}
          className=" -translate-x-[0.13ex] justify-start px-0 text-left font-semibold tracking-[-0.02em] text-[clamp(3.25rem,14vw,7.5rem)] md:px-0 md:text-[clamp(3.25rem,14vw,7.5rem)]"
        />
      </h1>

      <p
        className="cinema-hero-rise mt-5 max-w-[28ch] text-[17px] leading-snug text-white/58 sm:text-[19px]"
        style={{ animationDelay: `${delays.tagline}ms` }}
      >
        {FEATURED.tagline}
      </p>

      <p
        className="cinema-hero-rise mt-3 text-[13px] text-white/38"
        style={{ animationDelay: `${delays.runtime}ms` }}
      >
        {FEATURED.runtime}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="cinema-hero-rise inline-flex h-11 touch-manipulation items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black transition-transform active:scale-[0.98]"
          style={{ animationDelay: `${delays.ctaPrimary}ms` }}
        >
          <PlayIcon aria-hidden="true" className="size-4 fill-current" />
          Play
        </button>
        <button
          type="button"
          className="cinema-hero-rise inline-flex h-11 touch-manipulation items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-6 text-[14px] font-medium text-white/78 transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
          style={{ animationDelay: `${delays.ctaSecondary}ms` }}
        >
          Add to Up Next
        </button>
      </div>
    </>
  );
}

function CraftFeaturePanel({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="@container overflow-hidden rounded-[1.35rem] border border-white/10 bg-[oklch(0.12_0.025_285)] shadow-[inset_0_1px_0_oklch(1_0_0/0.05)]">
      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-end gap-3 border-b border-white/8 p-5 sm:p-6 md:border-r md:border-b-0 md:p-6 lg:p-8">
          <p className="text-[13px] font-medium tracking-[0.08em] text-white/42 uppercase">
            The craft
          </p>
          <h2
            id="editorial-heading"
            className="text-balance text-[clamp(1.5rem,4.5cqi,2.25rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
          >
            Built for the big screen. Fine on your couch.
          </h2>
          <p className="text-[14px] leading-relaxed text-white/52 sm:text-[15px]">
            Hero, poster row, two still columns — same page, different speeds.
          </p>
        </div>

        <div className="max-h-[18rem] px-4x">
          <VerticalStillGallery reducedMotion={reducedMotion} className="h-full" />
        </div>
      </div>
    </div>
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
      <CinemaEntranceStyles />
      <div
        className={cn(
          sans.variable,
          sans.className,
          "min-h-svh bg-black text-white selection:bg-white/20",
        )}
      >
        {/* Hero — backdrop marquee + premiere type */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,oklch(0.28_0.08_280_/_0.55)_0%,transparent_58%),linear-gradient(to_bottom,oklch(0.12_0.02_280)_0%,black_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent"
          />

          <CinemaContent className="relative z-10 flex min-h-[min(88svh,920px)] flex-col justify-end pb-[calc(var(--demo-chrome-reserve,5rem)+2.5rem)] pt-[max(1.25rem,env(safe-area-inset-top))]">
            <HeroPremiereCopy reducedMotion={reducedMotion} />
          </CinemaContent>
        </section>

        <PremieresSection reducedMotion={reducedMotion} />

        {/* Editorial + opposing vertical still marquees */}
        <section
          className="border-t border-white/[0.06] py-16 sm:py-24"
          aria-labelledby="editorial-heading"
        >
          <CinemaContent>
            <CraftFeaturePanel reducedMotion={reducedMotion} />
          </CinemaContent>
        </section>
      </div>

      <CinemaRowNotes />
    </>
  );
}
