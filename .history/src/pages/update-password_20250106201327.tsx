import { useState } from "react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Token inválido o expirado.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      setMessage("Contraseña actualizada con éxito.");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nueva contraseña
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
