// utils/helpers.ts
import { Product } from "@/types/products";

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};
