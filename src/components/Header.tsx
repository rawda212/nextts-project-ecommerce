import React from "react";

import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <a href="">our Store</a>
        </div>
        <Navigation />
      </div>
    </header>
  );
}