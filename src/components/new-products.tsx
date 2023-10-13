"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Product } from "@/types";
import Image from "next/image";
import CartButton from "./cart-btn";
import { CartContext } from "@/context/cart-context";

const NewProducts = () => {
  const { addProduct } = useContext(CartContext);

  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products/new").then((res) => {
      console.log(res.data);
      setNewProducts(res.data);
    });
  }, []);

  return (
    <div className="py-4 px-6">
      <h2 className=" text-4xl">Newest Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 mt-8">
        {newProducts.map((product) => (
          <div key={product._id} className="flex flex-col justify-between">
            <div className="bg-white h-[200px] relative p-5 rounded-md flex justify-center items-center">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={150}
                height={150}
                className=" w-[150px] h-[150px] object-contain"
              />
            </div>
            {/* TODO: Need to figure out how to make all product name spans the same height */}
            {/* Some are larger than others depending on number of lines of text */}
            <span className="text-ellipsis mt-1 height-[100px]">
              {product.name}
            </span>
            <div className="flex items-center justify-between mt-2">
              <span>${product.price}</span>
              <CartButton
                includeIcon={false}
                onAdd={() => addProduct(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
