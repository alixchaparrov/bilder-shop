"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="p-4 bg-green-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Kolumbianische Gemälde</h1>
      <button className="relative">
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;