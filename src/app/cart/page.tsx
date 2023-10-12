"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import Image from "next/image";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  let totalPrice = 0;
  for (const product of cart) {
    totalPrice += product.price;
  }

  return (
    <div className="grid grid-cols-12 gap-10 py-4 px-6">
      <div className="bg-white col-span-8 rounded-lg p-7">
        {cart.length > 0 ? (
          <div>
            <h2>Cart</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id} className=" border-t border-gray-300">
                    <td className="py-3">
                      <div className="h-[100px] w-[100px] bg-white P-2.5 rounded-lg border border-gray-200 flex justify-center items-center relative">
                        <Image
                          src={product.images[0]}
                          height={120}
                          width={120}
                          alt={product.name}
                          className="h-[80px] w-[80px] object-contain"
                        />
                      </div>
                      {product.name}
                    </td>
                    <td>1</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>${totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
      {!!cart.length && (
        <div className="bg-white col-span-4 rounded-lg p-7">
          <h2>Your Order</h2>
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Address Line 2" />
          <button className="btn-primary">Continue to payment</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
