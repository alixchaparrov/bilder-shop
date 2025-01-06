"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige si el usuario no es admin
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Admin Dashboard
          </h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Management
            </h2>
            <p className="text-gray-600 mb-6">
              Manage users, roles, and permissions in your application.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105">
              View Users
            </button>
          </div>

          {/* Product Management */}
          <div className="border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Product Management
            </h2>
            <p className="text-gray-600 mb-6">
              Add, edit, and delete products in your store.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105">
              Manage Products
            </button>
          </div>

          {/* Analytics */}
          <div className="border rounded-lg shadow-md p-6 bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 mb-6">
              View application analytics and reports.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105">
              View Reports
            </button>
          </div>
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
