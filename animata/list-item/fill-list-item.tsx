interface SwapTextProps {
  prefix: string;
  text: string;
}

export default function FillListItem({ prefix, text }: SwapTextProps) {
  return (
    <div className="group relative flex flex-wrap gap-1 overflow-hidden px-2">
      <div className="absolute left-0 -z-[1] h-4 w-4 bg-yellow-100 transition-all duration-300 group-hover:h-full group-hover:w-full dark:bg-gray-700" />
      <span className="md:text-md py-1 text-sm font-light text-gray-400 transition-all duration-300 group-hover:text-gray-800 dark:text-gray-700 dark:group-hover:text-gray-300">
        {prefix}
      </span>
      <span className="cursor-pointer select-none py-1 text-2xl font-normal tracking-tight md:text-4xl">
        {text}
      </span>
    </div>
  );
}
