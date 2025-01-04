"use client";

import { useCartStore } from "@/store/cartStore";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const isInCart = cart.some((item) => item._id === product._id);

  return (
    <div className="card flex flex-col items-start justify-between p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-t-lg w-full h-48 object-cover"
        onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-primary">{product.price.toFixed(2)} €</span>
          <button
            className={`btn-primary ${isInCart ? "bg-gray-500 cursor-not-allowed" : ""}`}
            onClick={() => addToCart(product)}
            disabled={isInCart}
          >
            {isInCart ? "Bereits hinzugefügt" : "Zum Warenkorb hinzufügen"}
          </button>
        </div>
      </div>
    </div>
  );
}
