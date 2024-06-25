interface GridProps {
  /**
   * Color of the grid
   */
  color?: string;

  /**
   * Size of the grid in pixels
   */
  size?: number;

  /**
   * Content of the component
   */
  children?: React.ReactNode;
}

function Placeholder({ size = 20 }: Pick<GridProps, "size">) {
  const widthSpread = 20;
  const heightSpread = 10;
  return (
    <div
      style={{
        // +1 to account for the border
        width: `${widthSpread * size + 1}px`,
        height: `${heightSpread * size + 1}px`,
      }}
      className="flex max-h-full max-w-full items-center justify-center"
    >
      <div className="rounded bg-white px-4 py-2">This has grid background</div>
    </div>
  );
}

export default function Grid({ color = "#cacaca", size = 20, children }: GridProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    >
      {children ?? <Placeholder size={size} />}
    </div>
  );
}
