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
      <div className="modal-container">
  {/* Botón de cierre */}
  <button className="modal-close" onClick={onClose}>
    &times;
  </button>

  {/* Título */}
  <h2 className="text-lg font-semibold text-gray-800">
    {isRegistering ? "Registrieren" : "Anmelden"}
  </h2>

  {/* Formulario */}
  <form onSubmit={handleSubmit} className="w-full mt-4">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email-Adresse
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        placeholder="Geben Sie Ihre Email ein"
        required
      />
    </div>
    <div className="mt-4">
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
          placeholder="Geben Sie Ihr Passwort ein"
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

    {/* Botones y enlace */}
    <div className="button-container">
      <button type="submit" className="button">
        {isRegistering ? "Registrieren" : "Anmelden"}
      </button>
      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="link"
      >
        {isRegistering ? "Anmelden" : "Registrieren"}
      </button>
    </div>
  </form>
</div>

    </div>
  );
}
