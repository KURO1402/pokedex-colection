import { useState, useEffect } from 'react';
import PokemonCard from '../../../components/ui/PokemonCard';
import PokemonLoading from '../../../components/ui/PokemonLoading';

const PokedexGrid = ({ pokemones, captured, setCaptured }) => {
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Mostrar loading cuando el array está vacío pero debería tener datos
    if (pokemones.length === 0) {
      setCargando(true);
      const timer = setTimeout(() => {
        setCargando(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCargando(false);
    }
  }, [pokemones]);

  if (cargando) {
    return (
      <PokemonLoading />
    );
  }

  if (!pokemones.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-center font-bold">No hay pokemones</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
      {pokemones.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          isCaptured={captured}
          onToggleCapture={() => setCaptured(!captured)}
          datos={pokemon}
        />
      ))}
    </div>
  );
};

export default PokedexGrid;