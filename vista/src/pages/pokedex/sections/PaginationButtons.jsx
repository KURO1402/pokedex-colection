import { useState, useEffect } from 'react'
import ButtonPagination from '../../../components/ui/ButtonPagination'
import { obtenerPokemones } from '../../../services/pokeapiService';

const PaginationButtons = ({ 
  pagina, 
  setPagina, 
  totalPokemon, 
  regionActual, 
  regiones, 
  setRegionActual,
  setPokemones
}) => {
  const totalPaginas = Math.ceil(totalPokemon / 20);
  const [siguienteRegion, setSiguienteRegion] = useState(null);

  useEffect(() => {
    if (regionActual && regiones.length > 0) {
      const indiceActual = regiones.findIndex(r => r.nombre === regionActual.nombre);
      if (indiceActual < regiones.length - 1) {
        setSiguienteRegion(regiones[indiceActual + 1]);
      } else {
        setSiguienteRegion(null);
      }
    }
  }, [regionActual, regiones]);

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const paginaSiguiente = async () => {
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
    } else if (siguienteRegion) {
      await cambiarARegion(siguienteRegion);
    }
  };

  const cambiarARegion = async (region) => {
    setRegionActual(region);
    setPagina(1);
    
    const data = await obtenerPokemones(20, region.offset);
    setPokemones(data);
  };

  const renderTodasLasPaginas = () => {
    const botones = [];
    
    for (let i = 1; i <= totalPaginas; i++) {
      botones.push(
        <ButtonPagination 
          key={i}
          active={pagina === i} 
          onClick={() => cambiarPagina(i)}
        >
          {i}
        </ButtonPagination>
      );
    }
    
    return botones;
  };

  return (
    <div className="flex justify-center my-8 gap-2 flex-wrap">
      <ButtonPagination 
        onClick={paginaAnterior} 
        disabled={pagina === 1}
      >
        Anterior
      </ButtonPagination>
      
      {renderTodasLasPaginas()}
      
      <ButtonPagination 
        onClick={paginaSiguiente}
        disabled={!siguienteRegion && pagina === totalPaginas}
      >
        {pagina < totalPaginas 
          ? 'Siguiente' 
          : siguienteRegion 
            ? `Ir a ${siguienteRegion.nombre}` 
            : 'Última página'
        }
      </ButtonPagination>
    </div>
  );
}

export default PaginationButtons;