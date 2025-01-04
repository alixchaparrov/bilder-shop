"use client";

import { useState } from "react";
import { FaMoon, FaSun, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

const Navbar = ({ darkMode, setDarkMode, setShowAuthModal, setShowCart }) => {
  const cart = useCartStore((state) => state.cart); // Obtén el estado del carrito
  const [searchQuery, setSearchQuery] = useState("");

  // Calcular la cantidad total de productos en el carrito
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="p-4 fixed top-0 w-full shadow bg-green-600 text-white z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo.png"
            alt="Kolumbianische Gemälde Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-3xl font-bold">Kolumbianische Gemälde</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Produkte suchen..."
            className="px-4 py-2 rounded-lg text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded-lg"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button
            className="cart-button relative flex items-center text-white"
            onClick={() => setShowCart(true)} // Abre el modal del carrito
          >
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-white flex items-center"
            onClick={() => setShowAuthModal(true)} // Abre el modal de autenticación
          >
            <FaUserAlt size={20} className="mr-2" />
            Anmelden
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
