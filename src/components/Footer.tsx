
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-xl font-bold">Multimart</h1>
          </div>
          <p className="text-sm text-white/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Careers</li>
            <li>Our Stores</li>
            <li>Our clothes</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Customer Care</h2>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Help Center</li>
            <li>How to Buy</li>
            <li>Track Your Order</li>
            <li>Corporate & Bulk Purchasing</li>
            <li>Returns & Refunds</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-white/70 text-sm">
            <li> Cairo ,Egypt</li>
            <li>Email: rawda.saleh202@gmail.com</li>
            <li>Phone: 0164564123154</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
