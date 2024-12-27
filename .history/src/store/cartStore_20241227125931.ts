import create from "zustand";

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item._id === product._id);
      const updatedCart = existingProduct
        ? state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      // Persistir en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((product) => product._id !== productId);
      // Persistir en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
}));
