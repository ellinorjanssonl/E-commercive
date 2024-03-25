import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
  });

  const { isLoggedIn } = useAuth(); 

   useEffect(() => {
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     },   
     [cartItems]);
    
     useEffect(() => {
      if (!isLoggedIn) {
        // Rensa varukorgen om användaren inte är inloggad
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Alternativt, sätt localStorage till en tom array beroende på ditt behov
      }
    }, [isLoggedIn]);

      const addToCart = (productToAdd) => {
      setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

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

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

