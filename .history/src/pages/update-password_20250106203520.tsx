"use client";

import { useState, useEffect } from "react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Token inválido o expirado.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage("Contraseña actualizada con éxito.");
      } else {
        const error = await response.json();
        setMessage(error.error || "Error al actualizar la contraseña.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Restablecer Contraseña</h1>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("éxito") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

<style jsx>{`
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-container input,
  .form-container button {
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #ddd;
  }

  .form-container button {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .form-container button:hover {
    background-color: #0056b3;
  }
`}</style>

