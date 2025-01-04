"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

export default function AuthModalContent({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambiar el estado al hacer clic en el icono
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaLock className="text-green-600" size={24} />
            <h2 className="text-lg font-semibold text-gray-800">Willkommen!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email-Adresse
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {/* Icono de mostrar/ocultar */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            Anmelden
          </button>
        </form>

        {/* Registro */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Haben Sie noch kein Konto?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
}
