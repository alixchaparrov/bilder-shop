"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { cart, removeFromCart } = useCartStore();
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const normalizeText = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    const html = document.querySelector("html");
    darkMode ? html?.classList.add("dark") : html?.classList.remove("dark");
  }, [darkMode]);

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

  const filteredProducts = products.filter((product) =>
    normalizeText(product.name)
      .toLowerCase()
      .includes(normalizeText(searchQuery).toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <div>Laden von Produkten...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Barra de navegación */}
      <nav
        className={`p-4 fixed top-0 w-full z-10 shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-primary text-textLight"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kolumbianische Gemälde
            </h1>
          </div>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Suche..."
              className={`px-4 py-2 rounded ${
                darkMode ? "bg-gray-700 text-white" : "text-black"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className={`btn-primary ${
                darkMode ? "btn-yellow" : "btn-green"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞 Hell" : "🌙 Dunkel"}
            </button>
            <div className="relative">
              <button
                className="cart-button"
                onClick={() => setShowCart(true)}
              >
                🛒
                {cart.length > 0 && (
                  <span className="cart-counter">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow pt-20 p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans text-textDark mb-6 text-center">
          Unsere Gemälde
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {/* Paginación */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            className={`btn-primary ${
              currentPage === 1 ? "btn-gray" : "btn-yellow"
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            Anfang
          </button>
          <button
            className={`btn-primary ${
              currentPage === 1 ? "btn-gray" : "btn-yellow"
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Zurück
          </button>
          <span className="text-sm">
            Seite {currentPage} von {totalPages}
          </span>
          <button
            className={`btn-primary ${
              currentPage === totalPages ? "btn-gray" : "btn-yellow"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Weiter
          </button>
          <button
            className={`btn-primary ${
              currentPage === totalPages ? "btn-gray" : "btn-yellow"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            Ende
          </button>
        </div>
      </main>
    </div>
  );
}
