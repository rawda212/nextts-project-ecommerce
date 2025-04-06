
"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useEffect } from "react";
import Card from "@/components/card";
import { filterByCategory, fetchedAllProducts } from "@/Redux/slices/productsSlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const {  isLoading, error, filteredProducts, selectedCategory } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchedAllProducts());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Category Filter Dropdown */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded p-2 text-emerald-700"
        >
          <option value="All">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men&#39;s Clothing</option>
<option value="women's clothing">Women&#39;s Clothing</option>

        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            showCategory={true}
            showDescription={true}
            showRating={true}
          />
        ))}
      </div>
    </div>
  );
}
