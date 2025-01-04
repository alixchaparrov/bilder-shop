"use client";

import { useState } from "react";
import { FaMoon, FaSun, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

const Navbar = ({ darkMode, setDarkMode, setShowCart }) => {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="navbar bg-primary text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo.png"
            alt="Kolumbianische Gemälde Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl sm:text-3xl font-bold">Kolumbianische Gemälde</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Produkte suchen..."
            className="hidden sm:block px-4 py-2 rounded-lg text-black"
          />
          <button
            className="px-3 py-2 rounded-lg"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button
            className="cart-button flex items-center space-x-2 relative"
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="cart-counter">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
          <button className="text-white flex items-center">
            <FaUserAlt size={20} className="mr-2" />
            <span>Anmelden</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
