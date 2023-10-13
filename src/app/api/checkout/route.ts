import { mongooseConnect } from "@/lib/mongoose";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/order";

export async function POST(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { shippingInfo, products } = body;

  try {
    const order = await Order.create({
      products,
      name: shippingInfo.name,
      email: shippingInfo.email,
      address: shippingInfo.email,
      addressLine2: shippingInfo.addressLine2,
      city: shippingInfo.city,
      state: shippingInfo.state,
      zipCode: shippingInfo.zipCode,
      paid: false,
    });

    let line_items = [];
    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: { name: product.name },
          // Added this because some prices were being converted to a number with crazy amount of decimals
          // Not sure why this happens
          unit_amount: Math.trunc(product.price * 100),
        },
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: shippingInfo.email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=true`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?cancelled=true`,
      metadata: { orderId: order._id.toString() },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
