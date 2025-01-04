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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Ihr Warenkorb ist leer.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)} € = {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => addToCart(item)}
                    >
                      
 
Icon Family

Classic
Select an Icon Style
<FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeOneFromCart(item._id)}
                    >
                      -
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeFromCart(item._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Gesamtpreis:</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={clearCart}
            >
              Warenkorb leeren
            </button>
          </>
        )}
        <button
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
