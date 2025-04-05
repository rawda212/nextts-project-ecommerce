"use client";
import { Product } from "@/types/products";
import { useAppDispatch } from "@/Redux/hooks";
import { addToCart } from "@/Redux/slices/CartSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import TextExpander from "./TextExpander";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description || '',
      quantity: 1
    }));
    
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="relative h-48 w-full">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        {product.category && (
          <span className="text-xs text-blue-600 font-medium mb-1">
            {product.category}
          </span>
        )}

        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold text-amber-300 mb-2 line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          <TextExpander>
          {product.description || 'No description available'}

          </TextExpander>
        </p>

        {product.rating?.rate && (
          <div className="flex items-center mb-3">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating.rate.toFixed(1)} ({product.rating.count})
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-green-600">
                {product.discountPercentage}% off
              </span>
            )}
          </div>
          <div className="flex gap-2">
          <Link href={`/products/${product.id}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gray-600 bg-linear-to-r hover:bg-gray-700 text-white  py-1  text-sm rounded  transition-colors"
              >
                Delails
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white  py-1 rounded text-sm text-bold transition-colors"
            >
              add to Cart
            </motion.button>
          
          </div>
        </div>
      </div>
    </div>
  );
}