import { Product } from "@/@types";
import { ProductCard } from "../product-card";

interface ProductListProps {
  data: Product[];
  title?: string;
  limit?: number;
}

export function ProductList({ data, title, limit }: ProductListProps) {
  const productsToShow = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {!!data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsToShow.map((product: Product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}
