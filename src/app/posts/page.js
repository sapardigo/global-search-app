// folder: src/app/posts/page.js

import Link from "next/link";
import slugify from "@/utils/slugify";
import postsData from "@/data/posts.json";

export default function PostsPage() {
  // const posts = postsData; // Bisa urut jika mau

  // Sorting asscending berdasarkan id
  // const posts = [...postsData].sort((a, b) => a.id - b.id);

  // Sorting descending berdasarkan id
  const posts = [...postsData].sort((a, b) => b.id - a.id);

  // Contoh sorting descending berdasarkan date
  // const posts = [...postsData].sort(
  //   (a, b) => new Date(b.date) - new Date(a.date)
  // );

  return (
    <section>
      <h1>Daftar Post</h1>
      <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ fontSize: "18px", color: "brown" }}>{post.title}</h2>
            {/* <p>{post.description}</p> */}
            {/* 🔹 Deskripsi dipotong maksimal 300 karakter */}
            <p style={{ margin: 0, color: "#555" }}>
              {post.description.length > 256
                ? post.description.substring(0, 256) + "..."
                : post.description}
            </p>
            <Link href={`/posts/${slugify(post.title)}`}>Lihat Detail →</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
