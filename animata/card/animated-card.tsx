"use client";
import React from "react";

import { CardBody, CardContainer, CardItem } from "./card3d";
interface IAnimateedCard3d {
  title: string;
  subtitle: string;
  buttonText: string;
  hoverEffect?: boolean;
  onButtonPress?: () => void;
}
export default function AnimatedCard3d({
  title,
  subtitle,
  buttonText,
  hoverEffect,
  onButtonPress,
}: IAnimateedCard3d) {
  return (
    <CardContainer hoverEffect={hoverEffect} className="inter-var">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl sm:w-[30rem]">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          {subtitle}
        </CardItem>
        <div className="mt-20 flex items-center justify-between">
          <CardItem
            onClick={onButtonPress}
            translateZ={20}
            as="button"
            className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
          >
            {buttonText}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
