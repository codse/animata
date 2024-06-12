"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./card3d";
interface IAnimateedCard3d {
  title: string,
  subtitle: string,
  buttonText: string,
  hoverEffect?: boolean,
  onButtonPress?: () => void
}
export default function AnimatedCard3d(
  { title, subtitle, buttonText, hoverEffect, onButtonPress }: IAnimateedCard3d
) {
  return (
    <CardContainer hoverEffect={hoverEffect} className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl  dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {subtitle}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem onClick={onButtonPress}
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            {buttonText}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
