"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar"; // Si usas un Navbar unificado
import { useCartStore } from "@/store/cartStore";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [products, setProducts] = useState([]); // Estado para los productos
  const { cart, addToCart, removeFromCart, clearCart, removeOneFromCart } = useCartStore();
  const [showCart, setShowCart] = useState(false); // Estado para mostrar el carrito
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
  const itemsPerPage = 6; // Número de productos por página

  // Fetch de productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch(`*[_type == "product"]`);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProducts(); // Llama a la función fetchProducts
  }, []); // Array vacío para que solo se ejecute al montar el componente

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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">
          Unsere Gemälde
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} Kolumbianische Gemälde. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
