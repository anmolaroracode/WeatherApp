import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

const DayCard = ({ day, high, low, WeatherIcon }) => {
  return (
    <section className='flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-3 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform duration-300'>
      <div className='flex items-center gap-2'>
        <span className='text-sm sm:text-base text-white font-medium'>{day}</span>
      </div>

      <div className='text-white/90'>
        <WeatherIcon className='h-5 w-5 sm:h-6 sm:w-6' />
      </div>

      <div className='flex items-center gap-2 text-xs sm:text-sm'>
        <span className='hidden sm:block text-white/70'>High</span>
        <ArrowUp className='h-4 w-4 text-red-400' />
        <span className='text-sm sm:text-base text-white font-medium mr-2'>{high}</span>

        <span className='hidden sm:block text-white/70'>Low</span>
        <ArrowDown className='h-4 w-4 text-blue-400' />
        <span className='text-sm sm:text-base text-white/80 font-medium'>{low}</span>
      </div>
    </section>
  )
}

export default DayCard
