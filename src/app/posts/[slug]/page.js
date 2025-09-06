// folder: src/app/posts/[slug]page.js

import postsData from "@/data/posts.json";
import slugify from "@/utils/slugify";
import BackButton from "@/components/BackButton";

export default function PostDetail({ params }) {
  const { slug } = params;
  const post = postsData.find((p) => slugify(p.title) === slug);
  if (!post) return <p>Post tidak ditemukan.</p>;

  return (
    <section style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <BackButton />
    </section>
  );
}
