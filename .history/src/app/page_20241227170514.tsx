"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";


export default function Home() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart, clearCart, removeOneFromCart } =
    useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Barra de navegación */}
      <nav className="p-4 fixed top-0 w-full shadow bg-green-600 text-white z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo.png"
              alt="Kolumbianische Gemälde Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold">Kolumbianische Gemälde</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Produkte suchen..."
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
            <button
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              🛒
              {cart.length > 0 && (
                <span className="cart-counter">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow pt-24 p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-6">
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
          <span>
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

      {/* Modal del carrito */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">Warenkorb</h2>
            {cart.length > 0 ? (
              <>
                <ul>
  {cart.map((item) => (
    <li key={item._id} className="flex justify-between items-center">
      <span>
        {item.name} (x{item.quantity}) - {item.price * item.quantity} €
      </span>
      <div className="flex items-center space-x-2">
        {/* Botón para disminuir cantidad */}
        <button
          onClick={() => removeOneFromCart(item._id)}
          className="text-yellow-500 hover:text-yellow-700"
          title="Reduzca la cantidad"
        >
          <FaMinus />
        </button>

        {/* Botón para agregar más */}
        <button
          onClick={() => addToCart(item)}
          className="text-green-500 hover:text-green-700"
          title="Agregar uno más"
        >
          <FaPlus />
        </button>

        {/* Botón para eliminar completamente */}
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700"
          title="Eliminar producto"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  ))}
</ul>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => clearCart()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Warenkorb leeren
                  </button>
                  <span className="font-bold text-lg">
                    Gesamtpreis:{" "}
                    {cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}{" "}
                    €
                  </span>
                </div>
              </>
            ) : (
              <p>Ihr Warenkorb ist leer</p>
            )}
            <button className="modal-close" onClick={() => setShowCart(false)}>
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>
          © {new Date().getFullYear()} Alix Ivonne Chaparro Vasquez. Alle Rechte
          vorbehalten.
        </p>
      </footer>
    </div>
  );
}
