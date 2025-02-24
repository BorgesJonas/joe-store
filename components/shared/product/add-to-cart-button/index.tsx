"use client";

import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { AddToCartButtonProps } from "./types";
import { useTransition } from "react";

export function AddToCartButton({ item, cart }: AddToCartButtonProps) {
  const router = useRouter();
  const [isPending, startTransiction] = useTransition();

  const itemOnCart = cart?.items.find(
    (cartItem) => cartItem.productId === item.productId
  );

  async function handleAddToCart() {
    startTransiction(async () => {
      const response = await addItemToCart(item);

      if (!response.success) {
        toast.error(response.message, {
          description: response.message,
        });

        return;
      }

      if (response.success) {
        toast.success(response.message, {
          action: (
            <Button
              aria-label="Go to Cart"
              onClick={() => router.push("/cart")}
            >
              Go to Cart
            </Button>
          ),
        });
      }
    });
  }

  async function handleRemoveFromCart() {
    startTransiction(async () => {
      const response = await removeItemFromCart(item.productId);

      if (!response.success) {
        toast.error(response.message, {
          description: response.message,
        });

        return;
      }

      toast.success(response.message);
    });
  }

  if (!!itemOnCart) {
    return (
      <div>
        <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="px-2">{itemOnCart?.quantity}</span>
        <Button type="button" variant="outline" onClick={handleAddToCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      ADD TO CART
    </Button>
  );
}
