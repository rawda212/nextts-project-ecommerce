// "use client";
// import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
// import { useEffect } from "react";
// import Card from "@/components/card";
// import { filterByCategory, fetchedAllProducts } from "@/Redux/slices/productsSlice";

// export default function ProductsPage() {
//   const dispatch = useAppDispatch();
//   const {  isLoading, error, filteredProducts, selectedCategory } = useAppSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchedAllProducts());
//   }, [dispatch]);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(filterByCategory(e.target.value));
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Our Products</h1>

//       {/* Category Filter Dropdown */}
//       <div className="mb-6">
//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border rounded p-2 text-emerald-700"
//         >
//           <option value="All">All Categories</option>
//           <option value="electronics">Electronics</option>
//           <option value="jewelery">Jewelery</option>
//           <option value="men's clothing">Men&#39;s Clothing</option>
// <option value="women's clothing">Women&#39;s Clothing</option>

//         </select>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <Card
//             key={product.id}
//             product={product}
//             showCategory={true}
//             showDescription={true}
//             showRating={true}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client"; 
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { fetchedAllProducts } from "@/Redux/slices/productsSlice";
import Slider from "@/components/Slider";
import { filterProductsByCategory } from "@/utils/helpers";
import ProductsSection from "@/components/ProductsSection";
import { Product } from "@/types/products";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchedAllProducts());
  }, [dispatch]);

  const sliderImages = products.slice(0, 3).map((product: Product) => product.image);

  const men = filterProductsByCategory(products, "men's clothing");
  const women = filterProductsByCategory(products, "women's clothing");
  const electronics = filterProductsByCategory(products, "electronics");
  const jewelery = filterProductsByCategory(products, "jewelery");

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Store 🛍️</h1>
      <Slider images={sliderImages} />

      <ProductsSection title="Men's Clothing" products={men} />
      <ProductsSection title="Women's Clothing" products={women} />
      <ProductsSection title="Jewelery" products={jewelery} />
      <ProductsSection title="Electronics" products={electronics} />
    </div>
  );
}
