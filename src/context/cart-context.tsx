"use client";

import { Product } from "@/types";
import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
