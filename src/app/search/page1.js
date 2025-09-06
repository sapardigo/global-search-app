import Link from "next/link";
import productsData from "../../data/products.json";
import postsData from "../../data/posts.json";
import slugify from "../../utils/slugify";

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q?.toLowerCase() || "";

  // filter produk dan post
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
          <li key={p.id}>
            <Link href={`/products/${slugify(p.title)}`}>{p.title}</Link>
          </li>
        ))}
        {filteredProducts.length === 0 && <li>Tidak ada produk ditemukan</li>}
      </ul>

      <h2>Post</h2>
      <ul>
        {filteredPosts.map((p) => (
          <li key={p.id}>
            <Link href={`/posts/${slugify(p.title)}`}>{p.title}</Link>
          </li>
        ))}
        {filteredPosts.length === 0 && <li>Tidak ada post ditemukan</li>}
      </ul>
    </section>
  );
}
