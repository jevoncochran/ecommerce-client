import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Category } from "@/models/category";

export async function GET() {
  await mongooseConnect();

  // Not sure if this is optimal solution
  // But the .populate("category") throws an error without this
  const getAnyCategory = await Category.findOne({});

  try {
    const products = await Product.find({}, null, { sort: { createdAt: -1 } });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
