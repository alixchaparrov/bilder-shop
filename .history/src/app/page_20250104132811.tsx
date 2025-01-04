"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Productos por página

  // Fetch de productos desde Sanity
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

  // Lógica para filtrar los productos según la búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Productos mostrados en la página actual
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-4 rounded-lg border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
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
          Inicio
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
    </div>
  );
}
