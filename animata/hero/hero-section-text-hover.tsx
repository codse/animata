import React from "react";
import { Map } from "lucide-react";

interface DestinationProps {
  emoji: string;
  position: string;
}

interface TreasureProps {
  emoji: string;
  position: string;
}

interface HeroCardProps {
  destinations?: DestinationProps[];
  treasures?: TreasureProps[];
}

const HeroSectionTextHover: React.FC<HeroCardProps> = () => {
  const destinations: DestinationProps[] = [
    {
      emoji: "🪂",
      position:
        "-left-20 top-3 group-hover:-rotate-[10deg] group-hover:-translate-y-12 md:-left-28 md:-top-2 sm:-left-24",
    },
    {
      emoji: "🏖️",
      position:
        "-left-[72px] top-0 group-hover:-rotate-[20deg] group-hover:-translate-x-10 md:-left-[135px] md:-top-2 sm:-left-24 ",
    },
    {
      emoji: "🚁",
      position:
        "left-[150px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10 md:left-[210px] md:-top-1 sm:left-[180px]",
    },
    {
      emoji: "🏯",
      position:
        "left-[105px] top-0 group-hover:rotate-[20deg] group-hover:translate-x-16 md:left-[190px] md:-top-2 sm:left-[150px]",
    },
  ];

  const treasures: TreasureProps[] = [
    {
      emoji: "🦝",
      position:
        "-left-[100px] -top-7 -rotate-[30deg] group-hover:-translate-y-8 md:-left-40 md:-top-16 sm:-left-32",
    },
    {
      emoji: "🍜",
      position: "-left-[115px] -top-2 group-hover:-rotate-45 md:-left-44 md:-top-1 sm:-left-36",
    },
    {
      emoji: "🏝️",
      position:
        "left-32 -top-12 rotate-[30deg] md:left-[200px] md:-top-[70px] sm:left-[175px] sm:-top-12",
    },
    {
      emoji: "💎",
      position:
        "left-32 -top-2 group-hover:rotate-[45deg] md:left-[200px] md:-top-1 sm:left-[160px] ",
    },
  ];

  return (
    <div className="relative min-h-[100px] w-full rounded-2xl border-2 border-gray-300 md:min-h-[200px]">
      <div className="mb-2 flex cursor-pointer flex-col items-center justify-center gap-3">
        <div className="text-normal flex flex-col items-center justify-center p-5 font-bold sm:text-xl md:text-2xl">
          <div className="mt-5">
            <Map size={40} className="fill-zinc-900 text-white" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">Embark on</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-sky-400">Uncharted Adventures</span>
              <div className="duration-400 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                {destinations.map((dest, index) => (
                  <span
                    key={index}
                    className={`absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl ${dest.position}`}
                    role="img"
                  >
                    {dest.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">and</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-orange-500">Feel Alive</span>
              <div className="duration-400 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                {treasures.map((gem, index) => (
                  <span
                    key={index}
                    className={`absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl ${gem.position}`}
                    role="img"
                  >
                    {gem.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="rounded-3xl bg-orange-400 px-4 py-2 font-mono tracking-tighter hover:bg-orange-500">
          Begin your journey
        </button>
      </div>
    </div>
  );
};

export default HeroSectionTextHover;
