import { StarsIcon } from "lucide-react";

export function Announcement({ text }: { text: string }) {
  return (
    <div className="group relative isolate z-50 mx-auto w-fit cursor-pointer p-4">
      <div className="rounded-lg bg-gradient-to-r from-purple-100 to-yellow-100 p-1 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
        <div className="flex items-center justify-between px-4 py-2">
          <StarsIcon className="h-4 w-4 text-purple-500" />
          <span className="mx-2 text-sm font-medium text-gray-800">{text}</span>
          <StarsIcon className="h-4 w-4 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}
