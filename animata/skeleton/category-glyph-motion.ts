import { cn } from "@/lib/utils";

/** Shared SVG motion base — parent `.group` (category card) triggers hover. */
const base =
  "[transform-box:fill-box] [transform-origin:center] motion-safe:transition-[transform,fill,opacity,stroke-dasharray] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export function cg(...extra: (string | false | undefined)[]) {
  return cn(base, extra);
}

export const cgTextLine1 = "origin-[left_center] motion-safe:group-hover:scale-x-125";
export const cgTextLine2 =
  "origin-[left_center] motion-safe:group-hover:scale-x-150 motion-safe:group-hover:delay-[60ms]";
export const cgTextLine3 =
  "origin-[left_center] motion-safe:group-hover:scale-x-[1.8] motion-safe:group-hover:delay-[120ms]";

export const cgBgWave13 = "motion-safe:group-hover:translate-x-[3px]";
export const cgBgWave2 = "motion-safe:group-hover:-translate-x-[3px]";
export const cgBgDot =
  "motion-safe:group-hover:scale-[1.4] motion-safe:group-hover:fill-[var(--cg-ink)]";

export const cgImageSun =
  "motion-safe:group-hover:-translate-y-[2.5px] motion-safe:group-hover:scale-[1.15]";
export const cgImageMountains = "motion-safe:group-hover:translate-y-px";

export const cgListGrow = "origin-[left_center] motion-safe:group-hover:scale-x-[1.3]";
export const cgListShrink = "origin-[left_center] motion-safe:group-hover:scale-x-[0.7]";

export const cgContainerTrack = "motion-safe:group-hover:-translate-x-[14px]";

export const cgAccordionPlus = "motion-safe:group-hover:rotate-90";
export const cgAccordionContent = "motion-safe:group-hover:fill-[var(--cg-ink)]";

export const cgCardBack =
  "motion-safe:group-hover:translate-x-[3px] motion-safe:group-hover:-translate-y-[3px]";
export const cgCardMid =
  "motion-safe:group-hover:translate-x-[1.5px] motion-safe:group-hover:-translate-y-[1.5px]";

export const cgTabsPill = "motion-safe:group-hover:translate-x-[14px]";
export const cgTabsLabelIn =
  "opacity-0 motion-safe:group-hover:opacity-100 motion-safe:group-hover:delay-100";
export const cgTabsLabelOut = "motion-safe:group-hover:opacity-0";

export const cgSectionMid = "motion-safe:group-hover:-translate-y-[2px]";

export const cgIconRing1 = "motion-safe:group-hover:animate-cg-ping";
export const cgIconRing2 =
  "motion-safe:group-hover:animate-cg-ping motion-safe:group-hover:[animation-delay:0.15s]";
export const cgIconRing3 =
  "motion-safe:group-hover:animate-cg-ping motion-safe:group-hover:[animation-delay:0.3s]";

export const cgPreloaderLeft = "motion-safe:group-hover:-translate-x-[3px]";
export const cgPreloaderRight = "motion-safe:group-hover:translate-x-[3px]";

export const cgProgressArc =
  "motion-safe:duration-700 motion-safe:group-hover:[stroke-dasharray:105_113]";

export const cgGraphBar = "origin-bottom motion-safe:group-hover:scale-y-[1.18]";
export const cgGraphBar2 = "motion-safe:group-hover:delay-[50ms]";
export const cgGraphBar3 = "motion-safe:group-hover:delay-100";
export const cgGraphBar4 = "motion-safe:group-hover:delay-150";

export const cgOverlayPage = "motion-safe:group-hover:opacity-45";
export const cgOverlayModal = "motion-safe:group-hover:scale-[1.05]";

export const cgButtonPill = "motion-safe:group-hover:scale-[1.06]";
export const cgButtonCursor =
  "motion-safe:group-hover:-translate-x-[3px] motion-safe:group-hover:-translate-y-[3px] motion-safe:group-hover:scale-[0.92]";

export const cgWidgetHour = "origin-[center_bottom] motion-safe:group-hover:rotate-[30deg]";
export const cgWidgetMinute = "origin-[0%_0%] motion-safe:group-hover:rotate-[60deg]";

export const cgBentoTl =
  "motion-safe:group-hover:-translate-x-[1.5px] motion-safe:group-hover:-translate-y-[1.5px]";
export const cgBentoTr1 =
  "motion-safe:group-hover:translate-x-[1.5px] motion-safe:group-hover:-translate-y-[1.5px]";
export const cgBentoTr2 = "motion-safe:group-hover:translate-x-[1.5px]";
export const cgBentoBottom = "motion-safe:group-hover:translate-y-[1.5px]";

export const cgHeroCta = "motion-safe:group-hover:scale-[1.08]";
export const cgHeroChevron = "motion-safe:group-hover:animate-cg-bounce";

export const cgScrollRows = "motion-safe:group-hover:-translate-y-[14px]";
export const cgScrollRow1 = "motion-safe:group-hover:opacity-0";
export const cgScrollRow4 = "motion-safe:group-hover:opacity-100";
export const cgScrollThumb = "motion-safe:group-hover:translate-y-[13px]";

export const cgCarouselPeekL = "motion-safe:group-hover:-translate-x-[2px]";
export const cgCarouselPeekR = "motion-safe:group-hover:translate-x-[2px]";
export const cgCarouselSlide = "motion-safe:group-hover:scale-[1.04]";
export const cgCarouselDotOut =
  "motion-safe:group-hover:scale-[0.82] motion-safe:group-hover:fill-[var(--cg-soft)]";
export const cgCarouselDotIn =
  "motion-safe:group-hover:scale-[1.22] motion-safe:group-hover:fill-[var(--cg-ink)] motion-safe:group-hover:delay-[60ms]";

export const cgSkel = "motion-safe:group-hover:animate-cg-shimmer";
export const cgSkel2 = "motion-safe:group-hover:[animation-delay:0.1s]";
export const cgSkel3 = "motion-safe:group-hover:[animation-delay:0.2s]";
export const cgSkel4 = "motion-safe:group-hover:[animation-delay:0.3s]";
export const cgSkel5 = "motion-safe:group-hover:[animation-delay:0.4s]";
export const cgSkel6 = "motion-safe:group-hover:[animation-delay:0.5s]";

export const cgFeatureCard =
  "-rotate-[8deg] motion-safe:group-hover:rotate-0 motion-safe:transition-[transform,fill,opacity,stroke-dasharray] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [transform-box:fill-box] [transform-origin:center]";
export const cgFeatureSparkle = "motion-safe:group-hover:animate-cg-twinkle";

export const cgFabPlus = "motion-safe:group-hover:rotate-45";
export const cgFabDot1 = "motion-safe:group-hover:-translate-x-[2.5px]";
export const cgFabDot2 =
  "motion-safe:group-hover:-translate-x-[1.8px] motion-safe:group-hover:-translate-y-[1.8px]";
export const cgFabDot3 = "motion-safe:group-hover:-translate-y-[2.5px]";
export const cgFabDot4 =
  "motion-safe:group-hover:translate-x-[1.8px] motion-safe:group-hover:-translate-y-[1.8px]";
export const cgFabDot5 = "motion-safe:group-hover:translate-x-[2.5px]";

export const CG_SHADE_VARS =
  "[--cg-ink:var(--ink)] [--cg-faint:var(--ink-faint)] [--cg-soft:color-mix(in_oklab,var(--cg-ink)_50%,transparent)]";
