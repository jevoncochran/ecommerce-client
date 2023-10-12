import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET() {
  await mongooseConnect();

  const currentDate = new Date();
  // TODO: Figure out a better way to work with dates, use a library
  // Also, make this from the date one week ago and not the time
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const newProducts = await Product.find(
      { createdAt: { $gt: oneWeekAgo } },
      null,
      { sort: { createdAt: -1 }, limit: 18 }
    );
    return new Response(JSON.stringify(newProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
