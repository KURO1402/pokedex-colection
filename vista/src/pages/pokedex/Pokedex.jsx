import { useState, useEffect } from 'react';
import StatsSection from './sections/StatsSection';
import RegionSelector from './sections/RegionSelector';
import PokedexGrid from './sections/PokedexGrid';
import PaginationButtons from './sections/PaginationButtons';
import { obtenerPokemones } from '../../services/pokeapiService';

function Pokedex() {
  const [pokemones, setPokemones] = useState([]);
  const [captured, setCaptured] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [regionActual, setRegionActual] = useState(null);
  const [totalPokemon, setTotalPokemon] = useState(151);
  const [regiones, setRegiones] = useState([]);

  // Cargar Pokémon cuando cambia la región o la página
  useEffect(() => {
    const cargarPokemones = async () => {
      if (!regionActual) return;

      try {
        const offset = regionActual.offset + (pagina - 1) * 20;
        const maxLimit = regionActual.offset + regionActual.cantidad;
        const data = await obtenerPokemones(20, offset, maxLimit);
        setPokemones(data);
      } catch (error) {
        console.error("Error cargando pokémones:", error);
      }
    };

    cargarPokemones();
  }, [pagina, regionActual]);

  return (
    <div className="min-h-screen font-[var(--app-font)] bg-[var(--background-color)] text-[var(--text-color)]">

      <div className="max-w-[1200px] mx-auto p-[1rem]">

        <div className="flex justify-between my-4 p-[1rem] bg-white rounded-xl shadow-[var(--shadow)] flex-wrap">
          <StatsSection
            numeroPokemones={regionActual?.cantidad || 151}
            pokemonCapturados={0}
            porcentaje={0}
          >
            {regionActual ? `Progreso ${regionActual.nombre}` : 'Progreso Kanto'}
          </StatsSection>
          <StatsSection
            numeroPokemones={1025}
            pokemonCapturados={0}
            porcentaje={0}
          >
            Progreso Global
          </StatsSection>
        </div>

        <RegionSelector
          setPokemones={setPokemones}
          setPagina={setPagina}
          setTotalPokemon={setTotalPokemon}
          setRegionActual={setRegionActual}
          regiones={regiones}
          setRegiones={setRegiones}
          regionActual={regionActual}
        />

        <PokedexGrid
          pokemones={pokemones}
          captured={captured}
          setCaptured={setCaptured}
        />

        {regionActual && (
          <PaginationButtons
            pagina={pagina}
            setPagina={setPagina}
            totalPokemon={regionActual.cantidad}
            regionActual={regionActual}
            regiones={regiones}
            setRegionActual={setRegionActual}
            setPokemones={setPokemones}
          />
        )}

      </div>
    </div>
  );
}

export default Pokedex;