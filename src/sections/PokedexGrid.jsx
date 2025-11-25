import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import { obtenerPokemones } from '../services/pokeapiService';

const PokedexGrid = () => {
  const [pokemones, setPokemones] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const consultarPokemon = async () => {
      try {
        const data = await obtenerPokemones(52,0);
        setPokemones(data);
      } catch (error) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    consultarPokemon();
  }, []);
  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
      {pokemones.map(pokemon => (
        <PokemonCard key={pokemon.id} isCaptured={captured} onToggleCapture={() => setCaptured(!captured)} datos={pokemon} />
      ))}
      {console.log(pokemones)}
    </div>
  );
};

export default PokedexGrid
