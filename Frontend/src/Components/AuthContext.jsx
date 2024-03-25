import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // Initiera isLoggedIn baserat på localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    return isUserLoggedIn === 'true'; 
    });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Spara inloggningstillståndet i localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Radera inloggningstillståndet från localStorage
  };
  
  // Uppdatera isLoggedIn baserat på localStorage
    useEffect(() => {
      const isUserLoggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(isUserLoggedIn === 'true');
    }, []);
    

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

