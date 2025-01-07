import { useState } from "react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("El token no es válido o ha expirado.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage("Contraseña actualizada con éxito.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error al actualizar la contraseña.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Hubo un error al actualizar la contraseña.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
        {message && (
          <p className="mb-4 text-center text-sm text-red-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
