// app/page.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { fetchedAllProducts } from "@/Redux/slices/productsSlice";
import Slider from "@/components/Slider";
import { filterProductsByCategory } from "@/utils/helpers";
import ProductsSection from "@/components/ProductsSection";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchedAllProducts());
  }, [dispatch]);

  const sliderImages = products.slice(0, 3).map((product) => product.image);

  const men = filterProductsByCategory(products, "men's clothing");
  const women = filterProductsByCategory(products, "women's clothing");
  const electronics = filterProductsByCategory(products, "electronics");
  const jewelery = filterProductsByCategory(products, "jewelery");

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Store 🛍️</h1>
      <Slider images={sliderImages} />

      <ProductsSection title=" Men's Clothing" products={men} />
      <ProductsSection title=" Women's Clothing" products={women} />
      <ProductsSection title=" Jewelery" products={jewelery} />
      <ProductsSection title="Electronics" products={electronics} />
    </div>
  );
}

