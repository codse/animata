import { PlusCircle } from "lucide-react";

import Marquee from "@/animata/container/marquee";
import { cn } from "@/lib/utils";

interface CardProps {
  show: React.ReactNode;
  reveal: React.ReactNode;
}

interface CardDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  font: string;
  image: string;
  index?: number;
}

interface FlippingCardProps {
  list: CardDetailsProps[];
}

const Card = ({ show, reveal }: CardProps) => {
  const common = "absolute flex w-full h-full  [backface-visibility:hidden]";
  return (
    <div className={cn("group h-60 w-48 [perspective:1000px]")}>
      <div
        className={cn(
          "relative h-full transition-all delay-75 duration-500 ease-linear [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)]",
        )}
      >
        <div className={cn("bg-white", common)}>{show}</div>
        <div
          className={cn("[transform:rotateY(180deg)]", common)}
          style={{
            // Note: Set your own color over here
            backgroundColor: `#${(((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")}`,
          }}
        >
          {reveal}
        </div>
      </div>
    </div>
  );
};

const CardDetails = ({ title, image, font, index }: CardDetailsProps) => {
  return (
    <Card
      show={
        <div className="flex w-full flex-col border-[1px] border-black/15 px-3 py-4 text-sm">
          <span className="border-t-2 border-black pt-1">{font}</span>

          <span className="mt-4 border-b-2 border-black px-1 font-serif text-8xl">{title}</span>
          <div className="mt-12 flex items-center justify-between">
            <span>{index}</span>
            <PlusCircle size={18} />
          </div>
        </div>
      }
      reveal={
        <div className="flex w-full flex-col justify-between overflow-hidden py-4 text-sm">
          <img alt="" src={image} className="size-32 px-2" />
          <Marquee className="font-serif text-5xl text-white" applyMask={false}>
            {font.split(" ")[0]}
          </Marquee>
          <div className="flex items-center justify-between px-3">
            <span className="text-white">See more</span>
            <PlusCircle size={18} color="white" />
          </div>
        </div>
      }
    />
  );
};

export default function FlippingCard({ list }: FlippingCardProps) {
  return (
    <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-2">
      {list.map((item, index) => (
        <CardDetails
          key={`card_${index}`}
          index={index}
          title={item.title}
          font={item.font}
          image={item.image}
        />
      ))}
    </div>
  );
}
