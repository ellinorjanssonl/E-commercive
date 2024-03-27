import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';


/* här är min kod för CartContext.jsx. Här bestämmer jag om användaren är inloggad eller inte. Om användaren inte är inloggad, rensas varukorgen.
   Om användaren är inloggad, sparas varukorgen i localStorage. jag gör detta genom att använda useState, useEffect och useContext. */

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
        // Rensar varukorgen om användaren inte är inloggad
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Rensar localStorage
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
   
  
  // Ta bort en produkt från varukorgen
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  // Rensa varukorgen
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

