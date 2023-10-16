"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cart-context";
import Image from "next/image";
import axios from "axios";
import { useIsClient } from "@/context/is-client-context";
import WhiteContentBox from "@/components/white-content-box";
import { UiContext } from "@/context/ui-context";
import { Product } from "@/types";

const getTotal = (products: Product[]) => {
  let total = 0;
  products.forEach((product) => {
    console.log(total + product.price);
    total += product.price;
  });

  // Rounds to the nearest cent
  // Possibility of getting crazy decimal number without this for some reason
  return parseFloat(total.toFixed(2));
};

const CartPage = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { hideMobileNav } = useContext(UiContext);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const isClient = useIsClient();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const checkout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/checkout", { shippingInfo, products: cart })
      .then((res) => {
        if (isClient && res.data.url) {
          window.location = res.data.url;
        }
      });
  };

  let totalPrice = 0;
  for (const product of cart) {
    totalPrice += product.price;
  }

  useEffect(() => {
    hideMobileNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isClient && window.location.href.includes("success")) {
    emptyCart();
    return (
      <div className="grid grid-cols-12 gap-10 py-4 px-6">
        <div className="bg-white col-span-12 md:col-span-5 rounded-lg p-7">
          <h1>Your payment was successful!</h1>
          <p>We will email you when your order has been shipped. Thanks!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-10 py-4 px-6">
      <WhiteContentBox additionalStyles="col-span-full md:col-span-8">
        {cart.length > 0 ? (
          <div>
            <h2 className="title">Cart</h2>
            <table className="mt-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product: Product) => (
                  <tr key={product._id} className=" border-t border-gray-300">
                    <td className="py-3">
                      <div className="h-[100px] w-[100px] bg-white P-2.5 rounded-lg border border-gray-200 flex justify-center items-center relative">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images?.[0]}
                            height={120}
                            width={120}
                            alt={product.name}
                            className="h-[80px] w-[80px] object-contain"
                          />
                        ) : (
                          <Image
                            src={"https://fakeimg.pl/150x150?text=No+image"}
                            height={120}
                            width={120}
                            alt={product.name}
                            className="h-[80px] w-[80px] object-contain"
                          />
                        )}
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
                  <td>${getTotal(cart)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </WhiteContentBox>
      {!!cart.length && (
        <WhiteContentBox additionalStyles="col-span-full md:col-span-4">
          <>
            <h2 className="subheading">Shipping</h2>
            <form onSubmit={checkout} className="mt-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={shippingInfo.name}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={shippingInfo.email}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                name="addressLine2"
                value={shippingInfo.addressLine2}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={inputChangeHandler}
              />
              <input
                type="text"
                placeholder="Zip Code"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={inputChangeHandler}
              />
              <button type="submit" className="btn-primary">
                Continue to payment
              </button>
            </form>
          </>
        </WhiteContentBox>
      )}
    </div>
  );
};

export default CartPage;
