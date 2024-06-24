"use client";

import { useState } from "react";
import { Music, Music2, Music3, Pause, Play, SkipBack, SkipForward } from "lucide-react";

import { absoluteUrl, cn } from "@/lib/utils";

const songs = [
  {
    title: "Never gonna give you up",
    artist: "Rick Astley",
  },
  {
    title: "It must have been love",
    artist: "Roxette",
  },
  {
    title: "Take on me",
    artist: "A-ha",
  },
];

export default function MusicWidget() {
  const [currentSong, setCurrentSong] = useState(0);
  const [play, setPlay] = useState(false);

  const handleClick = () => {
    setPlay((prevValue) => !prevValue);
  };

  const handleNext = () => {
    setCurrentSong((prevValue) => (prevValue + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSong((prevValue) => (prevValue - 1 + songs.length) % songs.length);
  };

  const song = songs[currentSong];
  const { title, artist } = song;

  return (
    <div className="flex h-52 w-52 flex-col rounded-3xl bg-gradient-to-bl from-indigo-200 to-indigo-600 p-4 text-white">
      <div className="relative flex flex-1 flex-col justify-between">
        <div className="flex">
          <div className="flex-1">
            <img
              src={absoluteUrl("/widget/music.jpg")}
              alt="Album Pic"
              className="h-20 w-20 rounded-2xl"
            />
          </div>
          <div className={cn("flex h-fit w-12 flex-wrap justify-center gap-1")}>
            <Music2
              size={16}
              className={cn("text-white transition-all", {
                hidden: !play,
                "delay-500 duration-1000 animate-in zoom-in direction-alternate-reverse repeat-infinite":
                  play,
              })}
            />
            <Music3
              size={14}
              className={cn("text-white transition-all", {
                hidden: !play,
                "duration-1000 animate-in zoom-in direction-alternate-reverse repeat-infinite":
                  play,
              })}
            />
            <Music
              size={18}
              className={cn("text-white transition-all", {
                hidden: !play,
                "delay-300 duration-1000 animate-in zoom-in direction-alternate-reverse repeat-infinite":
                  play,
              })}
            />
          </div>
        </div>
        <p title={title} className="line-clamp-1 w-full text-lg font-bold leading-none">
          {title}
        </p>
        <p
          title={artist}
          className="-mt-6 line-clamp-1 text-xs font-semibold leading-none text-indigo-300"
        >
          {artist}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-evenly">
        <SkipBack
          size={20}
          className="cursor-pointer fill-white text-white hover:fill-gray-100 hover:text-gray-100 active:fill-gray-200 active:text-gray-200"
          onClick={handlePrev}
        />
        <div onClick={handleClick}>
          {!play ? (
            <Play
              size={25}
              className="cursor-pointer fill-white text-white hover:fill-gray-100 hover:text-gray-100 active:fill-gray-200 active:text-gray-200"
            />
          ) : (
            <Pause
              size={25}
              className="cursor-pointer fill-white text-white hover:fill-gray-100 hover:text-gray-100 active:fill-gray-200 active:text-gray-200"
            />
          )}
        </div>
        <SkipForward
          size={25}
          className="cursor-pointer fill-white text-white hover:fill-gray-100 hover:text-gray-100 active:fill-gray-200 active:text-gray-200"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
