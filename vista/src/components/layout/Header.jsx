import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ButtonSearch from '../../components/ui/ButtonSearch';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;
  const isPokedexPage = isActive('/pokedex') && user;

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl sticky top-0 z-50 border-b-4 border-red-800">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        
        {/* Header Principal */}
        <div className="flex items-center justify-between">
          
          {/* Logo y Título */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-red-600 font-bold text-xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl tracking-tight">Pokédex</span>
                <span className="text-red-200 text-xs font-medium">Master Collection</span>
              </div>
            </Link>
          </div>

          {/* Barra de búsqueda - Solo en Pokedex */}
          {isPokedexPage && (
            <div className="hidden xl:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    className="
                      w-full bg-white/95 backdrop-blur-sm py-3 pl-12 pr-4 
                      border-none rounded-2xl text-[1rem] shadow-lg
                      placeholder-gray-500 focus:ring-2 focus:ring-yellow-400
                      focus:outline-none transition-all duration-200
                    "
                    placeholder="Buscar Pokémon por nombre, tipo o número..."
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Botones de búsqueda para desktop */}
                <div className="flex gap-2">
                  <ButtonSearch className="bg-white text-red-600 hover:bg-gray-100 min-w-[100px]">
                    Buscar
                  </ButtonSearch> 
                  <ButtonSearch className="bg-gray-100 text-gray-700 hover:bg-gray-200 min-w-[100px]">
                    Limpiar
                  </ButtonSearch>
                </div>
              </div>
            </div>
          )}

          {/* Navegación y User Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Navegación Principal */}
            <nav className="hidden md:flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-2xl px-2 py-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-white text-red-600 shadow-lg' 
                    : 'text-white hover:bg-white/20 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Inicio</span>
                </div>
              </Link>
              
              {user && (
                <Link
                  to="/pokedex"
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive('/pokedex') 
                      ? 'bg-white text-red-600 shadow-lg' 
                      : 'text-white hover:bg-white/20 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Pokédex</span>
                  </div>
                </Link>
              )}
            </nav>

            {/* User Menu con Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 
                           border border-white/20 rounded-2xl px-4 py-2 transition-all duration-200 
                           hover:shadow-lg group"
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-red-700 font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    <p className="text-red-200 text-xs">Entrenador Pokémon</p>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-5">
                    
                    {/* Header del Dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50 rounded-t-2xl">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">Entrenador Pokémon</p>
                    </div>

                    {/* Opciones del menú */}
                    <div className="py-2">
                      <Link
                        to="/pokedex"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Mi Pokédex</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Mi Perfil</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Configuración</span>
                      </Link>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Cerrar sesión */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-2xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Botones de Login/Register cuando no hay usuario */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white hover:text-yellow-200 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-white/10"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-red-700 px-6 py-2 rounded-xl font-semibold 
                           hover:bg-yellow-300 transition-all duration-200 shadow-lg 
                           hover:shadow-xl hover:scale-105"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Barra de búsqueda móvil - Solo en Pokedex */}
        {isPokedexPage && (
          <div className="mt-4 xl:hidden">
            <div className="relative">
              <input
                type="text"
                className="
                  w-full bg-white py-3 pl-12 pr-4 
                  border-none rounded-2xl text-[1rem] shadow-lg
                  placeholder-gray-500 focus:ring-2 focus:ring-yellow-400
                  focus:outline-none transition-all duration-200
                "
                placeholder="Buscar Pokémon..."
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <ButtonSearch className="flex-1 bg-white text-red-600 hover:bg-gray-100">
                Buscar
              </ButtonSearch> 
              <ButtonSearch className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                Limpiar
              </ButtonSearch>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;