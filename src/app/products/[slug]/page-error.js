import { headers } from "next/headers";
import productsData from "@/data/products.json";
import slugify from "@/utils/slugify";

// === Metadata SEO / Open Graph / Twitter Card ===
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = productsData.find((item) => slugify(item.title) === slug);

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host.includes("localhost") ? "http" : "https";

  const fullUrl = `${protocol}://${host}/products/${slug}`;
  const imageUrl = product
    ? product.image.startsWith("http")
      ? product.image
      : `${protocol}://${host}${product.image}`
    : "/default.jpg";

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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

// === Halaman Detail Produk ===
export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = productsData.find((item) => slugify(item.title) === slug);

  if (!product) {
    return <h1>Produk tidak ditemukan</h1>;
  }

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host.includes("localhost") ? "http" : "https";
  const currentHostname = `${protocol}://${host}`;
  const fullUrl = `${currentHostname}/products/${slug}`;

  // URL gambar absolut
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${currentHostname}${product.image}`;

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
      <img src={imageUrl} alt={product.title} width="400" />

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
