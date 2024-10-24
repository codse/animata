"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  [key: string]: unknown; // Allow additional custom fields
}

interface TimelineItemProps {
  event: TimelineEvent;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onHover: (index: number | null) => void;
  index: number;
  activeIndex: number | null;
  styles: TimelineStyles;
  customRender?: (event: TimelineEvent) => React.ReactNode;
}

interface TimelineStyles {
  lineColor: string;
  activeLineColor: string;
  dotColor: string;
  activeDotColor: string;
  dotSize: string;
  titleColor: string;
  descriptionColor: string;
  dateColor: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isActive,
  isLast,
  onHover,
  index,
  activeIndex,
  styles,
  customRender,
}) => {
  const fillDelay = activeIndex !== null ? Math.max(0, (index - 1) * 0.1) : 0;
  const fillDuration = activeIndex !== null ? Math.max(0.2, 0.5 - index * 0.1) : 0.5;

  return (
    <motion.div
      className="flex last:mb-0"
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mr-4 flex flex-col items-center">
        <div
          className={`absolute ${isLast ? "hidden" : "block"} bottom-0 top-0 w-1`}
          style={{ backgroundColor: styles.lineColor }}
        >
          <motion.div
            className="w-full origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: fillDuration, delay: fillDelay }}
            style={{ height: "100%", backgroundColor: styles.activeLineColor }}
          />
        </div>
        <motion.div
          className="relative z-10 rounded-full border-4"
          style={{
            width: styles.dotSize,
            height: styles.dotSize,
            borderColor: isActive ? styles.activeDotColor : styles.dotColor,
            backgroundColor: isActive ? styles.activeDotColor : "Background",
          }}
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? styles.activeDotColor : "Background",
            borderColor: isActive ? styles.activeDotColor : styles.dotColor,
          }}
          transition={{ duration: fillDuration, delay: fillDelay }}
        />
      </div>
      <div className={cn("flex-grow leading-5", !isLast && "mb-3")}>
        {customRender ? (
          customRender(event)
        ) : (
          <>
            <h3 className="text-lg font-semibold" style={{ color: styles.titleColor }}>
              {event.title}
            </h3>
            <p style={{ color: styles.descriptionColor }}>{event.description}</p>
            <span className="text-sm" style={{ color: styles.dateColor }}>
              {event.date}
            </span>
          </>
        )}
      </div>
    </motion.div>
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
  const [activeIndex, setActiveIndex] = useState<number | null>(initialActiveIndex ?? null);
  const styles = { ...defaultStyles, ...customStyles };

  const handleHover = (index: number | null) => {
    setActiveIndex(index);
    onEventHover?.(index !== null ? events[index] : null);
  };

  return (
    <div className={`relative py-4 ${className}`}>
      {events.map((event, index) => (
        <div key={event.id} onClick={() => onEventClick?.(event)}>
          <TimelineItem
            event={event}
            isActive={activeIndex !== null && index <= activeIndex}
            isFirst={index === 0}
            isLast={index === events.length - 1}
            onHover={handleHover}
            index={index}
            activeIndex={activeIndex}
            styles={styles}
            customRender={customEventRender}
          />
        </div>
      ))}
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
