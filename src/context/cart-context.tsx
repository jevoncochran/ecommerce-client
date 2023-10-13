"use client";

import { Product } from "@/types";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const cartJson = localStorage.getItem("cart");

  const [cart, setCart] = useState<Product[]>(
    cartJson !== null ? JSON.parse(localStorage.getItem("cart")!) : []
  );

  const addProduct = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addProduct, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
