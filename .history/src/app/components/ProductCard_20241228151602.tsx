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
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.div
      key={product._id}
      className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={urlFor(product.image).url()}
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description}</p>
          <p className="card-price text-primary mt-2">{product.price} €</p>
        </div>
        <button
          className="btn-green mt-4"
          onClick={() => addToCart({ ...product, quantity: 1 })}
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
