// "use client";
// import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   clearCart,
// } from "@/Redux/slices/CartSlice";
// import Link from "next/link";
// import Image from "next/image";

// export default function CartPage() {
//   const {
//     cartItems = [],
//     totalQuantity = 0,
//     totalPrice = 0,
//   } = useAppSelector((state) => state.cart);
//   const dispatch = useAppDispatch();

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold mb-6">Your Shopping Cart is Empty</h1>
//         <Link
//           href="/products"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">
//         Your Cart ({totalQuantity} items)
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center gap-4 mb-4 p-4 border-b"
//             >
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={100}
//                 height={100}
//                 className="w-24 h-24 object-contain"
//               />
//               <div className="flex-grow">
//                 <h3 className="font-medium">{item.title}</h3>
//                 <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                 <div className="flex items-center mt-2">
//                   <button
//                     onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
//                     disabled={item.quantity === 1}
//                     className={`px-2 py-1 border ${
//                       item.quantity === 1
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:bg-gray-200"
//                     }`}
//                   >
//                     -
//                   </button>
//                   <span className="mx-2">{item.quantity}</span>
//                   <button
//                     onClick={() => dispatch(increaseQuantity({ id: item.id }))}
//                     className="px-2 py-1 border hover:bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => {
//                   dispatch(removeFromCart({ id: item.id }));
//                   toast.error("done ❌");
//                 }}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="lg:w-1/3">
//           <div className="bg-gray-700 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <button
//               className={`w-full py-2 rounded mt-4 ${
//                 totalQuantity === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 text-white"
//               }`}
//               disabled={totalQuantity === 0}
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-700"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/Redux/slices/CartSlice";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react"; // أضف هذا

import { toast, ToastContainer } from 'react-toastify'; // تأكد من استيراد الـ ToastContainer هنا
import 'react-toastify/dist/ReactToastify.css'; // تأكد من استيراد الستايل الخاص بـ Toast

export default function CartPage() {
  const {
    cartItems = [],
    totalQuantity = 0,
    totalPrice = 0,
  } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, []);

  if (!isClient) return null; 

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart is Empty</h1>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Your Cart ({totalQuantity} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 mb-4 p-4 border-b"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    disabled={item.quantity === 1}
                    className={`px-2 py-1 border ${
                      item.quantity === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    className="px-2 py-1 border hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(removeFromCart({ id: item.id }));
                  toast.error("The product is deleted❌");
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className={`w-full py-2 rounded mt-4 ${
                totalQuantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white"
              }`}
              disabled={totalQuantity === 0}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
