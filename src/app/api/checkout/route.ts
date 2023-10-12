import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";

export async function POST(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { shippingInfo, products } = body;

  try {
    const order = await Order.create({
      line_items: products,
      name: shippingInfo.name,
      email: shippingInfo.email,
      address: shippingInfo.email,
      addressLine2: shippingInfo.addressLine2,
      city: shippingInfo.city,
      state: shippingInfo.state,
      zipCode: shippingInfo.zipCode,
      paid: false,
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
