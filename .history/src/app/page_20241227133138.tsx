"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Barra de navegación */}
      <nav className="p-4 fixed top-0 w-full shadow bg-green-600 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kolumbianische Gemälde</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Suche..."
              className="px-4 py-2 rounded-lg text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-yellow-500" : "bg-blue-500"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞 Hell" : "🌙 Dunkel"}
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow pt-20 p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 text-center mb-6">
          Unsere Gemälde
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            Anfang
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Zurück
          </button>
          <span className="text-gray-700">
            Seite {currentPage} von {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Weiter
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Ende
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} Alix Ivonne Chaparro Vasquez. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
