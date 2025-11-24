import React from 'react'
import ButtonSearch from '../components/ButtonSearch';

const Header = () => {
  return (
    <header className="bg-[var(--primary-color)] p-[1rem] text-center shadow-[var(--shadow)] sticky top-0 z-100">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[1rem]">

        {/* header-top */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center gap-[1rem]">

          <div className="text-white flex-1">
            <h1 className="text-3xl font-bold mb-[0.5rem]">Pokedex Regional</h1>
            <p>Haz clic en un Pokémon para marcarlo como capturado</p>
          </div>

          {/* search-container */}
          <div className="flex flex-col sm:flex-row gap-[0.5rem] justify-center w-full md:w-auto">

            <input
              type="text"
              className="
                bg-white p-[0.75rem] border-none rounded-3xl text-[1rem]
                min-w-[200px] w-full sm:w-auto sm:min-w-[250px] sm:max-w-[400px]
              "
              placeholder="Buscar Pokémon..."
            />
            <ButtonSearch>Buscar</ButtonSearch> 
            <ButtonSearch>Limpiar</ButtonSearch>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header
