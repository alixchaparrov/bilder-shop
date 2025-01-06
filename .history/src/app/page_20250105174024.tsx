"use client";

import { useAuth } from "../context/AuthContext";
import Navbar from "..//components/Navbar";
import AdminDashboard from "./admin/dashboard/page";
import PublicHome from "./components/PublicHome";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center mt-12">Por favor, inicia sesión.</p>;
  }

  if (user.role === "admin") {
    return (
      <>
        <Navbar
          searchQuery=""
          setSearchQuery={() => {}}
          toggleDarkMode={() => {}}
          darkMode={false}
        />
        <AdminDashboard />
      </>
    );
  }

  return (
    <>
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        toggleDarkMode={() => {}}
        darkMode={false}
      />
      <PublicHome />
    </>
  );
}
