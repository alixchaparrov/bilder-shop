"use client";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

const CartModal = ({ showCart, setShowCart }: { showCart: boolean; setShowCart: (value: boolean) => void }) => {
  const { cart, addToCart, removeFromCart, removeOneFromCart, clearCart } = useCartStore();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!showCart) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowCart(false)} // Cierra el modal al hacer clic fuera
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Previene el cierre al hacer clic dentro del modal
      >
        <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
        {cart.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center">
                  <span>
                    {item.name} (x{item.quantity}) - {item.price * item.quantity} €
                  </span>
                  <div className="flex items-center space-x-2">
                    {/* Botón para disminuir cantidad */}
                    <button
                      onClick={() => removeOneFromCart(item._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Reduzca la cantidad"
                    >
                      <FaMinus />
                    </button>

                    {/* Botón para agregar más */}
                    <button
                      onClick={() => addToCart(item)}
                      className="text-green-500 hover:text-green-700"
                      title="Agregar uno más"
                    >
                      <FaPlus />
                    </button>

                    {/* Botón para eliminar completamente */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar producto"
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
              <span className="text-lg font-bold">Gesamtpreis: {getTotalPrice()} €</span>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Ihr Warenkorb ist leer.</p>
        )}
        <button
          className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          onClick={() => setShowCart(false)}
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default CartModal;
