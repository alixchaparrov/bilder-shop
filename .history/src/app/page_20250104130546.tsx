"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar"; // Si estás usando el Navbar unificado
import { useCartStore } from "@/store/cartStore";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [products, setProducts] = useState([]); // Estado para los productos
  const { cart, addToCart, removeFromCart, clearCart, removeOneFromCart } =
    useCartStore();
  const [showCart, setShowCart] = useState(false); // Estado para mostrar el carrito
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
  const itemsPerPage = 6; // Número de productos por página

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
