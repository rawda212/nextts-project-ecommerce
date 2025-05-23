
export interface Product {
  id: string | number;
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