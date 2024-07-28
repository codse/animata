"use client";

import React from "react";

import Marquee from "@/animata/container/marquee";
import BatteryLevel from "@/animata/widget/battery-level";
import ClockWithPhoto from "@/animata/widget/clock-with-photo";
import Cycling from "@/animata/widget/cycling";
import DeliveryCard from "@/animata/widget/delivery-card";
import DirectionCard, { testDirectionProps } from "@/animata/widget/direction-card";
import { ComponentCard } from "@/components/component-card";

export default function WidgetSection() {
  return (
    <ComponentCard rounded={false} className="my-4" name="Widgets" href="/docs/widget">
      <Marquee className="pt-0" applyMask={false}>
        <Cycling />
        <BatteryLevel />
        <DirectionCard directionValues={testDirectionProps.directionValues} />
        <ClockWithPhoto />
        <DeliveryCard />
      </Marquee>
    </ComponentCard>
  );
}
