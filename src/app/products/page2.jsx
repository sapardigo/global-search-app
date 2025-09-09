// src/app/products/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import slugify from "../../utils/slugify";
import productsData from "../../data/products.json";

export default function ProductsPage() {
  const products = [...productsData].sort((a, b) => b.id - a.id);

  // Pagination setup
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section>
      <h1>Daftar Produk</h1>

      {/* Produk List */}
      <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
        {currentProducts.map((p) => (
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
            <p style={{ margin: 0, color: "#555" }}>
              {p.description.length > 300
                ? p.description.substring(0, 300) + "..."
                : p.description}
            </p>
            <p>
              <b>Harga:</b> Rp{p.price.toLocaleString()}
            </p>
            <Link href={`/products/${slugify(p.title)}`}>Lihat Detail →</Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
          gap: "8px",
        }}
      >
        {/* Tombol Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: currentPage === 1 ? "#eee" : "#fff",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Prev
        </button>

        {/* Nomor Halaman */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: currentPage === i + 1 ? "brown" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}

        {/* Tombol Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: currentPage === totalPages ? "#eee" : "#fff",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
