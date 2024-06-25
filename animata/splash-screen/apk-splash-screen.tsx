"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface CircleProps {
  height?: string;
  width?: string;
  bgColor?: string;
  borderRadius?: string;
}

interface CylinderProps {
  text?: string;
  height?: string;
  width?: string;
  bgColor?: string;
}

const Circle = ({
  height = "h-36",
  width = "w-36",
  bgColor = "bg-yellow-500",
  borderRadius = "rounded-full",
}: CircleProps) => <div className={cn(height, width, borderRadius, bgColor)} />;

const Cylinder = ({
  text,
  height = "h-36",
  width = "w-96",
  bgColor = "bg-slate-100",
}: CylinderProps) => (
  <div className={cn("flex items-center justify-center rounded-full", height, width, bgColor)}>
    <p className={cn("text-8xl font-bold tracking-wider text-purple-950")}>{text}</p>
  </div>
);

export default function ApkSplashScreen() {
  const [animationEnd, setAnimationEnd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationEnd(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-center gap-3 overflow-hidden bg-purple-950",
      )}
    >
      <div
        className={cn(
          "flex",
          animationEnd ? "animate-end-slide-from-right" : "animate-slide-from-right",
        )}
      >
        <Circle /> <Cylinder bgColor="bg-purple-900" />
        <Cylinder bgColor="bg-yellow-500" width="w-[600px]" />
        <Cylinder bgColor="bg-yellow-500" />
      </div>
      <div
        className={cn(
          "flex",
          animationEnd
            ? "animate-end-slide-from-left"
            : "animate-slide-from-left opacity-0 delay-150",
        )}
      >
        <Circle bgColor="bg-green-500" />
        <Cylinder text="Introducing" width="w-[800px]" />
        <Circle bgColor="bg-green-500" borderRadius="rounded-t-full rounded-bl-full" />
        <Circle bgColor="bg-green-500" />
        <Cylinder bgColor="bg-purple-900" />
      </div>
      <div
        className={cn(
          "flex",
          animationEnd
            ? "animate-end-slide-from-right"
            : "animate-slide-from-right opacity-0 delay-300",
        )}
      >
        <Cylinder bgColor="bg-blue-400" />
        <Circle bgColor="bg-purple-900" borderRadius="rounded-t-full rounded-br-full" />
        <Circle bgColor="bg-blue-400" /> <Cylinder text="the new" width="w-[600px]" />
        <Circle bgColor="bg-purple-900" />
        <Cylinder bgColor="bg-blue-400" />
      </div>
      <div
        className={cn(
          "flex",
          animationEnd
            ? "animate-end-slide-from-left"
            : "animate-slide-from-left opacity-0 delay-500",
        )}
      >
        <Circle bgColor="bg-red-500" />
        <Cylinder text="Slack User Experience" width="w-[1300px]" />
        <Circle bgColor="bg-red-500" borderRadius="rounded-t-full rounded-br-full" />
      </div>
      <div
        className={cn(
          "flex",
          animationEnd
            ? "animate-end-slide-from-right"
            : "animate-slide-from-right opacity-0 delay-1000",
        )}
      >
        <Cylinder bgColor="bg-purple-900" />
        <Cylinder bgColor="bg-yellow-500" width="w-[700px]" /> <Circle bgColor="bg-yellow-500" />
        <Cylinder bgColor="bg-purple-900" />
      </div>
    </div>
  );
}
