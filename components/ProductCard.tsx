import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: 12,
      display: "flex",
      gap: 12,
      alignItems: "center"
    }}>
      <img src={product.image} alt={product.title} style={{ width: 80, height: 80, objectFit: "contain" }} />
      <div>
        <h3 style={{ margin: 0, fontSize: 14 }}>{product.title}</h3>
        <p style={{ margin: "4px 0" }}>${product.price}</p>
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{product.category}</p>
      </div>
    </div>
  );
}
