import { useState } from 'react'
import PokemonCard from '../components/PokemonCard'

const PokedexGrid = () => {
  const [captured, setCaptured] = useState(false);

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
      <PokemonCard
        isCaptured={captured}
        onToggleCapture={() => setCaptured(!captured)}
      />
    </div>
  );
};

export default PokedexGrid
