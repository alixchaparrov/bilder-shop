"use client";

import { useState } from "react";
import { FaMoon, FaSun, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";
import { auth, logoutUser } from "@/lib/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = ({ darkMode, setDarkMode, setShowAuthModal, setShowCart }) => {
  const { cart } = useCartStore();
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logoutUser();
    alert("Sesión cerrada correctamente");
  };

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
            className="cart-button flex items-center space-x-2 text-white"
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="cart-counter">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center space-x-2">
              <span>{user.displayName || user.email}</span>
              <button
                className="text-red-500"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              className="text-white flex items-center"
              onClick={() => setShowAuthModal(true)}
            >
              <FaUserAlt size={20} className="mr-2" /> Anmelden
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;