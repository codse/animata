import { CircleArrowUp, CloudSunRain } from "lucide-react";

export default function WeatherCard() {
  return (
    <div className="relative flex size-52 flex-col rounded-3xl bg-opacity-10 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:from-gray-700 dark:to-gray-900">
      <div className="flex flex-1 flex-col gap-2 dark:text-white">
        <p className="city opacity-70">Tokyo</p>
        <div className="flex items-center">
          <CloudSunRain className="h-10 w-10" />
          <p className="text-5xl font-black">19&deg;</p>
        </div>
        <p className="feels-like opacity-70">Feels like 21&deg;</p>
      </div>
      <div className="flex justify-between rounded-xl bg-gray-400 bg-opacity-30 bg-clip-padding py-1 backdrop-blur-lg backdrop-filter">
        <div className="flex items-center gap-1 px-2 text-orange-500 dark:text-orange-200">
          <CircleArrowUp className="h-5 w-5" />
          24&deg;
        </div>
        <p className="text-black opacity-50">|</p>
        <div className="flex items-center gap-1 px-3 text-green-800 dark:text-green-200">
          <CircleArrowUp className="h-5 w-5 rotate-180" />
          9&deg;
        </div>
      </div>
    </div>
  );
}
