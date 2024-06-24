"use client";

import { useEffect, useState } from "react";
import { Circle, Triangle } from "lucide-react";

import { cn } from "@/lib/utils";

interface Team {
  score: number;
  win: number;
  name: string;
  icon: string;
}

interface GameInfo {
  teamOne: Team;
  teamTwo: Team;
  lap: number;
}

// #region placeholder functions
const maxScore = 10;
const lapCount = 5;

const getScore = (lastScore?: GameInfo): GameInfo => {
  const teamOneScore = (lastScore?.teamOne.score ?? 0) + Math.floor(Math.random() * 3) + 1;
  const teamTwoScore = (lastScore?.teamTwo.score ?? 0) + Math.floor(Math.random() * 3) + 1;

  return {
    lap: (lastScore?.lap ?? 1) + 1,
    ...lastScore,
    teamOne: {
      icon: "🇳🇵",
      name: "NPL",
      score: teamOneScore % maxScore,
      win:
        teamOneScore >= maxScore ? (lastScore?.teamOne.win ?? 0) + 1 : lastScore?.teamOne.win ?? 0,
    },
    teamTwo: {
      name: "USA",
      icon: "🇺🇸",
      score: teamTwoScore % maxScore,
      win:
        teamTwoScore >= maxScore ? (lastScore?.teamTwo.win ?? 0) + 1 : lastScore?.teamTwo.win ?? 0,
    },
  };
};

// #endregion

const Header = ({ game }: { game: GameInfo }) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex gap-1">
      <div className="h-6 w-6">{game.teamOne.icon}</div>
      <p className="font-bold">{game.teamOne.name}</p>
    </div>
    <div className="flex gap-1">
      <p className="font-bold">{game.teamTwo.name}</p>
      <div className="h-6 w-6">{game.teamTwo.icon}</div>
    </div>
  </div>
);

const Score = ({ score }: { score: string }) => (
  <div className="relative flex h-20 w-10 items-center justify-center rounded-lg border-4 border-black bg-neutral-800">
    <p className="text-5xl font-semibold">{score}</p>
    <div className="absolute w-full border border-black"></div>
  </div>
);

const Diamond = ({ style }: { style: string }) => (
  <div className={cn("absolute h-1.5 w-1.5 rotate-45 transform bg-gray-500", style)} />
);

export default function LiveScore() {
  // #region state
  const [game, updateGame] = useState<GameInfo>({
    teamOne: {
      score: Math.floor(Math.random() * maxScore),
      win: Math.floor(Math.random() * 3),
      name: "NPL",
      icon: "🇳🇵",
    },
    teamTwo: {
      score: Math.floor(Math.random() * maxScore),
      win: Math.floor(Math.random() * 3),
      name: "USA",
      icon: "🇺🇸",
    },
    lap: Math.floor(Math.random() * 3) + 1,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const updateScore = () => {
      const now = new Date();
      const secondsUntilNextMinute = 60 - now.getSeconds();
      timer = setTimeout(updateScore, secondsUntilNextMinute * 1000);
      updateGame((current) => {
        const next = getScore(current);
        if (next.lap === lapCount) {
          clearTimeout(timer);
        }
        return next;
      });
    };

    updateScore();

    return () => clearTimeout(timer);
  }, []);

  // #endregion

  return (
    <div className="group flex size-52 flex-col rounded-3xl bg-zinc-800 text-white">
      <Header game={game} />
      <div className="flex w-full flex-1 items-center justify-center gap-2 px-4">
        <div className="flex">
          <Score score={String(game.teamOne.score).padStart(2, "0").charAt(0)} />
          <Score score={String(game.teamOne.score).padStart(2, "0").charAt(1)} />
        </div>
        <div className="flex">
          <Score score={String(game.teamTwo.score).padStart(2, "0").charAt(0)} />
          <Score score={String(game.teamTwo.score).padStart(2, "0").charAt(1)} />
        </div>
      </div>

      <div className="relative h-14 overflow-hidden rounded-b-3xl bg-zinc-950 text-white">
        <div className="flex h-14 items-center justify-around overflow-hidden p-4 font-medium transition-all group-hover:-translate-y-full">
          <div className="flex items-center gap-1 tabular-nums">
            <Triangle fill="white" size={6} />
            <p>
              {game.lap}
              <sup>{["st", "nd", "rd"][game.lap - 1] ?? "th"}</sup>
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-3 w-3">
              <Diamond style="bg-yellow-500 -top-1/4 left-1/4 " />
              <Diamond style="-left-1/4 top-1/4 " />
              <Diamond style="-right-1/4 top-1/4 " />
            </div>
            <div className="flex pt-1">
              <Circle size={8} fill="white" />
              <Circle size={8} color="grey" />
              <Circle size={8} color="grey" />
            </div>
          </div>
          <div className="tabular-nums">
            {game.teamOne.win} - {game.teamTwo.win}
          </div>
        </div>
        <div className="flex h-14 items-center justify-center bg-green-500 text-sm transition-all group-hover:-translate-y-full">
          Some other information.
        </div>
      </div>
    </div>
  );
}
