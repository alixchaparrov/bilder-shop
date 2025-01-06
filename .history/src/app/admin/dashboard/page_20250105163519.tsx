"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirige a la página inicial si el usuario no es admin
    }
  }, [user, router]);

  const logout = () => {
    setUser(null);
    window.location.href = "/";
  };

  if (!user || user.role !== "admin") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={log}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gestión de Usuarios */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Gestión de Usuarios</h2>
          <p className="text-gray-600">
            Administra usuarios, roles y permisos en tu aplicación.
          </p>
          <button
            onClick={() => router.push("/admin/dashboard/users")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Ver Usuarios
          </button>
        </div>

        {/* Estadísticas y Reportes */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Estadísticas y Reportes</h2>
          <p className="text-gray-600">
            Visualiza estadísticas y genera reportes de la aplicación.
          </p>
          <button
            onClick={() => router.push("/admin/dashboard/analytics")}
            className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Ver Reportes
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Todos los derechos reservados.
      </footer>
    </div>
  );
}
