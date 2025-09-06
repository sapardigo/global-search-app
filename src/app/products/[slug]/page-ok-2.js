import { headers } from "next/headers";
import productsData from "@/data/products.json";
import slugify from "@/utils/slugify";

export default function ProductDetail({ params }) {
  const { slug } = params;

  // cari produk berdasarkan slug otomatis dari title
  const product = productsData.find((item) => slugify(item.title) === slug);

  if (!product) {
    return <h1>Produk tidak ditemukan</h1>;
  }

  // ambil host dari request headers
  const headersList = headers();
  const host = headersList.get("host"); // contoh: "localhost:3000" atau "example.com"

  // protokol otomatis: jika host mengandung "localhost" pakai http, else https
  const protocol = host.includes("localhost") ? "http" : "https";

  // url lengkap produk
  const fullUrl = `${protocol}://${host}/products/${slug}`;

  // teks share (judul + deskripsi max 160 karakter + url)
  const shareText = `${product.title}\n\n${product.description.slice(
    0,
    160
  )}\n\n${fullUrl}`;

  // link share sosial media
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        <strong>URL Produk:</strong> {fullUrl}
      </p>
      <img src={product.image} alt={product.title} width="400" />

      {/* Tombol Share Sosial Media */}
      <div style={{ marginTop: "20px" }}>
        <p>Bagikan ke:</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Facebook</button>
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Twitter</button>
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>WhatsApp</button>
          </a>
        </div>
      </div>
    </div>
  );
}
