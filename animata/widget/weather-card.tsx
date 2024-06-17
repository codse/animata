import { CircleArrowUp, CloudSunRain } from 'lucide-react'
import React from 'react'

function WeatherCard() {
  return (
      <div className="over-container relative h-52 w-52  ">
        <div className="container absolute inset-0 h-full w-full rounded-xl z-10 flex flex-col justify-between p-2 bg-gradient-to-r dark:from-gray-700 dark:to-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10   from-gray-100 to-gray-300
    ">
          <div className="temp-container flex flex-col gap-2 z-20">
            <p className="city opacity-70 dark:text-white">Tokyo</p>
            <div className="cloud-temp flex items-center ">
              <CloudSunRain className='w-10 h-10 dark:text-white' />
              <p className="temp text-5xl dark:text-white font-medium">19&deg;</p>
            </div>
            <p className="feels-like opacity-70 dark:text-white ">Feels like 21&deg;</p>
          </div>
          <div className="max-min z-20 flex justify-between   py-1    my-2 rounded-xl bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30
">
            <div className="max flex px-2 text-orange-500 items-center gap-1 dark:text-orange-200 "><CircleArrowUp className='h-5 w-5' />24&deg;</div>
            <p>|</p>
            <div className="min flex text-green-800 px-3 items-center gap-1 dark:text-green-200"><CircleArrowUp className='rotate-180 h-5 w-5' />9&deg;</div>
          </div>
        </div>
      </div>
  )

}

export default WeatherCard
