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
        <div className="max-w-7xl mx-auto flex justify-between item
