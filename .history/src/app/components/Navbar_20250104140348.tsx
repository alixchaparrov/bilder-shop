"use client";

import { useState } from "react";
import CartModal from "@/app/components/CartModal";
import AuthModal from "@/app/components/AuthModalContent";
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
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado de la modal del carrito
  const { cart } = useCartStore(); // Estado global del carrito
  const { user, logout } = useAuth(); // Usuario autenticado y función de logout

  return (
    <>
      {/* Barra de navegación */}
      <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
        {/* Logo y título */}
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-xl font-bold">Kolumbianische Gemälde</h1>
        </div>

        {/* Búsqueda */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Produkte suchen..."
            className="px-4 py-2 rounded-lg text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Botón para cambiar el modo oscuro */}
          <button className="px-4 py-2 rounded-lg" onClick={toggleDarkMode}>
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* Botón del carrito */}
          <button
            className="relative flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Opciones de usuario */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Willkommen, {user.name || user.email}</span>
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
        {/* Modal de Autenticación */}
        {isAuthModalOpen && (
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />
        )}
      </nav>

      {/* Modal del carrito */}
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
