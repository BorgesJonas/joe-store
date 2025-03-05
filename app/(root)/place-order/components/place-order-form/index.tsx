"use client";

import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/actions/order.actions";
import { PlaceOrderButton } from "../place-order-button";

export function PlaceOrderForm() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createOrder();

    if (response.redirectTo) {
      router.push(response.redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
}
