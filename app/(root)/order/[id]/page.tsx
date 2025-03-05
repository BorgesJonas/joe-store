import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Details",
};

interface OrderDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetails(props: OrderDetailsProps) {
  const { id } = await props.params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return <>DETAIL {JSON.stringify(order)}</>;
}
