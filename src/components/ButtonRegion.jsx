import React from 'react'

const ButtonRegion = ({ children, estado, onclick }) => {
  return (
    <button
      onClick={onclick}
      className={`border-2 border-[var(--primary-color)] rounded-3xl py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out font-bold text-xs capitalize
        ${estado ? "bg-[var(--primary-color)] text-white" : "bg-white text-black"}
        hover:bg-[var(--primary-color)] hover:text-white
      `}
    >
      {children}
    </button>
  )
}


export default ButtonRegion;
