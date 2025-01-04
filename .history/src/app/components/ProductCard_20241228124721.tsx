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
      {/* Imagen del producto */}
      <Image
        src={urlFor(product.image).url()} // Utiliza la URL generada
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-56 object-cover"
      />
      
      {/* Detalles del producto */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description}</p>
          <p className="card-price">{product.price} €</p>
        </div>

        {/* Botón para agregar al carrito */}
        <button
          className="btn-green"
          onClick={() => addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1, // Inicia con cantidad 1
          }) // Agrega el producto al carrito
        >
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </motion.div>
  );
}
