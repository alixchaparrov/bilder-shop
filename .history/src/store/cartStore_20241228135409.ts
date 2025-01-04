import { create } from "zustand"; 
import { toast } from "react-toastify";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  removeOneFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        toast.success("Erhöhte Menge im Warenkorb");
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      toast.success("Produkt zum Warenkorb hinzugefügt");
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId),
    })),

  removeOneFromCart: (productId) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item._id === productId
      );

      if (existingProduct && existingProduct.quantity > 1) {
        toast.info("Die Menge wurde verringert");
        const updatedCart = state.cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return { cart: updatedCart };
      }

      if (existingProduct && existingProduct.quantity === 1) {
        toast.info("Das Produkt wurde aus dem Warenkorb entfernt");
        return {
          cart: state.cart.filter((item) => item._id !== productId),
        };
      }

      return state;
    }),

  clearCart: () => {
    toast.info("Der Warenkorb wurde geleert");
    set({ cart: [] });
  },
}));
