"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function ProductCard({ product }) {
  return (
    <motion.div
      key={product._id}
      className="border rounded-lg shadow-md overflow-hidden bg-white"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={urlFor(product.image).url()}
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="flex justify-center mt-4">
        <div>
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-green-500">{product.price} €</p>
        </div>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => console.log("Producto agregado al carrito")}
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
