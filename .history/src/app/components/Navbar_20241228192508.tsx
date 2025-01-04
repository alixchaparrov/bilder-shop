"use client";

import { useCartStore } from "../../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <img src="images/logo.png" alt="Kolumbianische Gemälde Logo" className="h-10" />
        <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="relative">
          <button className="cart-button hover:bg-secondary">
            🛒
            {cart.length > 0 && (
              <div className="cart-counter">{cart.length}</div>
            )}
          </button>
        </div>
        <button className="btn-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark">
          Anmelden
        </button>
      </div>
    </nav>
  );
}
