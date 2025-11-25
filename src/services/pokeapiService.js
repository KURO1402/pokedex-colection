import axios from "axios";

const pokeapiUrl = import.meta.env.VITE_POKEAPIURL;

import { formatearDataPokemon } from "../utilities/formatearDataPokemon";

export const obtenerRegionesPokemon = async () => {
    try {
        const respuesta = await axios.get(`${pokeapiUrl}/region/`);
        if(!respuesta.data.count){
            throw new Error("No se encontraron regiones");
        }
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener regiones:", error);
        throw error;
    }
};

export const obtenerPokemones = async (limit = 20, offset = 0) => {
    try {
        const respuesta = await axios.get(`${pokeapiUrl}/pokemon?limit=${limit}&offset=${offset}`);
        if (!respuesta) throw new Error("No se pudo consultar la lista de pokémon");

        const lista = respuesta.data.results;

        const respuestas = await Promise.all(
            lista.map(async (poke) => {
                const pokemonBase = await axios.get(poke.url);
                const id = pokemonBase.data.id;

                // Obtener species (variedades)
                const especie = await axios.get(`${pokeapiUrl}/pokemon-species/${id}`);
                const variedades = especie.data.varieties;

                // --------- FILTRO CORRECTO DE FORMAS REGIONALES ---------
                const variantesRegionales = variedades.filter(v => {
                    const nombre = v.pokemon.name.toLowerCase();

                    const esRegional =
                        nombre.includes("-alola") ||
                        nombre.includes("-galar") ||
                        nombre.includes("-hisui") ||
                        nombre.includes("-paldea");

                    const esNoPermitida =
                        nombre.includes("mega") ||
                        nombre.includes("gmax") ||
                        nombre.includes("gigantamax") ||
                        nombre.includes("totem") ||
                        nombre.includes("primal") ||
                        nombre.includes("cosplay") ||
                        nombre.includes("cap");

                    return esRegional && !esNoPermitida;
                });
                // ---------------------------------------------------------

                // Traer datos de las variantes
                const variantes = await Promise.all(
                    variantesRegionales.map(v => axios.get(v.pokemon.url))
                );

                // Base + variantes juntas
                return [pokemonBase, ...variantes];
            })
        );

        const respuestasFinales = respuestas.flat();
        const pokemonesFormateados = formatearDataPokemon(respuestasFinales);

        return pokemonesFormateados;

    } catch (error) {
        console.error("Error al obtener pokémon:", error);
        throw error;
    }
};



