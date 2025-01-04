"use client";

import { useState } from "react";
import ProductList from "@/app/components/ProductList";
import Navbar from "@/app/components/Navbar";
import CartModal from "@/app/components/CartModal";
import { ToastContainer } from "react-toastify";

export default function Home() {


  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} setShowCart={setShowCart} />
      {showCart && <CartModal showCart={showCart} setShowCart={setShowCart} />}
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Entdecken Sie unsere Kolumbianischen Gemälde
        </h2>
        <ProductList />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} Kolumbianische Gemälde. Mit Leidenschaft entwickelt von Alix Chaparro.
      </footer>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss pauseOnHover />
    </div>
  );
}
