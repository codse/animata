import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface SurveyCardProps {
  /**
   * The items to display in the Survey.
   * Each item should have a vote and itemName.
   */
  items: {
    vote: number;
    itemName?: string;
  }[];
  /**
   * The width of the Survey. recommended to use with more than 250px
   */
  width?: number;
  /**
   * The title of the Survey.
   */
  surveyTitle?: string;
}

export default function SurveyCard({ items, width: providedWidth, surveyTitle }: SurveyCardProps) {
  const [{ width }, setSize] = useState({
    width: providedWidth ?? 250,
  });
  const [totalVotes, setTotalVotes] = useState(0);
  const [maxVote, setMaxVote] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalVotes(items.reduce((acc, item) => acc + item.vote, 0));
    setMaxVote(Math.max(...items.map((item) => item.vote)));
    setSize({
      width: providedWidth ?? containerRef.current?.offsetWidth ?? 250,
    });
  }, [providedWidth, items]);

  const [isParentHovered, setIsParentHovered] = useState(false);

  const handleParentMouseOver = () => {
    setIsParentHovered(true);
  };

  const handleParentMouseOut = () => {
    setIsParentHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative box-border flex w-full flex-col items-start gap-4 overflow-hidden p-2",
      )}
      style={{ width }}
      onMouseOver={handleParentMouseOver}
      onMouseOut={handleParentMouseOut}
    >
      <div className="flex w-full justify-start">
        <h1 className="text-2xl font-bold">{surveyTitle}</h1>
      </div>
      {items.map((item, index) => {
        const clampedProgress = Math.max(0, item.vote);
        // saving overflow over itemName using 8/12
        const barWidth = isParentHovered ? ((clampedProgress / totalVotes) * 100 * 8) / 12 : 30;
        return (
          <div
            key={`survey-item-${index}`}
            className={cn("flex w-full items-center justify-between")}
          >
            <div
              className={cn(
                "flex h-6 justify-start rounded-full",
                !isParentHovered
                  ? "animate-pulse bg-slate-300"
                  : maxVote === item.vote
                    ? "bg-green-600"
                    : "bg-slate-400",
              )}
              style={{ width: `${barWidth}%` }}
            />
            <div className="flex h-6 w-3/12 justify-end">
              <span className="text-xl text-black">{item.itemName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
