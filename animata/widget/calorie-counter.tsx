'use client'
import DonutChart from "@/animata/graphs/donut-chart";
import Image from 'next/image';

interface ICalorieCounterProps {
  goal: number
  fulfilled: number
  image: string
}
function CalorieCounter({ goal, fulfilled, image }: ICalorieCounterProps) {
  return (
    <div className="relative calorie-container w-64 sm:w-72 h-[350px] flex justify-start gap-4 items-center flex-col bg-gray-100 border-2 border-gray-200 dark:border-none dark:bg-slate-800 px-5 py-3 rounded-2xl">
      <div className="day-date w-full pt-2 flex flex-row justify-between items-center">
        <div>
          <p className="day text-gray-400">Monday</p>
          <p className="date font-md text-xl dark:text-white">25 October</p>
        </div>
        <Image alt='image' src={image} height={300} width={300} className='h-10 w-10 rounded-full' />
      </div>
      <DonutChart
        progress={fulfilled / goal * 100}
        circleWidth={18}
        progressWidth={18}
        size={180}
        progressClassName='dark:text-cyan-300 text-green-400'
        className="relative flex items-center justify-center m-2"
      />
      <div className="absolute bottom-8 goal flex px-4 justify-between items-center rounded-xl h-14 w-56 sm:w-64 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-gray-100
">
        <p className='dark:text-white'>Your goal</p>
        <p className='text-orange-300 font-bold'>{goal}Cal</p>
      </div>
      <div className="fulfilled absolute top-40 flex flex-col items-center">
        <p className='text-gray-400 dark:text-gray-200'>Today</p>
        <p className='text-xl font-md dark:text-white'>{fulfilled}Cal</p>
      </div>
    </div>
  )
}
export default CalorieCounter
