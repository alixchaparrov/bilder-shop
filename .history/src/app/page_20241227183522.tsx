"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaMoon, FaSun, FaUserAlt } from "react-icons/fa";
import AuthComponent from "@/app/components/AuthComponent"; // Importación del componente de autenticación

export default function Home() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart, clearCart, removeOneFromCart } =
    useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [showModal, setShowModal] = useState(false); // Estado para el modal de autenticación

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
              className="px-4 py-2 rounded-lg"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button
              className="cart-button flex items-center space-x-2 text-white"
              onClick={() => setShowCart(!showCart)}
            >
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="cart-counter">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            {/* Botón de login */}
            <button
              className="text-white flex items-center"
              onClick={() => setShowModal(true)}  // Abre el modal
            >
              <FaUserAlt size={20} className="mr-2" /> Anmelden
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de autenticación */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}  // Cierra el modal cuando se hace clic fuera de él
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Previene el cierre cuando se hace clic dentro
          >
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setShowModal(false)}  // Cierra el modal
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">Iniciar sesión o Registrarse</h2>
            <AuthComponent />
          </div>
        </div>
      )}

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
                        <button
                          onClick={() => removeOneFromCart(item._id)}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => addToCart(item)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700"
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
                    Gesamtpreis: {getTotalPrice()} €
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
          © {new Date().getFullYear()} Alix Ivonne Chaparro Vasquez. Alle Rechte vorbehalten.
        </p>
      </footer>
    </div>
  );
}
