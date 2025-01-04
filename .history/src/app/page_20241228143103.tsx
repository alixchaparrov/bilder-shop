"use client";

import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaMoon, FaSun, FaUserAlt } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import ProductList from "@/app/components/ProductList"; // Componente modularizado para la lista de productos
import CartModal from "@/app/components/CartModal"; // Modal para gestionar el carrito
import AuthComponent from "@/app/components/AuthComponent"; // Componente para autenticación

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false); // Estado para el modal del carrito
  const [showAuthModal, setShowAuthModal] = useState(false); // Estado para el modal de autenticación
  const [user] = useAuthState(auth); // Estado del usuario autenticado

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Barra de navegación */}
      <nav className="p-4 fixed top-0 w-full shadow bg-green-600 text-white z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo.png"
              alt="Kolumbianische Gemälde Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold">Kolumbianische Gemälde</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Modo oscuro */}
            <button
              className="px-4 py-2 rounded-lg"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Botón del carrito */}
            <button
              className="cart-button flex items-center space-x-2 text-white"
              onClick={() => setShowCart(true)} // Abre el modal del carrito
            >
              <FaShoppingCart size={20} />
            </button>

            {/* Botón de autenticación */}
            <button
              className="text-white flex items-center"
              onClick={() => setShowAuthModal(true)} // Abre el modal de autenticación
            >
              <FaUserAlt size={20} className="mr-2" />
              {user ? user.email : "Anmelden"}
            </button>
          </div>
        </div>
      </nav>

      {/* Modal del carrito */}
      {showCart && (
        <CartModal showCart={showCart} setShowCart={setShowCart} /> // Pasa la función para cerrar el modal
      )}

      {/* Modal de autenticación */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowAuthModal(false)} // Cierra el modal al hacer clic fuera
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic dentro del modal
          >
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setShowAuthModal(false)} // Cierra el modal
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Anmelden oder Registrieren
            </h2>
            <AuthComponent /> {/* Componente de autenticación */}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="flex-grow pt-28 p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">
          Unsere Gemälde
        </h2>
        <ProductList /> {/* Componente modularizado para la lista de productos */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>
          © {new Date().getFullYear()} Kolumbianische Gemälde. Entdecken Sie die
          Schönheit Kolumbiens durch unsere einzigartigen Landschaftsgemälde.
          Entwickelt mit Leidenschaft von Alix Ivonne Chaparro Vasquez. Alle
          Rechte vorbehalten.
        </p>
      </footer>
    </div>
  );
}
