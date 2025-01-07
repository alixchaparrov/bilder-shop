import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.customId === product.customId // Busca por customId en lugar de _id
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
      cart: state.cart.filter((item) => item.customId !== customId), // Filtra por customId
    })),
  removeOneFromCart: (customId) =>
    set((state) => {
      console.log("Antes de eliminar uno:", state.cart);
      const updatedCart = state.cart
        .map((item) =>
          item.customId === customId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Elimina productos con cantidad 0
      console.log("Después de eliminar uno:", updatedCart);
      return { cart: updatedCart };
    }),
  clearCart: () => set({ cart: [] }), // Función para vaciar el carrito
  getTotalPrice: () => {
    const totalPrice = (get().cart || []).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice;
  },
}));
