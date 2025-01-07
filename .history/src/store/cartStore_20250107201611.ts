import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.customId === product.customId
      );

      const updatedCart = existingProduct
        ? state.cart.map((item) =>
            item.customId === product.customId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      return { cart: updatedCart };
    }),
  removeFromCart: (customId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.customId !== customId),
    })),
  removeOneFromCart: (customId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.customId === customId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { cart: updatedCart };
    }),
  clearCart: () => set({ cart: [] }),
}));
