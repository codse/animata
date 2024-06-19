import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    name: string;
    image: string;
    description: string;
  }[];
  reverse?: boolean;
}
const Marquee = ({ items, reverse, className }: CardProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full p-2 [--duration:20s] [--gap:20px] [gap:var(--gap)]",
        className,
      )}
    >
      {items.map(({ name, image, description }) => (
        <div
          key={name}
          className={cn(
            "flex w-[500px] animate-marquee-horizontal overflow-hidden rounded-2xl bg-slate-900 text-white",
            { "[animation-direction:reverse]": reverse },
          )}
        >
          <div className="flex">
            <div className="h-full w-60">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-white">
              <span className="mb-1 block text-lg font-bold">{name}</span>
              <span className="mb-2 block text-sm font-medium leading-loose">
                Founder of BAC
              </span>
              <span className="block text-sm">{description} </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface TestimonialProps {
  data: {
    name: string;
    image: string;
    description: string;
  }[];
}
export default function ScrollingTestimonials({ data }: TestimonialProps) {
  return (
    <>
      // Note: Slice the data E.g. data.slice(0, 3) to show only 3 items
      <Marquee items={data} className="[--duration:10s]" />
      <Marquee items={data} reverse={true} className="[--duration:5s]" />
      <Marquee items={data} className="[--duration:15s]" />
    </>
  );
}
