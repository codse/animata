"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import {
  Circle,
  LogOut,
  Maximize,
  Maximize2,
  Mic,
  Monitor,
  Slash,
  Square,
  VideoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Hills from "@/public/bg-hills.jpg";
import Music from "@/public/widget/music.jpg";

interface SquareDivProps {
  bgColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface ImageSlotProps {
  minimize: boolean;
  imageSource: StaticImageData;
  imageAlternate: string;
}

interface ControlIconStateProps {
  iconState: {
    Mic: boolean;
    Screen: boolean;
    Video: boolean;
  };
  toggleIconState: (icon: keyof ControlIconStateProps["iconState"]) => void;
}

function SquareDiv({ bgColor = "bg-green-600", children, onClick }: SquareDivProps) {
  return (
    <div
      className={cn("flex h-6 w-6 cursor-pointer items-center justify-center rounded-md", bgColor)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ImageSlot({ minimize, imageSource, imageAlternate }: ImageSlotProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={cn(minimize ? "h-48 w-full" : "h-56 w-56")}
    >
      <img
        src={imageSource.src}
        alt={imageAlternate}
        className={cn("h-full w-full object-cover", minimize ? "rounded-xl" : "rounded-3xl")}
      />
    </motion.div>
  );
}

function YourImageSlot({ minimize, imageSource, imageAlternate }: ImageSlotProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={cn(minimize ? "absolute bottom-2 right-0 h-20 w-20" : "h-56 w-56")}
    >
      <img
        src={imageSource.src}
        alt={imageAlternate}
        className={cn("h-full w-full object-cover", minimize ? "rounded-xl" : "rounded-3xl")}
      />
    </motion.div>
  );
}
function ControlIconState({ iconState, toggleIconState }: ControlIconStateProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <SquareDiv onClick={() => toggleIconState("Mic")}>
        <Mic size={18}>{iconState.Mic && <Slash />}</Mic>
      </SquareDiv>
      <SquareDiv bgColor="bg-slate-400" onClick={() => toggleIconState("Screen")}>
        <Monitor size={18}>{iconState.Screen && <Slash />}</Monitor>
      </SquareDiv>
      <SquareDiv onClick={() => toggleIconState("Video")}>
        <VideoIcon fill="white" size={18}>
          {iconState.Video && <Slash />}
        </VideoIcon>
      </SquareDiv>
      <SquareDiv bgColor="bg-red-600">
        <LogOut size={18} />
      </SquareDiv>
    </div>
  );
}

const persons = [
  {
    title: "Ram",
    image: Music,
  },
  {
    title: "Rick",
    image: Hills,
  },
  {
    title: "Alex",
    image: Hills,
  },
];

export default function VideoChat() {
  const [minimize, setMinimize] = useState(false);
  const [iconState, setIconState] = useState({
    Mic: false,
    Screen: true,
    Video: false,
  });
  const width = minimize ? "max-w-52" : "max-w-[480px]";

  const toggleIconState = (icon: keyof typeof iconState) => {
    setIconState((prevState) => ({
      ...prevState,
      [icon]: !prevState[icon],
    }));
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={cn(
        "mx-auto select-none bg-gray-700 text-white",
        width,
        minimize ? "rounded-xl" : "rounded-3xl",
      )}
    >
      <div className="flex items-center justify-between rounded-lg px-4 py-2">
        <div className="flex items-center gap-1">
          <Circle fill="red" stroke="none" size={14} />
          <Circle fill="yellow" stroke="none" size={14} />
          <Circle fill="green" stroke="none" size={14} />
        </div>
        {!minimize && <ControlIconState iconState={iconState} toggleIconState={toggleIconState} />}
        <div className="flex items-center gap-2">
          <button onClick={() => setMinimize(!minimize)}>
            {minimize ? (
              <div className="relative flex">
                <Maximize size={16} />
                <Maximize2 className="absolute" size={16} />
              </div>
            ) : (
              <div className="relative flex">
                <Square size={14} />
                <Square className="absolute -bottom-[1px] -left-[1px]" fill="white" size={10} />
              </div>
            )}
          </button>
          <div className="flex gap-1">
            <Circle fill="white" size={6} />
            <Circle fill="white" size={6} />
            <Circle fill="white" size={6} />
          </div>
        </div>
      </div>
      <motion.div
        layout
        transition={{ duration: 0.5 }}
        className={cn(
          "relative grid grid-cols-1 place-items-center gap-2",
          minimize ? "grid-rows-3" : "grid-cols-2",
        )}
      >
        {persons.map((person, index) => (
          <ImageSlot
            key={index}
            minimize={minimize}
            imageAlternate={person.title}
            imageSource={person.image}
          />
        ))}
        <YourImageSlot minimize={minimize} imageAlternate="Your Name" imageSource={Music} />
      </motion.div>
    </motion.div>
  );
}
