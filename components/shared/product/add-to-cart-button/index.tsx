"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/@types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

interface AddToCartButtonProps {
  item: CartItem;
}
export function AddToCartButton({ item }: AddToCartButtonProps) {
  const router = useRouter();

  async function handleAddToCart() {
    const response = await addItemToCart(item);

    if (!response.success) {
      toast.error(response.message, {
        description: response.message,
      });

      return;
    }

    if (response.success) {
      toast(`${item.name} added to cart`, {
        action: (
          <Button
            aria-label="Go to Cart"
            onClick={() => router.push("/cart")}
            className="bg-primary text-white hover:bg-gray-800"
          >
            Go to Cart
          </Button>
        ),
      });
    }
  }

  return (
    <Button className="w-full" type="button" onClick={() => handleAddToCart()}>
      <Plus /> ADD TO CART
    </Button>
  );
}
