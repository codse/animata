"use client";

import { SparklesIcon } from "lucide-react";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

import BoidsEcosystem from "@/animata/background/boids-ecosystem";
import { cn } from "@/lib/utils";

import { LaunchShiftNotes } from "./launch-shift-notes";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const BG = "#0E0E10";
const PALETTE = ["#EFEAE0", "#EFEAE0", "#C3B5FF", "#9F90E0"];

export default function LaunchShift() {
  const [count, setCount] = useState(96);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setCount(mq.matches ? 48 : 96);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <section
        className={cn(
          sans.variable,
          mono.variable,
          sans.className,
          "relative isolate min-h-svh w-full overflow-hidden bg-[#0E0E10] text-[#EFEAE0]",
        )}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <BoidsEcosystem
            count={count}
            background={BG}
            palette={PALETTE}
            agentShape="dot"
            cursorRadius={80}
            className="h-full w-full rounded-none opacity-90"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_90%_at_50%_35%,rgb(14_14_16_/_0.72)_0%,rgb(14_14_16_/_0.35)_55%,transparent_80%)]"
        />

        <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-5 pb-[var(--demo-chrome-reserve,5rem)] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
          <div className="flex w-full max-w-[40rem] flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-[#EFEAE0]/70">
              <SparklesIcon aria-hidden="true" className="size-3.5 text-[#C3B5FF]" />
              Superhuman
            </span>

            <h1 className="mt-4 max-w-[16ch] text-balance text-[clamp(2.35rem,6.8vw,3.75rem)] font-semibold tracking-[-0.045em]">
              <span
                style={{ textBoxTrim: "trim-both" }}
                className="block bg-linear-to-b leading-none from-white via-[#F5F5F3] to-[#A8A8A6] bg-clip-text text-transparent"
              >
                Superpowers,
              </span>
              <span
                style={{ textBoxTrim: "trim-both" }}
                className="-mt-5 block bg-linear-to-b leading-none from-white via-[#F5F5F3] to-[#A8A8A6] bg-clip-text text-transparent"
              >
                everywhere you work.
              </span>
            </h1>

            <p className="mt-6 max-w-[42ch] text-balance text-[17px] leading-tight text-[#EFEAE0]/58 sm:text-[18px]">
              Mail, Docs, and AI that works in every app and tab.
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="inline-flex h-11 leading-none touch-manipulation items-center justify-center rounded-full bg-[#EFEAE0] px-6 text-[14px] font-medium text-[#0E0E10] transition-transform active:scale-[0.98]"
              >
                {started ? "You're in" : "Get Superhuman"}
              </button>
              <button
                type="button"
                className="inline-flex h-11 leading-none touch-manipulation items-center justify-center rounded-full border border-white/14 bg-transparent px-6 text-[14px] font-medium text-[#EFEAE0]/78 transition-colors hover:bg-white/[0.04] active:scale-[0.98]"
              >
                See how it works
              </button>
            </div>
          </div>
        </div>
      </section>

      <LaunchShiftNotes />
    </>
  );
}
