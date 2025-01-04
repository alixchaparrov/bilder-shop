"use client";

import { useAuth } from "@/context/AuthContext";
import { useAuth } from 
import { useState, useEffect } from "react";
import AuthModalContent from "./AuthModalContent";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Asegúrate de que solo se renderice en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evitar el renderizado en el servidor

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-xl font-bold">Kolumbianische Gemälde</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>
                Willkommen, <strong>{user.name || user.email}</strong>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Abmelden
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Anmelden / Registrieren
            </button>
          )}
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
    </>
  );
};

export default Navbar;
