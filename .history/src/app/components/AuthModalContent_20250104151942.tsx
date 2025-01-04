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
    <div className="modal-overlay" onClick={onClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <button className="modal-close" onClick={onClose}>
      &times;
    </button>
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-green-600">
        <FaLock size={24} />
      </span>
      <h2 className="text-lg font-semibold text-gray-800">Willkommen!</h2>
    </div>
    <form>
      <label className="block text-sm font-medium text-gray-700">
        Email-Adresse
      </label>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Passwort
      </label>
      <div className="relative">
        <input
          type="password"
          placeholder="Passwort"
          className

  );
}
