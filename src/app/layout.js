//folder:  src/app/layout.js

import Navbar from "@/components/Navbar";

// import Navbar from "../components/Navbar";

export const metadata = {
  title: "Global Search App",
  description: "Demo Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <Navbar />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
