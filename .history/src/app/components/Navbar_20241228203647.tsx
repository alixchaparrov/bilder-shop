"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function Navbar({ darkMode, setDarkMode, setShowCart }: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setShowCart: (value: boolean) => void;
}) {
  const cart = useCartStore((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-secondary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="text-lg bg-gray-800 py-1 px-3 rounded hover:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
        <div className="relative">
          <button
            className="cart-button hover:bg-secondary p-2 rounded"
            onClick={() => setShowCart(true)}
          >
            🛒
            {cart.length > 0 && (
              <div className="cart-counter absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center">
                {cart.length}
              </div>
            )}
          </button>
        </div>
        <button className="bg-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark">
          Anmelden
        </button>
      </div>
    </nav>
  );
}
