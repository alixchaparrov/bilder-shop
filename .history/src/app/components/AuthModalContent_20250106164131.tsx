"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {/* Título */}
        <div className="flex items-center space-x-2 mb-6">
          <FaUser size={24} className="text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {isRegistering ? "Registrieren" : "Anmelden"}
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {isRegistering && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Benutzername
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email-Adresse
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
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
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Botones y enlaces */}
          <div className="button-container">
            <button
              type="submit"
              className="button"
              disabled={loading}
            >
              {loading
                ? "Bitte warten..."
                : isRegistering
                ? "Registrieren"
                : "Anmelden"}
            </button>
            <p className="text-center text-sm mt-2">
              {isRegistering ? (
                <span>
                  Haben Sie ein Konto?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="link"
                  >
                    Anmelden
                  </button>
                </span>
              ) : (
                <span>
                  Noch kein Konto?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="link"
                  >
                    Registrieren
                  </button>
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
