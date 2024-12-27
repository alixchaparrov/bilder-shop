"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore(); // Accede al método del store

  return (
    <motion.div
      key={product._id}
      className="card"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={product.image.url()} // Asegúrate de que `urlFor` esté bien configurado
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
          onClick={() => addToCart(product)} // Agrega el producto al carrito
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}


