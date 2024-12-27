"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
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
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description}</p>
          <p className="card">{product.price} €</p>
        </div>
        <button
          className="btn-primary bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => addToCart(product)}
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
