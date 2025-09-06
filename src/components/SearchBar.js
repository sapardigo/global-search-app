// folder: src/components/SearchBar.js

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  placeholder = "Search...",
  basePath = "/search",
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`${basePath}?q=${encodeURIComponent(query)}`);
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "6px 10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {/* <button
        type="submit"
        style={{
          padding: "6px 10px",
          borderRadius: "15px",
          background: "#333",
          color: "#fff",
          cursor: "pointer",
          border: "none",
        }}
      >
        Go!
      </button> */}
    </form>
  );
}
