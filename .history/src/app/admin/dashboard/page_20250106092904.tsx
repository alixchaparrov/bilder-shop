"use client";

import { useState, useEffect } from "react";
import { FaUser, FaBox, FaChartBar, FaMoon, FaSun } from "react-icons/fa";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (currentView === "users") {
      fetchUsers();
    } else if (currentView === "products") {
      fetchProducts();
    }
  }, [currentView]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users"); // Reemplaza con tu endpoint
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Reemplaza con tu endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
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

  const renderContent = () => {
    switch (currentView) {
      case "users":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
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
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Precio</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                        Editar
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "analytics":
        return <div>Analíticas: Visualiza los reportes y estadísticas aquí.</div>;
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
    </div>
  );
}
