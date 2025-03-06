import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsTable } from "./components/order-details-table";
import { ShippingAddress } from "@/@types";

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

  return (
    <OrderDetailsTable
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
    />
  );
}
