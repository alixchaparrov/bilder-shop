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
      const response = await fetch("/api/auth/reset-password", {
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
    <div className="container">
      <div className="content">
        <h1>Restablecer Contraseña</h1>
        {message && (
          <p className={`message ${message.includes("exitosamente") ? "success" : "error"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Actualizar Contraseña</button>
        </form>
      </div>

      <style jsx>{`
        /* General */
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f3f4f6;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
        }

        .content {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        h1 {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #1e3a8a;
        }

        .message {
          margin-bottom: 1rem;
          text-align: center;
          font-size: 0.9rem;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .message.success {
          color: #155724;
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
        }

        button {
          width: 100%;
          padding: 0.9rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        button:hover {
          background-color: #1e40af;
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
