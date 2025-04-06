"use client";
import { fetchOneProduct } from "@/Redux/slices/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useEffect } from "react";
import Image from "next/image";
import { addToCart } from "@/Redux/slices/CartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Link from "next/link";
import TextExpander from "@/components/TextExpander";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams(); 
  const dispatch = useAppDispatch();
  const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchOneProduct(params.id));
  }, [dispatch, params.id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addToCart({
          id: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          image: selectedProduct.image,
          description: selectedProduct.description,
          quantity: 1,
        })
      );
      toast.success(`${selectedProduct.title} added to cart!`);
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>

      {selectedProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 w-full">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{selectedProduct.title}</h1>

            {selectedProduct.rating && (
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(selectedProduct.rating.rate) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="text-2xl font-bold text-blue-600">
              ${selectedProduct.price.toFixed(2)}
            </div>

            <p className="text-gray-700">
              <TextExpander>
                {selectedProduct.description || "No description available"}
              </TextExpander>
            </p>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-sm text-gray-500 capitalize">{selectedProduct.category}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
