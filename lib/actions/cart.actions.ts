"use server";

import { CartItem } from "@/@types";
import {
  calculateCartPrice,
  formatError,
  handleConvertToPlainObject,
} from "@/lib/utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // check for the cart cookie
    const cart = await getMyCart();

    // parse and validate item

    const item = cartItemSchema.parse(data);

    // find product in cart
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculateCartPrice([item]),
      });

      await prisma.cart.create({ data: newCart });

      // revalidate product page
      revalidatePath(`/product/${product.slug}`);

      return { success: true, message: "Item added to cart" };
    }

    // check if item already exists in cart
    const itemOnCart = (cart.items as CartItem[]).find(
      (cardItem) => cardItem.productId === item.productId
    );

    if (itemOnCart) {
      // check stock
      if (product.stock < itemOnCart.quantity + 1) {
        throw new Error("Product out of stock");
      }

      (cart.items as CartItem[]).find(
        (cardItem) => cardItem.productId === item.productId
      )!.quantity = itemOnCart.quantity + 1;
    } else {
      // if item does not exist in cart
      // check stock

      if (product.stock < 1) {
        throw new Error("Product out of stock");
      }

      // add item to cart items
      cart.items.push(item);
    }

    //save to database
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: cart.items, ...calculateCartPrice(cart.items) },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} ${itemOnCart ? "updated in" : "added"} to cart`,
    };
  } catch (error) {
    console.log("Error", error);
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) {
    throw new Error("Cart session not found");
  }

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) {
    return undefined;
  }

  // covert decimals and return
  return handleConvertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
