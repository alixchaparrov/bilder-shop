"use client";

import { useState, useEffect } from "react";
import { FaUser, FaBox, FaChartBar, FaMoon, FaSun } from "react-icons/fa";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalData, setModalData] = useState({ isOpen: false, type: "", user: null });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (currentView === "users") {
      fetchUsers();
    }
  }, [currentView]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users?search=${searchQuery}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert("Usuario eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const handleSaveUser = async (user) => {
    try {
      const method = user.id ? "PUT" : "POST";
      const url = user.id ? `/api/users/${user.id}` : `/api/users`;
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      fetchUsers();
      setModalData({ isOpen: false, type: "", user: null });
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const renderContent = () => {
    if (loading) return <p>Cargando...</p>;

    switch (currentView) {
      case "users":
        return (
          <div>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-4 py-2 rounded-lg"
              />
              <button
                onClick={() => setModalData({ isOpen: true, type: "add", user: null })}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Agregar Usuario
              </button>
            </div>

            <table className="min-w-full border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Correo</th>
                  <th className="border border-gray-300 px-4 py-2">Rol</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => setModalData({ isOpen: true, type: "edit", user })}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "products":
        return <div>Gestión de productos próximamente.</div>;
      case "analytics":
        return <div>Analíticas próximamente.</div>;
      default:
        return <div>Selecciona una sección para gestionar.</div>;
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <header className="flex justify-between items-center p-4 bg-green-600 text-white">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Kolumbianische Gemälde Dashboard</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg flex items-center bg-white text-green-600 hover:bg-green-700 hover:text-white"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />} {darkMode ? "Tema Claro" : "Tema Oscuro"}
        </button>
      </header>

      <nav className="flex justify-around bg-green-600 text-white py-4">
        <button
          onClick={() => setCurrentView("users")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "users" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaUser size={20} /> <span>Usuarios</span>
        </button>
        <button
          onClick={() => setCurrentView("products")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "products" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaBox size={20} /> <span>Productos</span>
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentView === "analytics" ? "bg-white text-green-600" : "hover:bg-green-700"}`}
        >
          <FaChartBar size={20} /> <span>Analíticas</span>
        </button>
      </nav>

      <main className="p-6">{renderContent()}</main>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 Kolumbianische Gemälde. Todos los derechos reservados.
      </footer>

      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {modalData.type === "edit" ? "Editar Usuario" : "Agregar Usuario"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const user = Object.fromEntries(formData.entries());
                handleSaveUser({ ...user, id: modalData.user?.id });
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  name="name"
                  defaultValue={modalData.user?.name || ""}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Correo</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={modalData.user?.email || ""}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rol</label>
                <select
                  name="role"
                  defaultValue={modalData.user?.role || "user"}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalData({ isOpen: false, type: "", user: null })}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
