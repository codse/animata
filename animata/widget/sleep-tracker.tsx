'use client'
import Image from 'next/image'
import React from 'react'
import Histogram from '../graphs/bar-chart'
interface ISleepTrackerProps {
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];
  image: string;
}
function SleepTracker({ items, image }: ISleepTrackerProps) {
  return (
    <div className=" h-52 w-52 dark:bg-slate-800 bg-white border-gray-200 border-2 flex flex-col justify-evenly rounded-2xl py-2 px-3 ">
      <div className="inner-container flex flex-row items-center gap-3 ">
        <div className="icon w-4 h-4 rounded-full bg-red-50 mb-1 flex items-center justify-center">
          <div className="inner-icon  w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        <p className='dark:text-white text-gray-600  mb-1'>Sleep Tracker</p>
      </div>
      <div className="image-container">
        <Image className='w-full rounded-xl h-[90px] object-cover' src={image} alt="Sleep Tracker" width={200} height={200} />
      </div>
      <div className="graph-container">
        <Histogram className='pt-3' items={items} height={40} />
      </div>
      <div className="activity flex flex-row justify-between mt-2">
        <p className='opacity-70 dark:text-white'>Activity</p>
        <p className='dark:text-white'>32m ago</p>
      </div>
    </div>
  )
}

export default SleepTracker