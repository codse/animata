"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TeamClockProps {
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
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverBackgroundColor: string;
  showSeconds: boolean;
  use24HourFormat: boolean;
}

type TeamClockState = {
  isExpanded: boolean;
  angle: number;
  currentTime: Date;
  isMobile: boolean;
  selectedUser: string | null;
  hoveredUser: string | null;
};

type TeamClockAction =
  | { type: "toggle" }
  | { type: "tick"; time: Date }
  | { type: "setMobile"; isMobile: boolean }
  | { type: "selectUser"; userName: string; timeDifference: string; users: TeamClockProps["users"] }
  | {
      type: "hoverUser";
      userName: string | null;
      timeDifference: string | null;
      users: TeamClockProps["users"];
    };

function teamClockReducer(state: TeamClockState, action: TeamClockAction): TeamClockState {
  switch (action.type) {
    case "toggle":
      return { ...state, isExpanded: !state.isExpanded };
    case "tick":
      return { ...state, currentTime: action.time };
    case "setMobile":
      return { ...state, isMobile: action.isMobile };
    case "selectUser": {
      if (state.selectedUser === action.userName) {
        return { ...state, selectedUser: null, angle: 0 };
      }
      return {
        ...state,
        selectedUser: action.userName,
        angle: parseInt(action.timeDifference, 10) * 30,
      };
    }
    case "hoverUser": {
      if (action.userName && action.timeDifference) {
        return {
          ...state,
          hoveredUser: action.userName,
          angle: parseInt(action.timeDifference, 10) * 30,
        };
      }
      if (!state.selectedUser) {
        return { ...state, hoveredUser: null, angle: 0 };
      }
      const selectedUserData = action.users.find((user) => user.name === state.selectedUser);
      return {
        ...state,
        hoveredUser: null,
        angle: selectedUserData ? parseInt(selectedUserData.timeDifference, 10) * 30 : 0,
      };
    }
    default:
      return state;
  }
}

function createInitialTeamClockState(): TeamClockState {
  return {
    isExpanded: false,
    angle: 0,
    currentTime: new Date(),
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
    selectedUser: null,
    hoveredUser: null,
  };
}

export default function TeamClock({
  users,
  clockSize,
  animationDuration,
  accentColor = "#000",
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  borderColor = "#e5e7eb",
  hoverBackgroundColor = "#f3f4f6",
  showSeconds = false,
  use24HourFormat = false,
}: TeamClockProps) {
  const [state, dispatch] = useReducer(teamClockReducer, undefined, createInitialTeamClockState);
  const { isExpanded, angle, currentTime, isMobile, selectedUser, hoveredUser } = state;

  useEffect(() => {
    const checkMobile = () => {
      dispatch({ type: "setMobile", isMobile: window.innerWidth < 768 });
    };

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick", time: new Date() });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    dispatch({ type: "toggle" });
  };

  const handleUserSelect = (userName: string, timeDifference: string) => {
    dispatch({ type: "selectUser", userName, timeDifference, users });
  };

  const handleUserHover = (userName: string | null, timeDifference: string | null) => {
    dispatch({ type: "hoverUser", userName, timeDifference, users });
  };

  return (
    <motion.div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border transition-shadow duration-300 hover:shadow-lg md:flex-row",
        "min-w-26 h-auto w-full md:w-[450px]",
        isMobile ? "team-clock-mobile" : "",
      )}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: textColor,
      }}
      animate={{ width: isMobile ? "100%" : isExpanded ? "800px" : "400px" }}
      transition={{ duration: animationDuration }}
    >
      <div
        className={cn("flex flex-col rounded-lg p-4", {
          "w-full": isMobile || (!isExpanded && !isMobile),
          "w-1/2": isExpanded && !isMobile,
        })}
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          className="mb-4 flex items-center justify-between border-b pb-4 pt-1"
          style={{ borderColor: borderColor }}
        >
          <h2 className="text-2xl font-bold">Team</h2>
          {!isMobile && (
            <ToggleButton onClick={handleToggle} accentColor={accentColor} textColor={textColor} />
          )}
        </div>
        <div className="flex grow items-center justify-center">
          <Clock
            angle={angle}
            pressed={isExpanded}
            size={isMobile ? Math.min(clockSize, window.innerWidth - 40) : clockSize}
            animationDuration={animationDuration}
            accentColor={accentColor}
            textColor={textColor}
            backgroundColor={backgroundColor}
          />
        </div>
        <div className="my-4 text-center text-3xl font-semibold">
          {currentTime.toLocaleTimeString([], {
            hour: use24HourFormat ? "2-digit" : "numeric",
            minute: "2-digit",
            second: showSeconds ? "2-digit" : undefined,
            hour12: !use24HourFormat,
          })}
        </div>
      </div>

      {/* Add vertical dividing line */}
      {isExpanded && !isMobile && (
        <div className="h-full w-px" style={{ backgroundColor: borderColor }}></div>
      )}

      <AnimatePresence>
        {(isExpanded || isMobile) && (
          <motion.div
            className={cn("overflow-y-auto rounded-r-lg", {
              "team-clock-mobile-list w-full": isMobile,
              "w-1/2": !isMobile,
            })}
            style={{ backgroundColor: backgroundColor }}
            initial={isMobile ? { opacity: 1 } : { width: 0, opacity: 0 }}
            animate={isMobile ? { opacity: 1 } : { width: "50%", opacity: 1 }}
            exit={isMobile ? { opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: animationDuration }}
          >
            <motion.div
              className="space-y-4 p-4"
              initial={isMobile ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: 0 } : { x: "100%" }}
              transition={{ duration: animationDuration }}
            >
              {users.map((user, index) => (
                <ListElement
                  key={index}
                  name={user.name}
                  city={user.city}
                  country={user.country}
                  pfp={user.pfp}
                  timeDifference={user.timeDifference}
                  onSelect={handleUserSelect}
                  onHover={handleUserHover}
                  isSelected={selectedUser === user.name}
                  isHovered={hoveredUser === user.name}
                  isMobile={isMobile}
                  currentTime={currentTime}
                  animationDuration={animationDuration}
                  accentColor={accentColor}
                  textColor={textColor}
                  hoverBackgroundColor={hoverBackgroundColor}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ClockProps {
  angle: number;
  pressed: boolean;
  size: number;
  animationDuration: number;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

function Clock({
  angle,
  size,
  animationDuration,
  accentColor,
  textColor,
  backgroundColor,
}: ClockProps) {
  const [time, setTime] = useState(() => new Date());
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    <div
      className="flex items-center justify-center py-14"
      style={{ "--accent-color": accentColor } as React.CSSProperties}
    >
      <div
        className="relative flex items-center justify-center rounded-full border p-6 text-center text-xl"
        ref={gradientRef}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          backgroundColor: backgroundColor,
          borderColor: textColor,
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{ transform: `rotate(${i * 30}deg) translate(0, -46%)` }}
          >
            <hr className="h-[20px] w-[3px] rounded-lg" style={{ backgroundColor: textColor }} />
          </div>
        ))}

        <motion.div
          className="absolute top-[50%] h-[100px] w-[5px] origin-bottom rounded-2xl"
          style={{ transformOrigin: "50% 0%", backgroundColor: textColor }}
          animate={{ rotate: 180 + hourDegrees + angle }}
          transition={{ duration: animationDuration }}
        />
        <motion.div
          className="absolute top-[50%] h-[120px] w-[4px] origin-bottom rounded-2xl"
          style={{
            transformOrigin: "50% 0%",
            backgroundColor: textColor,
            opacity: 0.6,
          }}
          animate={{ rotate: 180 + minuteDegrees }}
          transition={{ duration: animationDuration }}
        />
        <motion.div
          className="absolute top-[50%] w-[2px] origin-bottom rounded-2xl bg-accent"
          style={{ height: `${size * 0.4}px`, transformOrigin: "50% 0%" }}
          animate={{ rotate: 180 + secondDegrees }}
          transition={{ duration: animationDuration }}
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
  onSelect: (name: string, timeDifference: string) => void;
  onHover: (name: string | null, timeDifference: string | null) => void;
  isSelected: boolean;
  isHovered: boolean;
  isMobile: boolean;
  currentTime: Date;
  animationDuration: number;
  accentColor: string;
  textColor: string;
  hoverBackgroundColor: string;
}

function ListElement(props: ListElementProp) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    if (!props.isMobile) {
      setIsHovered(true);
      props.onHover(props.name, props.timeDifference);
    }
  };

  const handleLeave = () => {
    if (!props.isMobile) {
      setIsHovered(false);
      props.onHover(null, null);
    }
  };

  const handleClick = () => {
    props.onSelect(props.name, props.timeDifference);
  };

  const localTime = useMemo(() => {
    const hourDifference = parseInt(props.timeDifference, 10);
    const newTime = new Date(props.currentTime);
    newTime.setHours(newTime.getHours() + hourDifference);
    return newTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [props.currentTime, props.timeDifference]);

  return (
    <motion.div
      className={cn("flex cursor-pointer items-center rounded-lg p-3", "")}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      animate={{
        boxShadow: props.isSelected ? "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" : "none",
        backgroundColor: props.isSelected || isHovered ? props.hoverBackgroundColor : "transparent",
      }}
      transition={{ duration: props.animationDuration }}
      style={{ color: props.textColor }}
    >
      <img src={props.pfp} alt={props.name} className="mr-4 h-10 w-10 rounded-full" />
      <div className="grow">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{props.name}</span>
          <div className="relative text-sm">
            <AnimatePresence>
              {!props.isSelected && !isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: props.animationDuration }}
                >
                  {localTime}
                </motion.div>
              )}
              {(props.isSelected || isHovered) && (
                <motion.div
                  className={"whitespace-nowrap text-xs sm:text-sm"}
                  style={{ color: parseInt(props.timeDifference, 10) < 0 ? "#EF4444" : "#10B981" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: props.animationDuration }}
                >
                  {parseInt(props.timeDifference, 10) === 0
                    ? "+ 0 Hours"
                    : `${props.timeDifference} Hours`}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div
          className="text-sm"
          style={{ color: props.textColor }}
        >{`${props.city}, ${props.country}`}</div>
      </div>
    </motion.div>
  );
}

type ToggleButtonProps = {
  onClick: (isToggled: boolean) => void;
  accentColor: string;
  textColor: string;
};

function ToggleButton({ onClick, accentColor, textColor, ...props }: ToggleButtonProps) {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    onClick(!isToggled);
  };

  return (
    <motion.button
      className="relative inline-flex cursor-pointer items-center"
      onClick={handleClick}
      {...props}
    >
      <span className="mr-3 text-sm font-medium" style={{ color: textColor }}>
        {isToggled ? "Hide List" : "Show List"}
      </span>
      <div className="relative">
        <motion.div
          className="h-6 w-11 rounded-full bg-gray-200"
          animate={{ backgroundColor: isToggled ? accentColor : "#D1D5DB" }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"
          animate={{ x: isToggled ? 20 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );
}
