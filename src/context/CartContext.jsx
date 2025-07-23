import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    const existe = cart.find((p) => p.id === producto.id);
    if (existe) {
      toast.info("El producto ya está en el carrito");
    } else {
      setCart([...cart, producto]);
      toast.success("Producto agregado al carrito");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
    toast.info("Producto eliminado del carrito");
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Carrito vaciado");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
