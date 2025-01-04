"use client";

import { urlFor } from "@/lib/sanity";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const isInCart = cart.some((item) => item._id === product._id);

  return (
    <div className="card hover:shadow-lg hover:translate-y-[-5px] transition-transform duration-200">
<img
    src={product.image}
    alt={product.name}
    className="rounded-t-lg w-full h-48 object-cover"
    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
  />
      <div className="p-4">
        <h3 className="card-title mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
        <p className="card-price text-red-500 font-bold">{product.price} €</p>

        <button
          className={`btn-primary ${
            isInCart ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => addToCart(product)}
          disabled={isInCart}
        >
          {isInCart ? "Bereits hinzugefügt" : "Zum Warenkorb hinzufügen"}
        </button>
      </div>
    </div>
  );
}
