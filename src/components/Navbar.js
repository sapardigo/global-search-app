//folder: src/components/NavBar.js

"use client";
import Link from "next/link"; // <- import Link
import SearchBar from "./SearchBar";

export default function Navbar() {
  const linkStyle = {
    textDecoration: "none", // hilangkan underline
    color: "inherit", // ikuti warna teks default
  };

  return (
    <nav
      style={{
        alignItems: "center",
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        zIndex: 1, // pastikan di atas konten lain
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <div
          style={{
            alignItems: "center",
            color: "brown",
            fontWeight: "800",
            fontSize: "24px",
          }}
        >
          LOGO
        </div>
        <SearchBar />
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/products" style={linkStyle}>
          Products
        </Link>
        <Link href="/posts" style={linkStyle}>
          Posts
        </Link>
        <Link href="/tips" style={linkStyle}>
          Tips
        </Link>
      </div>
    </nav>
  );
}
