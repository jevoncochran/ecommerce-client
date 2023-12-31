import { Product } from "@/types";
import Image from "next/image";
import CartButton from "./cart-btn";
import Link from "next/link";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 mt-8">
      {products.map((product) => (
        <div key={product._id} className="flex flex-col justify-between">
          <Link href={`/products/${product._id}`}>
            <div className="bg-white h-[200px] relative p-5 rounded-md flex justify-center items-center">
              {/* TODO: Have a placeholder when there is no image */}
              {product.images?.[0] ? (
                <Image
                  src={product.images?.[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  className=" w-[150px] h-[150px] object-contain"
                />
              ) : (
                <Image
                  src={"https://fakeimg.pl/150x150?text=No+image"}
                  alt={"placeholder image"}
                  width={150}
                  height={150}
                  className=" w-[150px] h-[150px] object-contain"
                />
              )}
            </div>
          </Link>
          {/* TODO: Need to figure out how to make all product name spans the same height */}
          {/* Some are larger than others depending on number of lines of text */}
          <span className="text-ellipsis mt-1 height-[100px]">
            {product.name}
          </span>
          <div className="flex items-center justify-between mt-2">
            <span>${product.price}</span>
            <CartButton includeIcon={false} product={product} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
