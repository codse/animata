import { cn } from "@/lib/utils";

export interface Collaborator {
  name: string;
  /** Tailwind background class for the pill. */
  pill: string;
  /** Tailwind text class for the pill label. */
  pillText?: string;
  /** Tailwind text color class for the cursor (sets `color`, used by SVG `fill`). */
  cursor: string;
}

export interface CollabCardProps {
  greeting?: string;
  eyebrow?: string;
  intro?: string;
  conjunction?: string;
  trailing?: string;
  /** Status line beside the live dot, e.g. `live · 4 editing`. */
  liveLabel?: string;
  /** Swatch colors for the visible avatar stack (left → right). */
  presenceColors?: string[];
  /** Additional editors not shown as swatches — renders as `+N` on the stack. */
  extraCount?: number;
  collaborators?: [Collaborator, Collaborator];
  /** Optional background image URL. Falls back to a dark canvas gradient. */
  backgroundUrl?: string;
  className?: string;
}

const defaultCollaborators: [Collaborator, Collaborator] = [
  {
    name: "Dylan",
    pill: "bg-[#A259FF]",
    pillText: "text-white",
    cursor: "text-[#A259FF]",
  },
  {
    name: "Evan",
    pill: "bg-[#FF7262]",
    pillText: "text-white",
    cursor: "text-[#FF7262]",
  },
];

const defaultPresenceColors = ["#A259FF", "#FF7262", "#1ABCFE", "#0ACF83"];

function PresenceStack({
  colors,
  extraCount,
  className,
}: {
  colors: string[];
  extraCount: number;
  className?: string;
}) {
  const overlap = "-ml-[1.08cqi]";

  return (
    <ul className={cn("m-0 flex list-none items-center p-0", className)} aria-hidden="true">
      {colors.map((color, index) => (
        <li
          key={`${color}-${index}`}
          className={cn("relative size-[3.25cqi] shrink-0", index > 0 && overlap)}
          style={{ zIndex: index + 1 }}
        >
          <span
            className="block size-full rounded-full ring-2 ring-[#0e0e12] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            style={{ backgroundColor: color }}
          />
        </li>
      ))}
      {extraCount > 0 ? (
        <li
          className={cn("relative size-[3.25cqi] shrink-0", overlap)}
          style={{ zIndex: colors.length + 1 }}
        >
          <span
            className={cn(
              "flex size-full items-center justify-center rounded-full ring-2 ring-[#0e0e12]",
              "bg-[oklch(0.26_0.012_285)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
              "font-(family-name:--font-mono) text-[1.65cqi] font-medium leading-none tabular-nums tracking-tight text-white/88",
            )}
          >
            +{extraCount}
          </span>
        </li>
      ) : null}
    </ul>
  );
}

function Cursor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[6.5cqi] w-[6.5cqi] drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]", className)}
    >
      <path
        d="M4 3.2 L4 19.4 L8.6 15.2 L11.4 21.2 L14 20 L11.2 14 L17.2 13.6 Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClickBurst({ className }: { className?: string }) {
  return (
    <span
      data-burst=""
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inline-block h-[3cqi] w-[3cqi]",
        "before:absolute before:inset-[35%] before:rounded-full before:bg-current",
        "after:absolute after:inset-0 after:rounded-full",
        "after:bg-[conic-gradient(from_0deg,transparent_0_8%,currentColor_8%_12%,transparent_12%_33%,currentColor_33%_37%,transparent_37%_58%,currentColor_58%_62%,transparent_62%_83%,currentColor_83%_87%,transparent_87%)]",
        "after:mask-[radial-gradient(circle,transparent_38%,black_40%,black_60%,transparent_62%)]",
        className,
      )}
    />
  );
}

export default function CollabCard({
  greeting = "hello!",
  eyebrow = "Now in multiplayer",
  intro = "editing",
  conjunction = "&",
  trailing = "",
  liveLabel = "Live · 4 editing",
  presenceColors = defaultPresenceColors,
  extraCount = 2,
  collaborators = defaultCollaborators,
  backgroundUrl,
  className,
}: CollabCardProps) {
  const [first, second] = collaborators;

  return (
    <div
      className={cn(
        "group/collab relative isolate aspect-3/2 w-full overflow-hidden rounded-2xl",
        "bg-[#111114] text-white shadow-xl ring-1 ring-white/10",
        "@container",
        className,
      )}
      style={
        backgroundUrl
          ? {
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {!backgroundUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(165deg,#18181f_0%,#0c0c10_55%,#09090c_100%)]"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_18%_88%,color-mix(in_oklch,#A259FF_42%,transparent)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_88%_22%,color-mix(in_oklch,#FF7262_32%,transparent)_0%,transparent_68%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] bg-[radial-gradient(rgba(255,255,255,0.32)_1px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_88%)]"
      />

      <header className="absolute inset-x-[5cqi] top-[4cqi] z-10 flex items-center justify-between gap-[2cqi]">
        <span className="flex min-w-0 items-center gap-[1.4cqi] text-[2.4cqi] font-medium leading-none tracking-tight text-white/75">
          <span className="relative inline-flex h-[1.7cqi] w-[1.7cqi] shrink-0">
            <span className="collab-live-ping absolute inset-0 rounded-full bg-emerald-400/70" />
            <span className="relative inline-block h-full w-full rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.75)]" />
          </span>
          <span className="truncate tabular-nums">{liveLabel}</span>
        </span>
        <PresenceStack colors={presenceColors} extraCount={extraCount} />
      </header>

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-[3.2cqi] px-[5.5cqi] pb-[5cqi] pt-[9cqi]">
        <p className="max-w-[88%] text-center text-[2.75cqi] font-medium leading-snug tracking-tight text-[#0D99FF]">
          {eyebrow}
        </p>

        <div className="relative w-[80%] max-w-full">
          <div className="relative grid place-items-center rounded-[1.8cqi] border-2 border-dashed border-[#0D99FF]/75 px-[5.5cqi] py-[4.2cqi]">
            {[
              "-left-[0.9cqi] -top-[0.9cqi]",
              "-right-[0.9cqi] -top-[0.9cqi]",
              "-left-[0.9cqi] -bottom-[0.9cqi]",
              "-right-[0.9cqi] -bottom-[0.9cqi]",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={cn(
                  "absolute h-[1.7cqi] w-[1.7cqi] rounded-[0.25cqi] bg-[#111114] ring-[1.5px] ring-[#0D99FF] shadow-[0_2px_4px_rgba(0,0,0,0.35)]",
                  pos,
                )}
              />
            ))}
            <h2 className="font-(family-name:--font-display) text-[17.5cqi] font-medium leading-[0.92] tracking-[-0.035em] text-white">
              {greeting}
            </h2>
          </div>

          <span
            aria-hidden="true"
            className="collab-cursor collab-cursor--host pointer-events-none absolute left-[-2.8cqi] top-[-3.6cqi] text-white"
          >
            <Cursor />
          </span>
        </div>

        <p className="flex max-w-full flex-wrap items-baseline justify-center gap-x-[1.5cqi] gap-y-[1.2cqi] text-[3.85cqi] font-medium leading-none tracking-tight text-white/95">
          <span className="text-white/80">{intro}</span>

          <span className="relative inline-flex items-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] font-semibold leading-none",
                first.pill,
                first.pillText ?? "text-white",
              )}
            >
              {first.name}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "collab-cursor collab-cursor--first pointer-events-none absolute bottom-[-2.9cqi] right-[-1.8cqi]",
                first.cursor,
              )}
            >
              <Cursor className="-scale-x-100" />
              <ClickBurst className="right-[-0.7cqi] top-[-0.7cqi]" />
            </span>
          </span>

          <span className="text-white/55">{conjunction}</span>

          <span className="relative inline-flex items-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] font-semibold leading-none",
                second.pill,
                second.pillText ?? "text-white",
              )}
            >
              {second.name}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "collab-cursor collab-cursor--second pointer-events-none absolute right-[-2.8cqi] top-[-3.2cqi]",
                second.cursor,
              )}
            >
              <Cursor />
              <ClickBurst className="bottom-[-0.7cqi] left-[-0.7cqi]" />
            </span>
          </span>

          {trailing ? <span className="text-white/80">{trailing}</span> : null}
        </p>
      </div>

      <style>{`
        .collab-cursor {
          display: inline-block;
          transform-origin: 20% 20%;
          will-change: transform;
          animation-fill-mode: both;
        }
        .collab-cursor--host    { animation: collab-host   9s ease-in-out infinite; }
        .collab-cursor--first   { animation: collab-first  5.5s ease-in-out infinite; }
        .collab-cursor--second  { animation: collab-second 5.5s ease-in-out infinite 0.8s; }

        .collab-cursor [data-burst] {
          opacity: 0;
          animation: collab-burst 5.5s ease-in-out infinite;
          animation-fill-mode: both;
        }
        .collab-cursor--first  [data-burst] { animation-delay: 1.1s; }
        .collab-cursor--second [data-burst] { animation-delay: 2.7s; }

        .collab-live-ping { animation: collab-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite; }

        @keyframes collab-host {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-14deg); }
          22%      { transform: translate3d(54cqi, 2cqi, 0) rotate(-4deg); }
          48%      { transform: translate3d(56cqi, 19cqi, 0) rotate(10deg); }
          72%      { transform: translate3d(-1cqi, 21cqi, 0) rotate(-2deg); }
        }

        @keyframes collab-first {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          30%      { transform: translate3d(-1.2cqi, -1cqi, 0) rotate(-5deg); }
          60%      { transform: translate3d(0.8cqi, 0.6cqi, 0) rotate(3deg); }
        }
        @keyframes collab-second {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          35%      { transform: translate3d(1.4cqi, -0.8cqi, 0) rotate(6deg); }
          65%      { transform: translate3d(-0.6cqi, 0.6cqi, 0) rotate(-3deg); }
        }

        @keyframes collab-burst {
          0%, 14%   { opacity: 0; transform: scale(0.4); }
          22%       { opacity: 1; transform: scale(1); }
          34%, 100% { opacity: 0; transform: scale(1.5); }
        }

        @keyframes collab-ping {
          0%       { transform: scale(1);   opacity: 0.7; }
          75%, 100%{ transform: scale(2.4); opacity: 0;   }
        }

        @media (prefers-reduced-motion: reduce) {
          .collab-cursor,
          .collab-cursor [data-burst],
          .collab-live-ping {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
