"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import ProductList from "@/app/components/ProductList";
import CartModal from "@/app/components/CartModal";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowCart={setShowCart}
      />
      <CartModal showCart={showCart} setShowCart={setShowCart} />
      <ToastContainer />
      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        <ProductList />
      </main>
    </div>
  );
}
