"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [products, setProducts] = useState([]); // Estado para los productos
  const { user, login, register } = useAuth(); // Contexto de autenticación
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
  const itemsPerPage = 6; // Número de productos por página
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch(`*[_type == "product"]`);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!user) {
    // Mostrar formulario de inicio de sesión
    return (
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />
        <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-semibold text-center mb-4">Anmelden</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none"
              >
                Anmelden
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Mostrar productos si el usuario está autenticado
  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />
      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">
          Unsere Gemälde
        </h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
        )}

        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            Inicio
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Siguiente
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Final
          </button>
        </div>
      </main>
    </div>
  );
}
