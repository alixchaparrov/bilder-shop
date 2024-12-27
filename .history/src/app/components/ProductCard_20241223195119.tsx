import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();

  return (
    <div className="card">
      <img src={product.image.url()} alt={product.name} className="w-full" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price} €</p>
      <button onClick={() => addToCart(product)} className="btn-primary btn-green">
        Zum Warenkorb hinzufügen
      </button>
    </div>
  );
}
