"use client";

import { useState, useEffect } from "react";
import client, { urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCartStore();
  const [showCart, setShowCart] = useState(false); // Estado para mostrar el carrito
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado de búsqueda
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 6; // Cantidad de productos por página

  // Función para eliminar tildes
  const normalizeText = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Manejar la clase dark en <html>
  useEffect(() => {
    const html = document.querySelector("html");
    if (darkMode) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch de productos desde Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch(`*[_type == "product"]`);
        console.log("Productos cargados:", fetchedProducts); // Agregado para verificar la respuesta
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Verifica tu conexión.");
      } finally {
        setIsLoading(false); // Cambiar el estado de carga al finalizar
      }
    };
  
    fetchProducts();
  }, []);
  
  // Manejar carrito
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
  };

  // Filtros y paginación
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

  // Cambiar página y desplazarse al inicio
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Renderizado condicional basado en el estado de carga y error
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
            <Image
              src="/images/logo.png"
              alt="Kolumbianische Gemälde Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
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
            {/* Botón de modo claro/oscuro */}
            <button
              className={`btn-primary ${
                darkMode ? "btn-yellow" : "btn-green"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞 Hell" : "🌙 Dunkel"}
            </button>
            {/* Botón del carrito */}
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
            <motion.div
              key={product._id}
              className="card"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-description">{product.description}</p>
                  <p className="card-price">{product.price} €</p>
                </div>
                <button
                  className="btn-primary btn-green"
  onClick={() => addToCart(product)} // Usa el método del store
>
  Zum Warenkorb hinzufügen
</button>
              </div>
            </motion.div>
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

      {/* Modal del carrito */}
      {showCart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">Warenkorb</h2>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Löschen
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ihr Warenkorb ist leer</p>
            )}
            <button
              onClick={() => setShowCart(false)}
              className="modal-close"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`p-6 text-center ${
          darkMode ? "bg-gray-800 text-white" : "bg-primary text-textLight"
        }`}
      >
        <p className="text-sm">
          © {new Date().getFullYear()} Alix Ivonne Chaparro Vasquez. Alle Rechte
          vorbehalten.
        </p>
      </footer>
    </div>
  );
}
