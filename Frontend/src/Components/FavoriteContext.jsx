/* import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (product) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFavorite = (productId) => {
    setFavorites(prev => prev.filter(product => product.id !== productId));
  };

  return (    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
 */