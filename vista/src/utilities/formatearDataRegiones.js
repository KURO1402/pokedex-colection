import { rangoRegiones } from "./constantes";

export const formatearDataRegiones = (regiones) => {
    const regionesFormateadas = regiones.map(region => {
        const rangos = rangoRegiones.find(
            rango => rango.nombre === region.name
        )
        return {
            nombre: region.name,
            cantidad: rangos.fin - rangos.inicio + 1,
            offset: rangos.inicio - 1
        }
    });
    return regionesFormateadas;
};
