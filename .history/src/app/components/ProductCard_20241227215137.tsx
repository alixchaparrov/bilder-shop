import { useCartStore } from "@/store/cartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price} €</p>
      <button
        className="add-to-cart-btn bg-green-500 text-white py-2 px-4 rounded"
        onClick={() => addToCart(product)}
      >
        Zum Warenkorb hinzufügen
      </button>
    </div>
  );
};

export default ProductCard;
