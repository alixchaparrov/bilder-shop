"use client";

import { useState } from "react";
import ProductList from "@/app/components/ProductList";
import Navbar from "@/app/components/Navbar";
import CartModal from "@/app/components/CartModal";
import { ToastContainer } from "react-toastify";

export default function Home() {

  return (
<div className="min-h-screen">
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Entdecken Sie unsere Kolumbianischen Gemälde</h1>
        <ProductList />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} Kolumbianische Gemälde. Mit Leidenschaft entwickelt von Alix Chaparro.
      </footer>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss pauseOnHover />
    </div>
  );
}
