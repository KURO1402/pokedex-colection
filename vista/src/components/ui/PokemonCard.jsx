import TipoSpan from "./TipoSpan";

const PokemonCard = ({ isCaptured = false, onToggleCapture, datos }) => {
    const { nombre, numero, imagen, tipos, tamaño, peso } = datos;
    return (
        <div
            className={`group relative w-full cursor-pointer perspective-1000 transition-all duration-400 rounded-xl overflow-hidden
    ${isCaptured ? 'ring-4 ring-green-400 ring-opacity-90 scale-[1.02]' : ''}`
            }
            onClick={onToggleCapture}
        >
            {/* Efecto de brillo al hacer hover */}
            <div className={`absolute -inset-0.5 rounded-xl blur transition-all duration-300 ${isCaptured
                ? 'bg-gradient-to-r from-green-300 to-emerald-400 opacity-60'
                : 'bg-gradient-to-r from-amber-400 to-blue-400 opacity-0 group-hover:opacity-50'
                }`}></div>

            {/* Tarjeta principal */}
            <div className={`relative rounded-xl p-4 shadow-xl transition-all duration-400 ease-out group-hover:-translate-y-1 transform border overflow-hidden ${isCaptured
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-100'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                }`}>

                {/* Fondo decorativo */}
                <div className={`absolute top-0 left-0 w-full h-1/2 transition-all duration-400 ${isCaptured
                    ? 'bg-gradient-to-b from-green-100/50 to-transparent'
                    : 'bg-gradient-to-b from-amber-50/40 to-transparent'
                    }`}></div>

                {/* Efectos de burbujas de fondo */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full transition-all duration-500 ${isCaptured ? 'bg-green-300/20' : 'bg-amber-300/15'
                    }`}></div>

                <div className={`absolute -bottom-16 -left-16 w-32 h-32 rounded-full transition-all duration-500 ${isCaptured ? 'bg-emerald-300/20' : 'bg-blue-300/15'
                    }`}></div>

                {/* Header con número y badge de capturado */}
                <div className="relative flex justify-between items-start mb-2">
                    {/* Número del Pokémon */}
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white shadow-md transition-all duration-300 ${isCaptured
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                        : 'bg-gradient-to-br from-amber-400 to-amber-500'
                        }`}>
                        #{numero}
                    </div>

                    {/* Badge de capturado mejorado */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${isCaptured
                        ? 'bg-green-100 border border-green-200 scale-100 opacity-100'
                        : 'scale-0 opacity-0'
                        }`}>
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-green-700">Capturado</span>
                    </div>
                </div>

                {/* Imagen del Pokémon */}
                <div className="relative z-10 my-3 flex justify-center">
                    <div className="relative">
                        {/* Efecto de halo */}
                        <div className={`absolute inset-0 rounded-full blur-lg scale-110 transition-all duration-400 ${isCaptured
                            ? 'bg-gradient-to-br from-green-200/40 to-emerald-300/40'
                            : 'bg-gradient-to-br from-amber-200/30 to-blue-200/30'
                            }`}></div>

                        {/* Imagen con efectos */}
                        <div className={`relative rounded-full p-2 transition-all duration-400 ${isCaptured ? 'bg-green-50/80' : 'bg-white/50'
                            }`}>
                            <img
                                className={`w-28 h-28 object-contain transition-all duration-500 ${isCaptured
                                    ? 'filter saturate-120 brightness-105 drop-shadow-lg group-hover:scale-105'
                                    : 'drop-shadow-md group-hover:scale-110 group-hover:rotate-2'
                                    }`}
                                src={imagen}
                                alt={nombre}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/112x112?text=Pokémon';
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Nombre del Pokémon */}
                <div className="relative z-10 mb-3">
                    <div className={`font-bold text-xl capitalize text-center transition-colors duration-300 ${isCaptured ? 'text-green-800' : 'text-gray-800 truncate'
                        }`}>
                        {nombre}
                    </div>
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${isCaptured
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 w-16'
                        : 'bg-gradient-to-r from-amber-400 to-blue-400 w-12'
                        }`}></div>
                </div>

                {/* Tipos del Pokémon */}
                <div className="relative z-10 flex justify-center gap-2 mb-3">
                    {tipos.map(tipo => (
                        <TipoSpan key={tipo} tipo={tipo} isCaptured={isCaptured} />
                    ))}
                </div>

                {/* Información adicional */}
                <div className="relative z-10 pt-3 border-t transition-colors duration-300">
                    <div className={`flex justify-between text-xs transition-colors duration-300 ${isCaptured ? 'text-green-600 font-medium' : 'text-gray-500'
                        }`}>
                        <span>Altura: {tamaño}m</span>
                        <span>Peso: {peso}kg</span>
                    </div>
                </div>

                {/* Efecto de brillo interior sutil */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-400 pointer-events-none ${isCaptured
                    ? 'bg-gradient-to-br from-green-200/10 to-emerald-300/10'
                    : 'bg-gradient-to-br from-amber-100/0 to-blue-100/0 group-hover:from-amber-100/5 group-hover:to-blue-100/5'
                    }`}></div>

                {/* Efecto de partículas cuando está capturado */}
                {isCaptured && (
                    <>
                        <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonCard;