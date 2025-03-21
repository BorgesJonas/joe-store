import { ProductCarousel } from "@/components/shared/product/product-carousel";
import { ProductList } from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/products.actions";
import { ViewAllProductsButton } from "./components/view-all-prducts-button";

export default async function HomePage() {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {!!featuredProducts.length && <ProductCarousel data={featuredProducts} />}
      <ProductList data={products} title="Newest Arrivals" />
      <ViewAllProductsButton />
    </>
  );
}
