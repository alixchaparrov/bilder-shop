"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home"); // Estado para alternar vistas

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige si el usuario no es admin
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return <p>Loading...</p>;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p>Here you can manage users, roles, and permissions.</p>
          </div>
        );
      case "products":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <p>Here you can add, edit, and delete products.</p>
          </div>
        );
      case "analytics":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p>Here you can view application analytics and reports.</p>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
            <p>Select a section to manage.</p>
          </div>
        );
    }
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Menu Items */}
          <div
            className="cursor-pointer border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105 text-center"
            onClick={() => setActiveSection("users")}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Management</h2>
            <p className="text-gray-600">Manage users, roles, and permissions.</p>
          </div>

          <div
            className="cursor-pointer border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105 text-center"
            onClick={() => setActiveSection("products")}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Management</h2>
            <p className="text-gray-600">Add, edit, and delete products.</p>
          </div>

          <div
            className="cursor-pointer border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105 text-center"
            onClick={() => setActiveSection("analytics")}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
            <p className="text-gray-600">View application analytics and reports.</p>
          </div>
        </div>

        {/* Render Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          {renderSection()}
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
