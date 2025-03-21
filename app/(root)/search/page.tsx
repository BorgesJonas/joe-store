import { getAllProducts } from "@/lib/actions/products.actions";
import { SearchPageProps } from "./types";
import { ProductCard } from "@/components/shared/product/product-card";

export default async function SearchPage(props: SearchPageProps) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  function getFilterUrl({ c, s, p, r, pg }) {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  }

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/**   filters */}</div>
      <div className="md:col-span-4 space-y-4">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
