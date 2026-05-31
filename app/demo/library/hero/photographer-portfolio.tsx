"use client";

import "@fontsource-variable/instrument-sans";
import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import CardStack, {
  CARD_STACK_MASK_IDS,
  type CardStackItem,
  useCardStack,
} from "@/animata/card/card-stack";
import TrailingImage from "@/animata/image/trailing-image";
import SplitReveal from "@/animata/preloader/split-reveal";
import { MapPinIcon } from "@/components/ui/map-pin";
import { SwitchCameraIcon } from "@/components/ui/switch-camera";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

import { PhotographerPortfolioNotes } from "./photographer-portfolio-notes";

const FONT = '"Instrument Sans Variable", ui-sans-serif, system-ui, sans-serif';

const CANVAS = "#fff";
const INK = "#000";
const PRINT_WIDTH = 900;
const PRINT_HEIGHT = 1125;

const lummi = (assetId: string) =>
  `https://assets.lummi.ai/assets/${assetId}?auto=format&fit=crop&w=${PRINT_WIDTH}&h=${PRINT_HEIGHT}&q=85`;

/** Wedding + event frames from https://lummi.ai — see demo notes for credits */
const LUMMI_ASSETS = {
  avatar: "QmXp6StB1i36XHbbmppop5AwtQgnyom8bYTZqPkLVNGJnk",
  portfolio: {
    vows: "QmabCfDwG7NUco1UhMnAE7NiHSK63MNKmPxAA2mc8Xrh8j",
    ceremony: "QmS6CSjJ3hc82mvhNtYGWmcAZ1coJUdEkrAVmJ6PPEH2Q3",
    reception: "QmaCT6boTGzVxo9ii5JYcnAuakoVhso3esFDA9Y58Nm7Le",
    candid: "QmY8f1t5PS7b6fVhd6R7s1AFQMVERRKmgE8gNataeweAS4",
    florals: "QmYerGQMAkWiRYDyYMwVfZQSKy8FGy2Js4G83vf1vyBGdR",
    festival: "QmZnV56e2xNN5kqUWRVMupeiUExehkWKqo5X5ewgMpA19C",
  },
  trail: [
    "QmVufjyFaAWjZYr4kdM8JLxr68EDky5V9YnwkhRbeD3jVb",
    "QmTfDd4u2rHboSjREqrmM2AX8uamVhgURW5iKAJmTpe3Rz",
    "QmcVMDiPtnnxCKgLCppm4iHQNp8L2zX8NF1xzV1Ch7nBtk",
    "QmSXefvUey7N617ro5dG1mjRXFm9iUN5uUmwBTS63DEApS",
    "QmVgzYXYEaShMjw87vVZZv1J7PjhaNKy92XY2uTrB59o9R",
    "QmcioeKGZKuCeauwteg4DEu2edo6qe3HeK99Y9FywsYk8i",
    "QmUB7fgmDhst3VZKU5R5uUkfvbcXvZ3FDKFvkNk5TkRvqD",
    "QmeL2wx9Sdw4dGPawgxUBenthP9jt8ff8Ux4uog45NL95j",
    "QmTXHjCens6Bg4Q7J4LjzU9fyKVec3t1ziqT32ShpXa93r",
    "QmV1pUNAsa1orHnyBWFWki6qZvatRQpgbQnDCVdV1EzRGd",
    "QmZAgYih2jUqmKJz4wUoTARdijpv7bveUFYrjvacV66KXp",
    "QmQMun9ag4MrBC8man7bQC9xNupf4oCufwvCj2VpU7rXDi",
  ],
} as const;

const PHOTOGRAPHER = {
  studio: "Maya Chen",
  name: "Maya",
  location: "Brooklyn",
  email: "mailto:hello@mayachen.studio",
  avatar: lummi(LUMMI_ASSETS.avatar),
};

const TRAIL_IMAGES = LUMMI_ASSETS.trail.map((id) => lummi(id));

const SHOT_SETTINGS: Record<string, { aperture: string; shutter: string; stock: string }> = {
  vows: { aperture: "2", shutter: "1/500", stock: "Portra 400" },
  ceremony: { aperture: "2.8", shutter: "1/250", stock: "Portra 160" },
  reception: { aperture: "2", shutter: "1/125", stock: "Portra 800" },
  candid: { aperture: "1.8", shutter: "1/320", stock: "Tri-X 400" },
  florals: { aperture: "4", shutter: "1/200", stock: "Ektar 100" },
  festival: { aperture: "2.8", shutter: "1/160", stock: "Portra 800" },
};

const HERO_TONE = {
  mute: "text-black/40",
  ink: "text-black",
} as const;

const PORTFOLIO: CardStackItem[] = [
  {
    id: "vows",
    image: lummi(LUMMI_ASSETS.portfolio.vows),
    title: "Vows",
    tagline: "Cliffside ceremony",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "ceremony",
    image: lummi(LUMMI_ASSETS.portfolio.ceremony),
    title: "Ceremony",
    tagline: "Church exit",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "reception",
    image: lummi(LUMMI_ASSETS.portfolio.reception),
    title: "Reception",
    tagline: "Evening dance",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "candid",
    image: lummi(LUMMI_ASSETS.portfolio.candid),
    title: "Candid",
    tagline: "Real laughter",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "florals",
    image: lummi(LUMMI_ASSETS.portfolio.florals),
    title: "Florals",
    tagline: "Bouquet detail",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "festival",
    image: lummi(LUMMI_ASSETS.portfolio.festival),
    title: "Event",
    tagline: "Summer festival",
    counts: { like: 0, comment: 0 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
];

const PRELOAD_IMAGES = [
  ...new Set([PHOTOGRAPHER.avatar, ...PORTFOLIO.map((item) => item.image), ...TRAIL_IMAGES]),
];

const HERO_MARK =
  "mx-1 inline-flex size-[clamp(1.75rem,1.286em,2.25rem)] shrink-0 items-center justify-center align-middle";

function HeroMark({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(HERO_MARK, className)} aria-hidden>
      {children}
    </div>
  );
}

function ProfileGlyph({ src, alt }: { src: string; alt: string }) {
  return (
    <span className={cn(HERO_MARK, "overflow-hidden rounded-full ring-1 ring-black/10")}>
      <img src={src} alt={alt} className="size-full object-cover" decoding="async" />
    </span>
  );
}

function HeroStory() {
  const type = "text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-[1.55] tracking-[-0.02em]";

  return (
    <div className="flex flex-col gap-[1.15em]">
      <div className={type}>
        <span className={HERO_TONE.mute}>Hi, I'm </span>
        <span className={HERO_TONE.ink}>{PHOTOGRAPHER.name}</span>
        <ProfileGlyph src={PHOTOGRAPHER.avatar} alt={PHOTOGRAPHER.studio} />
        <span className={HERO_TONE.mute}>. I shoot </span>
        <HeroMark className="text-black">
          <SwitchCameraIcon className="size-full [&_svg]:size-full" />
        </HeroMark>
        <span className={HERO_TONE.mute}> </span>
        <span className={HERO_TONE.ink}>weddings and events</span>
        <span className={HERO_TONE.mute}> in </span>
        <HeroMark className="text-black/55">
          <MapPinIcon className="size-full [&_svg]:size-full" />
        </HeroMark>
        <span className={HERO_TONE.mute}> </span>
        <span className={HERO_TONE.ink}>{PHOTOGRAPHER.location}</span>
        <span className={HERO_TONE.mute}> and capture photos you hang on the wall.</span>
      </div>

      <p className={type} style={{ textBoxTrim: "trim-both" } as CSSProperties}>
        <span className={HERO_TONE.mute}>Booking Q3. </span>
        <a
          href={PHOTOGRAPHER.email}
          className={cn(HERO_TONE.ink, "underline-offset-[4px] hover:underline")}
        >
          Send me your date.
        </a>
      </p>
    </div>
  );
}

function ViewfinderFrame() {
  const corner = "absolute size-4 border-white/80";
  return (
    <div className="pointer-events-none absolute inset-3 sm:inset-4" aria-hidden>
      <span className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.16]">
        <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white" />
        <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
      </div>
    </div>
  );
}

function PrintCaption() {
  const { activeItem } = useCardStack();
  const index = activeItem ? PORTFOLIO.findIndex((item) => item.id === activeItem.id) + 1 : 1;
  const settings = activeItem ? SHOT_SETTINGS[activeItem.id] : SHOT_SETTINGS.vows;

  if (!activeItem || !settings) {
    return null;
  }

  return (
    <figcaption
      className="relative z-10 shrink-0 border-b border-black/80 pb-3"
      style={{ backgroundColor: CANVAS }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-black">
          {activeItem.title}
        </p>
        <p className="shrink-0 text-[11px] font-medium tabular-nums tracking-[0.1em] text-black/45">
          {String(index).padStart(2, "0")}
          <span className="text-black/20">/</span>
          {String(PORTFOLIO.length).padStart(2, "0")}
        </p>
      </div>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-black/45">
        ƒ/{settings.aperture}
        <span className="px-1.5 text-black/20">·</span>
        {settings.shutter}
        <span className="px-1.5 text-black/20">·</span>
        {settings.stock}
      </p>
    </figcaption>
  );
}

const SHELL =
  "px-6 pt-6 pb-[calc(var(--demo-chrome-reserve,5rem)+1.5rem)] sm:px-10 sm:pt-10 sm:pb-[calc(var(--demo-chrome-reserve,5rem)+2.5rem)] lg:px-14 lg:pt-14 lg:pb-[calc(var(--demo-chrome-reserve,5rem)+3.5rem)]";
const PRINT_ASPECT = 5 / 4;
/** Deepest stack layer y is -7.5% of card height — reserve a little extra for motion */
const STACK_PEEK_RATIO = 0.1;

type PrintSize = { width: number; height: number; peek: number };

function computePrintSize(
  columnWidth: number,
  budgetHeight: number,
  captionHeight: number,
): PrintSize {
  const usable = Math.max(0, budgetHeight - captionHeight);
  const maxPrintHeight = usable / (1 + STACK_PEEK_RATIO);
  const height = Math.min(columnWidth * PRINT_ASPECT, maxPrintHeight);
  const width = height / PRINT_ASPECT;

  return {
    width,
    height,
    peek: height * STACK_PEEK_RATIO,
  };
}

function getPrintBudget(layoutEl: HTMLElement, stacked: boolean, columnWidth: number): number {
  if (stacked) {
    return columnWidth * PRINT_ASPECT;
  }

  const layoutRect = layoutEl.getBoundingClientRect();
  const shell = layoutEl.parentElement;
  if (!shell) {
    return layoutEl.clientHeight;
  }

  const shellRect = shell.getBoundingClientRect();
  const padBottom = Number.parseFloat(getComputedStyle(shell).paddingBottom);
  const visibleBottom = shellRect.bottom - padBottom;
  const visibleHeight = Math.max(0, visibleBottom - layoutRect.top);

  return Math.min(layoutEl.clientHeight, visibleHeight);
}

function usePrintSize(
  layoutRef: RefObject<HTMLElement | null>,
  columnRef: RefObject<HTMLElement | null>,
  captionRef: RefObject<HTMLElement | null>,
) {
  const [printSize, setPrintSize] = useState<PrintSize>({ width: 0, height: 0, peek: 0 });

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    const column = columnRef.current;
    if (!layout || !column) return;

    const measure = () => {
      const columnWidth = column.clientWidth;
      if (columnWidth <= 0) return;

      const captionHeight = captionRef.current?.offsetHeight ?? 0;
      const stacked = window.matchMedia("(max-width: 767px)").matches;

      if (stacked) {
        const height = columnWidth * PRINT_ASPECT;
        setPrintSize({
          width: columnWidth,
          height,
          peek: height * STACK_PEEK_RATIO,
        });
        return;
      }

      const budgetHeight = getPrintBudget(layout, false, columnWidth);
      setPrintSize(computePrintSize(columnWidth, budgetHeight, captionHeight));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(layout);
    observer.observe(column);
    if (captionRef.current) observer.observe(captionRef.current);

    return () => observer.disconnect();
  }, [captionRef, columnRef, layoutRef]);

  return printSize;
}

function PrintProof({
  stackRef,
  captionRef,
  printSize,
  stacked,
}: {
  stackRef: RefObject<HTMLElement | null>;
  captionRef: RefObject<HTMLDivElement | null>;
  printSize: PrintSize;
  stacked: boolean;
}) {
  const ready = printSize.width > 0 && printSize.height > 0;

  return (
    <figure
      ref={stackRef}
      className={cn("flex w-full min-w-0 shrink-0 flex-col", !stacked && "md:ml-auto")}
      style={!stacked && ready ? { width: printSize.width } : undefined}
    >
      <div
        ref={captionRef}
        className="relative z-30 w-full shrink-0"
        style={{ backgroundColor: CANVAS }}
      >
        <PrintCaption />
      </div>

      <div
        aria-hidden="true"
        className="w-full shrink-0"
        style={{ aspectRatio: `${4 / (STACK_PEEK_RATIO * 5)}` }}
      />

      <div
        className={cn(
          "relative w-full shrink-0 overflow-visible",
          stacked ? "aspect-[4/5]" : "md:ml-auto",
        )}
        style={!stacked && ready ? { width: printSize.width, height: printSize.height } : undefined}
      >
        <CardStack.Frame className="absolute inset-0 overflow-visible">
          <CardStack.LiveRegion />
          <CardStack.Trigger
            aria-label="Show next photo"
            className="absolute inset-0 block text-left"
          >
            <CardStack.Viewport className="size-full overflow-visible !min-h-0 !pt-0">
              <CardStack.List>
                {(item, index, layer) => (
                  <CardStack.Card
                    key={item.id}
                    layer={layer}
                    stackIndex={index}
                    className="!inset-x-0 !top-0 !h-fit !w-full gap-0 overflow-visible rounded-none !bg-transparent p-0 shadow-none ring-0"
                  >
                    <figure className="relative aspect-[4/5] size-full overflow-hidden bg-black/5">
                      <img
                        src={item.image}
                        alt={`${PHOTOGRAPHER.studio} — ${item.title}`}
                        width={PRINT_WIDTH}
                        height={PRINT_HEIGHT}
                        decoding="async"
                        draggable={false}
                        className="size-full object-cover object-center"
                      />
                      {index === 0 ? <ViewfinderFrame /> : null}
                    </figure>
                  </CardStack.Card>
                )}
              </CardStack.List>
            </CardStack.Viewport>
          </CardStack.Trigger>
        </CardStack.Frame>
      </div>
    </figure>
  );
}

function PortfolioLayout({
  layoutRef,
  stackRef,
  heroRef,
  captionRef,
}: {
  layoutRef: RefObject<HTMLDivElement | null>;
  stackRef: RefObject<HTMLElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
  captionRef: RefObject<HTMLDivElement | null>;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const stacked = useMediaQuery("(max-width: 767px)");
  const printSize = usePrintSize(layoutRef, columnRef, captionRef);

  return (
    <div
      ref={layoutRef}
      className={cn(
        "flex flex-col gap-8",
        "md:min-h-0 md:flex-1 md:flex-row md:items-end md:justify-start md:gap-6 md:h-full",
      )}
    >
      <div ref={heroRef} className="relative z-20 min-w-0 md:flex-[2] md:basis-0">
        <HeroStory />
      </div>

      <div ref={columnRef} className="w-full min-w-0 md:col-start-2 md:flex-[3] md:basis-0">
        <PrintProof
          stackRef={stackRef}
          captionRef={captionRef}
          printSize={printSize}
          stacked={stacked}
        />
      </div>
    </div>
  );
}

export default function PhotographerPortfolio() {
  const shellRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <section
        className="relative isolate min-h-svh overflow-x-hidden overflow-y-auto md:h-svh md:overflow-hidden"
        style={{ backgroundColor: CANVAS, color: INK, fontFamily: FONT }}
      >
        <TrailingImage
          edgeToEdge
          layerOnly
          contained
          className="z-10 isolate"
          images={TRAIL_IMAGES}
          threshold={88}
          maxTrailZIndex={12}
          excludeRefs={[heroRef, captionRef]}
        />

        <CardStack items={PORTFOLIO} depth={3} autoplay={preloaderDone} autoplayInterval={4500}>
          <div
            ref={shellRef}
            className={cn(
              "relative z-20 isolate mx-auto flex w-full max-w-[92rem] flex-col md:h-full md:min-h-0 md:flex-1",
              SHELL,
            )}
          >
            <PortfolioLayout
              layoutRef={layoutRef}
              stackRef={stackRef}
              heroRef={heroRef}
              captionRef={captionRef}
            />
          </div>
        </CardStack>
      </section>

      <SplitReveal
        images={PRELOAD_IMAGES}
        backgroundColor={CANVAS}
        foregroundColor={INK}
        zIndex={120}
        lockScroll
        onComplete={() => setPreloaderDone(true)}
        renderProgress={({ loaded, total, progress }) => (
          <>
            <SplitReveal.ProgressTrack progress={progress} foregroundColor={INK} />
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-black/45">
              Loading frames
              <span className="px-1.5 text-black/20">·</span>
              {String(loaded).padStart(2, "0")}
              <span className="text-black/20">/</span>
              {String(total).padStart(2, "0")}
            </p>
          </>
        )}
      />

      <PhotographerPortfolioNotes />
    </>
  );
}
