"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/";

export default function Home() {
  const [products, setProducts] = useState([]); // Estado para los productos
  const { cart } = useCartStore(); // Estado del carrito desde Zustand
  const [showCart, setShowCart] = useState(false); // Mostrar el carrito
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [searchQuery, setSearchQuery] = useState(""); // Búsqueda de productos
  const [darkMode, setDarkMode] = useState(false); // Modo oscuro

  // Manejar el cambio entre modo oscuro y claro
  useEffect(() => {
    const html = document.querySelector("html");
    darkMode ? html?.classList.add("dark") : html?.classList.remove("dark");
  }, [darkMode]);

  // Obtener productos desde Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch(`*[_type == "product"]`);
        setProducts(fetchedProducts);
      } catch (err) {
        setError("No se pudieron cargar los productos. Verifica tu conexión.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mostrar un mensaje mientras se cargan los productos
  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      {/* Barra de navegación */}
      <nav className="p-4 fixed top-0 w-full bg-primary flex justify-between">
        <input
          type="text"
          placeholder="Buscar productos..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded"
        />
        <button onClick={() => setDarkMode(!darkMode)} className="btn-primary">
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </nav>

      {/* Lista de productos */}
      <main className="pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </main>
    </div>
  );
}
