import { getMyCart } from "@/lib/actions/cart.actions";
import { CartTable } from "./components/cart-table";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Shopping Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();

  if (!cart) {
    notFound();
  }

  return <CartTable cart={cart} />;
}
