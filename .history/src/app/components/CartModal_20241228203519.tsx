"use client";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

const CartModal = ({
  showCart,
  setShowCart,
}: {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}) => {
  const { cart, addToCart, removeFromCart, removeOneFromCart, clearCart } =
    useCartStore();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!showCart) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowCart(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Warenkorb</h2>
        {cart.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <span className="block font-semibold">{item.name}</span>
                    <span>
                      {item.quantity} x {item.price.toFixed(2)} € = {" "}
                      {(item.quantity * item.price).toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeOneFromCart(item._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Reduzca die Menge"
                    >
                      <FaMinus />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-green-500 hover:text-green-700"
                      title="Mehr hinzufügen"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Löschen"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => clearCart()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Warenkorb leeren
              </button>
              <span className="text-lg font-bold">
                Gesamtpreis: {getTotalPrice().toFixed(2)} €
              </span>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Ihr Warenkorb ist leer.</p>
        )}
        <button
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
          onClick={() => setShowCart(false)}
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default CartModal;
