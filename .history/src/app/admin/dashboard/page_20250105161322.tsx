"use client";

import { useAuth } from "../../../context/AuthContext";

import { redirect } from "next/navigation";

import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    redirect("/"); // Redirige a la página principal si no es admin
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      {/* Aquí puedes agregar las funcionalidades del panel de administración */}
    </div>
  );
}
