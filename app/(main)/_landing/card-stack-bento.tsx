"use client";

import Link from "next/link";
import { useState } from "react";

import CardStack, { useCardStack } from "@/animata/card/card-stack";
import { DEMO_PEOPLE } from "@/app/demo/library/shared/card-stack-people";
import { ProfileStackCard } from "@/app/demo/library/shared/profile-stack-card";
import { cn } from "@/lib/utils";

const BENTO_PEOPLE = DEMO_PEOPLE.slice(0, 4);

function BentoStackInner() {
  const [viewed, setViewed] = useState(0);
  const { activeItem } = useCardStack();

  return (
    <CardStack.Frame className="mx-auto w-full max-w-[16rem]">
      <CardStack.Masks />
      <CardStack.LiveRegion />
      <CardStack.Trigger
        className="w-full"
        onClick={() => setViewed((count) => Math.min(BENTO_PEOPLE.length, count + 1))}
      >
        <CardStack.Viewport className="min-h-[14rem] sm:min-h-[15rem]">
          <CardStack.List>
            {(item, index, layer) => (
              <ProfileStackCard
                key={item.id}
                item={item}
                index={index}
                layer={layer}
                cardClassName="shadow-lg ring-border/60"
              />
            )}
          </CardStack.List>
        </CardStack.Viewport>
      </CardStack.Trigger>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        {viewed}/{BENTO_PEOPLE.length} viewed
        {activeItem ? ` · ${activeItem.title.split(" ")[0]}` : ""}
      </p>
    </CardStack.Frame>
  );
}

export function CardStackBento() {
  return (
    <div className={cn("flex h-full flex-col")}>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
        Card stack
      </span>
      <p className="mt-2 text-sm text-foreground">Click through the deck</p>
      <div className="mt-auto flex justify-center pt-4">
        <CardStack items={BENTO_PEOPLE} depth={3}>
          <BentoStackInner />
        </CardStack>
      </div>
      <Link
        href="/demo/hero/photographer-portfolio"
        className="mt-3 text-[11px] font-medium text-[hsl(var(--accent))] hover:underline"
      >
        Open full demo →
      </Link>
    </div>
  );
}
