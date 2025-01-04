import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/lib/auth"; // Contexto de autenticación
import { useRouter } from "next/router";

const CartModal = () => {
  const { cart, total, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    clearCart: state.clearCart,
  }));

  const { user } = useAuth(); // Usuario autenticado
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/login"); // Redirige al inicio de sesión si no está autenticado
    } else {
      alert("Proceeding to checkout...");
      // Aquí iría la lógica de checkout
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Dein Warenkorb ist leer.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                  <div>
                    <button
                      className="text-green-600 hover:text-green-800 mx-1"
                      onClick={() => useCartStore.getState().increaseQuantity(item._id)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 mx-1"
                      onClick={() => useCartStore.getState().decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-800 mx-1"
                      onClick={() => useCartStore.getState().removeFromCart(item._id)}
                    >
                      🗑
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <span className="font-bold">Gesamtpreis: {total.toFixed(2)} €</span>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Warenkorb leeren
              </button>
            </div>
            <button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCheckout}
            >
              Zur Kasse gehen
            </button>
          </>
        )}
        <button
          onClick={() => useCartStore.getState().toggleCartModal()}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default CartModal;
