"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("users"); // Estado predeterminado a "users"
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", role: "user" });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige si el usuario no es admin
    } else {
      fetchUsers(); // Cargar usuarios al iniciar
    }
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setForm(user); // Cargar datos del usuario en el formulario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/users/${form.id}` : "/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, role: form.role }),
      });

      if (response.ok) {
        fetchUsers();
        setForm({ id: null, name: "", email: "", role: "user" }); // Limpiar formulario
      } else {
        console.error("Error al guardar usuario:", await response.json());
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const renderUserManagement = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {form.id ? "Update User" : "Add User"}
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-wide">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Abmelden
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {/* Render Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          {renderUserManagement()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte
        vorbehalten.
      </footer>
    </div>
  );
}
