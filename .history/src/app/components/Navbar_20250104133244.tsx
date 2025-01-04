"use client";

import { useAuth } from "../../context/AuthContext"; // Contexto de autenticación
import { useCartStore } from "@/store/cartStore"; // Contexto del carrito
import { useState, useEffect } from "react";
import AuthModalContent from "@/app/components/AuthModalContent";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ searchQuery, setSearchQuery, toggleDarkMode, darkMode }) => {
  const { user, logout } = useAuth(); // Usuario autenticado
  const { cart } = useCartStore(); // Estado del carrito
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de autenticación
  const [isCartOpen, setIsCartOpen] = useState(false); // Modal del carrito
  const [isClient, setIsClient] = useState(false); // Renderizado en cliente

  // Renderizado en cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evitar renderizado en el servidor

  return (
    <>
      <nav className="p-4 fixed top-0 w-full shadow bg-green-600 text-white z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.png"
              alt="Kolumbianische Gemälde Logo"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-2xl font-bold">Kolumbianische Gemälde</h1>
          </div>

          {/* Opciones de búsqueda, modo oscuro y carrito */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda */}
            <input
              type="text"
              placeholder="Produkte suchen..."
              className="px-4 py-2 rounded-lg text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Modo oscuro */}
            <button
              className="px-4 py-2 rounded-lg"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Carrito */}
            <button
              className="cart-button flex items-center space-x-2 text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="cart-counter">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Autenticación */}
            {user ? (
              <>
                <span>
                  Bienvenido, <strong>{user.email}</strong>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Lo / Registrarse
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de autenticación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <AuthModalContent onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Modal del carrito */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-header">Warenkorb</h2>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between items-center">
                    <span>
                      {item.name} (x{item.quantity}) - {item.price * item.quantity} €
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ihr Warenkorb ist leer</p>
            )}
            <button
              className="modal-close"
              onClick={() => setIsCartOpen(false)}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
