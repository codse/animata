import React from "react";
interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;
}

export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
}: GlowCardProps) {
  return (
    <div className="">
      <div
        className="hover:shadow-glow bg-gradient-to-r p-0.5 hover:brightness-150"
        style={{
          transition: " box-shadow 0.5s ease",
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
        }}
      >
        <div
          className="blur-20 inset-0 h-full w-full bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]"
          style={{ transition: "filter 0.5s ease" }}
        ></div>
        <div className="bg-[#0b090a] p-8 text-center text-2xl text-white">
          GLOWING GRADIENT BORDER
        </div>
      </div>
    </div>
  );
}
