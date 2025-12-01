const PokemonLoading = ({ size = 'small', className = '' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative animate-spin`}>
        {/* Pokéball superior (roja) */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-full border-2 border-black"></div>
        
        {/* Pokéball inferior (blanca) */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-2 border-black"></div>
        
        {/* Línea central */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 border-b border-black"></div>
        
        {/* Centro de la Pokéball */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full z-10">
          <div className="w-2 h-2 bg-gray-300 border border-gray-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <p className="mt-2 text-gray-700 font-semibold animate-pulse text-sm">Cargando Pokémones...</p>
    </div>
  );
};

export default PokemonLoading;