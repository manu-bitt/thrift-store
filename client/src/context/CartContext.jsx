import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
      
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };


  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: (item.qty || 1) - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };


  const removeProductCompletely = (id) =>
    setCart((prev) => prev.filter((item) => item._id !== id));


  const clearCart = () => setCart([]);


  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeProductCompletely,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
