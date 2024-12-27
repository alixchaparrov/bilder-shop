"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
src\store\cartSore.ts
import { urlFor } from "@/lib/sanity";

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();

  return (
    <motion.div
      key={product._id}
      className="card"
      whileHover={{ scale: 1.05 }}
    >
      {/* Imagen del producto */}
      {product.image && (
        <Image
          src={urlFor(product.image).url()} // Generar la URL de la imagen
          alt={product.name}
          width={500}
          height={300}
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded"
        />
      )}

      {/* Información del producto */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description}</p>
          <p className="card-price">{product.price} €</p>
        </div>

        {/* Botón para agregar al carrito */}
        <button
          className="btn-primary btn-green"
          onClick={() => addToCart(product)}
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
