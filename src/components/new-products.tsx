"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import Image from "next/image";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products/new").then((res) => {
      console.log(res.data);
      setNewProducts(res.data);
    });
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 py-4 px-6">
      {newProducts.map((product) => (
        <div key={product._id}>
          <div className="bg-white h-[200px] relative p-5 rounded-md flex justify-center items-center">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={150}
              height={150}
              className=" w-[150px] h-[150px] object-contain"
            />
          </div>
          <h2>{product.name}</h2>
          <span>${product.price}</span>
        </div>
      ))}
    </div>
  );
};

export default NewProducts;
