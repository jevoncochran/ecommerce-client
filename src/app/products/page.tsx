"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Product } from "@/types";
import ProductsGrid from "@/components/products-grid";
import { UiContext } from "@/context/ui-context";

const ProductsPage = () => {
  const { hideMobileNav } = useContext(UiContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // This prevents the flashing by changing page first, then hiding nav
    hideMobileNav();

    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-4 px-6">
      <h1 className="title text-center md:text-left">Products</h1>
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsPage;
