export const formatearDataPokemon = (pokemones) => {
    const pokemonesFormateados = pokemones.map(pokemon => {

        const data = pokemon.data;

        // Sacar el ID base desde species, no desde pokemon.id
        const idBase = data.species?.url
            ? Number(data.species.url.split("/").slice(-2, -1)[0])
            : data.id;

        return {
            id: data.id, // ID real de la variente
            numero: String(idBase).padStart(3, "0"), // ← número base real
            nombre: data.name,
            imagen: data.sprites.other["official-artwork"].front_default,
            tipos: data.types.map(t => t.type.name),
            tamaño: data.height,
            peso: data.weight
        };
    });
    return pokemonesFormateados;
};
