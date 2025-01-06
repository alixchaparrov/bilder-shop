"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", role: "user" });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setForm(user);
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
        setForm({ id: null, name: "", email: "", role: "user" });
      } else {
        console.error("Error saving user:", await response.json());
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* User Management Section */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">User Management</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="col-span-1 sm:col-span-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              {form.id ? "Update User" : "Add User"}
            </button>
          </form>

          {/* Users Table */}
          <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Role</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3 capitalize">{user.role}</td>
                  <td className="border p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
