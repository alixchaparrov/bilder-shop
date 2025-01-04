"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const AuthModalContent = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // Agregar lógica de registro aquí
        console.log("Registrando:", email, password);
      } else {
        // Agregar lógica de inicio de sesión aquí
        console.log("Iniciando sesión:", email, password);
      }
      onClose(); // Cierra el modal al finalizar
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {isRegistering ? "Registrieren" : "Anmelden"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isRegistering ? "Registrieren" : "Anmelden"}
        </button>
      </form>
    </div>
  );
};

export default AuthModalContent;
