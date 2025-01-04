"use client";

import { useAuth } from "@/context/AuthContext"; // Contexto de autenticación
import { useState, useEffect } from "react";
import AuthModalContent from "./AuthModalContent";

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtener usuario y funciones del contexto
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de autenticación
  const [isClient, setIsClient] = useState(false); // Asegurar renderizado en cliente

  // Habilitar renderizado en cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evitar renderizado en el servidor

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-2xl font-bold">Kolumbianische Gemälde</h1>
        </div>

        {/* Opciones de usuario */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>
                Willkommen, <strong>{user.email}</strong>
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
              Iniciar sesión / Registrarse
            </button>
          )}
        </div>
      </nav>

      {/* Modal de autenticación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>

            {/* Contenido del modal */}
            <AuthModalContent onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
