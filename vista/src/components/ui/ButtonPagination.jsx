import React from 'react'

const ButtonPagination = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 
        border border-gray-300 
        rounded 
        cursor-pointer 
        transition-all duration-300 ease-in-out
        ${active 
          ? 'bg-[var(--primary-color)] text-white' 
          : 'bg-white hover:bg-[var(--primary-color)] hover:text-white'
        }
      `}
    >
      {children}
    </button>
  );
};
export default ButtonPagination;
