"use client";

import React, { Suspense } from "react";
import { useTheme } from "next-themes";

import GithubCardShiny from "@/animata/card/github-card-shiny";
import GithubCardSkew from "@/animata/card/github-card-skew";
import AnimatedBorderTrail from "@/animata/container/animated-border-trail";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import MirrorText from "@/animata/text/mirror-text";
import TypingText from "@/animata/text/typing-text";
import GridView from "@/app/_landing/grid-view";
import { ComponentCard } from "@/components/component-card";
const WidgetSection = React.lazy(() => import("./widget-section"));

export default function SectionOne() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="bg-transparent duration-1000 ease-in-out animate-in fade-in-0 slide-in-from-bottom-16">
      <div className="flex flex-col items-center justify-center gap-1 py-12 text-foreground">
        <h4 className="text-4xl font-medium md:text-5xl lg:text-7xl">
          <AnimatedGradientText className="bg-gradient-to-br from-foreground/50 via-foreground/60 to-foreground/80">
            Checkout the demo below
          </AnimatedGradientText>
        </h4>
        <small className="max-w-xs text-balance text-center text-muted-foreground duration-500 md:max-w-md">
          <strong>Tip</strong>: Use the view button to see the source.
        </small>
      </div>

      <GridView>
        <ComponentCard
          className="h-full"
          name="Border trail"
          href="/docs/container/animated-border-trail"
        >
          <AnimatedBorderTrail
            trailColor={resolvedTheme === "dark" ? "#ff0" : "purple"}
            className="border border-border bg-gray-100 dark:bg-zinc-500"
            contentClassName="bg-gray-100 dark:bg-zinc-700"
          >
            <div className="flex-1 p-3">
              No longer wasting hours 🕕 looking for the inspiration or trying to write everything
              from scratch 📝.
            </div>
            <div className="m-3 rounded-xl bg-gray-50 px-4 py-3 font-mono text-sm text-black dark:bg-zinc-800 dark:text-white">
              <div>
                <span className="font-semibold text-blue-400 dark:text-blue-200">time.</span>
                saved = <span className="font-bold text-blue-400">true</span>;
              </div>
              <span className="block">
                <span className="font-semibold text-blue-400 dark:text-blue-200">frustration</span>
                --;
              </span>
              <span className="block">
                <span className="font-semibold text-blue-400 dark:text-blue-200">happiness</span>
                ++;
              </span>

              <span className="block">
                <span className="font-semibold text-blue-400 dark:text-blue-200">productivity</span>
                ++;
              </span>
            </div>
          </AnimatedBorderTrail>
        </ComponentCard>

        <div className="flex w-full flex-1 flex-col gap-4">
          <ComponentCard name="Mirror text" className="w-full" href="/docs/text/mirror-text">
            <div className="mx-auto w-fit rounded-xl border border-border bg-gray-100 shadow-xl dark:border-zinc-600 dark:bg-zinc-700">
              <MirrorText
                containerClassName="px-3 py-2"
                className="text-xl sm:text-2xl md:text-3xl"
                text="Awesomeness"
              />
            </div>
          </ComponentCard>

          <ComponentCard name="Typing text" href="/docs/text/typing-text">
            <div className="flex flex-col rounded-xl border border-border bg-gray-100 dark:border-zinc-600 dark:bg-zinc-700 lg:col-span-2">
              {/** Window */}
              <div className="flex gap-1.5 border-b border-border p-4 dark:border-zinc-600">
                <span className="h-3 w-3 transform rounded-full bg-red-500 transition-transform duration-150 hover:scale-110" />
                <span className="h-3 w-3 transform rounded-full bg-yellow-500 transition-transform duration-150 hover:scale-110" />
                <span className="h-3 w-3 transform rounded-full bg-green-500 transition-transform duration-150 hover:scale-110" />
              </div>
              {/** Code */}
              <div className="group w-full p-4 font-mono text-sm">
                <div className="mt-2 line-clamp-1">
                  <span className="font-medium text-yellow-600 dark:text-yellow-500">import</span>{" "}
                  <span className="transition-all group-hover:animate-pulse group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    BoldCopy
                  </span>{" "}
                  <span className="font-medium text-yellow-600 dark:text-yellow-500">from</span>{" "}
                  &quot;@/animata/text/bold-copy&quot;
                </div>

                <TypingText className="my-2 w-full" text='<BoldCopy text="Animata" />' />
              </div>
            </div>
          </ComponentCard>
        </div>
      </GridView>

      <GridView>
        <ComponentCard name="Shiny card" href="/docs/card/github-card-shiny">
          <GithubCardShiny className="mx-auto max-w-80 rounded-3xl" />
        </ComponentCard>

        <ComponentCard name="Skew card" href="/docs/card/github-card-skew">
          <GithubCardSkew className="mx-auto" />
        </ComponentCard>
      </GridView>

      <Suspense
        fallback={
          <ComponentCard rounded={false} className="my-4" name="Widgets" href="/docs/widget">
            <div className="h-52 w-full animate-pulse bg-gray-100 dark:bg-zinc-600" />
          </ComponentCard>
        }
      >
        <WidgetSection />
      </Suspense>
    </div>
  );
}
