"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { Product } from "@/types";
import CartButton from "./cart-btn";
import { CartContext } from "@/context/cart-context";

const Featured = () => {
  const { cart } = useContext(CartContext);

  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  const featuredProductId = "6522ea17a0d7d31ed2a9eedf";

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/products/${featuredProductId}`)
      .then((res) => {
        setFeaturedProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" bg-[#222] grid grid-cols-2 gap-10 py-4 px-6">
      <div className="flex flex-col col-span-2 md:col-span-1 items-center gap-4">
        <h1 className="text-white">{featuredProduct?.name}</h1>
        <Image
          src={featuredProduct?.images?.[0] ?? ""}
          alt={featuredProduct?.name as string}
          height={500}
          width={500}
          className="md:hidden"
        />
        <p className="text-[#aaa]">{featuredProduct?.description}</p>
        <div className="flex gap-2 mt-6">
          <Link href={`/products/${featuredProduct?._id}`}>
            <button className="btn-white">Read More</button>
          </Link>
          <CartButton product={featuredProduct!} />
        </div>
      </div>
      <div className=" w-[100%] hidden md:flex justify-center">
        <Image
          src={featuredProduct?.images?.[0] ?? ""}
          alt={featuredProduct?.name as string}
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};

export default Featured;
