// folder: src/app/products/[slug]/page.js
// berisi data product Detail

"use client";
import { useEffect, useState } from "react";

import Head from "next/head";
import slugify from "../../../utils/slugify";
import BackButton from "../../../components/BackButton";
import productsData from "../../../data/products.json";

export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = productsData.find((p) => slugify(p.title) === slug);

  if (!product) return <p>Produk tidak ditemukan.</p>;

  // const currentUrl = `https://yourdomain.com/products/${slug}`;

  // mengambil nama host dari URL saat ini secara otomatis menggunakan : window.location.hostname
  const currentHostname = window.location.hostname;

  // menggabungkan protokol, nama host dan slug untuk membentuk URL dinamis
  // menggunakan template literal (backticks) untuk mempermudah penggabungan string.

  // const currentUrl = `https://yourdomain.com/products/${slug}`;

  const currentUrl = `https://${currentHostname}/products/${slug}`;

  // Deskripsi singkat untuk share (maks 256 karakter)
  const shareDescription =
    product.description.length > 256
      ? product.description.slice(0, 253) + "..."
      : product.description;

  // Format pesan untuk share (title + deskripsi + URL) dengan newline
  const shareMessage = `${product.title}\n\n${shareDescription}\n\n${currentUrl}`;

  return (
    <>
      <Head>
        <title>{product.title} | Produk</title>
        <meta name="description" content={shareDescription} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="product" />
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

        {/* Tombol Share - HORIZONTAL */}
        <div style={{ marginTop: "20px" }}>
          <h3>Bagikan Produk:</h3>
          {/* ✅ Rubah di sini: display flex dan gap untuk horizontal */}
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareMessage
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
              href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
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
