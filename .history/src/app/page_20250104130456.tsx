
El error indica que useState no está definido. Esto ocurre porque olvidaste importar useState desde React.

Solución
Agrega la importación de useState al inicio de tu archivo src/app/page.tsx:

tsx
Copy code
"use client";

import { useState } from "react"; // Importa useState desde React
El código completo al inicio del archivo debería verse así:

tsx
Copy code
"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar"; // Si estás usando el Navbar unificado
import { useCartStore } from "@/store/cartStore";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />

      {/* Contenido principal */}
      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Aquí va el contenido de productos y paginación */}
      </main>
    </div>
  );
}
