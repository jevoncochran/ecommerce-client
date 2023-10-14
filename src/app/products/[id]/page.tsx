"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import WhiteContentBox from "@/components/white-content-box";
import Image from "next/image";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(null);

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
  }, []);

  useEffect(() => {
    setActiveImage(product?.images[0]);
  }, [product]);

  return product ? (
    <div className="grid grid-cols-12 gap-10 py-4 px-6">
      <WhiteContentBox additionalStyles="col-span-4">
        <div className="flex flex-col items-center">
          <Image
            src={activeImage}
            alt={product?.name}
            height={300}
            width={300}
            className="h-[300px] w-[300px]"
          />
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
      <div className="col-span-8">
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
      </div>
    </div>
  ) : null;
};

export default ProductPage;
