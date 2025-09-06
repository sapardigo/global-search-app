import Link from "next/link";
import productsData from "../../data/products.json";
import postsData from "../../data/posts.json";
import slugify from "../../utils/slugify";

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q?.toLowerCase() || "";

  // filter produk dan post berdasarkan judul
  const filteredProducts = productsData.filter((p) =>
    p.title.toLowerCase().includes(query)
  );

  const filteredPosts = postsData.filter((p) =>
    p.title.toLowerCase().includes(query)
  );

  return (
    <section style={{ padding: "20px" }}>
      <h1>Hasil Pencarian: "{query}"</h1>

      <h2>Produk</h2>
      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id} style={{ marginBottom: "12px" }}>
            {/* ⬇️ Perubahan di bagian Link */}
            <Link href={`/products/${slugify(p.title)}`} legacyBehavior>
              <a
                style={{
                  textDecoration: "none", // hilangkan underline
                  color: "#0000EE", // default biru
                }}
              >
                <strong>{p.title}</strong>
              </a>
            </Link>
            <p style={{ margin: 0, color: "#555" }}>{p.description}</p>
          </li>
        ))}
        {filteredProducts.length === 0 && <li>Tidak ada produk ditemukan</li>}
      </ul>

      <h2>Post</h2>
      <ul>
        {filteredPosts.map((p) => (
          <li key={p.id} style={{ marginBottom: "12px" }}>
            {/* ⬇️ Perubahan di bagian Link */}
            <Link href={`/posts/${slugify(p.title)}`} legacyBehavior>
              <a
                style={{
                  textDecoration: "none", // hilangkan underline
                  color: "#0000EE", // default biru
                }}
              >
                <strong>{p.title}</strong>
              </a>
            </Link>
            <p style={{ margin: 0, color: "#555" }}>{p.description}</p>
          </li>
        ))}
        {filteredPosts.length === 0 && <li>Tidak ada post ditemukan</li>}
      </ul>

      {/* ⬇️ Tambahkan style global khusus visited */}
      <style jsx>{`
        a:visited {
          color: #551a8b; /* ungu setelah dikunjungi */
        }
      `}</style>
    </section>
  );
}
