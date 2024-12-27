import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item._id === product._id
      );
      const updatedCart = existingProduct
        ? state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];
      return { cart: updatedCart };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId),
    })),
  removeOneFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Asegúrate de eliminar productos con cantidad 0
      return { cart: updatedCart };
    }),

  clearCart: () => set({ cart: [] }), // Función para vaciar el carrito
  getTotalPrice: () =>
    set((state) => {
      const totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { totalPrice };
    }),
}));
