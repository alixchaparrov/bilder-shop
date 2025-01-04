import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Kolumbianische Gemälde</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="px-4 py-2 rounded-md text-black"
        />
        <div className="relative">
          <button className="cart-button">
            🛒
            {cart.length > 0 && (
              <div className="cart-counter">{cart.length}</div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
