"use client";

import React from "react";
import { useAppSelector } from "@/Redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تقديم الطلب بنجاح 🚀");
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="border p-2 w-full rounded" required />
          <input type="text" placeholder="Address" className="border p-2 w-full rounded" required />
          <input type="email" placeholder="Email" className="border p-2 w-full rounded" required />
          <input type="tel" placeholder="Phone" className="border p-2 w-full rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Confirm Order
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </form>
    </div>
  );
}
