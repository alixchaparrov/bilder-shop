"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [resetLink, setResetLink] = useState<string | null>(null); // Solo una vez
  const [isModalOpen, setIsModalOpen] = useState(false); // Solo una vez
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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
        alert("No se pudo generar el enlace de recuperación.");
      }
    } catch (error) {
      console.error("Error generando el enlace:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResetLink(null);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (resetLink) {
      navigator.clipboard.writeText(resetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetea el mensaje después de 2 segundos
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold">Admin Dashboard</
