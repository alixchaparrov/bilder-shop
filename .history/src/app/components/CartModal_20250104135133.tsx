"use client";

import { useCartStore } from "@/store/cartStore";
import { useCallback } from "react";

export default function CartModal({ onClose }: { onClose: () => void }) {
  // Usa selectores individuales para evitar renderizaciones innecesarias
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeOneFromCart = useCartStore((state) => state.removeOneFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Calcula el precio total
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    
  );
}
