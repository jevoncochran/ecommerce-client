"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  category?: any;
  description: string;
  price: number;
  images?: string[];
  availability?: any;
}

const Featured = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  const featuredProductId = "6522ea17a0d7d31ed2a9eedf";

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${featuredProductId}`)
      .then((res) => {
        setFeaturedProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(featuredProduct);
  }, [featuredProduct]);

  return (
    <div className=" bg-[#222] grid grid-cols-2 gap-10 py-4 px-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-white">{featuredProduct?.name}</h1>
        <p className="text-[#aaa]">{featuredProduct?.description}</p>
        <div className="flex gap-2 mt-6">
          <Link href={`/products/${featuredProduct?._id}`}>
            <button className="btn-white">Read More</button>
          </Link>
          <button className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
      <div className=" w-[100%] flex justify-center">
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
