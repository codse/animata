import { useCallback, useEffect, useRef, useState } from "react";

interface EventScrollerProps {
  cardData: EventCardProps[];
}

interface EventCardProps {
  date: number;
  day: string;
  heading?: string | undefined;
  content1?: string | undefined;
  button1?: string | undefined;
  button2?: string | undefined;
  content2?: string | undefined;
}

interface MinicardProps {
  heading: string | undefined;
  content1: string | undefined;
  button1: string | undefined;
  content2: string | undefined;
  button2: string | undefined;
}

export const EventScroller = ({ cardData }: EventScrollerProps) => {
  const [arr, setArr] = useState<EventCardProps[]>(cardData);
  const divRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const addMoreItems = useCallback(() => {
    setArr((prevArr) => [...prevArr, ...cardData]);
  }, [cardData]);

  const checkScrollPosition = useCallback(() => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        addMoreItems();
      }
    }
  }, [addMoreItems]);

  const smoothScroll = useCallback(
    (target: number, duration: number) => {
      if (!divRef.current) return;

      const start = divRef.current.scrollTop;
      const change = target - start;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        if (!divRef.current) return;

        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const t = elapsedTime / duration;
          divRef.current.scrollTop = start + change * (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
          requestAnimationFrame(animateScroll);
        } else {
          divRef.current.scrollTop = target;
          isScrollingRef.current = false;
          checkScrollPosition();
        }
      };

      isScrollingRef.current = true;
      requestAnimationFrame(animateScroll);
    },
    [checkScrollPosition],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current || !divRef.current) return;

      const scrollAmount = e.deltaY > 0 ? 170 : -170;
      const duration = 500;
      const target = divRef.current.scrollTop + scrollAmount;

      smoothScroll(target, duration);
    },
    [smoothScroll],
  );

  useEffect(() => {
    const currentDiv = divRef.current;
    if (currentDiv) {
      currentDiv.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (currentDiv) {
        currentDiv.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <div className="h-[350px] w-[500px] rounded-3xl border border-solid border-gray-300 bg-white py-[40px] shadow-xl">
      <div
        ref={divRef}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 5%, black 30%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 5%, black 30%, black 30%, transparent 90%)",
        }}
        className="scrollbar-hide mx-[50px] my-[30px] h-[290px] w-[400px] overflow-y-scroll"
      >
        {arr.map((element, index) => (
          <Eachdiv
            key={index}
            date={element.date}
            day={element.day}
            heading={element.heading}
            content1={element.content1}
            button1={element.button1}
            content2={element.content2}
            button2={element.button2}
          />
        ))}
      </div>
    </div>
  );
};

const Eachdiv = ({ date, day, heading, content1, content2, button1, button2 }: EventCardProps) => {
  return (
    <div className="bg- mb-[20px] flex h-[150px] gap-[40px] font-sans">
      <div className="flex h-[120px] w-[80px] flex-col rounded-2xl pt-[10px]">
        <div className="text-4xl font-semibold">{date}</div>
        <div className="text-xl font-medium">{day}</div>
      </div>
      <div className="w-full">
        <Minicard
          heading={heading}
          content1={content1}
          content2={content2}
          button1={button1}
          button2={button2}
        />
      </div>
    </div>
  );
};

const Minicard = ({ heading, content1, content2, button1, button2 }: MinicardProps) => {
  return (
    <div className="h-[120px] rounded-2xl p-[5px] pl-[10px] shadow-lg">
      <div className="p-[5px] text-left font-sans text-xl font-semibold">{heading}</div>
      <div className="text-normal mt-[5px] p-[2px] text-left font-sans font-bold text-gray-500">
        {content1}
      </div>
      {button1 && (
        <button className="ml-[10px] mt-[5px] rounded-lg bg-gray-300 p-[5px] px-[10px] font-sans font-bold opacity-60">
          {button1}
        </button>
      )}
      {content2 && (
        <div className="text-normal mt-[5px] p-[2px] text-left font-sans font-bold text-gray-500">
          {content2}
        </div>
      )}
      {button2 && (
        <button className="m ml-[10px] rounded-lg bg-green-200 p-[5px] px-[10px] font-sans font-bold opacity-60">
          {button2}
        </button>
      )}
    </div>
  );
};
