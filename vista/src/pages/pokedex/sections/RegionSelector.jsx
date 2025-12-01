import { useState, useEffect } from 'react';
import ButtonRegion from '../../../components/ui/ButtonRegion';
import { obtenerRegionesPokemon, obtenerPokemones } from '../../../services/pokeapiService';

const RegionSelector = ({ 
  setPokemones, 
  setPagina, 
  setTotalPokemon, 
  setRegionActual,
  regiones,
  setRegiones,
  regionActual
}) => {
  useEffect(() => {
    const cargarRegiones = async () => {
      const regionesApi = await obtenerRegionesPokemon();
      setRegiones(regionesApi);
      if (regionesApi.length > 0 && !regionActual) {
        const primeraRegion = regionesApi[0];
        await seleccionarRegion(primeraRegion);
      }
    };

    cargarRegiones();
  }, []);

  const seleccionarRegion = async (region) => {
    console.log("Seleccionando región:", region.nombre);
    
    // Si ya es la región actual, NO hacer nada
    if (regionActual && regionActual.nombre === region.nombre) {
      console.log("Ya está seleccionada esta región");
      return;
    }
    
    // Solo cambiar si es una región diferente
    console.log("Cambiando a nueva región");
    setTotalPokemon(region.cantidad);
    setRegionActual(region);
    setPagina(1);

    const data = await obtenerPokemones(20, region.offset);
    setPokemones(data);
  };

  return (
    <div className="flex flex-wrap justify-center gap-[0.5rem] my-6">
      {regiones.map(region => (
        <ButtonRegion
          key={region.nombre}
          estado={regionActual?.nombre === region.nombre}
          onclick={() => seleccionarRegion(region)}
        >
          {region.nombre}
        </ButtonRegion>
      ))}
    </div>
  );
};

export default RegionSelector;