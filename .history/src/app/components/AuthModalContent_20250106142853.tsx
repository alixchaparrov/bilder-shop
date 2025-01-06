"use client";

import { useState } from "react";
import { useAuth } from "@/context/A";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isRegistering) {
        await register(name, email, password);
        alert("Registrierung erfolgreich");
      } else {
        await login(email, password);
        alert("Anmeldung erfolgreich");
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaUser size={24} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {isRegistering ? "Registrieren" : "Anmelden"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Benutzername
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email-Adresse
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Passwort
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading
              ? "Bitte warten..."
              : isRegistering
              ? "Registrieren"
              : "Anmelden"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          {isRegistering ? (
            <p>
              Haben Sie ein Konto?{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-blue-500"
              >
                Anmelden
              </button>
            </p>
          ) : (
            <p>
              Noch kein Konto?{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-blue-500"
              >
                Registrieren
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
