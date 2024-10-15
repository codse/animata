"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const users = [
  {
    name: "ArjunCodess",
    city: "Lucknow",
    country: "India",
    timeDifference: "+3 Hours",
    pfp: "https://avatar.vercel.sh/1",
  },
  {
    name: "Kumail",
    city: "New York",
    country: "USA",
    timeDifference: "-3 Hours",
    pfp: "https://avatar.vercel.sh/2",
  },
];

export const testTeamClockProps: TeamClockProps = {
  users: users,
  clockSize: 300,
  animationDuration: 0.3,
  accentColor: "#3B82F6",
};

export interface TeamClockProps {
  users: Array<{
    name: string;
    city: string;
    country: string;
    timeDifference: string;
    pfp: string;
  }>;
  clockSize: number;
  animationDuration: number;
  accentColor: string;
}

export default function TeamClock({
  users,
  clockSize,
  animationDuration,
  accentColor = "#000",
}: TeamClockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [angle, setAngle] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsExpanded(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <style jsx global>{`
        .bg-accent {
          background-color: var(--accent-color);
        }
      `}</style>
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-lg border border-zinc-300 transition-all duration-300 ease-in-out hover:shadow-lg md:flex-row",
          "h-auto w-full md:h-[550px] md:w-[400px]",
          {
            "md:w-[800px]": isExpanded,
          },
        )}
      >
        <div
          className={cn(
            "flex flex-col rounded-lg bg-white p-4 transition-all duration-300 ease-in-out",
            {
              "w-full": isMobile || (!isExpanded && !isMobile),
              "w-1/2": isExpanded && !isMobile,
            },
          )}
        >
          <div className="mb-4 flex items-center justify-between border-b pb-4 pt-1">
            <h2 className="text-2xl font-bold text-gray-800">Team</h2>
            {!isMobile && (
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">
                  {isExpanded ? "Hide" : "Show"} List
                </span>
                <ToggleButton onClick={handleToggle} accentColor={accentColor} />
              </div>
            )}
          </div>
          <div className="flex flex-grow items-center justify-center">
            <Clock
              angle={angle}
              pressed={isExpanded}
              size={clockSize}
              animationDuration={animationDuration}
              accentColor={accentColor}
            />
          </div>
          <div className="my-4 text-center text-3xl font-semibold text-gray-700">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div
          className={cn(
            "overflow-y-auto rounded-r-lg bg-gray-50 transition-all duration-300 ease-in-out",
            {
              "w-full": isMobile,
              "w-1/2 opacity-100": isExpanded && !isMobile,
              "w-0 opacity-0": !isExpanded && !isMobile,
            },
          )}
        >
          <div
            className={cn("space-y-4 p-4 transition-all duration-300 ease-in-out", {
              "translate-x-0": isExpanded,
              "translate-x-full": !isExpanded,
            })}
          >
            {users.map((user, index) => (
              <ListElement
                key={index}
                name={user.name}
                city={user.city}
                country={user.country}
                pfp={user.pfp}
                timeDifference={user.timeDifference}
                setAngle={setAngle}
                currentTime={currentTime}
                animationDuration={animationDuration}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface ClockProps {
  angle: number;
  pressed: boolean;
  size: number;
  animationDuration: number;
  accentColor: string;
}

function Clock({ angle, pressed, size, animationDuration, accentColor }: ClockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const hourHandRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isClockwise = angle > 0;
    if (gradientRef.current && time) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
      gradientRef.current.style.background = isClockwise
        ? `conic-gradient(from ${hourDegrees}deg, rgba(0,200,0,0.5), rgba(0,200,0,0) ${angle}deg)`
        : `conic-gradient(from ${
            hourDegrees + angle
          }deg, rgba(200,0,0,0.3), rgba(200,0,0,0.0) ${-angle}deg)`;
    }
  }, [angle, time]);

  if (!time) {
    return null;
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;
  gsap.to(hourHandRef.current, { rotate: 180 + hourDegrees + angle });

  return (
    <div
      className="flex items-center justify-center"
      style={{ "--accent-color": accentColor } as React.CSSProperties}
    >
      <div
        className="relative flex items-center justify-center rounded-full border bg-white p-6 text-center text-xl"
        ref={gradientRef}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{ transform: `rotate(${i * 30}deg) translate(0, -46%)` }}
          >
            <hr className="h-[20px] w-[3px] rounded-lg bg-gray-600" />
          </div>
        ))}

        <div
          ref={hourHandRef}
          className="absolute top-[50%] h-[100px] w-[5px] origin-bottom rounded-2xl bg-black"
          style={{
            transformOrigin: "50% 0%",
            transform: `rotate(${180 + hourDegrees}deg)`,
          }}
        />
        <div
          className="absolute top-[50%] h-[120px] w-[4px] origin-bottom rounded-2xl bg-gray-600"
          style={{
            transformOrigin: "50% 0%",
            transform: `rotate(${180 + minuteDegrees}deg)`,
          }}
        />
        <div
          className="absolute top-[50%] w-[2px] origin-bottom rounded-2xl bg-accent"
          style={{
            height: `${size * 0.4}px`,
            transformOrigin: "50% 0%",
            transform: `rotate(${180 + secondDegrees}deg)`,
          }}
        />
        <div className="absolute h-[10px] w-[10px] rounded-full bg-accent" />
      </div>
    </div>
  );
}

interface ListElementProp {
  name: string;
  city: string;
  country: string;
  timeDifference: string;
  pfp: string;
  setAngle: Function;
  currentTime: Date;
  animationDuration: number;
  accentColor: string;
}

function ListElement(props: ListElementProp) {
  const timeRollRef = useRef<HTMLDivElement>(null);
  const timeRoll1Ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeRollRef.current && timeRoll1Ref.current) {
      gsap.to(timeRollRef.current, { y: -10, duration: 0.1, opacity: 0 });
      gsap.to(timeRoll1Ref.current, { y: -10, duration: 0.1, opacity: 1 });
      props.setAngle(parseInt(props.timeDifference.split("Hours")[0]) * 30);
    }
  };

  const handleLeave = () => {
    if (timeRollRef.current && timeRoll1Ref.current) {
      gsap.to(timeRollRef.current, { y: 10, duration: 0.1, opacity: 1 });
      gsap.to(timeRoll1Ref.current, { y: 10, duration: 0.1, opacity: 0 });
      props.setAngle(0);
    }
  };

  const localTime = useMemo(() => {
    const hourDifference = parseInt(props.timeDifference.split(" ")[0]);
    const newTime = new Date(props.currentTime);
    newTime.setHours(newTime.getHours() + hourDifference);
    return newTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [props.currentTime, props.timeDifference]);

  return (
    <div
      className="flex cursor-pointer items-center rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100 hover:shadow-inner"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={props.pfp} alt={props.name} className="mr-4 h-10 w-10 rounded-full" />
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">{props.name}</span>
          <div className="relative text-sm text-gray-600">
            <div ref={timeRollRef}>{localTime}</div>
            <div
              ref={timeRoll1Ref}
              className={`absolute left-0 top-0 whitespace-nowrap text-xs opacity-0 ${
                parseInt(props.timeDifference) < 0 ? "text-red-500" : "text-green-500"
              } sm:text-sm`}
            >
              {parseInt(props.timeDifference) === 0 ? "+ 0 Hours" : props.timeDifference}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">{`${props.city}, ${props.country}`}</div>
      </div>
    </div>
  );
}

type ToggleButtonProps = {
  onClick: (isToggled: boolean) => void;
  accentColor: string;
};

function ToggleButton({ onClick, accentColor = "#000", ...props }: ToggleButtonProps) {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    onClick(!isToggled);
  };

  return (
    <button
      className={`h-6 w-12 cursor-pointer rounded-full border transition-colors ${
        isToggled ? "bg-accent hover:opacity-80" : "bg-gray-300 hover:bg-gray-400"
      }`}
      onClick={handleClick}
      style={{ "--accent-color": accentColor } as React.CSSProperties}
      {...props}
    >
      <div
        className={`h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isToggled ? "translate-x-7 transform" : "translate-x-1"
        }`}
      />
    </button>
  );
}
