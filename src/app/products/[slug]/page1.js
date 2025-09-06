import slugify from "../../../utils/slugify";
import BackButton from "../../../components/BackButton";
import productsData from "../../../data/products.json";

export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = productsData.find((p) => slugify(p.title) === slug);

  if (!product) return <p>Produk tidak ditemukan.</p>;

  return (
    <section style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={300} />
      <p>{product.description}</p>
      <p>
        <b>Harga:</b> Rp{product.price.toLocaleString()}
      </p>
      <p>{product.details}</p>
      <BackButton />
    </section>
  );
}
