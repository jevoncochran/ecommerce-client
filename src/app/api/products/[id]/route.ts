import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Category } from "@/models/category";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  await mongooseConnect();
  
  // Not sure if this is optimal solution
  // But the .populate("category") throws an error without this
  const getAnyCategory = await Category.findOne({});

  const { id } = params;

  try {
    const product = await Product.findById(id).populate("category");
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("didnt work for some reason");
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
