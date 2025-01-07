import { useState } from "react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      setMessage("Contraseña actualizada exitosamente.");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Restablecer Contraseña</h1>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
