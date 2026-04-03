import React from 'react'

const TimeCard = ({time, Condition, temperature}) => {
  return (
    <section className='flex flex-col border-r border-white/20 p-6 last:border-0 gap-1 items-center justify-center min-w-[120px]'>
        <Condition className='h-6 w-6 text-yellow-200' />
        <span className='text-sm sm:text-lg text-white'>{temperature}</span>
        <span className='text-xs sm:text-sm text-white/80'>{time}</span>
    </section>
  )
}

export default TimeCard
