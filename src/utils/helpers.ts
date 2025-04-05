
import { Product } from "@/types/products";

export const filterProductsByCategory = (products: Product[], category: string) =>
  products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
