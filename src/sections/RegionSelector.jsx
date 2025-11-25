import { useState, useEffect } from 'react';
import ButtonRegion from '../components/ButtonRegion';
import { obtenerRegionesPokemon } from '../services/pokeapiService';

const RegionSelector = () => {
    const [regiones, setRegiones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [estado, setEstado] = useState("");

    useEffect(() => {
        const cargarRegiones = async () => {
            try {
                const data = await obtenerRegionesPokemon();
                setRegiones(data.results);
                setEstado(data.results[0]?.name || "");
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarRegiones();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap justify-center gap-[0.5rem] my-6">
            {regiones.map(region => (
                <ButtonRegion 
                    key={region.name}
                    estado={estado === region.name}
                    onclick={() => setEstado(region.name)}>
                    {region.name}
                </ButtonRegion>
            ))}
        </div>
    );
};

export default RegionSelector
