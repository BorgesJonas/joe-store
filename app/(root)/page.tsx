import { ProductList } from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";

export default async function HomePage() {
  const products = await getLatestProducts();

  return <ProductList data={products} title="Newest Arrivals" />;
}
