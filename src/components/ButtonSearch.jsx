import React from 'react'

const ButtonSearch = ({ children }) => {
    return (
        <button className="py-3 px-6 bg-white text-[var(--primary-color)] rounded-3xl font-bold cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap hover:bg-[#ffcb05] w-full sm:w-auto">
            {children}
        </button>
    )
}

export default ButtonSearch
