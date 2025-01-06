"use client";

import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./admin/dashboard/page";

export default function HomePage() {
  const { user } = useAuth();

  // Si el usuario es admin, mostrar directamente el Dashboard
  if (user && user.role === "admin") {
    return <AdminDashboard />;
  }

  // Si no, mostrar la página de "Unsere Gemälde"
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-green-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Kolumbianische Gemälde</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aquí puedes iterar sobre las tarjetas de productos */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="font-bold text-lg">San Andrés y Providencia</h2>
          <p className="text-gray-600">Un breve resumen del producto...</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Añadir al carrito
          </button>
        </div>
        {/* Repite para cada producto */}
      </main>

      <footer className="mt-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Kolumbianische Gemälde. Todos los derechos reservados.
      </footer>
    </div>
  );
}
