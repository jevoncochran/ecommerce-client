"use client";

import { Product } from "@/types";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>({});

export const CartContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  useEffect(() => {
    const cartJson = localStorage.getItem("cart");
    if (cartJson !== null) {
      setCart(JSON.parse(localStorage.getItem("cart")!));
      // TODO: I believe I do not need the else statement
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addProduct, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
