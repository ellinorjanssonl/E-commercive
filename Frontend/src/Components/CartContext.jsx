import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        const newCartItems = [...prevItems];
        // Öka kvantiteten för befintlig produkt
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1
        };

        return newCartItems;
      }

      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });

    alert(`${productToAdd.name} has been added to the cart.`);
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
