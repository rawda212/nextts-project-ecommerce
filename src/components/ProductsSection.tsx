import { Product } from "@/types/products";
import Card from "./card";

interface Props {
  title: string;
  products: Product[];
}

export default function ProductsSection({ title, products }: Props) {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
