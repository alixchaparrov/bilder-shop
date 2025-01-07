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
  const [resetLink, setResetLink] = useState<string | null>(null); // Enlace para la modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de la modal

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
        alert("Failed to generate password reset link.");
      }
    } catch (error) {
      console.error("Error generating password reset link:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResetLink(null);
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Password Reset Link</h2>
            <p className="mb-4">
              Copy the link below and share it with the user to reset their password:
            </p>
            <input
              type="text"
              readOnly
              value={resetLink || ""}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={closeModal}
              className="mt-4 w-full p-3 bg-red-500 text-white rounded-lg"
            >
              Close
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
