import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalContentProps {
  onClose: () => void;
}

const AuthModalContent: React.FC<AuthModalContentProps> = ({ onClose }) => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      onClose(); // Cierra el modal al finalizar
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten.");
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
