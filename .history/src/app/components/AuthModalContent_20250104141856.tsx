"use client";

import { useState } from "react";
import { FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      alert("Registrierung wird implementiert...");
    } else {
      alert("Anmeldung wird implementiert...");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Modal Header */}
        <div className="modal-header flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">
              <FaLock size={24} />
            </span>
            <h2 className="text-lg font-semibold text-gray-800">
              {isRegistering ? "Registrieren" : "Willkommen!"}
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={onClose}
            aria-label="Schließen"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Passwort ausblenden" : "Passwort anzeigen"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            {isRegistering ? "Registrieren" : "Anmelden"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-sm text-center">
          {isRegistering ? (
            <p>
              Haben Sie schon ein Konto?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Anmelden
              </button>
            </p>
          ) : (
            <p>
              Haben Sie noch kein Konto?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsRegistering(true)}
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
