interface DiagonalLinesProps {
  /**
   * Color of the line
   */
  color?: string;

  /**
   * Spacing between lines
   */
  spacing?: number;

  /**
   * Content of the component
   */
  children?: React.ReactNode;
}

function Placeholder() {
  return (
    <div className="flex max-h-full min-h-64 min-w-72 max-w-full items-center justify-center">
      <div className="rounded bg-white px-4 py-2">This has diagonal line background</div>
    </div>
  );
}

export default function DiagonalLines({
  color = "#cacaca",
  spacing = 10,
  children,
}: DiagonalLinesProps) {
  return (
    <div className="bg-background">
      <div
        style={{
          backgroundImage: `repeating-linear-gradient(45deg,
                  ${color} 0,
                  ${color} 1px,
                  transparent 0,
                  transparent 50%)`,
          backgroundSize: `${spacing}px ${spacing}px`,
        }}
      >
        {children ?? <Placeholder />}
      </div>
    </div>
  );
}
