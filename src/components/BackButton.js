//folder: src/components/BackButton.js

"use client";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        marginTop: "16px",
        padding: "8px 16px",
        border: "1px solid #333",
        background: "#f5f5f5",
        cursor: "pointer",
      }}
    >
      ← Kembali
    </button>
  );
}
