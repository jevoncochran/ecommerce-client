import { Date } from "mongoose";

export interface Product {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  category?: any;
  description: string;
  price: number;
  images?: string[];
  availability?: any;
}
