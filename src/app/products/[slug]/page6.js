import { headers } from "next/headers";
import productsData from "@/data/products.json";
import slugify from "@/utils/slugify";

export default function ProductDetail({ params }) {
  const { slug } = params;

  // ✅ Ambil hostname dari server (bukan window)
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const currentHostname = `${protocol}://${host}`;

  // Cari produk sesuai slug
  const product = productsData.find((item) => item.slug === slug);

  if (!product) {
    return <h1>Produk tidak ditemukan</h1>;
  }

  // URL lengkap produk
  const fullUrl = `${currentHostname}/products/${slug}`;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        <strong>URL Produk:</strong> {fullUrl}
      </p>
      <img src={product.image} alt={product.title} width="400" />
    </div>
  );
}
