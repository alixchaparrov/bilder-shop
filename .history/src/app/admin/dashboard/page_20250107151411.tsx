"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [resetLink, setResetLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setFilteredUsers(data);
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
        setResetLink(data.resetLink);
        setIsModalOpen(true);
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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reinicia a la primera página
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

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
      <main className="flex-grow max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">User Management</h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar usuarios por nombre o correo..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Table */}
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-800">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-100 transition-colors text-gray-700"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlePasswordReset(user.email)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Siguiente
          </button>
        </div>
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
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
