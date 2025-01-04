"use client";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import ProductList from "@/app/components/ProductList";
import CartModal from "@/app/components/CartModal";
import AuthComponent from "@/app/components/AuthComponent";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowAuthModal={setShowAuthModal}
        setShowCart={setShowCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Cart Modal */}
      {showCart && <CartModal showCart={showCart} setShowCart={setShowCart} />}

      {/* Auth Modal */}
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
            <h2 className="text-2xl font-semibold text-center mb-4">
              Anmelden oder Registrieren
            </h2>
            <AuthComponent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        <ProductList searchQuery={searchQuery} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>
          © {new Date().getFullYear()} Kolumbianische Gemälde. Entdecken Sie die
          Schönheit Kolumbiens durch unsere einzigartigen Landschaftsgemälde.
        </p>
        <p>
          Entwickelt mit Leidenschaft von Alix Ivonne Chaparro Vasquez. Alle
          Rechte vorbehalten.
        </p>
      </footer>
    </div>
  );
}
