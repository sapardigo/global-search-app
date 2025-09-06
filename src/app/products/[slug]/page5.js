import { headers } from "next/headers";
import productsData from "@/data/products.json";

// === Metadata untuk SEO & share preview ===
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = productsData.find((item) => item.slug === slug);

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}/products/${slug}`;

  return {
    title: product ? product.title : "Produk Tidak Ditemukan",
    description: product
      ? product.description.slice(0, 160)
      : "Detail produk tidak tersedia",
    openGraph: {
      title: product ? product.title : "Produk Tidak Ditemukan",
      description: product
        ? product.description.slice(0, 160)
        : "Detail produk tidak tersedia",
      url: fullUrl,
      images: [
        {
          url: product ? product.image : "/default.jpg",
          width: 1200,
          height: 630,
          alt: product ? product.title : "Produk",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product ? product.title : "Produk Tidak Ditemukan",
      description: product
        ? product.description.slice(0, 160)
        : "Detail produk tidak tersedia",
      images: [product ? product.image : "/default.jpg"],
    },
  };
}

// === Halaman Detail Produk ===
export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = productsData.find((item) => item.slug === slug);

  if (!product) {
    return <h1>Produk tidak ditemukan</h1>;
  }

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}/products/${slug}`;

  // link share sosial media
  const shareText = `${product.title}\n\n${product.description.slice(
    0,
    160
  )}\n\n${fullUrl}`;

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
      <img src={product.image} alt={product.title} width="400" />

      {/* Tombol Share */}
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
