"use client";

import { useCartStore } from "@/store/cartStore";

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
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🛒 Warenkorb</h2>
    {cart.length === 0 ? (
      <p className="text-gray-500 text-center">Ihr Warenkorb ist leer.</p>
    ) : (
      <>
        <ul className="mb-4 space-y-4">
          {cart.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {item.price.toFixed(2)} € ={" "}
                  <span className="font-bold">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="text-green-600 hover:text-green-800 text-lg font-bold"
                  onClick={() => addToCart(item)}
                  title="Agregar uno más"
                >
                  +
                </button>
                <button
                  className="text-red-600 hover:text-red-800 text-lg font-bold"
                  onClick={() => removeOneFromCart(item._id)}
                  title="Eliminar uno"
                >
                  -
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 text-lg font-bold"
                  onClick={() => removeFromCart(item._id)}
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span>Gesamtpreis:</span>
          <span className="text-green-600">{totalPrice.toFixed(2)} €</span>
        </div>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4 shadow"
          onClick={clearCart}
        >
          Warenkorb leeren
        </button>
      </>
    )}
    <button
      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow"
      onClick={onClose}
    >
      Schließen
    </button>
  </div>
</div>

  );
}
