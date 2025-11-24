import React from 'react'

const ButtonFilter = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 border-2 rounded-[20px] cursor-pointer transition-all duration-300 ease-in-out 
        ${
          active === children
            ? "bg-[var(--primary-color)] border-[var(--primary-color)] text-white" 
            : "bg-white border-gray-300"
        }`}
    >
      {children}
    </button>
  );
};


export default ButtonFilter
