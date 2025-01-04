"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import ProductList from "@/app/components/ProductList";
import CartModal from "@/app/components/CartModal";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex flex-col`}>
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowCart={setShowCart}
      />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
          Unsere Gemälde
        </h2>
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-white py-4">
        <p>
          © 2024 Kolumbianische Gemälde. Entdecken Sie die Schönheit Kolumbiens
          durch unsere einzigartigen Landschaftsgemälde. Entwickelt mit
          Leidenschaft.
        </p>
      </footer>

      {/* Cart Modal */}
      {showCart && <CartModal setShowCart={setShowCart} />}
    </div>
  );
}
