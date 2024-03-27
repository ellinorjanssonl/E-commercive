import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
  });

  const [favorites, setFavorites] = useState(() => {
  const localFavorites = localStorage.getItem('favorites');
  return localFavorites ? JSON.parse(localFavorites) : [];
  });

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Rensar varukorgen och favoriter om användaren inte är inloggad
      setCartItems([]);
      setFavorites([]);
      localStorage.removeItem('cartItems'); // Rensar localStorage för varukorgen
      localStorage.removeItem('favorites'); // Rensar localStorage för favoriter
    }
  }, [isLoggedIn]);

     const addToCart = (productToAdd) => {
      setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize);

        if (existingItemIndex > -1) {
        const newCartItems = [...prevItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1
        };

        return newCartItems;
        }

        return [...prevItems, { ...productToAdd, quantity: 1 }];
       });
    };

      const toggleFavorite = (product) => {
      setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

    const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
    setCartItems([]);
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, favorites, toggleFavorite }}>
      {children}
    </CartContext.Provider>
  );
};

