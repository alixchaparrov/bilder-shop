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
    <div className="p-4">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Abmelden
        </button>
      </header>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* User Management */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            User Management
          </h2>
          <p className="text-gray-600 mb-4">
            Manage users, roles, and permissions in your application.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            View Users
          </button>
        </div>

        {/* Product Management */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Product Management
          </h2>
          <p className="text-gray-600 mb-4">
            Add, edit, and delete products in your store.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Manage Products
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Analytics
          </h2>
          <p className="text-gray-600 mb-4">
            View application analytics and reports.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            View Reports
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
