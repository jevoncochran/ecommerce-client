"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import ProductsGrid from "@/components/products-grid";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div className="py-4 px-6">
      <h1>Products</h1>
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsPage;
