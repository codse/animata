'use client';
import Image from "next/image";
import { CardContainer} from "@/animata/card/card3d"
interface IBlogCard {
  title: string;
  subTitle: string;
  image: string;
  buttonText: string;
  tiltEffect?: boolean;
  onButtonPress?: () => void;
}
export default function BlogCard({ tiltEffect, title, subTitle, buttonText, image,onButtonPress }: IBlogCard) {
  return (
      <CardContainer className="  " tiltEffect={tiltEffect}>
        <div className="container w-[350px]   h-auto flex flex-col  gap-3 rounded-xl dark:bg-slate-800 bg-gray-50 border-gray-200 dark:border-gray-600 border-2 p-4 ">
          <div className="image-container w-full h-[40%] " >
            <Image
              src={image}
              width={300}
              height={200}
              className="object-contain w-full h-full rounded-xl"
              alt="Picture of the author"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <p className="text-slate-800 dark:text-slate-200 text-xl font-bold">
              {title}
            </p>
            <p className="text-slate-800 dark:text-slate-200">
              {subTitle}
            </p>
          </div>
          <p onClick={onButtonPress} className="bg-slate-400 dark:bg-slate-600 cursor-pointer self-start p-2 px-4 rounded-md my-2 inline-block dark:text-slate-200">
            {buttonText}
          </p>
        </div>
      </CardContainer>
  );
}
