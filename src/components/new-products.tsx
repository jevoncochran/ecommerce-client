"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import ProductsGrid from "./products-grid";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products/new").then((res) => {
      console.log(res.data);
      setNewProducts(res.data);
    });
  }, []);

  return (
    <div className="py-4 px-6">
      <h2 className=" text-4xl text-center md:text-left">Newest Products</h2>
      <ProductsGrid products={newProducts} />
    </div>
  );
};

export default NewProducts;
