"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import AuthModal from "../components/AuthModalContent";
import CartModal from "../components/CartModal";

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
  const { user, logout } = useAuth();
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin/dashboard"); // Redirigir automáticamente al dashboard si es admin
    }
  }, [user, router]);

  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
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
          className="relative flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
          onClick={() => {
            // Agregar un console.log para depuración
            console.log("Abrir carrito");
            console.log("Carrito actual:", useCartStore.getState().cart);
            setIsCartOpen(true);
          }}
        >
          <FaShoppingCart size={20} />
        </button>

        {user ? (
          <div className="flex items-center space-x-4">
            <span>Willkommen, {user.name}</span>
            {user.role === "admin" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => router.push("/admin/dashboard")}
              >
                Dashboard
              </button>
            )}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Abmelden
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Anmelden / Registrieren
          </button>
        )}
      </div>

      {/* Render del Modal */}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </nav>
  );
}
