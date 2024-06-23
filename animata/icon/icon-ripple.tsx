import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface IconRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon we want to have.
   */
  icon: React.ElementType;
  /**
   * Size of Icon
   */
  iconSize?: number;
  /**
   * Colour of the Icon
   */
  iconColor?: string;
  /**
   * Border colour that will have ripple animation
   */
  borderColour?: string;
  /**
   * Padding around the icon
   */
  inset?: string;
}

export default function IconRipple({
  icon: Icon = Mic,
  iconSize = 24,
  iconColor = "#ddd",
  borderColour = "#ddd",
  inset = "10px",
}: IconRippleProps) {
  const customBorderStyle = {
    borderColor: borderColour,
  };
  const insetStyle = {
    top: `-${inset}`,
    bottom: `-${inset}`,
    left: `-${inset}`,
    right: `-${inset}`,
  };
  return (
    <div className={cn("relative flex items-center justify-center")}>
      <Icon size={iconSize} color={iconColor} />
      <div
        className={cn("absolute -inset-4 rounded-full border-2 hover:animate-ping")}
        style={{ ...customBorderStyle, ...insetStyle }}
      />
    </div>
  );
}
