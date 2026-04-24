"use client";

import Marquee from "@/animata/container/marquee";
import Counter, { Formatter } from "@/animata/text/counter";

// All 44 contributors
const avatars = [
  "17984567",
  "61934354",
  "23572874",
  "61041540",
  "49699333",
  "68807624",
  "77476239",
  "92267442",
  "62237284",
  "69517192",
  "133476557",
  "112865144",
  "145477397",
  "139417149",
  "93651229",
  "107368860",
  "137415649",
  "32596297",
  "71210624",
  "65100859",
  "34545177",
  "128136597",
  "25669767",
  "96635567",
  "47138518",
  "72538480",
  "42187710",
  "91338035",
  "46356108",
  "129254413",
  "52288761",
  "136047863",
  "145032457",
  "115262737",
  "153370098",
  "101992909",
  "161845983",
  "16984453",
  "59354376",
  "59029978",
  "112597601",
  "121259738",
  "104253746",
  "39653112",
];

function Avatar({ id }: { id: string }) {
  return (
    <img
      src={`https://avatars.githubusercontent.com/u/${id}?v=4&s=64`}
      alt=""
      loading="lazy"
      className="h-8 w-8 border border-border sm:h-10 sm:w-10"
      style={{
        clipPath: "url(#squircle)",
      }}
    />
  );
}

/* Inline SVG squircle clip path — iOS-style superellipse */
function SquircleClipDef() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath id="squircle" clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0 C 0.83 0, 1 0.17, 1 0.5 C 1 0.83, 0.83 1, 0.5 1 C 0.17 1, 0 0.83, 0 0.5 C 0 0.17, 0.17 0, 0.5 0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <div className="text-center">
      <div className="font-(family-name:--font-mono) text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl">
        <Counter
          targetValue={value}
          direction="up"
          delay={delay}
          format={Formatter.number}
          className="font-(family-name:--font-mono) font-bold tabular-nums"
        />
      </div>
      <p className="mt-1 text-[13px] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function OpenSourceSection() {
  return (
    <section className="border-t border-border py-20 sm:py-24 lg:py-32">
      <SquircleClipDef />
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-(family-name:--font-display) text-[clamp(28px,5vw,44px)] leading-[1] text-foreground">
            Open source.
            <br />
            <span className="text-muted-foreground">Community driven.</span>
          </h2>
          <p className="mx-auto mt-4 text-balance max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Built by a growing community of developers who believe interfaces should feel alive.
          </p>
        </div>
      </div>

      {/* Marquee row 1 — all contributors, forward */}
      <div className="mt-12 sm:mt-14">
        <Marquee pauseOnHover applyMask={false} className="[--duration:60s]">
          {avatars.map((id) => (
            <Avatar key={id} id={id} />
          ))}
        </Marquee>
      </div>

      {/* Stats */}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4 sm:py-12">
        <Stat value={2506} label="Stars" delay={0} />
        <Stat value={196} label="Forks" delay={100} />
        <Stat value={44} label="Contributors" delay={200} />
        <Stat value={194} label="Components" delay={300} />
      </div>

      {/* Marquee row 2 — all contributors, reversed order + direction */}
      <div>
        <Marquee reverse pauseOnHover applyMask={false} className="[--duration:65s]">
          {[...avatars].reverse().map((id) => (
            <Avatar key={id} id={id} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
