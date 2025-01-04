"use client";

import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <img
          src="images/logo.png"
          alt="Kolumbianische Gemälde Logo"
          className="h-10"
        />
        <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white dark:bg-gray-700"
        />
        <div className="relative">
          <button className="cart-button hover:bg-secondary dark:hover:bg-gray-600">
            🛒
            {cart.length > 0 && (
              <div className="cart-counter">{cart.length}</div>
            )}
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg hover:bg-secondary-dark dark:hover:bg-gray-600 flex items-center gap-2"
        >
          {isDarkMode ? "🌞 Helles Modus" : "🌙 Dunkles Modus"}
        </button>
        <button className="btn-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark">
          Anmelden
        </button>
      </div>
    </nav>
  );
}
