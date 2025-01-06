"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";
import AuthModal from "@/app/components/AuthModalContent";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Abrir el modal de inicio de sesión si no hay usuario
  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

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

  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />

      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        {user ? (
          <>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">
              Unsere Gemälde
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
            )}
          </>
        ) : (
          <p className="text-center mt-12">Por favor, inicia sesión.</p>
        )}
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
