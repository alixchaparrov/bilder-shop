"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const AuthModalContent = ({ onClose }: { onClose: () => void }) => {
  const { login, register, loginWithGoogle } = useAuth(); // Incluye loginWithGoogle desde el contexto
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password); // Lógica de registro
      } else {
        await login(email, password); // Lógica de inicio de sesión
      }
      onClose(); // Cierra el modal al finalizar
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Lógica de inicio de sesión con Google
      onClose();
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
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Mit Google anmelden
      </button>
      <p
        className="text-center text-sm text-gray-500 mt-4 cursor-pointer"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? "Bereits registriert? Hier anmelden"
          : "Kein Konto? Hier registrieren"}
      </p>
    </div>
  );
};

export default AuthModalContent;
