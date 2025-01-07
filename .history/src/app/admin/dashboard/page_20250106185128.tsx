"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "user",
  });
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/users/${form.id}` : "/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchUsers();
        setForm({ id: null, name: "", email: "", role: "user" });
      } else {
        const data = await response.json();
        setError(data.error || "Error saving user.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      setError("An error occurred.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePasswordReset = async (email) => {
    try {
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Password reset email sent successfully.");
      } else {
        alert("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
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
      <main className="flex-grow max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="p-3 border rounded-lg"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="p-3 border rounded-lg"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg"
          >
            {form.id ? "Update User" : "Add User"}
          </button>
        </form>

        {/* User Table */}
        <table className="w-full bg-white rounded-lg shadow-md">
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
            {users.map((user) => (
              <tr key={user.id} className="border-t">
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
                    className="p-2 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePasswordReset(user.email)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte
        vorbehalten.
      </footer>
    </div>
  );
}
