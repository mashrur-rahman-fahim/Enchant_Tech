import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartData(savedCart);
  }, []);

  const updateCart = (newCartData) => {
    setCartData(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  };

  const cartCount = cartData.reduce((acc, item) => acc + item.count, 0);

  return (
    <CartContext.Provider value={{ cartData, updateCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
