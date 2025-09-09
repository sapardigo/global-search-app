// folder: src/app/products/page.js
// berisi data list all products

import Link from "next/link";
import Image from "next/image";

// menjadi relatif
import slugify from "../../utils/slugify";
import productsData from "../../data/products.json";

export default function ProductsPage() {
  // Urutkan produk descending by price
  const products = [...productsData].sort((a, b) => b.id - a.id);

  return (
    <section>
      <h1>Daftar Produk</h1>
      <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ fontSize: "18px", color: "brown" }}>{p.title}</h2>
            <img src={p.image} alt={p.title} width={200} />
            {/* <p>{p.description}</p> */}
            {/* 🔹 Deskripsi dipotong maksimal 300 karakter */}
            <p style={{ margin: 0, color: "#555" }}>
              {p.description.length > 300
                ? p.description.substring(0, 300) + "..."
                : p.description}
            </p>

            <p>
              <b>Harga:</b> Rp{p.price.toLocaleString()}
            </p>
            {/* // src/app/products/page.js */}
            <Link href={`/products/${slugify(p.title)}`}>Lihat Detail →</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// ini pagination
