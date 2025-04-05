// src/types/products.d.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number; 
  // rating?: number; 
  rating?: {
    rate: number;
    count: number;
  };
  category: string;
  image: string; 
}
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }