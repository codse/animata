"use client";

import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  [key: string]: unknown; // Allow additional custom fields
}

interface TimelineStyles {
  lineColor: string;
  activeLineColor: string;
  dotColor: string;
  activeDotColor: string;
  dotSize: string;
  titleColor: string;
  activeTitleColor: string;
  descriptionColor: string;
  dateColor: string;
}

const DOT_DURATION = 0.12;
const LINE_DURATION = 0.15;
const STAGGER = 0.08;
const LINE_OFFSET = 0.04;

function computeDelays(
  index: number,
  active: number | null,
  prev: number | null,
): { dotDelay: number; lineDelay: number } {
  const a = active ?? -1;
  const p = prev ?? -1;

  // Extending: top-to-bottom cascade from the previous frontier
  if (a > p) {
    if (p < 0) {
      return { dotDelay: index * STAGGER, lineDelay: index * STAGGER + LINE_OFFSET };
    }
    return {
      dotDelay: index > p ? (index - p) * STAGGER : 0,
      lineDelay: index === p ? 0 : index > p ? (index - p) * STAGGER + LINE_OFFSET : 0,
    };
  }

  // Retracting: bottom-to-top reverse cascade
  if (a < p) {
    return {
      dotDelay: index <= p && index > a ? (p - index) * STAGGER : 0,
      lineDelay: index >= Math.max(a, 0) && index < p ? (p - 1 - index) * STAGGER + LINE_OFFSET : 0,
    };
  }

  return { dotDelay: 0, lineDelay: 0 };
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isDotActive: boolean;
  isLineActive: boolean;
  isLast: boolean;
  dotDelay: number;
  lineDelay: number;
  onEnter: () => void;
  onClick?: () => void;
  styles: TimelineStyles;
  customRender?: (event: TimelineEvent) => React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isDotActive,
  isLineActive,
  isLast,
  dotDelay,
  lineDelay,
  onEnter,
  onClick,
  styles,
  customRender,
}) => {
  const dotStyle: React.CSSProperties = {
    width: styles.dotSize,
    height: styles.dotSize,
    borderColor: isDotActive ? styles.activeDotColor : styles.dotColor,
    backgroundColor: isDotActive ? styles.activeDotColor : "hsl(var(--background))",
    transform: isDotActive ? "scale(1.2)" : "scale(1)",
    transitionProperty: "background-color, border-color, transform",
    transitionDuration: `${DOT_DURATION}s`,
    transitionDelay: `${dotDelay}s`,
    transitionTimingFunction: "ease",
  };

  const lineFillStyle: React.CSSProperties = {
    backgroundColor: styles.activeLineColor,
    transform: isLineActive ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    transitionProperty: "transform",
    transitionDuration: `${LINE_DURATION}s`,
    transitionDelay: `${lineDelay}s`,
    transitionTimingFunction: "ease-in-out",
  };

  const titleStyle: React.CSSProperties = {
    color: isDotActive ? styles.activeTitleColor : styles.titleColor,
    transitionProperty: "color",
    transitionDuration: `${DOT_DURATION}s`,
    transitionDelay: `${dotDelay}s`,
  };

  const clickable = Boolean(onClick);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover drives visual state; click is optional and handled with keyboard support when present
    <div
      className="flex last:mb-0"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="relative mr-4 flex flex-col items-center">
        <div
          className={cn("absolute bottom-0 top-0 w-1", isLast ? "hidden" : "block")}
          style={{ backgroundColor: styles.lineColor }}
        >
          <div className="h-full w-full" style={lineFillStyle} />
        </div>
        <div className="relative z-10 rounded-full border-4" style={dotStyle} />
      </div>
      <div className={cn("grow leading-5", !isLast && "mb-3")}>
        {customRender ? (
          customRender(event)
        ) : (
          <>
            <h3 className="text-lg font-semibold" style={titleStyle}>
              {event.title}
            </h3>
            <p style={{ color: styles.descriptionColor }}>{event.description}</p>
            <span className="text-sm" style={{ color: styles.dateColor }}>
              {event.date}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

interface AnimatedTimelineProps {
  events: TimelineEvent[];
  className?: string;
  styles?: Partial<TimelineStyles>;
  customEventRender?: (event: TimelineEvent) => React.ReactNode;
  onEventHover?: (event: TimelineEvent | null) => void;
  onEventClick?: (event: TimelineEvent) => void;
  initialActiveIndex?: number;
}

const defaultStyles: TimelineStyles = {
  lineColor: "#d1d5db",
  activeLineColor: "#22c55e",
  dotColor: "#d1d5db",
  activeDotColor: "#22c55e",
  dotSize: "1.5rem",
  titleColor: "inherit",
  activeTitleColor: "#22c55e",
  descriptionColor: "inherit",
  dateColor: "inherit",
};

export function AnimatedTimeline({
  events,
  className = "",
  styles: customStyles = {},
  customEventRender,
  onEventHover,
  onEventClick,
  initialActiveIndex,
}: AnimatedTimelineProps) {
  const [state, setState] = useState<{ active: number | null; prev: number | null }>({
    active: initialActiveIndex ?? null,
    prev: null,
  });
  const styles = { ...defaultStyles, ...customStyles };

  const setActive = (index: number | null) => {
    setState((s) => (s.active === index ? s : { active: index, prev: s.active }));
    onEventHover?.(index !== null ? events[index] : null);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: mouseLeave only clears hover state on the list container
    <div className={`relative py-4 ${className}`} onMouseLeave={() => setActive(null)}>
      {events.map((event, index) => {
        const isDotActive = state.active !== null && index <= state.active;
        const isLineActive = state.active !== null && index < state.active;
        const { dotDelay, lineDelay } = computeDelays(index, state.active, state.prev);
        return (
          <TimelineItem
            key={event.id}
            event={event}
            index={index}
            isDotActive={isDotActive}
            isLineActive={isLineActive}
            isLast={index === events.length - 1}
            dotDelay={dotDelay}
            lineDelay={lineDelay}
            onEnter={() => setActive(index)}
            onClick={onEventClick ? () => onEventClick(event) : undefined}
            styles={styles}
            customRender={customEventRender}
          />
        );
      })}
    </div>
  );
}

interface AnimatedTimelinePageProps {
  events?: TimelineEvent[];
  title?: string;
  containerClassName?: string;
  timelineStyles?: Partial<TimelineStyles>;
  customEventRender?: (events: TimelineEvent) => React.ReactNode;
  onEventHover?: (events: TimelineEvent | null) => void;
  onEventClick?: (events: TimelineEvent) => void;
  initialActiveIndex?: number;
}

export default function AnimatedTimelinePage({
  events,
  title,
  containerClassName,
  timelineStyles,
  customEventRender,
  onEventHover,
  onEventClick,
  initialActiveIndex,
}: AnimatedTimelinePageProps) {
  const DefaultEvents = [
    { id: "1", title: "Event 1", description: "Description 1", date: "2023-01-01" },
    { id: "2", title: "Event 2", description: "Description 2", date: "2023-02-01" },
    { id: "3", title: "Event 3", description: "Description 3", date: "2023-03-01" },
  ];
  const defaultTitle = "Timeline";

  return (
    <div
      className={cn(
        "container mx-auto rounded-lg bg-background px-8 pt-6 text-foreground",
        containerClassName,
      )}
    >
      <h1 className="text-2xl font-bold">{title || defaultTitle}</h1>
      <AnimatedTimeline
        events={events || DefaultEvents}
        className="max-w-2xl"
        styles={timelineStyles}
        customEventRender={customEventRender}
        onEventHover={onEventHover}
        onEventClick={onEventClick}
        initialActiveIndex={initialActiveIndex}
      />
    </div>
  );
}
