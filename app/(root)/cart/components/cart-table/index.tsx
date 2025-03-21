"use client";

import { useRouter } from "next/navigation";
import { CartTableProps } from "./types";
import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { removeItemFromCart, addItemToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { CartItem } from "@/@types";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function CartTable({ cart }: CartTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const totalItems = cart.items.reduce(
    (value, item) => value + item.quantity,
    0
  );

  function handleRedirectToShippingAddress() {
    startTransition(() => {
      router.push("/shipping-address");
    });
  }

  async function handleRemoveFromCart(productId: string) {
    startTransition(async () => {
      const response = await removeItemFromCart(productId);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    });
  }

  async function handleAddToCart(item: CartItem) {
    startTransition(async () => {
      const response = await addItemToCart(item);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    });
  }

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart.items.length ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h4" />
                        )}
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() => handleAddToCart(item)}
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({totalItems}):
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={handleRedirectToShippingAddress}
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4"></ArrowRight>
                )}
                Proceed to checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
