function HighlightExpand() {
  return (
    <span className="absolute -bottom-[1px] z-0 h-0.5 w-full bg-blue-300 transition-all ease-slow group-hover:h-full dark:bg-lime-300" />
  );
}

export default function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-block">
      <HighlightExpand />
      <span className="relative px-0.5 transition-colors group-hover:text-blue-900 dark:group-hover:text-lime-900">
        {children}
      </span>
    </span>
  );
}
