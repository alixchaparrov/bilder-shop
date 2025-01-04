import { create } from "zustand";

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
  
  // Agregar al carrito
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item._id === product._id);
      if (existingProduct) {
        // Incrementa la cantidad si ya existe
        return {
          cart: state.cart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      // Agrega el producto si no existe
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  // Eliminar completamente del carrito
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId),
    })),

  // Reducir cantidad de un producto
  removeOneFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Elimina productos con cantidad 0
      return { cart: updatedCart };
    }),

  // Vaciar el carrito
  clearCart: () => set({ cart: [] }),
}));
