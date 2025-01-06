"use client";

import { useState } from "react";
import CartModal from "../components/CartModal";
import AuthModal from "../components/AuthModalContent";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  toggleDarkMode,
  darkMode,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { cart } = useCartStore();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
        <h1 className="text-xl font-bold">Kolumbianische Gemälde</h1>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Anmelden / Registrieren
        </button>
      </nav>
    );
  }

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Kolumbianische Gemälde</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Produkte suchen..."
            className="px-4 py-2 rounded-lg text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 rounded-lg" onClick={toggleDarkMode}>
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Abmelden
          </button>
        </div>
      </nav>
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
}
