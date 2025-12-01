import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage al cargar
    const savedUser = localStorage.getItem('pokedexUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulación de login - en una app real harías una petición a tu API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: 1,
            email,
            name: email.split('@')[0],
            joinDate: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('pokedexUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Date.now(),
            email,
            name,
            joinDate: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('pokedexUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Todos los campos son requeridos'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pokedexUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};