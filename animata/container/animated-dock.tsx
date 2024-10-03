import { cn } from "@/lib/utils"; // Import utility for conditional class names
import {
  AnimatePresence, // Enables animation presence detection
  MotionValue, // Type for motion values
  motion, // Main component for animations
  useMotionValue, // Hook to create a motion value
  useSpring, // Hook to create smooth spring animations
  useTransform, // Hook to transform motion values
} from "framer-motion";
import Link from "next/link"; // Next.js Link component for navigation
import React, { useRef, useState } from "react"; // Importing React hooks
import { Menu, X } from "lucide-react"; // Importing icons from lucide-react

// Interface for props accepted by the AnimatedDock component
interface AnimatedDockProps {
  items: { title: string; icon: React.ReactNode; href: string }[]; // Array of menu items
  largeClassName?: string; // Optional class name for large dock
  smallClassName?: string; // Optional class name for small dock
}

// Main AnimatedDock component that renders both LargeDock and SmallDock
export default function AnimatedDock({ items, largeClassName, smallClassName }: AnimatedDockProps) {
  return (
    <>
      {/* Render LargeDock for larger screens */}
      <LargeDock items={items} className={largeClassName} />
      {/* Render SmallDock for smaller screens */}
      <SmallDock items={items} className={smallClassName} />
    </>
  );
}

// Component for the large dock, visible on larger screens
const LargeDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]; // Items to display
  className?: string; // Optional class name
}) => {
  const mouseXPosition = useMotionValue(Infinity); // Create a motion value for mouse X position
  return (
    <motion.div
      onMouseMove={(e) => mouseXPosition.set(e.pageX)} // Update mouse X position on mouse move
      onMouseLeave={() => mouseXPosition.set(Infinity)} // Reset on mouse leave
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 dark:bg-black/10 md:flex", // Large dock styles
        className,
        "border border-gray-200/30 backdrop-blur-sm dark:border-gray-800/30",
      )}
    >
      {/* Render each dock icon */}
      {items.map((item) => (
        <DockIcon mouseX={mouseXPosition} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

// Component for individual icons in the dock
function DockIcon({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue; // Motion value for mouse position
  title: string; // Title of the icon
  icon: React.ReactNode; // Icon component
  href: string; // Link destination
}) {
  const ref = useRef<HTMLDivElement>(null); // Ref for measuring distance from mouse

  // Calculate the distance from the mouse to the icon
  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }; // Get icon bounds
    return val - bounds.x - bounds.width / 2; // Calculate distance from center
  });

  // Transform properties for width and height based on mouse distance
  const widthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);

  // Transform properties for icon size based on mouse distance
  const iconWidthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);
  const iconHeightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);

  // Spring animations for smooth transitions
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconWidth = useSpring(iconWidthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconHeight = useSpring(iconHeightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  return (
    <Link href={href}>
      <motion.div
        ref={ref} // Reference for measuring
        style={{ width, height }} // Set dynamic width and height
        onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
        onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white"
      >
        <AnimatePresence>
          {/* Tooltip that appears on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }} // Initial animation state
              animate={{ opacity: 1, y: 0, x: "-50%" }} // Animation to visible state
              exit={{ opacity: 0, y: 2, x: "-50%" }} // Animation to exit state
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-white/80 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title} {/* Tooltip text */}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: iconWidth, height: iconHeight }} // Set dynamic icon size
          className="flex items-center justify-center"
        >
          {icon} {/* Render the icon */}
        </motion.div>
      </motion.div>
    </Link>
  );
}

// Component for the small dock, visible on smaller screens
const SmallDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]; // Items to display
  className?: string; // Optional class name
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close of the small dock

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {/* Render menu items when open */}
        {isOpen && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Animation to visible state
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: index * 0.05 }, // Delay based on index
                }}
                transition={{ delay: (items.length - 1 - index) * 0.05 }} // Delay for exit animations
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-black shadow-md backdrop-blur-md dark:bg-black/20 dark:text-white"
                >
                  <div className="h-4 w-4">{item.icon}</div> {/* Render the icon */}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Button to toggle the small dock open/close */}
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle isOpen state on click
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-black shadow-md backdrop-blur-md dark:bg-black/20 dark:text-white"
      >
        {/* Render the appropriate icon based on open/close state */}
        {isOpen ? (
          <X className="h-5 w-5" /> // Show close icon when open
        ) : (
          <Menu className="h-5 w-5" /> // Show menu icon when closed
        )}
      </button>
    </div>
  );
};
