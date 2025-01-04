"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import ProductList from "@/app/components/ProductList";
import CartModal from "@/app/components/CartModal";
import AuthComponent from "@/app/components/AuthComponent";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowAuthModal={setShowAuthModal}
        setShowCart={setShowCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {showCart && <CartModal showCart={showCart} setShowCart={setShowCart} />}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setShowAuthModal(false)}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">Anmelden oder Registrieren</h2>
            <AuthComponent />
          </div>
        </div>
      )}
      <main className="pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        <ProductList searchQuery={searchQuery} />
      </main>
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} Alix Ivonne Chaparro Vasquez. Alle Rechte vorbehalten.</p>
      </footer>
      <ToastContainer />
    </div>
  );
}
