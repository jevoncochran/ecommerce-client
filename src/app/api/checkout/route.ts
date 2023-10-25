import { mongooseConnect } from "@/lib/mongoose";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/order";
import { Product } from "@/types";
import Stripe from "stripe";

type ParsedProduct = {
  _id: string;
  name: string;
  price: number;
};

type Order = {
  [key: string]: Product[];
};

const parseProducts = (productsArr: Product[]) => {
  let productsParsed: ParsedProduct[] = [];
  let total = 0;

  productsArr.forEach((p) => {
    productsParsed.push({ name: p.name, price: p.price, _id: p._id });
    total += p.price;
  });

  return { products: productsParsed, total };
};

export async function POST(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { shippingInfo, products } = body;

  try {
    // object consisting of sellers as keys, array of products as values
    let orders: Order = {};
    let orderIds = [];
    // Separate products by seller
    products.forEach((product: Product) => {
      // Check if key for seller exists in orders object
      const sellerLogged = orders.hasOwnProperty(product.sellerId);
      // If key for seller exists, add product to the array corresponding to value of seller key
      if (sellerLogged) {
        orders[product.sellerId].push(product);
      } else {
        // If it does not exist, add seller key set to value of product as array
        orders[product.sellerId] = [product];
      }
    });

    const ordersArray = Object.entries(orders);

    for (const order of ordersArray) {
      const sellerId = order[0];
      const expandedProductsArr = order[1];

      const parsed = parseProducts(expandedProductsArr).products;
      const totalPrice = parseProducts(expandedProductsArr).total;
      const orderDoc = await Order.create({
        products: parsed,
        customer: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          address: shippingInfo.address,
          addressLine2: shippingInfo.addressLine2,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
        },
        sellerId: sellerId,
        total: totalPrice,
        paid: false,
      });

      orderIds.push(orderDoc._id.toString());
    }

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    products.forEach((product: Product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: { name: product.name },
          // Added this because some prices were being converted to a number with crazy amount of decimals
          // Not sure why this happens
          unit_amount: parseFloat((product.price * 100).toFixed(2)),
        },
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: shippingInfo.email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=true`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?cancelled=true`,
      // Metadata key value cannot be array
      // Therefore, in order to store mutliple orderIds, the .join() is necessary
      // Converts the array of orderIds into a string
      metadata: { orderIds: orderIds.join() },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
