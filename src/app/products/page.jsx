// src/app/products/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import slugify from "../../utils/slugify";
import productsData from "../../data/products.json";

export default function ProductsPage() {
  const products = [...productsData].sort((a, b) => b.id - a.id);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // 🔹 Fungsi untuk membuat range halaman dengan ellipsis
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <section>
      <h1>Daftar Produk</h1>

      {/* Produk */}
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
            <img src={p.image} alt={p.title} width={auto} />
            <p style={{ margin: 0, color: "#555" }}>
              {p.description.length > 300
                ? p.description.substring(0, 300) + "..."
                : p.description}
            </p>
            <p>
              <b>Harga:</b> Rp{p.price.toLocaleString()}
            </p>
            {/* 🔹 Perubahan: link ke kanan bawah */}
            <div style={{ marginTop: "auto", textAlign: "right" }}>
            <Link href={`/products/${slugify(p.title)}`}>Lihat Detail →</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
          gap: "6px",
        }}
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            background: currentPage === 1 ? "#eee" : "#fff",
          }}
        >
          ← Prev
        </button>

        {getPageNumbers().map((num, i) =>
          num === "..." ? (
            <span key={i} style={{ padding: "6px 10px" }}>
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              style={{
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: currentPage === num ? "brown" : "#fff",
                color: currentPage === num ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {num}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            background: currentPage === totalPages ? "#eee" : "#fff",
          }}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
