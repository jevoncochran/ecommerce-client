export interface Product {
  _id: string;
  name: string;
  category?: any;
  description: string;
  price: number;
  images?: string[];
  availability?: any;
}
