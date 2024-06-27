import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import animataImage from "@/public/android-chrome-192x192.png";
function HeroSection({ className }: { className?: string }) {
  const [stackAlign, setStackAlign] = useState<boolean>(false);
  const [cardStack, setCardStack] = useState<string[]>(["card3", "card2", "card1"]);

  const cardStacks: Record<string, string[]> = {
    card1: ["card3", "card2", "card1"],
    card2: ["card3", "card1", "card2"],
    card3: ["card1", "card2", "card3"],
  };

  const changeStackAlign = (card: string) => {
    setStackAlign(true);
    const newStack = cardStacks[card];
    if (newStack) {
      setCardStack(newStack);
    }
  };
  const resetCardStack = () => {
    setCardStack(["card3", "card2", "card1"]);
    setStackAlign(false);
  };
  return (
    <div className={cn("hero-container bg-slate-800", className)}>
      <div className="inner-container m-auto flex h-full w-[90%] flex-col items-center justify-around md:flex-row">
        <div className="info-container flex flex-col items-center md:w-[60%] md:items-start">
          <div className="title-logo relative inline-block self-center p-2 md:self-start">
            <Image
              width={100}
              height={100}
              src={animataImage}
              className="absolute -top-6 h-10 w-10 md:-top-10 md:h-16 md:w-16"
              alt="Hero image"
            />
            <p className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-[40px] font-extrabold text-transparent sm:text-[60px] md:text-[70px] lg:text-[80px]">
              ANIMATA
            </p>
          </div>
          <p className="w-full text-center text-lg leading-8 text-gray-300 md:w-[80%] md:text-left">
            Hover on the underlined word,
            <span
              onMouseOut={resetCardStack}
              onMouseOver={() => changeStackAlign("card1")}
              className="text-underline cursor-pointer"
            >
              {" "}
              hover
            </span>
            , adipisicing elit. Harum enim
            <span
              onMouseOut={resetCardStack}
              onMouseOver={() => changeStackAlign("card2")}
              className="text-underline cursor-pointer"
            >
              {" "}
              hover{" "}
            </span>
            aliquid veritatis
            <span
              onMouseOut={resetCardStack}
              onMouseOver={() => changeStackAlign("card3")}
              className="text-underline cursor-pointer"
            >
              {" "}
              Hover,
            </span>{" "}
            nobis sit id optio velit. Quasi?
          </p>
          <div className="mt-6 flex justify-center gap-2 md:justify-start">
            <Button className="w-32 bg-gradient-to-r from-blue-400 to-sky-300">
              <p>Documentation</p>
            </Button>
            <Button className="w-32 bg-gradient-to-r from-blue-400 to-sky-300">
              <p>Contribute</p>
            </Button>
          </div>
        </div>
        <div className="card-stack-container flex items-center justify-center md:w-[40%]">
          <div className="cards relative flex h-[300px] w-[200px] items-center justify-center md:h-[350px] md:w-[320px]">
            {cardStack.map((card, index) => (
              <div
                style={{ boxShadow: index !== 2 ? "inset 0px -10px 30px 0px #1e293b" : "none" }}
                key={index}
                className={cn(
                  `absolute inset-0 text-center text-gray-800 z-${index} ${card} h-full w-full rounded-2xl transition-all duration-300 ease-in-out`,
                  card === "card1" && stackAlign && "",
                  card === "card2" && (!stackAlign ? "-rotate-[15deg]" : "-left-8 rotate-0"),
                  card === "card3" && (!stackAlign ? "rotate-[15deg]" : "-left-16 rotate-0"),
                  index === 0 && "scale-90 bg-slate-900",
                  index === 1 && "scale-95 bg-slate-700",
                  index === 2 && `scale-100 bg-slate-500 ${stackAlign && "bg-slate-400"}`,
                )}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
