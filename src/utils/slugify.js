// folder: utils/slugify.js
// export default function slugify(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "") // hapus karakter aneh
//     .trim()
//     .replace(/\s+/g, "-"); // ganti spasi jadi "-"
// }

export default function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spasi → tanda minus
    .replace(/[^\w\-]+/g, "") // hapus karakter aneh
    .replace(/\-\-+/g, "-"); // ganti double minus jadi single
}
