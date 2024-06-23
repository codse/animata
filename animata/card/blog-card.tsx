"use client";
import Image from "next/image";
import { CardContainer } from "@/animata/card/card3d";
interface IBlogCard {
  title: string;
  subTitle: string;
  image: string;
  buttonText: string;
  tiltEffect?: boolean;
  onButtonPress?: () => void;
}
export default function BlogCard({
  tiltEffect,
  title,
  subTitle,
  buttonText,
  image,
  onButtonPress,
}: IBlogCard) {
  return (
    <CardContainer className=" " tiltEffect={tiltEffect}>
      <div className="container flex h-auto w-[350px] flex-col gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-slate-800">
        <div className="image-container h-[40%] w-full">
          <Image
            src={image}
            width={300}
            height={200}
            className="h-full w-full rounded-xl object-contain"
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</p>
          <p className="text-slate-800 dark:text-slate-200">{subTitle}</p>
        </div>
        <p
          onClick={onButtonPress}
          className="my-2 inline-block cursor-pointer self-start rounded-md bg-slate-400 p-2 px-4 dark:bg-slate-600 dark:text-slate-200"
        >
          {buttonText}
        </p>
      </div>
    </CardContainer>
  );
}
