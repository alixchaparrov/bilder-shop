"use client";

import { useState, useEffect } from "react";
import client from "@/libsanity";
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

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          className="btn-gray"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          Anfang
        </button>
        <button
          className="btn-gray"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Zurück
        </button>
        <span>
          Seite {currentPage} von {totalPages}
        </span>
        <button
          className="btn-gray"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Weiter
        </button>
        <button
          className="btn-gray"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          Ende
        </button>
      </div>
    </div>
  );
};

export default ProductList;
