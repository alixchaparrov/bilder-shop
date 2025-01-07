"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [resetLink, setResetLink] = useState<string | null>(null); // Solo una vez
  const [isModalOpen, setIsModalOpen] = useState(false); // Solo una vez
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige si el usuario no es admin
    } else {
      fetchUsers();
    }
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      const response = await fetch("/api/auth/generate-reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setResetLink(data.resetLink); // Guarda el enlace en el estado
        setIsModalOpen(true); // Abre la modal
      } else {
        alert("No se pudo generar el enlace de recuperación.");
      }
    } catch (error) {
      console.error("Error generando el enlace:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResetLink(null);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (resetLink) {
      navigator.clipboard.writeText(resetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetea el mensaje después de 2 segundos
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 px-6 py-2 rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-6 dashboard-main">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() =>
                      setForm({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                      })
                    }
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlePasswordReset(user.email)}
                    className="reset-button"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <h2 className="text-xl font-bold mb-4">Enlace de Recuperación</h2>
            <p className="mb-4">Copia el enlace para restablecer la contraseña:</p>
            <input
              type="text"
              readOnly
              value={resetLink || ""}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <button
              onClick={copyToClipboard}
              className="w-full p-3 bg-blue-500 text-white rounded-lg mb-2 hover:bg-blue-600"
            >
              {copied ? "Copiado" : "Copiar Enlace"}
            </button>
            <button
              onClick={closeModal}
              className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte
        vorbehalten.
      </footer>

      {/* Embedded CSS */}
      <style jsx>{`
        .user-table {
          width: 100%;
          background-color: white;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
           width: 90%;
  max-width: 800px;
        }

        .user-table thead {
          background-color: #f9fafb;
          color: #333;
          font-weight: bold;
          text-transform: uppercase;
        }

        .user-table th,
        .user-table td {
          padding: 1rem;
          text-align: left;
        }

        .user-table tbody tr {
          border-top: 1px solid #eee;
          transition: background-color 0.3s ease;
        }

        .user-table tbody tr:hover {
          background-color: #f4f4f4;
        }

        .edit-button,
        .reset-button {
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-button {
          background-color: #ffc107;
          color: white;
        }

        .edit-button:hover {
          background-color: #e0a800;
          transform: scale(1.05);
        }

        .reset-button {
          background-color: #007bff;
          color: white;
        }

        .reset-button:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }

        .dashboard-main h2 {
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
          font-weight: bold;
          color: #333;
        }

        .dashboard-main {
          .dashboard-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-table {
  width: 90%;
  max-width: 800px;
}

        }
      `}</style>
    </div>
  );
}
