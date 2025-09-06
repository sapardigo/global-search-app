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
      {/* <h1>Hasil Pencarian: "{query}"</h1> */}

      {/* <h2>Produk</h2> */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filteredProducts.map((p) => (
          <li key={p.id} style={{ marginBottom: "12px" }}>
            <Link
              href={`/products/${slugify(p.title)}`}
              style={{ textDecoration: "none", color: "#814141" }}
            >
              <strong>{p.title}</strong>
            </Link>
            {/* 🔹 Deskripsi dipotong maksimal 300 karakter */}
            <p style={{ margin: 0, color: "#555" }}>
              {p.description.length > 256
                ? p.description.substring(0, 256) + "..."
                : p.description}
            </p>
          </li>
        ))}
        {filteredProducts.length === 0 && <li>Tidak ada produk ditemukan</li>}
      </ul>

      {/* <h2>Post</h2> */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filteredPosts.map((p) => (
          <li key={p.id} style={{ marginBottom: "12px" }}>
            <Link
              href={`/posts/${slugify(p.title)}`}
              style={{
                textDecoration: "none",
                color: "brown",
              }}
            >
              <strong>{p.title}</strong>
            </Link>
            {/* 🔹 Deskripsi dipotong maksimal 256 karakter */}
            <p style={{ margin: 0, color: "#555" }}>
              {p.description.length > 256
                ? p.description.substring(0, 256) + "..."
                : p.description}
            </p>
          </li>
        ))}
        {filteredPosts.length === 0 && <li>Tidak ada post ditemukan</li>}
      </ul>
    </section>
  );
}
