"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import WhiteContentBox from "@/components/white-content-box";
import Image from "next/image";
import CartButton from "@/components/cart-btn";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null | undefined>(
    null
  );

  const imageExists = product?.images?.[0];

  const getLittleImgBorderStyling = (img: string, activeImg: string) => {
    if (img === activeImg) {
      return "border-2 border-gray-500";
    } else {
      return "border border-gray-300";
    }
  };

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  useEffect(() => {
    setActiveImage(product?.images?.[0]);
  }, [product]);

  return product ? (
    <div className="grid grid-cols-12 gap-10 py-4 px-6">
      <WhiteContentBox additionalStyles="col-span-full md:col-span-4">
        <div className="flex flex-col items-center">
          {imageExists ? (
            <Image
              src={activeImage!}
              alt={product?.name}
              height={300}
              width={300}
              className="h-[300px] w-[300px]"
            />
          ) : (
            <Image
              src={"https://fakeimg.pl/150x150?text=No+image"}
              alt={product?.name}
              height={300}
              width={300}
              className="h-[300px] w-[300px]"
            />
          )}
          <div className="grid grid-cols-12 gap-2 mt-4">
            {product?.images?.map((img, idx) => (
              <div
                key={idx}
                className={`h-[100px] w-[100px] relative col-span-3 rounded-md box-border flex justify-center items-center ${getLittleImgBorderStyling(
                  img,
                  activeImage!
                )}`}
              >
                <Image
                  src={img}
                  alt={product.name}
                  height={100}
                  width={100}
                  onClick={() => setActiveImage(img)}
                  className="h-[80px] w-[80px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </WhiteContentBox>
      <div className="col-span-full md:col-span-8">
        <h1>{product?.name}</h1>
        <p className="mt-2">{product?.description}</p>
        <div className="flex items-center gap-5 mt-6">
          <span>${product.price}</span>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductPage;
