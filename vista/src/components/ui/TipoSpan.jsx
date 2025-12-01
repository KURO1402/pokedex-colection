const TipoSpan = ({ tipo, isCaptured }) => {
    const typeColors = {
        grass: "from-green-500 to-green-600",
        poison: "from-purple-500 to-purple-600",
        fire: "from-orange-500 to-red-600",
        water: "from-blue-500 to-blue-600",
        bug: "from-lime-600 to-green-700",
        normal: "from-gray-400 to-gray-500",
        flying: "from-indigo-300 to-indigo-500",
        ground: "from-yellow-600 to-amber-700",
        rock: "from-yellow-700 to-yellow-800",
        fairy: "from-pink-400 to-pink-500",
        electric: "from-yellow-400 to-yellow-500",
        fighting: "from-red-700 to-red-800",
        psychic: "from-pink-500 to-rose-600",
        dragon: "from-indigo-600 to-indigo-800",
        ice: "from-cyan-300 to-cyan-500",
        dark: "from-slate-700 to-slate-900",
        steel: "from-gray-500 to-gray-600",
        ghost: "from-purple-700 to-purple-900",
    };

    const gradient = typeColors[tipo] || "from-gray-500 to-gray-700";

    return (
        <span
            className={`py-1.5 px-3 rounded-full text-xs font-semibold text-white capitalize shadow-md 
                transition-all duration-300 bg-gradient-to-r ${gradient} 
                ${isCaptured ? "brightness-105" : ""}`}
        >
            {tipo}
        </span>
    );
};

export default TipoSpan;
