"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
  const [users, setUsers] = useState([]);
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "user",
    password: "",
  });
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige si el usuario no es admin
    } else {
      fetchUsers();
    }
  }, [user, router]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || (!form.password && !form.id)) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const method = form.id ? "PUT" : "POST";
      const endpoint = form.id ? `/api/users?id=${form.id}` : "/api/users";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          ...(form.password && { password: form.password }),
        }),
      });

      if (response.ok) {
        fetchUsers();
        setForm({ id: null, name: "", email: "", role: "user", password: "" });
        setError(null);
        alert(
          form.id
            ? "Usuario actualizado exitosamente."
            : "Usuario agregado exitosamente."
        );
      } else {
        const data = await response.json();
        setError(data.error || "Error al procesar la solicitud.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al procesar la solicitud.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
        alert("Usuario eliminado exitosamente.");
      } else {
        alert("Error al eliminar usuario.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen flex flex-col`}></div>
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
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
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {/* Add or Update User Form */}
        <form
          onSubmit={handleAddOrUpdateUser}
          className="mb-6 bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-bold mb-4">
            {form.id ? "Actualizar Usuario" : "Agregar Usuario"}
          </h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Correo"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-2 border rounded-lg"
            />
            {!form.id && (
              <input
                type="password"
                placeholder="Contraseña"
                value={form.password || ""}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="p-2 border rounded-lg"
              />
            )}
            <select
              value={form.role || "user"}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="p-2 border rounded-lg"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {form.id ? "Actualizar Usuario" : "Agregar Usuario"}
          </button>
        </form>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 p-3 w-full border rounded-lg"
        />

        {/* User Table */}
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-100 transition-colors"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      setForm({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                      })
                    }
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
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg shadow transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          <span className="text-gray-700 font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg shadow transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
              onClick={() => {
                navigator.clipboard.writeText(resetLink || "");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`w-full p-3 text-white rounded-lg mb-2 ${
                copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
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
    </div>
  );
}
