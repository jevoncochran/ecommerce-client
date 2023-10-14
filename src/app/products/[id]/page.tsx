"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import WhiteContentBox from "@/components/white-content-box";
import Image from "next/image";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-12 gap-10">
      <WhiteContentBox additionalStyles="col-span-7">
        <>
          <Image
            src={product?.images[0]}
            alt={product?.name}
            height={200}
            width={200}
          />
        </>
      </WhiteContentBox>
      <div className="col-span-5">
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
