import { getProductById } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";
import { ProductForm } from "../components/product-form";

export const metadata = {
  title: "Update Product",
};

export default async function AdminProductEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h2 className="h2-bold">Update Product</h2>
      <ProductForm type="edit" product={product} productId={product.id} />
    </div>
  );
}
