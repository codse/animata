import Marquee from "@/animata/container/marquee";
import { cn } from "@/lib/utils";

const images: { src: string; alt: string; className?: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1465804575741-338df8554e02?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Image 1",
  },
  {
    src: "https://images.unsplash.com/photo-1495985812444-236d6a87bdd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    alt: "Image 3",
  },
  {
    src: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Image 2",
  },
  {
    src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Image 4",
  },
  {
    src: "https://images.unsplash.com/photo-1611816055460-618287c870bd?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
    alt: "Image 5",
  },
];

export default function ShapeShifter() {
  return (
    <div className="text-md group flex min-h-96 w-full min-w-fit flex-col items-center justify-center gap-3 font-bold transition-all md:flex-row md:text-xl">
      <div>Shape</div>
      <div
        className={cn(
          "relative animate-[shape-shift] overflow-hidden bg-black p-0 transition-all ease-in-out direction-alternate repeat-infinite group-hover:[animation-play-state:paused]",
        )}
        // Magic number based on length of images.
        style={{ animationDuration: "8s" }}
      >
        {/* Marquee is optional and can be replaced with a different component like video. */}
        <Marquee
          className="absolute inset-0 [--gap:2px]"
          applyMask={false}
          pauseOnHover
        >
          {images.map((image, index) => (
            /* Use `next/image` and remove the line below. */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={`image_${index}`} {...image} alt={image.alt ?? ""} />
          ))}
        </Marquee>
      </div>
      <div>Shifter</div>
    </div>
  );
}
