import { ArrowRight } from "lucide-react";
interface MenuAnimationProps {
  menuItems: string[];
}
export default function MenuAnimation({ menuItems }: MenuAnimationProps) {
  return (
    <div className="flex flex-col overflow-hidden p-4 px-10">
      {menuItems.map((item, index) => (
        <div key={index} className="group flex items-center">
          <div className="relative">
            <ArrowRight
              className="absolute transform text-black opacity-0 transition-transform duration-300 ease-out hover:z-20 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100"
              size={20}
            />
            <h1 className="z-10 cursor-pointer font-mono font-semibold text-black transition-transform duration-300 ease-out group-hover:translate-x-[30px] group-hover:text-blue-500 dark:text-white">
              {item}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
