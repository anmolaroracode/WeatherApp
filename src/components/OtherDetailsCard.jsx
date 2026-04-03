import React from 'react'

const OtherDetailsCard = ({ icon: Icon, label, value, iconClassName = "" }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform duration-300">
      {Icon && <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconClassName}`} />}

      <div className="flex flex-col">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-sm sm:text-base text-white font-medium">{value}</span>
      </div>
    </div>
  )
}

export default OtherDetailsCard
