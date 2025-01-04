"use client";

import { useState, useEffect } from "react";
import client from "@/lib/sanity";
import ProductCard from "@/app/components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="w-full p-4 rounded-lg border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 mt-4">
  <button
    disabled={currentPage === 1}
    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ⬅️
  </button>
  <span>
    Seite {currentPage} von {totalPages}
  </span>
  <button
    disabled={currentPage === totalPages}
    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    ➡️
  </button>
</div>
    </div>
  );
};

export default ProductList;
