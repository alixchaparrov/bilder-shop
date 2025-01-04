"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useCartStore } from "@/store/cartStore";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart); // Obtenemos la función del store global

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
          <p className="card-price">{product.price} €</p>
        </div>
        <button
          className="btn-green"
          onClick={() =>
            addToCart({
              _id: product._id,
              name: product.name,
              price: product.price,
              quantity: 1, // Cantidad inicial
            })
          }
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
