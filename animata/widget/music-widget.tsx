"use client";

import { Music, Music2, Music3, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

import { absoluteUrl, cn } from "@/lib/utils";

export type MusicTrack = {
  title: string;
  artist: string;
};

export type MusicWidgetProps = {
  className?: string;
  tracks?: MusicTrack[];
  coverUrl?: string;
  defaultPlaying?: boolean;
};

const DEFAULT_TRACKS: MusicTrack[] = [
  { title: "Never Gonna Give You Up", artist: "Rick Astley" },
  { title: "It Must Have Been Love", artist: "Roxette" },
  { title: "Take On Me", artist: "A-ha" },
];

export default function MusicWidget({
  className,
  tracks = DEFAULT_TRACKS,
  coverUrl = absoluteUrl("/widget/music.jpg"),
  defaultPlaying = false,
}: MusicWidgetProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(defaultPlaying);
  const safeTracks = tracks.length > 0 ? tracks : DEFAULT_TRACKS;
  const track = safeTracks[index % safeTracks.length];

  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl bg-linear-to-bl from-indigo-200 to-indigo-700 p-4 text-white shadow-md dark:from-indigo-900 dark:to-indigo-950",
        className,
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col justify-between">
        <div className="flex gap-2">
          <img src={coverUrl} alt="" className="size-20 shrink-0 rounded-2xl object-cover" />
          <div className="flex ms-auto h-fit flex-wrap justify-end gap-0.5" aria-hidden>
            <Music2
              size={16}
              className={cn("transition-all", {
                hidden: !playing,
                "animate-in zoom-in repeat-infinite direction-alternate-reverse duration-1000 delay-500":
                  playing,
              })}
            />
            <Music3
              size={14}
              className={cn("transition-all", {
                hidden: !playing,
                "animate-in zoom-in repeat-infinite direction-alternate-reverse duration-1000":
                  playing,
              })}
            />
            <Music
              size={18}
              className={cn("transition-all", {
                hidden: !playing,
                "animate-in zoom-in repeat-infinite direction-alternate-reverse duration-1000 delay-300":
                  playing,
              })}
            />
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="line-clamp-1 text-sm font-semibold leading-tight">{track.title}</p>
          <p className="line-clamp-1 text-xs font-medium text-indigo-200">{track.artist}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-evenly">
        <button
          type="button"
          aria-label="Previous track"
          className="touch-manipulation flex min-h-11 min-w-11 items-center justify-center rounded-full"
          onClick={() => setIndex((i) => (i - 1 + safeTracks.length) % safeTracks.length)}
        >
          <SkipBack className="size-5 fill-current" />
        </button>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          className="touch-manipulation flex min-h-11 min-w-11 items-center justify-center rounded-full"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? (
            <Pause className="size-6 fill-current" />
          ) : (
            <Play className="size-6 fill-current" />
          )}
        </button>
        <button
          type="button"
          aria-label="Next track"
          className="touch-manipulation flex min-h-11 min-w-11 items-center justify-center rounded-full"
          onClick={() => setIndex((i) => (i + 1) % safeTracks.length)}
        >
          <SkipForward className="size-5 fill-current" />
        </button>
      </div>
    </div>
  );
}
