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

      setMessage("Contraseña actualizada con éxito.");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-box">
          <h1 className="form-title">Restablecer Contraseña</h1>
          {message && (
            <p
              className={`form-message ${
                message.includes("éxito") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nueva contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button">
              Actualizar Contraseña
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .form-box {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
        }

        .form-message {
          margin-bottom: 1rem;
          text-align: center;
          font-size: 0.9rem;
          padding: 0.5rem;
          border-radius: 4px;
        }

        .form-message.success {
          color: #155724;
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
        }

        .form-message.error {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .form-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .form-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}
