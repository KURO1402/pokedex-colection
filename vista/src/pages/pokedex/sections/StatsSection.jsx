import React from 'react'

const StatsSection = ({ children, numeroPokemones, pokemonCapturados, porcentaje }) => {
    return (
        <div className="flex-1 min-w-[200px] mb-[1rem]">
            <h3 className="mb-[0.5rem] text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] pb-[0.25rem] font-bold text-xl">{children}</h3>
            <div>Total Pokémon: <span>{numeroPokemones}</span></div>
            <div>Pokémon capturados: <span className="font-bold text-[var(--secondary-color)]">{pokemonCapturados}</span></div>
            <div>Porcentaje: <span>{porcentaje} %</span></div>
            <div className="w-full bg-[#e0e0e0] rounded-xl mt-2 mb-[0.5rem] overflow-hidden">
                <div className="h-[10px] bg-[var(--owned-color)] rounded-xl transition-[width] duration-500 ease-in-out"></div>
            </div>
        </div>
    )
}

export default StatsSection
