"use client";

import { useCartStore } from "../../store/cartStore";
import { useState } from "react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-primary text-white"
      } p-4 flex justify-between items-center shadow-md`}
    >
      {/* Logo y Título */}
      <div className="flex items-center gap-4">
  <img src="/logo.png" alt="Logo" className="h-12" />
  <span className="text-2xl font-extrabold text-white">
    Kolumbianische Gemälde
  </span>
</div>

      {/* Controles y Botones */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* Carrito */}
        <div className="relative">
          <button
            className="cart-button hover:bg-secondary flex items-center gap-2"
            title="Warenkorb öffnen"
          >
            🛒
            {cart.length > 0 && (
              <div className="cart-counter">{cart.length}</div>
            )}
          </button>
        </div>

        {/* Botón de Modo Oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {darkMode ? "🌙 Dunkles Modus" : "🌞 Helles Modus"}
        </button>

        {/* Botón de Inicio de Sesión */}
        <button className="btn-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark">
          Anmelden
        </button>
      </div>
    </nav>
  );
}
