import Head from "next/head";
import slugify from "../../../utils/slugify";
import BackButton from "../../../components/BackButton";
import productsData from "../../../data/products.json";

export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = productsData.find((p) => slugify(p.title) === slug);

  if (!product) return <p>Produk tidak ditemukan.</p>;

  // URL produk
  const currentUrl = `https://yourdomain.com/products/${slug}`;

  // ✅ Deskripsi singkat untuk share (maks 256 karakter)
  const shareDescription =
    product.description.length > 256
      ? product.description.slice(0, 253) + "..."
      : product.description;

  return (
    <>
      {/* ✅ Metadata SEO + Share */}
      <Head>
        <title>{product.title} | Produk</title>
        <meta name="description" content={shareDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="product" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={shareDescription} />
        <meta name="twitter:image" content={product.image} />
      </Head>

      <section style={{ padding: "20px" }}>
        <h1>{product.title}</h1>
        <img src={product.image} alt={product.title} width={300} />
        <p>{product.description}</p>
        <p>
          <b>Harga:</b> Rp{product.price.toLocaleString()}
        </p>
        <p>{product.details}</p>

        {/* ✅ Tombol Share */}
        <div style={{ marginTop: "20px" }}>
          <h3>Bagikan Produk:</h3>
          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}&quote=${encodeURIComponent(shareDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1877F2",
                color: "white",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🔵 Facebook
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}&text=${encodeURIComponent(
                product.title + " – " + shareDescription
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🐦 Twitter
            </a>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                product.title + " – " + shareDescription + " " + currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "white",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <BackButton />
      </section>
    </>
  );
}
